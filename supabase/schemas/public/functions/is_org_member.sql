CREATE OR REPLACE FUNCTION public.is_org_member (
  p_org uuid
)
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select public.org_role_of(p_org) is not null
$function$;

GRANT EXECUTE ON FUNCTION "public"."is_org_member"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
