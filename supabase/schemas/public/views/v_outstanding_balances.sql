CREATE VIEW "public"."v_outstanding_balances" WITH (security_invoker=true) AS  SELECT id AS booking_id,
    org_id,
    venue_id,
    booking_date,
    customer_name,
    customer_phone,
    total_amount,
    amount_paid,
    (total_amount - amount_paid) AS balance_due
   FROM public.bookings
  WHERE ((status = ANY (ARRAY['confirmed'::public.booking_status, 'checked_in'::public.booking_status, 'completed'::public.booking_status])) AND (amount_paid < total_amount));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."v_outstanding_balances" TO "anon", "authenticated", "postgres", "service_role";
