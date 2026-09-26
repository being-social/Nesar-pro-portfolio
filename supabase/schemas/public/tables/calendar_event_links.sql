CREATE TABLE "public"."calendar_event_links" (
  "id"                uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "connection_id"     uuid                     NOT NULL,
  "booking_id"        uuid,
  "block_id"          uuid,
  "external_event_id" text,
  "ical_uid"          text                     NOT NULL,
  "etag"              text,
  "last_synced_at"    timestamp with time zone,
  "last_error"        text,
  "attempts"          integer                  NOT NULL DEFAULT 0,
  "next_attempt_at"   timestamp with time zone DEFAULT now(),
  CONSTRAINT "calendar_event_links_block_id_fkey" FOREIGN KEY (block_id) REFERENCES public.availability_blocks(id) ON DELETE CASCADE,
  CONSTRAINT "calendar_event_links_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE,
  CONSTRAINT "calendar_event_links_connection_id_fkey" FOREIGN KEY (connection_id) REFERENCES public.calendar_connections(id) ON DELETE CASCADE,
  CONSTRAINT "calendar_event_links_connection_id_ical_uid_key" UNIQUE (connection_id, ical_uid),
  CONSTRAINT "calendar_event_links_pkey" PRIMARY KEY (id),
  CONSTRAINT "link_target" CHECK (((booking_id IS NOT NULL) <> (block_id IS NOT NULL)))
);

ALTER TABLE "public"."calendar_event_links"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."calendar_event_links"
  ADD COLUMN "status" public.sync_status NOT NULL DEFAULT 'pending'::public.sync_status;

CREATE INDEX cel_pending_idx ON public.calendar_event_links USING btree (next_attempt_at)
  WHERE (status = ANY (ARRAY['pending'::public.sync_status, 'failed'::public.sync_status]));

CREATE POLICY "cal_links_org" ON "public"."calendar_event_links"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.calendar_connections c
  WHERE ((c.id = calendar_event_links.connection_id) AND public.has_org_role(c.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role])))));

CREATE POLICY "platform_admin_all_calendar_event_links" ON "public"."calendar_event_links"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."calendar_event_links" TO "anon", "authenticated", "postgres", "service_role";
