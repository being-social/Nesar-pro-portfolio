CREATE VIEW "public"."v_resource_occupancy" WITH (security_invoker=true) AS  SELECT org_id,
    venue_id,
    resource_id,
    booking_date,
    count(*) FILTER (WHERE (status = ANY (ARRAY['confirmed'::public.booking_status, 'checked_in'::public.booking_status, 'completed'::public.booking_status]))) AS booked_sessions,
    sum((EXTRACT(epoch FROM (upper(period) - lower(period))) / (3600)::numeric)) FILTER (WHERE (status = ANY (ARRAY['confirmed'::public.booking_status, 'checked_in'::public.booking_status, 'completed'::public.booking_status]))) AS booked_hours,
    sum(total_amount) FILTER (WHERE (status = ANY (ARRAY['confirmed'::public.booking_status, 'checked_in'::public.booking_status, 'completed'::public.booking_status]))) AS booked_value
   FROM public.bookings b
  GROUP BY org_id, venue_id, resource_id, booking_date;

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."v_resource_occupancy" TO "anon", "authenticated", "postgres", "service_role";
