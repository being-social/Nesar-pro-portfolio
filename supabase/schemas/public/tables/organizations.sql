CREATE TABLE "public"."organizations" (
  "id"                               uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "slug"                             extensions.citext        NOT NULL,
  "display_name"                     text                     NOT NULL,
  "legal_name"                       text,
  "contact_name"                     text,
  "contact_phone"                    text,
  "contact_email"                    extensions.citext,
  "support_whatsapp"                 text,
  "hold_ttl_minutes"                 integer                  NOT NULL DEFAULT 10,
  "min_notice_hours"                 integer                  NOT NULL DEFAULT 2,
  "max_advance_days"                 integer                  NOT NULL DEFAULT 90,
  "max_active_holds_per_user"        integer                  NOT NULL DEFAULT 2,
  "max_future_bookings_per_customer" integer                  NOT NULL DEFAULT 10,
  "no_show_grace_minutes"            integer                  NOT NULL DEFAULT 60,
  "cancellation_policy"              jsonb
    NOT NULL DEFAULT '[{"refund_pct": 100, "hours_before": 72}, {"refund_pct": 50, "hours_before": 24}, {"refund_pct": 0, "hours_before": 0}]'::jsonb,
  "weather_policy"                   text                     NOT NULL DEFAULT 'full_refund'::text,
  "advance_percent"                  integer                  NOT NULL DEFAULT 100,
  "convenience_fee_bp"               integer                  NOT NULL DEFAULT 0,
  "gst_registered"                   boolean                  NOT NULL DEFAULT false,
  "gstin"                            text,
  "gst_rate_bp"                      integer                  NOT NULL DEFAULT 1800,
  "prices_include_gst"               boolean                  NOT NULL DEFAULT true,
  "invoice_prefix"                   text                     NOT NULL DEFAULT 'GB'::text,
  "state_code"                       character(2),
  "terms_url"                        text,
  "approved_at"                      timestamp with time zone,
  "approved_by"                      uuid,
  "deleted_at"                       timestamp with time zone,
  "created_by"                       uuid,
  "created_at"                       timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"                       timestamp with time zone NOT NULL DEFAULT now(),
  "allow_pay_at_venue"               boolean                  NOT NULL DEFAULT false,
  "pav_auto_confirm"                 boolean                  NOT NULL DEFAULT true,
  "pav_approval_sla_min"             integer                  NOT NULL DEFAULT 30,
  "pav_max_active_per_customer"      integer                  NOT NULL DEFAULT 1,
  "pav_block_after_no_shows"         integer                  NOT NULL DEFAULT 1,
  CONSTRAINT "org_gstin_format" CHECK (((gstin IS NULL) OR (gstin ~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$'::text))),
  CONSTRAINT "org_gstin_required" CHECK (((NOT gst_registered) OR (gstin IS NOT NULL))),
  CONSTRAINT "organizations_advance_percent_check" CHECK (((advance_percent >= 10) AND (advance_percent <= 100))),
  CONSTRAINT "organizations_convenience_fee_bp_check" CHECK (((convenience_fee_bp >= 0) AND (convenience_fee_bp <= 1000))),
  CONSTRAINT "organizations_gst_rate_bp_check" CHECK (((gst_rate_bp >= 0) AND (gst_rate_bp <= 2800))),
  CONSTRAINT "organizations_hold_ttl_minutes_check" CHECK (((hold_ttl_minutes >= 3) AND (hold_ttl_minutes <= 30))),
  CONSTRAINT "organizations_max_advance_days_check" CHECK (((max_advance_days >= 1) AND (max_advance_days <= 365))),
  CONSTRAINT "organizations_min_notice_hours_check" CHECK (((min_notice_hours >= 0) AND (min_notice_hours <= 168))),
  CONSTRAINT "organizations_pkey" PRIMARY KEY (id),
  CONSTRAINT "organizations_slug_key" UNIQUE (slug),
  CONSTRAINT "organizations_weather_policy_check" CHECK ((weather_policy = ANY (ARRAY['full_refund'::text, 'credit'::text, 'none'::text]))),
  CONSTRAINT "organizations_approved_by_fkey" FOREIGN KEY (approved_by) REFERENCES public.profiles(id),
  CONSTRAINT "organizations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."organizations"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organizations"
  ADD COLUMN "status" public.org_status NOT NULL DEFAULT 'pending'::public.org_status;

CREATE TRIGGER organizations_protect
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION internal.protect_org_fields();

CREATE TRIGGER organizations_updated
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "orgs_create" ON "public"."organizations"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (((created_by = auth.uid()) AND (status = 'pending'::public.org_status)));

CREATE POLICY "orgs_member_read" ON "public"."organizations"
  FOR SELECT
  TO "authenticated"
  USING (public.is_org_member(id));

CREATE POLICY "orgs_owner_update" ON "public"."organizations"
  FOR UPDATE
  TO "authenticated"
  USING (public.has_org_role(id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "orgs_public_read" ON "public"."organizations"
  FOR SELECT
  TO "anon", "authenticated"
  USING (((status = 'active'::public.org_status) AND (deleted_at IS NULL)));

CREATE POLICY "platform_admin_all_organizations" ON "public"."organizations"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."organizations" TO "anon", "authenticated", "postgres", "service_role";
