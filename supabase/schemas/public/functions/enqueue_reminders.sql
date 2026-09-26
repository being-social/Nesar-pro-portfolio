CREATE OR REPLACE FUNCTION public.enqueue_reminders()
  RETURNS integer
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare n int;
begin
  with due as (
    select b.*, r.label from public.bookings b
    cross join (values ('reminder_24h', interval '24 hours'), ('reminder_2h', interval '2 hours')) as r(label, ahead)
    where b.status = 'confirmed' and b.customer_id is not null
      and lower(b.period) between now() + r.ahead - interval '10 minutes' and now() + r.ahead + interval '10 minutes'
  ), ins as (
    insert into public.notifications(org_id, recipient_id, recipient_phone, recipient_email, channel, template, dedupe_key, payload, booking_id)
    select org_id, customer_id, customer_phone, customer_email, 'whatsapp'::public.notif_channel, label, label||':'||id||':whatsapp', jsonb_build_object('booking_id', id), id from due
    union all
    select org_id, customer_id, customer_phone, customer_email, 'push'::public.notif_channel, label, label||':'||id||':push', jsonb_build_object('booking_id', id), id from due
    on conflict (dedupe_key) do nothing returning 1)
  select count(*) into n from ins;
  return n;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."enqueue_reminders"() TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."enqueue_reminders"() FROM PUBLIC;
