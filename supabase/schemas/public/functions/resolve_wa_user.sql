CREATE OR REPLACE FUNCTION public.resolve_wa_user (
  p_jid   text,
  p_phone text DEFAULT NULL::text
)
  RETURNS uuid
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select coalesce(
    public.resolve_identity('wa_jid', p_jid),
    public.resolve_identity('phone', coalesce(p_phone, split_part(p_jid, '@', 1))),
    (select id from public.profiles where wa_jid = public.canonical_identity('wa_jid', p_jid) and deleted_at is null),
    (select id from public.profiles
      where phone = public.normalize_phone(coalesce(p_phone, split_part(p_jid, '@', 1))) and deleted_at is null))
$function$;

GRANT EXECUTE ON FUNCTION "public"."resolve_wa_user"(text, text) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."resolve_wa_user"(text, text) FROM PUBLIC;
