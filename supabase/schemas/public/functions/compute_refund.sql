CREATE OR REPLACE FUNCTION public.compute_refund (
  p_booking   public.bookings,
  p_initiator public.cancel_initiator,
  p_at        timestamp with time zone DEFAULT now()
)
  RETURNS bigint
  LANGUAGE plpgsql
  IMMUTABLE
  AS $function$
declare v_paid bigint := p_booking.amount_paid - p_booking.amount_refunded; v_hours numeric; v_pct int := 0; r record;
begin
  if v_paid <= 0 then return 0; end if;
  if p_initiator in ('owner','platform','system') then return v_paid; end if;
  if p_initiator = 'weather' then
    return case when p_booking.policy_snapshot->>'weather_policy' = 'none' then 0 else v_paid end;
  end if;
  v_hours := extract(epoch from (lower(p_booking.period) - p_at)) / 3600.0;
  -- rules are evaluated from the most generous threshold down: first rule whose hours_before <= hours-until-start wins
  for r in select value from jsonb_array_elements(p_booking.policy_snapshot->'cancellation') order by (value->>'hours_before')::int desc loop
    if v_hours >= (r.value->>'hours_before')::numeric then v_pct := (r.value->>'refund_pct')::int; exit; end if;
  end loop;
  return round(v_paid * v_pct / 100.0);
end $function$;

GRANT EXECUTE
  ON FUNCTION "public"."compute_refund"(public.bookings, public.cancel_initiator, timestamp WITH time zone)
  TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
