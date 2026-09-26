CREATE TABLE "public"."reviews" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "venue_id"    uuid                     NOT NULL,
  "booking_id"  uuid                     NOT NULL,
  "customer_id" uuid                     NOT NULL,
  "rating"      integer                  NOT NULL,
  "body"        text,
  "owner_reply" text,
  "status"      text                     NOT NULL DEFAULT 'published'::text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "reviews_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE,
  CONSTRAINT "reviews_booking_id_key" UNIQUE (booking_id),
  CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT "reviews_pkey" PRIMARY KEY (id),
  CONSTRAINT "reviews_rating_check" CHECK (((rating >= 1) AND (rating <= 5))),
  CONSTRAINT "reviews_status_check" CHECK ((status = ANY (ARRAY['published'::text, 'hidden'::text, 'flagged'::text]))),
  CONSTRAINT "reviews_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."reviews"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_reviews" ON "public"."reviews"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "reviews_read" ON "public"."reviews"
  FOR SELECT
  TO "anon", "authenticated"
  USING ((status = 'published'::text));

CREATE POLICY "reviews_write" ON "public"."reviews"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (((customer_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM public.bookings b
  WHERE ((b.id = reviews.booking_id) AND (b.customer_id = auth.uid()) AND (b.status = 'completed'::public.booking_status))))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."reviews" TO "anon", "authenticated", "postgres", "service_role";
