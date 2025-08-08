-- Phase 1: Critical Analytics Security Fixes

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public analytics read" ON public.analytics;
DROP POLICY IF EXISTS "Allow public analytics insert" ON public.analytics;
DROP POLICY IF EXISTS "Allow public analytics summary read" ON public.analytics_summary;

-- Create enum for user roles (if not exists)
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for proper role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
      AND role = 'admin'
  );
$$;

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create secure analytics policies - only admins can read
CREATE POLICY "Only admins can read analytics"
ON public.analytics
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can read analytics summary"
ON public.analytics_summary
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Create policy for server-side analytics insertion (service role)
CREATE POLICY "Service can insert analytics"
ON public.analytics
FOR INSERT
TO service_role
WITH CHECK (true);

-- Remove public insert policy - analytics will only be inserted server-side
-- No public insert policy for better security

-- Add rate limiting table for analytics
CREATE TABLE IF NOT EXISTS public.analytics_rate_limit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address inet NOT NULL,
    session_id text NOT NULL,
    request_count integer DEFAULT 1,
    window_start timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (ip_address, session_id, date_trunc('minute', window_start))
);

-- Enable RLS on rate limiting table
ALTER TABLE public.analytics_rate_limit ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limiting
CREATE POLICY "Service can manage rate limits"
ON public.analytics_rate_limit
FOR ALL
TO service_role
WITH CHECK (true);

-- Create cleanup function for old rate limit data
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.analytics_rate_limit
  WHERE created_at < now() - interval '1 hour';
END;
$$;

-- Function to check if request should be rate limited
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  ip inet,
  session text,
  max_requests integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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
    AND date_trunc('minute', window_start) = current_window;
  
  -- Return true if rate limited (exceeded max requests)
  RETURN current_count >= max_requests;
END;
$$;

-- Function to increment rate limit counter
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  ip inet,
  session text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_window timestamp with time zone;
BEGIN
  current_window := date_trunc('minute', now());
  
  INSERT INTO public.analytics_rate_limit (ip_address, session_id, window_start, request_count)
  VALUES (ip, session, current_window, 1)
  ON CONFLICT (ip_address, session_id, date_trunc('minute', window_start))
  DO UPDATE SET 
    request_count = analytics_rate_limit.request_count + 1,
    created_at = now();
END;
$$;