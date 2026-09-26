CREATE OR REPLACE FUNCTION public.org_role_of (
  p_org uuid
)
  RETURNS public.org_role
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select role from public.organization_members
  where org_id = p_org and user_id = auth.uid() and removed_at is null
$function$;

GRANT EXECUTE ON FUNCTION "public"."org_role_of"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
