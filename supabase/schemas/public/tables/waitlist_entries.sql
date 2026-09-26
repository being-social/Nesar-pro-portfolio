CREATE TABLE "public"."waitlist_entries" (
  "id"                   uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"               uuid                     NOT NULL,
  "resource_id"          uuid                     NOT NULL,
  "session_template_id"  uuid,
  "booking_date"         date                     NOT NULL,
  "user_id"              uuid                     NOT NULL,
  "notified_at"          timestamp with time zone,
  "priority_until"       timestamp with time zone,
  "fulfilled_booking_id" uuid,
  "created_at"           timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "waitlist_entries_fulfilled_booking_id_fkey" FOREIGN KEY (fulfilled_booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "waitlist_entries_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY (id),
  CONSTRAINT "waitlist_entries_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE CASCADE,
  CONSTRAINT "waitlist_entries_resource_id_session_template_id_booking_da_key" UNIQUE (resource_id, session_template_id, booking_date, user_id),
  CONSTRAINT "waitlist_entries_session_template_id_fkey" FOREIGN KEY (session_template_id) REFERENCES public.session_templates(id),
  CONSTRAINT "waitlist_entries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."waitlist_entries"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_waitlist_entries" ON "public"."waitlist_entries"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "waitlist_self" ON "public"."waitlist_entries"
  FOR ALL
  TO "authenticated"
  USING (((user_id = auth.uid()) OR public.is_org_member(org_id)))
  WITH CHECK ((user_id = auth.uid()));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."waitlist_entries" TO "anon", "authenticated", "postgres", "service_role";
