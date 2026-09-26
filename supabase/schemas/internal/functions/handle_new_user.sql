CREATE OR REPLACE FUNCTION internal.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  insert into public.profiles (id, full_name, email, phone, phone_verified_at)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.email, public.normalize_phone(new.phone),
          case when new.phone_confirmed_at is not null then now() end)
  on conflict (id) do nothing;
  if new.email is not null then
    perform public.link_identity(new.id, 'email', new.email, 'signup', new.email_confirmed_at is not null);
  end if;
  if new.phone is not null then
    perform public.link_identity(new.id, 'phone', new.phone, 'signup', new.phone_confirmed_at is not null);
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."handle_new_user"() TO "postgres";
