CREATE TABLE "public"."coupons" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"       uuid                     NOT NULL,
  "code"         extensions.citext        NOT NULL,
  "percent_bp"   integer,
  "flat_amount"  bigint,
  "min_amount"   bigint                   DEFAULT 0,
  "max_uses"     integer,
  "uses"         integer                  NOT NULL DEFAULT 0,
  "per_user_max" integer                  DEFAULT 1,
  "valid_from"   date,
  "valid_to"     date,
  "is_active"    boolean                  NOT NULL DEFAULT true,
  "created_at"   timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "coupon_kind" CHECK (((percent_bp IS NOT NULL) <> (flat_amount IS NOT NULL))),
  CONSTRAINT "coupons_flat_amount_check" CHECK ((flat_amount >= 0)),
  CONSTRAINT "coupons_org_id_code_key" UNIQUE (org_id, code),
  CONSTRAINT "coupons_percent_bp_check" CHECK (((percent_bp >= 0) AND (percent_bp <= 10000))),
  CONSTRAINT "coupons_pkey" PRIMARY KEY (id),
  CONSTRAINT "coupons_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE
);

ALTER TABLE "public"."coupons"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "coupons_org_manage" ON "public"."coupons"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_coupons" ON "public"."coupons"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."coupons" TO "anon", "authenticated", "postgres", "service_role";
