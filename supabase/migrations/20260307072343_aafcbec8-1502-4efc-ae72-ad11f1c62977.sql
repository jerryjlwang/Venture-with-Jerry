
-- Fix 1: analytics_rate_limit - add restrictive SELECT policy for admins only
CREATE POLICY "Only admins can read rate limits"
ON public.analytics_rate_limit FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()));

-- Fix 2: user_roles - drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Fix 3: analytics_summary - drop restrictive and recreate as permissive
DROP POLICY IF EXISTS "Only admins can read analytics summary" ON public.analytics_summary;

CREATE POLICY "Only admins can read analytics summary"
ON public.analytics_summary FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()));

-- Fix 4: analytics - drop restrictive and recreate as permissive
DROP POLICY IF EXISTS "Only admins can read analytics" ON public.analytics;

CREATE POLICY "Only admins can read analytics"
ON public.analytics FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()));
