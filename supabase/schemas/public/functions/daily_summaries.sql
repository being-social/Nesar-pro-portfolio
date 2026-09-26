CREATE OR REPLACE FUNCTION public.daily_summaries()
  RETURNS TABLE (
    org_id         uuid,
    venue_count    integer,
    booking_count  integer,
    expected_total bigint,
    pav_due        bigint,
    open_slots     integer
  )
  LANGUAGE sql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  with v as (
    select ven.id, ven.org_id, (now() at time zone ven.timezone)::date as today
      from public.venues ven
     where ven.status = 'active' and ven.deleted_at is null
  ),
  booked as (
    select v.org_id,
           count(*)                                              as n,
           coalesce(sum(b.total_amount), 0)                      as expected,
           -- What the owner still has to collect on the ground today.
           coalesce(sum(greatest(b.total_amount - b.amount_paid, 0))
                    filter (where b.payment_mode = 'pay_at_venue'), 0) as due
      from v
      join public.bookings b
        on b.venue_id = v.id
       and b.booking_date = v.today
       and b.status in ('confirmed', 'checked_in')
     group by 1
  ),
  slots as (
    select v.org_id, count(*) as total
      from v
      join public.resources r
        on r.venue_id = v.id and r.is_active and r.deleted_at is null
      join public.session_templates s
        on s.venue_id = v.id and s.is_active and s.deleted_at is null
       and (s.resource_ids is null or r.id = any (s.resource_ids))
       and (s.active_days is null
            or extract(isodow from v.today)::int = any (s.active_days))
     group by 1
  )
  select v.org_id,
         count(distinct v.id)::int,
         coalesce(max(booked.n), 0)::int,
         coalesce(max(booked.expected), 0)::bigint,
         coalesce(max(booked.due), 0)::bigint,
         greatest(coalesce(max(slots.total), 0) - coalesce(max(booked.n), 0), 0)::int
    from v
    left join booked on booked.org_id = v.org_id
    left join slots  on slots.org_id  = v.org_id
   group by v.org_id;
$function$;

GRANT EXECUTE ON FUNCTION "public"."daily_summaries"() TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."daily_summaries"() FROM PUBLIC;
