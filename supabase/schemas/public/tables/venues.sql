CREATE TABLE "public"."venues" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"             uuid                     NOT NULL,
  "slug"               extensions.citext        NOT NULL,
  "name"               text                     NOT NULL,
  "tagline"            text,
  "description"        text,
  "address_line1"      text,
  "address_line2"      text,
  "city"               text,
  "state"              text,
  "pincode"            text,
  "lat"                double precision,
  "lng"                double precision,
  "timezone"           text                     NOT NULL DEFAULT 'Asia/Kolkata'::text,
  "contact_phone"      text,
  "amenities"          text[]                   NOT NULL DEFAULT '{}'::text[],
  "rules"              text,
  "photos"             jsonb                    NOT NULL DEFAULT '[]'::jsonb,
  "review_note"        text,
  "deleted_at"         timestamp with time zone,
  "created_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "area_label"         text,
  "location_precision" text                     NOT NULL DEFAULT 'area'::text,
  "private_directions" text,
  CONSTRAINT "venues_location_precision_check" CHECK ((location_precision = ANY (ARRAY['exact'::text, 'area'::text]))),
  CONSTRAINT "venues_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "venues_pkey" PRIMARY KEY (id),
  CONSTRAINT "venues_slug_key" UNIQUE (slug),
  CONSTRAINT "venues_tz_valid" CHECK ((timezone ~ '^[A-Za-z_]+/[A-Za-z_+-]+$'::text))
);

ALTER TABLE "public"."venues"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."venues"
  ADD COLUMN "status" public.venue_status NOT NULL DEFAULT 'draft'::public.venue_status;

CREATE INDEX venues_city_idx ON public.venues USING btree (city)
  WHERE (status = 'active'::public.venue_status);

CREATE INDEX venues_org_idx ON public.venues USING btree (org_id);

CREATE TRIGGER venues_protect
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION internal.protect_venue_fields();

CREATE TRIGGER venues_updated
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "platform_admin_all_venues" ON "public"."venues"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "venues_member_all" ON "public"."venues"
  FOR ALL
  TO "authenticated"
  USING (public.is_org_member(org_id))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "venues_public_read" ON "public"."venues"
  FOR SELECT
  TO "anon", "authenticated"
  USING (((status = 'active'::public.venue_status) AND (deleted_at IS NULL)));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."venues" TO "anon", "authenticated", "postgres", "service_role";
