CREATE TABLE "public"."payouts" (
  "id"                   uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"               uuid                     NOT NULL,
  "amount"               bigint                   NOT NULL,
  "period_from"          date,
  "period_to"            date,
  "razorpay_transfer_id" text,
  "hold_until"           timestamp with time zone,
  "reference"            text,
  "note"                 text,
  "settled_at"           timestamp with time zone,
  "created_by"           uuid,
  "created_at"           timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"           timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "payouts_amount_check" CHECK ((amount > 0)),
  CONSTRAINT "payouts_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "payouts_pkey" PRIMARY KEY (id),
  CONSTRAINT "payouts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."payouts"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."payouts"
  ADD COLUMN "mode" public.payment_mode NOT NULL;

ALTER TABLE "public"."payouts"
  ADD COLUMN "status" public.payout_status NOT NULL DEFAULT 'pending'::public.payout_status;

CREATE TRIGGER payouts_updated
  BEFORE UPDATE ON public.payouts
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "payouts_org_read" ON "public"."payouts"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_payouts" ON "public"."payouts"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."payouts" TO "anon", "authenticated", "postgres", "service_role";
