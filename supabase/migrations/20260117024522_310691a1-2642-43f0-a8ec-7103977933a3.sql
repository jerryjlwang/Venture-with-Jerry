-- Drop the existing permissive INSERT policy
DROP POLICY IF EXISTS "Service can insert valid analytics" ON public.analytics;

-- Create a new INSERT policy restricted to service_role only
-- This ensures all analytics data MUST go through the Edge Function
CREATE POLICY "Only service role can insert analytics"
ON public.analytics
FOR INSERT
TO service_role
WITH CHECK (
  page_path IS NOT NULL 
  AND session_id IS NOT NULL 
  AND LENGTH(page_path) <= 500 
  AND LENGTH(session_id) <= 100
);