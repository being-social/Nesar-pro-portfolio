CREATE OR REPLACE FUNCTION internal.bookings_guard_direct_update()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  if auth.uid() is not null and current_setting('app.bypass_guard', true) is distinct from 'on' then
    if new.status is distinct from old.status or new.period <> old.period or new.resource_id <> old.resource_id
       or new.base_amount <> old.base_amount or new.total_amount <> old.total_amount or new.advance_amount <> old.advance_amount
       or new.amount_paid <> old.amount_paid or new.amount_refunded <> old.amount_refunded or new.discount_amount <> old.discount_amount
       or new.hold_expires_at is distinct from old.hold_expires_at or new.razorpay_order_id is distinct from old.razorpay_order_id then
      raise exception 'USE_BOOKING_FUNCTIONS' using errcode = 'P0001';
    end if;
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."bookings_guard_direct_update"() TO "postgres";
