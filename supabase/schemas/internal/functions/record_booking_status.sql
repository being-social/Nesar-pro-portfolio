CREATE OR REPLACE FUNCTION internal.record_booking_status()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.booking_status_history(booking_id, from_status, to_status, actor_id, actor_kind)
    values (new.id, case when tg_op = 'UPDATE' then old.status end, new.status, auth.uid(),
            case when auth.uid() is null then 'system'
                 when public.is_org_member(new.org_id) then 'staff'
                 else 'customer' end);
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."record_booking_status"() TO "postgres";
