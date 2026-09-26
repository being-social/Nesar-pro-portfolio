CREATE TABLE "public"."check_ins" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "booking_id"  uuid                     NOT NULL,
  "org_id"      uuid                     NOT NULL,
  "kind"        text                     NOT NULL,
  "note"        text,
  "photos"      jsonb                    NOT NULL DEFAULT '[]'::jsonb,
  "recorded_by" uuid,
  "recorded_at" timestamp with time zone NOT NULL DEFAULT now(),
  "client_id"   text,
  CONSTRAINT "check_ins_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE,
  CONSTRAINT "check_ins_kind_check" CHECK ((kind = ANY (ARRAY['check_in'::text, 'check_out'::text, 'incident'::text, 'weather'::text, 'note'::text]))),
  CONSTRAINT "check_ins_pkey" PRIMARY KEY (id),
  CONSTRAINT "check_ins_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "check_ins_recorded_by_fkey" FOREIGN KEY (recorded_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."check_ins"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX check_ins_booking_idx ON public.check_ins USING btree (booking_id);

CREATE UNIQUE INDEX check_ins_client_uq ON public.check_ins USING btree (client_id)
  WHERE (client_id IS NOT NULL);

CREATE POLICY "check_ins_member" ON "public"."check_ins"
  FOR ALL
  TO "authenticated"
  USING (public.is_org_member(org_id))
  WITH CHECK (public.is_org_member(org_id));

CREATE POLICY "platform_admin_all_check_ins" ON "public"."check_ins"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."check_ins" TO "anon", "authenticated", "postgres", "service_role";
