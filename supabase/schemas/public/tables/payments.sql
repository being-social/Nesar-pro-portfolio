CREATE TABLE "public"."payments" (
  "id"                       uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "booking_id"               uuid                     NOT NULL,
  "org_id"                   uuid                     NOT NULL,
  "amount"                   bigint                   NOT NULL,
  "currency"                 character(3)             NOT NULL DEFAULT 'INR'::bpchar,
  "purpose"                  text                     NOT NULL DEFAULT 'advance'::text,
  "method"                   text,
  "razorpay_order_id"        text,
  "razorpay_payment_id"      text,
  "razorpay_payment_link_id" text,
  "razorpay_fee"             bigint,
  "razorpay_tax"             bigint,
  "razorpay_raw"             jsonb,
  "reference_note"           text,
  "recorded_by"              uuid,
  "captured_at"              timestamp with time zone,
  "failed_reason"            text,
  "created_at"               timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"               timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "payments_amount_check" CHECK ((amount > 0)),
  CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "payments_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "payments_pkey" PRIMARY KEY (id),
  CONSTRAINT "payments_purpose_check" CHECK ((purpose = ANY (ARRAY['advance'::text, 'balance'::text, 'full'::text, 'extra'::text, 'reschedule_diff'::text]))),
  CONSTRAINT "payments_razorpay_payment_id_key" UNIQUE (razorpay_payment_id),
  CONSTRAINT "payments_recorded_by_fkey" FOREIGN KEY (recorded_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."payments"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."payments"
  ADD COLUMN "provider" public.payment_provider NOT NULL;

ALTER TABLE "public"."payments"
  ADD COLUMN "status" public.payment_status NOT NULL DEFAULT 'created'::public.payment_status;

ALTER TABLE "public"."payments"
  ADD CONSTRAINT "payments_method_check"
    CHECK
    ((provider = ANY (ARRAY['razorpay'::public.payment_provider, 'cash'::public.payment_provider, 'upi_direct'::public.payment_provider, 'card_pos'::public.payment_provider,
    'bank_transfer'::public.payment_provider, 'upi_manual'::public.payment_provider, 'other'::public.payment_provider])));

CREATE INDEX payments_booking_idx ON public.payments USING btree (booking_id);

CREATE UNIQUE INDEX payments_offline_ref_uq ON public.payments USING btree (booking_id, reference_note)
  WHERE ((reference_note IS NOT NULL) AND (PROVIDER <> 'razorpay'::public.payment_provider));

CREATE INDEX payments_org_created_idx ON public.payments USING btree (org_id, created_at DESC);

CREATE TRIGGER audit_payments
  AFTER INSERT OR UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION internal.audit_row();

CREATE TRIGGER payments_updated
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "payments_customer_read" ON "public"."payments"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.bookings b
  WHERE ((b.id = payments.booking_id) AND (b.customer_id = auth.uid())))));

CREATE POLICY "payments_org_read" ON "public"."payments"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "platform_admin_all_payments" ON "public"."payments"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."payments" TO "anon", "authenticated", "postgres", "service_role";
