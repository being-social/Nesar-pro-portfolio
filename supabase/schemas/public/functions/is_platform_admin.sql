CREATE OR REPLACE FUNCTION public.is_platform_admin()
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select coalesce((select is_platform_admin from public.profiles where id = auth.uid()), false)
$function$;

GRANT EXECUTE ON FUNCTION "public"."is_platform_admin"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
