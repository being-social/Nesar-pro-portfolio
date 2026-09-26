CREATE OR REPLACE FUNCTION public.venue_day_slots (
  p_venue_id      uuid,
  p_date          date,
  p_customer_type public.customer_type DEFAULT 'individual'::public.customer_type
)
  RETURNS TABLE (
    resource_id         uuid,
    resource_name       text,
    sport_code          text,
    session_template_id uuid,
    session_name        text,
    session_kind        public.session_kind,
    starts_at           timestamp with time zone,
    ends_at             timestamp with time zone,
    state               text,
    price               jsonb
  )
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  with venue as (
    select v.*, o.min_notice_hours, o.max_advance_days
    from public.venues v
    join public.organizations o on o.id = v.org_id
    where v.id = p_venue_id
      and v.status = 'active' and v.deleted_at is null
      and o.status = 'active' and o.deleted_at is null
  ),
  candidate as (
    select
      r.id as resource_id,
      r.name as resource_name,
      r.sport_code,
      r.buffer_minutes,
      t.id as session_template_id,
      t.name as session_name,
      t.kind as session_kind,
      public.session_period(v.id, t.id, p_date) as period,
      v.min_notice_hours,
      v.max_advance_days,
      r.sort_order as r_sort,
      t.sort_order as t_sort
    from venue v
    join public.resources r
      on r.venue_id = v.id and r.is_active and r.deleted_at is null
    join public.session_templates t
      on t.venue_id = v.id and t.is_active and t.deleted_at is null
      -- Same three predicates create_hold enforces, in the same order.
      and (t.resource_ids is null or r.id = any (t.resource_ids))
      and (t.active_days is null or extract(isodow from p_date)::int = any (t.active_days))
  )
  select
    c.resource_id,
    c.resource_name,
    c.sport_code,
    c.session_template_id,
    c.session_name,
    c.session_kind,
    lower(c.period),
    upper(c.period),
    case
      -- A block wins over a booking: the ground is shut, so why it is shut
      -- matters more to the customer than who else wanted it.
      when exists (
        select 1 from public.availability_blocks ab
        where ab.resource_id = c.resource_id and ab.deleted_at is null
          and ab.period && c.period
      ) then 'blocked'
      when exists (
        select 1 from public.bookings b
        where b.resource_id = c.resource_id
          and b.status in ('held','pending_payment','confirmed','checked_in','completed')
          -- Compare the candidate's *buffered* range, exactly as the EXCLUDE
          -- constraint will when create_hold runs. Comparing raw periods here
          -- would offer a slot the insert then rejects.
          and b.blocked_period && tstzrange(
                lower(c.period),
                upper(c.period) + make_interval(mins => coalesce(c.buffer_minutes, 0)),
                '[)')
      ) then 'taken'
      when lower(c.period) < now() + make_interval(hours => c.min_notice_hours) then 'too_soon'
      when lower(c.period) > now() + make_interval(days => c.max_advance_days) then 'too_far'
      else 'open'
    end,
    public.quote_price(c.resource_id, c.session_template_id, p_date, p_customer_type)
  from candidate c
  order by c.r_sort, c.t_sort, lower(c.period);
$function$;

GRANT EXECUTE ON FUNCTION "public"."venue_day_slots"(uuid, date, public.customer_type) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

COMMENT ON FUNCTION "public"."venue_day_slots"(uuid, date, public.customer_type) IS 'One venue, one day: every offerable session with its state and price. Read-only; mirrors create_hold''s offering rules.';
