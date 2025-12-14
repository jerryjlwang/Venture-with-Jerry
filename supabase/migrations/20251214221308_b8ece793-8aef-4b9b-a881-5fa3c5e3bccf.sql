-- Enable pgcrypto extension for the digest function
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Recreate the hash_ip_address function to ensure it works
CREATE OR REPLACE FUNCTION public.hash_ip_address(ip_text text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions', 'pg_temp'
AS $function$
BEGIN
  RETURN encode(digest(ip_text || 'analytics_salt_2024', 'sha256'), 'hex');
END;
$function$;