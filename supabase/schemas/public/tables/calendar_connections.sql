CREATE TABLE "public"."calendar_connections" (
  "id"                       uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"                   uuid                     NOT NULL,
  "venue_id"                 uuid,
  "account_email"            extensions.citext,
  "calendar_id"              text                     NOT NULL,
  "access_token_enc"         bytea,
  "refresh_token_enc"        bytea,
  "token_expires_at"         timestamp with time zone,
  "scopes"                   text[],
  "sync_token"               text,
  "watch_channel_id"         text,
  "watch_resource_id"        text,
  "watch_expires_at"         timestamp with time zone,
  "last_synced_at"           timestamp with time zone,
  "last_error"               text,
  "include_customer_details" boolean                  NOT NULL DEFAULT true,
  "created_by"               uuid,
  "created_at"               timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"               timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "calendar_connections_pkey" PRIMARY KEY (id),
  CONSTRAINT "calendar_connections_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "calendar_connections_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "calendar_connections_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."calendar_connections"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."calendar_connections"
  ADD COLUMN "provider" public.calendar_provider NOT NULL DEFAULT 'google'::public.calendar_provider;

ALTER TABLE "public"."calendar_connections"
  ADD COLUMN "status" public.sync_status NOT NULL DEFAULT 'pending'::public.sync_status;

ALTER TABLE "public"."calendar_connections"
  ADD CONSTRAINT "calendar_connections_org_id_venue_id_provider_calendar_id_key" UNIQUE (org_id, venue_id, PROVIDER, calendar_id);

CREATE TRIGGER calendar_connections_updated
  BEFORE UPDATE ON public.calendar_connections
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "cal_conn_org" ON "public"."calendar_connections"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_calendar_connections" ON "public"."calendar_connections"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."calendar_connections" TO "anon", "authenticated", "postgres", "service_role";
