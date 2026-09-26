CREATE VIEW "public"."v_staff_today" WITH (security_invoker=true) AS  SELECT b.id,
    b.short_code,
    b.org_id,
    b.venue_id,
    b.resource_id,
    r.name AS resource_name,
    b.booking_date,
    b.period,
    b.status,
    b.customer_name,
    b.customer_phone,
    b.customer_org_name,
    b.purpose,
    b.attendees,
    b.notes,
    (b.total_amount - b.amount_paid) AS balance_due
   FROM (public.bookings b
     JOIN public.resources r ON ((r.id = b.resource_id)))
  WHERE ((b.status = ANY (ARRAY['confirmed'::public.booking_status, 'checked_in'::public.booking_status])) AND ((b.booking_date >= (CURRENT_DATE - 1)) AND (b.booking_date <= (CURRENT_DATE + 1))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."v_staff_today" TO "anon", "authenticated", "postgres", "service_role";
