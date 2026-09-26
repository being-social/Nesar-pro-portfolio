CREATE OR REPLACE FUNCTION public.decide_pay_at_venue (
  p_booking_id uuid,
  p_approve    boolean
)
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings;
begin
  perform set_config('app.bypass_guard','on',true);
  select * into b from public.bookings where id = p_booking_id for update;
  if not found then raise exception 'NOT_FOUND'; end if;
  if not public.has_org_role(b.org_id,'owner','admin','manager') then raise exception 'FORBIDDEN'; end if;
  if b.pav_state <> 'awaiting_approval' or b.status <> 'held' then raise exception 'INVALID_STATE'; end if;
  if p_approve then
    update public.bookings set pav_state='approved', status='confirmed', confirmed_at=now(), hold_expires_at=null
      where id = b.id;
    return jsonb_build_object('state','confirmed');
  else
    update public.bookings set pav_state='refused', status='expired' where id = b.id;  -- slot frees immediately
    return jsonb_build_object('state','refused');
  end if;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."decide_pay_at_venue"(uuid, boolean) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
