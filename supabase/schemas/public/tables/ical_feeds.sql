CREATE TABLE "public"."ical_feeds" (
  "id"                       uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"                   uuid                     NOT NULL,
  "venue_id"                 uuid,
  "token_hash"               text                     NOT NULL,
  "include_customer_details" boolean                  NOT NULL DEFAULT false,
  "created_by"               uuid,
  "revoked_at"               timestamp with time zone,
  "created_at"               timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "ical_feeds_pkey" PRIMARY KEY (id),
  CONSTRAINT "ical_feeds_token_hash_key" UNIQUE (token_hash),
  CONSTRAINT "ical_feeds_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "ical_feeds_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "ical_feeds_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."ical_feeds"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ical_org" ON "public"."ical_feeds"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_ical_feeds" ON "public"."ical_feeds"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."ical_feeds" TO "anon", "authenticated", "postgres", "service_role";
