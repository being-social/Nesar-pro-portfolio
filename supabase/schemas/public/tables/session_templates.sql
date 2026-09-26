CREATE TABLE "public"."session_templates" (
  "id"               uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "venue_id"         uuid                     NOT NULL,
  "name"             text                     NOT NULL,
  "description"      text,
  "start_time"       time without time zone   NOT NULL,
  "end_time"         time without time zone   NOT NULL,
  "crosses_midnight" boolean                  NOT NULL DEFAULT false,
  "resource_ids"     uuid[],
  "active_days"      integer[],
  "sort_order"       integer                  NOT NULL DEFAULT 0,
  "is_active"        boolean                  NOT NULL DEFAULT true,
  "deleted_at"       timestamp with time zone,
  "created_at"       timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"       timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "session_templates_pkey" PRIMARY KEY (id),
  CONSTRAINT "session_times" CHECK ((crosses_midnight OR (end_time > start_time))),
  CONSTRAINT "session_templates_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."session_templates"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."session_templates"
  ADD COLUMN "kind" public.session_kind NOT NULL DEFAULT 'day'::public.session_kind;

CREATE INDEX session_templates_venue_idx ON public.session_templates USING btree (venue_id)
  WHERE (deleted_at IS NULL);

CREATE TRIGGER session_templates_updated
  BEFORE UPDATE ON public.session_templates
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "platform_admin_all_session_templates" ON "public"."session_templates"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "sessions_member_all" ON "public"."session_templates"
  FOR ALL
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = session_templates.venue_id) AND public.is_org_member(v.org_id)))))
  WITH CHECK ((EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = session_templates.venue_id) AND public.has_org_role(v.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role])))));

CREATE POLICY "sessions_public_read" ON "public"."session_templates"
  FOR SELECT
  TO "anon", "authenticated"
  USING (((deleted_at IS NULL) AND is_active AND (EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = session_templates.venue_id) AND (v.status = 'active'::public.venue_status))))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."session_templates" TO "anon", "authenticated", "postgres", "service_role";
