CREATE OR REPLACE FUNCTION internal.handle_user_identity_change()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  if new.phone is distinct from old.phone and new.phone is not null then
    perform public.link_identity(new.id, 'phone', new.phone, 'manual_link', new.phone_confirmed_at is not null);
  elsif new.phone_confirmed_at is distinct from old.phone_confirmed_at and new.phone is not null then
    perform public.link_identity(new.id, 'phone', new.phone, 'otp', true);
  end if;
  if new.email is distinct from old.email and new.email is not null then
    perform public.link_identity(new.id, 'email', new.email, 'manual_link', new.email_confirmed_at is not null);
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."handle_user_identity_change"() TO "postgres";
