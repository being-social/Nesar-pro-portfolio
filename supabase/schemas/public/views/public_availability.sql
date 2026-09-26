CREATE VIEW "public"."public_availability" AS  SELECT 'booking'::text AS kind,
    bookings.resource_id,
    bookings.venue_id,
    bookings.period,
    bookings.blocked_period,
        CASE
            WHEN (bookings.status = ANY (ARRAY['held'::public.booking_status, 'pending_payment'::public.booking_status])) THEN 'held'::text
            ELSE 'booked'::text
        END AS state
   FROM public.bookings
  WHERE (bookings.status = ANY (ARRAY['held'::public.booking_status, 'pending_payment'::public.booking_status, 'confirmed'::public.booking_status, 'checked_in'::public.booking_status, 'completed'::public.booking_status]))
UNION ALL
 SELECT 'block'::text AS kind,
    availability_blocks.resource_id,
    availability_blocks.venue_id,
    availability_blocks.period,
    availability_blocks.period AS blocked_period,
    'blocked'::text AS state
   FROM public.availability_blocks
  WHERE (availability_blocks.deleted_at IS NULL);

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."public_availability" TO "anon", "authenticated", "postgres", "service_role";
