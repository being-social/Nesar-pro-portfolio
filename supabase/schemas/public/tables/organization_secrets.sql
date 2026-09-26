CREATE TABLE "public"."organization_secrets" (
  "org_id"                      uuid                     NOT NULL,
  "platform_commission_bp"      integer                  NOT NULL DEFAULT 1000,
  "razorpay_key_id"             text,
  "razorpay_key_secret_enc"     bytea,
  "razorpay_webhook_secret_enc" bytea,
  "razorpay_linked_account_id"  text,
  "razorpay_kyc_status"         text                     DEFAULT 'not_started'::text,
  "bank_account_last4"          text,
  "bank_ifsc"                   text,
  "bank_beneficiary_name"       text,
  "updated_at"                  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "organization_secrets_pkey" PRIMARY KEY (org_id),
  CONSTRAINT "organization_secrets_platform_commission_bp_check" CHECK (((platform_commission_bp >= 0) AND (platform_commission_bp <= 5000))),
  CONSTRAINT "organization_secrets_razorpay_kyc_status_check"
    CHECK ((razorpay_kyc_status = ANY (ARRAY['not_started'::text, 'pending'::text, 'activated'::text, 'needs_clarification'::text, 'rejected'::text]))),
  CONSTRAINT "organization_secrets_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE
);

ALTER TABLE "public"."organization_secrets"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organization_secrets"
  ADD COLUMN "payment_mode" public.payment_mode NOT NULL DEFAULT 'own_razorpay'::public.payment_mode;

CREATE TRIGGER audit_org_secrets
  AFTER INSERT OR UPDATE ON public.organization_secrets
  FOR EACH ROW
  EXECUTE FUNCTION internal.audit_row();

CREATE TRIGGER organization_secrets_updated
  BEFORE UPDATE ON public.organization_secrets
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "org_secrets_owner_read" ON "public"."organization_secrets"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_organization_secrets" ON "public"."organization_secrets"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."organization_secrets" TO "anon", "authenticated", "postgres", "service_role";
