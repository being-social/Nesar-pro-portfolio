CREATE OR REPLACE FUNCTION public.normalize_phone (
  p text
)
  RETURNS text
  LANGUAGE plpgsql
  IMMUTABLE
  AS $function$
declare d text := regexp_replace(coalesce(p,''), '[^0-9]', '', 'g');
begin
  if d = '' then return null; end if;
  if length(d) = 10 then return '+91' || d; end if;
  if length(d) = 11 and left(d,1) = '0' then return '+91' || substr(d,2); end if;
  if length(d) = 12 and left(d,2) = '91' then return '+' || d; end if;
  return '+' || d;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."normalize_phone"(text) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
