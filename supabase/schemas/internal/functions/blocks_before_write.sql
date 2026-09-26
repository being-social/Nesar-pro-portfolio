CREATE OR REPLACE FUNCTION internal.blocks_before_write()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  if new.deleted_at is null then
    perform pg_advisory_xact_lock(hashtext('resource:' || new.resource_id::text));
    if exists (select 1 from public.bookings b
               where b.resource_id = new.resource_id and b.blocked_period && new.period
                 and b.status in ('held','pending_payment','confirmed','checked_in')) then
      raise exception 'BLOCK_CONFLICTS_WITH_BOOKINGS' using errcode = 'P0001';
    end if;
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."blocks_before_write"() TO "postgres";
