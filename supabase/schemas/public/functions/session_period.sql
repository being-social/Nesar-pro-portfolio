CREATE OR REPLACE FUNCTION public.session_period (
  p_venue_id            uuid,
  p_session_template_id uuid,
  p_date                date
)
  RETURNS tstzrange
  LANGUAGE plpgsql
  STABLE
  AS $function$
declare v_tz text; t public.session_templates%rowtype; v_start timestamptz; v_end timestamptz;
begin
  select timezone into v_tz from public.venues where id = p_venue_id;
  select * into t from public.session_templates where id = p_session_template_id;
  if v_tz is null or t.id is null then raise exception 'SESSION_NOT_FOUND'; end if;
  v_start := (p_date + t.start_time) at time zone v_tz;
  v_end   := ((p_date + (case when t.crosses_midnight then 1 else 0 end)) + t.end_time) at time zone v_tz;
  if v_end <= v_start then raise exception 'INVALID_SESSION_TIMES'; end if;
  return tstzrange(v_start, v_end, '[)');
end $function$;

GRANT EXECUTE ON FUNCTION "public"."session_period"(uuid, uuid, date) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
