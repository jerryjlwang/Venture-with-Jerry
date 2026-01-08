-- Fix 1: Restrict is_admin function to authenticated users only
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO service_role;

-- Fix 2: Replace overly permissive RLS policies on analytics_rate_limit
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Service can insert rate limits" ON public.analytics_rate_limit;
DROP POLICY IF EXISTS "Service can select own rate limits" ON public.analytics_rate_limit;
DROP POLICY IF EXISTS "Service can update own rate limits" ON public.analytics_rate_limit;

-- Create service_role only policy (Edge Functions use service_role)
CREATE POLICY "Service role can manage rate limits" 
ON public.analytics_rate_limit 
FOR ALL 
TO service_role 
USING (true)
WITH CHECK (true);