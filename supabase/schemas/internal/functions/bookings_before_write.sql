CREATE OR REPLACE FUNCTION internal.bookings_before_write()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.blocked_period := tstzrange(lower(new.period), upper(new.period) + make_interval(mins => coalesce(new.buffer_minutes,0)), '[)');
  new.updated_at := now();
  if new.status in ('held','pending_payment','confirmed','checked_in') then
    -- serialise all writers on this resource, then check admin blocks (cross-table)
    perform pg_advisory_xact_lock(hashtext('resource:' || new.resource_id::text));
    if exists (select 1 from public.availability_blocks b
               where b.resource_id = new.resource_id and b.deleted_at is null and b.period && new.blocked_period) then
      raise exception 'SLOT_BLOCKED' using errcode = 'P0001';
    end if;
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."bookings_before_write"() TO "postgres";
