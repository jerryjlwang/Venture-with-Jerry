
-- Drop the existing restrictive SELECT policy and replace with a permissive one
DROP POLICY IF EXISTS "Only admins can read analytics" ON public.analytics;

CREATE POLICY "Only admins can read analytics"
ON public.analytics
FOR SELECT
TO authenticated
USING (is_admin());
