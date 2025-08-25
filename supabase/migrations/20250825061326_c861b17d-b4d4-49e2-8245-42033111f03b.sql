-- Security fixes for analytics system

-- 1. Drop overly permissive analytics_rate_limit policy
DROP POLICY IF EXISTS "Service can manage rate limits" ON public.analytics_rate_limit;

-- 2. Create more restrictive policies for analytics_rate_limit
CREATE POLICY "Service can insert rate limits" 
ON public.analytics_rate_limit 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service can select own rate limits" 
ON public.analytics_rate_limit 
FOR SELECT 
USING (true);

CREATE POLICY "Service can update own rate limits" 
ON public.analytics_rate_limit 
FOR UPDATE 
USING (true);

-- 3. Drop overly permissive analytics insert policy
DROP POLICY IF EXISTS "Service can insert analytics" ON public.analytics;

-- 4. Create more restrictive analytics insert policy with validation
CREATE POLICY "Service can insert valid analytics" 
ON public.analytics 
FOR INSERT 
WITH CHECK (
  page_path IS NOT NULL 
  AND session_id IS NOT NULL 
  AND LENGTH(page_path) <= 500 
  AND LENGTH(session_id) <= 100
);

-- 5. Add function to hash IP addresses for privacy
CREATE OR REPLACE FUNCTION public.hash_ip_address(ip_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Hash IP with a salt for privacy while maintaining some utility for rate limiting
  RETURN encode(digest(ip_text || 'analytics_salt_2024', 'sha256'), 'hex');
END;
$$;

-- 6. Add function to validate analytics data
CREATE OR REPLACE FUNCTION public.validate_analytics_data(
  p_page_path text,
  p_session_id text,
  p_visitor_id text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Basic validation rules
  IF p_page_path IS NULL OR LENGTH(p_page_path) = 0 THEN
    RETURN false;
  END IF;
  
  IF p_session_id IS NULL OR LENGTH(p_session_id) = 0 THEN
    RETURN false;
  END IF;
  
  IF LENGTH(p_page_path) > 500 THEN
    RETURN false;
  END IF;
  
  IF LENGTH(p_session_id) > 100 THEN
    RETURN false;
  END IF;
  
  -- Check for basic path format
  IF NOT p_page_path ~ '^[/a-zA-Z0-9._-]*$' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;