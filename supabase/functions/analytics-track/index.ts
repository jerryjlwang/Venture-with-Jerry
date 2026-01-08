import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restrict to your domain
const ALLOWED_ORIGINS = [
  'https://cgvgkucrmtugckcefryn.lovableproject.com',
  'https://startupseattle.lovable.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

// Valid values for client-provided fields
const VALID_DEVICE_TYPES = ['mobile', 'tablet', 'desktop'];
const VALID_BROWSERS = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

// Sanitize text to prevent XSS - encode HTML entities
function sanitizeText(str: string | undefined | null): string | null {
  if (!str) return null;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Validate URL format for referrer
function isValidUrl(str: string | undefined | null): boolean {
  if (!str) return true; // null/undefined is valid (no referrer)
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

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
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  // Validate Origin header - reject requests from unknown origins
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    console.warn('Rejected request from unauthorized origin:', origin);
    return new Response(
      JSON.stringify({ error: 'Unauthorized origin' }),
      { 
        status: 403, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse request body
    const analyticsData: AnalyticsData = await req.json();
    
    // Basic request validation
    if (!analyticsData || typeof analyticsData !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate required fields exist and are strings
    if (typeof analyticsData.page_path !== 'string' || typeof analyticsData.session_id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate device_type against whitelist
    const validatedDeviceType = analyticsData.device_type && VALID_DEVICE_TYPES.includes(analyticsData.device_type)
      ? analyticsData.device_type
      : null;

    // Validate browser against whitelist
    const validatedBrowser = analyticsData.browser && VALID_BROWSERS.includes(analyticsData.browser)
      ? analyticsData.browser
      : 'Other';

    // Validate referrer URL format
    if (analyticsData.referrer && !isValidUrl(analyticsData.referrer)) {
      analyticsData.referrer = undefined; // Clear invalid referrer
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

    // Sanitize and prepare data for insertion with HTML entity encoding
    const sanitizedData = {
      session_id: analyticsData.session_id.substring(0, 100),
      visitor_id: analyticsData.visitor_id?.substring(0, 100) || null,
      consent_given: analyticsData.consent_given === true,
      page_path: analyticsData.page_path.substring(0, 500),
      page_title: sanitizeText(analyticsData.page_title?.substring(0, 500)),
      referrer: sanitizeText(analyticsData.referrer?.substring(0, 500)),
      user_agent: sanitizeText(analyticsData.user_agent?.substring(0, 1000)),
      device_type: validatedDeviceType,
      browser: validatedBrowser,
      duration_seconds: typeof analyticsData.duration_seconds === 'number' 
        ? Math.max(0, Math.min(analyticsData.duration_seconds, 86400)) // Cap at 24 hours
        : null,
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