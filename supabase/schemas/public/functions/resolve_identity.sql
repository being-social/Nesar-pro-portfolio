CREATE OR REPLACE FUNCTION public.resolve_identity (
  p_kind  text,
  p_value text
)
  RETURNS uuid
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select user_id from public.user_identities
   where kind = p_kind and value = public.canonical_identity(p_kind, p_value)
$function$;

GRANT EXECUTE ON FUNCTION "public"."resolve_identity"(text, text) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."resolve_identity"(text, text) FROM PUBLIC;
