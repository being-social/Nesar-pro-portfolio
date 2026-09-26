CREATE TABLE "public"."coupon_redemptions" (
  "coupon_id"  uuid                     NOT NULL,
  "booking_id" uuid                     NOT NULL,
  "user_id"    uuid,
  "amount"     bigint                   NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "coupon_redemptions_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE,
  CONSTRAINT "coupon_redemptions_pkey" PRIMARY KEY (coupon_id, booking_id),
  CONSTRAINT "coupon_redemptions_coupon_id_fkey" FOREIGN KEY (coupon_id) REFERENCES public.coupons(id) ON DELETE CASCADE,
  CONSTRAINT "coupon_redemptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."coupon_redemptions"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "coupon_redemptions_read" ON "public"."coupon_redemptions"
  FOR SELECT
  TO "authenticated"
  USING (((user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.coupons c
  WHERE ((c.id = coupon_redemptions.coupon_id) AND public.has_org_role(c.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))))));

CREATE POLICY "platform_admin_all_coupon_redemptions" ON "public"."coupon_redemptions"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."coupon_redemptions" TO "anon", "authenticated", "postgres", "service_role";
