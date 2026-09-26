CREATE OR REPLACE FUNCTION internal.fill_owner_recipient()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  if new.template like 'owner\_%' and new.recipient_id is null
     and new.recipient_email is null and new.recipient_phone is null
     and new.org_id is not null then
    select m.user_id, p.email, p.phone
      into new.recipient_id, new.recipient_email, new.recipient_phone
      from public.organization_members m
      join public.profiles p on p.id = m.user_id
     where m.org_id = new.org_id and m.removed_at is null
       and m.role in ('owner','admin')
     order by case m.role when 'owner' then 0 else 1 end, m.joined_at
     limit 1;
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."fill_owner_recipient"() TO "postgres";
