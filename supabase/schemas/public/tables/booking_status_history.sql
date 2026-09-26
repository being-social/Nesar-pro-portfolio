CREATE TABLE "public"."booking_status_history" (
  "id"         bigint                   NOT NULL DEFAULT nextval('public.booking_status_history_id_seq'::regclass),
  "booking_id" uuid                     NOT NULL,
  "actor_id"   uuid,
  "actor_kind" text                     NOT NULL DEFAULT 'system'::text,
  "reason"     text,
  "meta"       jsonb,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "booking_status_history_actor_kind_check"
    CHECK ((actor_kind = ANY (ARRAY['customer'::text, 'staff'::text, 'platform'::text, 'system'::text, 'agent'::text, 'webhook'::text]))),
  CONSTRAINT "booking_status_history_pkey" PRIMARY KEY (id),
  CONSTRAINT "booking_status_history_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE
);

ALTER TABLE "public"."booking_status_history"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."booking_status_history_id_seq" OWNED BY "public"."booking_status_history"."id";

ALTER TABLE "public"."booking_status_history"
  ADD COLUMN "from_status" public.booking_status;

ALTER TABLE "public"."booking_status_history"
  ADD COLUMN "to_status" public.booking_status NOT NULL;

CREATE INDEX bsh_booking_idx ON public.booking_status_history USING btree (booking_id, created_at);

CREATE POLICY "bsh_read" ON "public"."booking_status_history"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.bookings b
  WHERE ((b.id = booking_status_history.booking_id) AND ((b.customer_id = auth.uid()) OR public.is_org_member(b.org_id))))));

CREATE POLICY "platform_admin_all_booking_status_history" ON "public"."booking_status_history"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."booking_status_history" TO "anon", "authenticated", "postgres", "service_role";
