-- Fix security warnings: set proper search_path for functions

-- Update hash_ip_address function with proper search_path
CREATE OR REPLACE FUNCTION public.hash_ip_address(ip_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
BEGIN
  -- Hash IP with a salt for privacy while maintaining some utility for rate limiting
  RETURN encode(digest(ip_text || 'analytics_salt_2024', 'sha256'), 'hex');
END;
$$;

-- Update validate_analytics_data function with proper search_path
CREATE OR REPLACE FUNCTION public.validate_analytics_data(
  p_page_path text,
  p_session_id text,
  p_visitor_id text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
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