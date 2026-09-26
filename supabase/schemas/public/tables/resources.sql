CREATE TABLE "public"."resources" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "venue_id"            uuid                     NOT NULL,
  "name"                text                     NOT NULL,
  "sport_code"          text,
  "description"         text,
  "capacity_note"       text,
  "buffer_minutes"      integer                  NOT NULL DEFAULT 0,
  "hourly_enabled"      boolean                  NOT NULL DEFAULT false,
  "hourly_open"         time without time zone,
  "hourly_close"        time without time zone,
  "hourly_step_minutes" integer                  DEFAULT 60,
  "sort_order"          integer                  NOT NULL DEFAULT 0,
  "is_active"           boolean                  NOT NULL DEFAULT true,
  "deleted_at"          timestamp with time zone,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "resources_buffer_minutes_check" CHECK (((buffer_minutes >= 0) AND (buffer_minutes <= 240))),
  CONSTRAINT "resources_pkey" PRIMARY KEY (id),
  CONSTRAINT "resources_sport_code_fkey" FOREIGN KEY (sport_code) REFERENCES public.sports(code),
  CONSTRAINT "resources_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."resources"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX resources_venue_idx ON public.resources USING btree (venue_id)
  WHERE (deleted_at IS NULL);

CREATE TRIGGER resources_updated
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "platform_admin_all_resources" ON "public"."resources"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "resources_member_all" ON "public"."resources"
  FOR ALL
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = resources.venue_id) AND public.is_org_member(v.org_id)))))
  WITH CHECK ((EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = resources.venue_id) AND public.has_org_role(v.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role])))));

CREATE POLICY "resources_public_read" ON "public"."resources"
  FOR SELECT
  TO "anon", "authenticated"
  USING (((deleted_at IS NULL) AND (EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = resources.venue_id) AND (v.status = 'active'::public.venue_status))))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."resources" TO "anon", "authenticated", "postgres", "service_role";
