CREATE OR REPLACE FUNCTION public.has_org_role (
  p_org    uuid,
  VARIADIC p_roles public.org_role[]
)
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select public.org_role_of(p_org) = any(p_roles)
$function$;

GRANT EXECUTE ON FUNCTION "public"."has_org_role"(uuid, public.org_role[]) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
