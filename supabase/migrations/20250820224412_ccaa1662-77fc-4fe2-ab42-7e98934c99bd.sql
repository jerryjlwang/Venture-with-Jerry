-- Fix function search path security warnings

-- Update is_admin function with proper search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
      AND role = 'admin'
  );
$$;

-- Update cleanup_old_rate_limits function with proper search_path
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  DELETE FROM public.analytics_rate_limit
  WHERE created_at < now() - interval '1 hour';
END;
$$;

-- Update check_rate_limit function with proper search_path
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  ip inet,
  session text,
  max_requests integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_count integer;
  current_window timestamp with time zone;
BEGIN
  -- Get current minute window
  current_window := date_trunc('minute', now());
  
  -- Get current request count for this IP/session in current window
  SELECT COALESCE(request_count, 0)
  INTO current_count
  FROM public.analytics_rate_limit
  WHERE ip_address = ip
    AND session_id = session
    AND window_start = current_window;
  
  -- Return true if rate limited (exceeded max requests)
  RETURN current_count >= max_requests;
END;
$$;

-- Update increment_rate_limit function with proper search_path
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  ip inet,
  session text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_window timestamp with time zone;
BEGIN
  current_window := date_trunc('minute', now());
  
  INSERT INTO public.analytics_rate_limit (ip_address, session_id, window_start, request_count)
  VALUES (ip, session, current_window, 1)
  ON CONFLICT (ip_address, session_id, window_start)
  DO UPDATE SET 
    request_count = analytics_rate_limit.request_count + 1,
    created_at = now();
END;
$$;