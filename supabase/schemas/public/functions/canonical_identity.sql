CREATE OR REPLACE FUNCTION public.canonical_identity (
  p_kind  text,
  p_value text
)
  RETURNS text
  LANGUAGE sql
  IMMUTABLE
  AS $function$
  select case
    when p_value is null or btrim(p_value) = '' then null
    when p_kind = 'phone'  then public.normalize_phone(p_value)
    when p_kind = 'email'  then lower(btrim(p_value))
    when p_kind = 'wa_jid' then lower(split_part(btrim(p_value), '/', 1))
    else btrim(p_value)
  end
$function$;

GRANT EXECUTE ON FUNCTION "public"."canonical_identity"(text, text) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
