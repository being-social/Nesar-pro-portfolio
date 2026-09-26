CREATE OR REPLACE FUNCTION public.mark_attendance (
  p_booking_id uuid,
  p_kind       text,
  p_note       text DEFAULT NULL::text,
  p_client_id  text DEFAULT NULL::text
)
  RETURNS public.bookings
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings%rowtype;
begin
  perform set_config('app.bypass_guard','on',true);
  select * into b from public.bookings where id = p_booking_id for update;
  if not found then raise exception 'BOOKING_NOT_FOUND'; end if;
  if not public.is_org_member(b.org_id) then raise exception 'FORBIDDEN'; end if;
  if p_kind = 'check_in' then
    if b.status <> 'confirmed' then raise exception 'NOT_CHECKINABLE'; end if;
    update public.bookings set status = 'checked_in', checked_in_at = now() where id = b.id returning * into b;
  elsif p_kind = 'check_out' then
    if b.status <> 'checked_in' then raise exception 'NOT_CHECKED_IN'; end if;
    update public.bookings set status = 'completed', checked_out_at = now(), completed_at = now() where id = b.id returning * into b;
  elsif p_kind = 'no_show' then
    if not public.has_org_role(b.org_id, 'owner','admin','manager') then raise exception 'FORBIDDEN'; end if;
    if b.status <> 'confirmed' or now() < lower(b.period) + make_interval(mins => (b.policy_snapshot->>'no_show_grace_minutes')::int) then raise exception 'NO_SHOW_TOO_EARLY'; end if;
    update public.bookings set status = 'no_show', no_show_at = now() where id = b.id returning * into b;
  else raise exception 'INVALID_KIND'; end if;
  insert into public.check_ins(booking_id, org_id, kind, note, recorded_by, client_id) values (b.id, b.org_id, p_kind, p_note, auth.uid(), p_client_id) on conflict do nothing;
  return b;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."mark_attendance"(uuid, text, text, text) TO PUBLIC, "authenticated", "postgres", "service_role";
