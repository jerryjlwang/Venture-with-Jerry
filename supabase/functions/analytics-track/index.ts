import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-analytics-signature',
};

// HMAC verification to prevent unauthorized analytics submissions
const verifySignature = async (data: string, signature: string | null): Promise<boolean> => {
  if (!signature) return false;
  
  const secret = Deno.env.get('ANALYTICS_SECRET') || 'default-analytics-secret-change-in-production';
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const expectedSignature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  );
  
  const expectedHex = Array.from(new Uint8Array(expectedSignature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return signature === expectedHex;
};

interface AnalyticsData {
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  duration_seconds?: number;
  session_id: string;
  visitor_id?: string;
  consent_given: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse request body and verify signature
    const requestBody = await req.text();
    const analyticsData: AnalyticsData = JSON.parse(requestBody);
    
    const signature = req.headers.get('x-analytics-signature');
    const isValidSignature = await verifySignature(requestBody, signature);
    
    if (!isValidSignature) {
      console.warn('Invalid analytics signature detected');
      return new Response(
        JSON.stringify({ error: 'Invalid request signature' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Get client IP address
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';

    // Hash IP address for privacy protection
    const { data: hashedIP, error: hashError } = await supabase
      .rpc('hash_ip_address', { ip_text: clientIP });

    if (hashError) {
      console.error('IP hashing error:', hashError);
      return new Response(
        JSON.stringify({ error: 'Processing error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Rate limiting check using hashed IP
    const { data: isRateLimited, error: rateLimitError } = await supabase
      .rpc('check_rate_limit', {
        ip: hashedIP,
        session: analyticsData.session_id,
        max_requests: 60 // 60 requests per minute
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (isRateLimited) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Increment rate limit counter using hashed IP
    const { error: incrementError } = await supabase
      .rpc('increment_rate_limit', {
        ip: hashedIP,
        session: analyticsData.session_id
      });

    if (incrementError) {
      console.error('Rate limit increment error:', incrementError);
    }

    // Only track if consent is given
    if (!analyticsData.consent_given) {
      return new Response(
        JSON.stringify({ success: true, message: 'Consent not given, tracking skipped' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Enhanced data validation using database function
    const { data: isValid, error: validationError } = await supabase
      .rpc('validate_analytics_data', {
        p_page_path: analyticsData.page_path,
        p_session_id: analyticsData.session_id,
        p_visitor_id: analyticsData.visitor_id
      });

    if (validationError || !isValid) {
      console.error('Data validation failed:', validationError);
      return new Response(
        JSON.stringify({ error: 'Invalid data format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Sanitize and prepare data for insertion
    const sanitizedData = {
      session_id: analyticsData.session_id,
      visitor_id: analyticsData.visitor_id || null,
      consent_given: analyticsData.consent_given,
      page_path: analyticsData.page_path.substring(0, 500), // Limit length
      page_title: analyticsData.page_title?.substring(0, 500) || null,
      referrer: analyticsData.referrer?.substring(0, 500) || null,
      user_agent: analyticsData.user_agent?.substring(0, 1000) || null,
      device_type: analyticsData.device_type || null,
      browser: analyticsData.browser || null,
      duration_seconds: analyticsData.duration_seconds || null,
      ip_address: hashedIP,
    };

    // Insert analytics data
    const { error: insertError } = await supabase
      .from('analytics')
      .insert(sanitizedData);

    if (insertError) {
      console.error('Analytics insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to track analytics' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Clean up old rate limit data occasionally (1% chance)
    if (Math.random() < 0.01) {
      await supabase.rpc('cleanup_old_rate_limits');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});