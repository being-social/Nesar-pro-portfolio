CREATE TABLE "public"."refunds" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "booking_id"         uuid                     NOT NULL,
  "payment_id"         uuid,
  "org_id"             uuid                     NOT NULL,
  "amount"             bigint                   NOT NULL,
  "speed"              text                     NOT NULL DEFAULT 'normal'::text,
  "razorpay_refund_id" text,
  "razorpay_raw"       jsonb,
  "attempts"           integer                  NOT NULL DEFAULT 0,
  "next_attempt_at"    timestamp with time zone DEFAULT now(),
  "last_error"         text,
  "manual_reference"   text,
  "requested_by"       uuid,
  "processed_at"       timestamp with time zone,
  "created_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"         timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "refunds_amount_check" CHECK ((amount > 0)),
  CONSTRAINT "refunds_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "refunds_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "refunds_payment_id_fkey" FOREIGN KEY (payment_id) REFERENCES public.payments(id),
  CONSTRAINT "refunds_pkey" PRIMARY KEY (id),
  CONSTRAINT "refunds_razorpay_refund_id_key" UNIQUE (razorpay_refund_id),
  CONSTRAINT "refunds_requested_by_fkey" FOREIGN KEY (requested_by) REFERENCES public.profiles(id),
  CONSTRAINT "refunds_speed_check" CHECK ((speed = ANY (ARRAY['normal'::text, 'optimum'::text])))
);

ALTER TABLE "public"."refunds"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."refunds"
  ADD COLUMN "reason" public.refund_reason NOT NULL;

ALTER TABLE "public"."refunds"
  ADD COLUMN "status" public.refund_status NOT NULL DEFAULT 'pending'::public.refund_status;

CREATE INDEX refunds_pending_idx ON public.refunds USING btree (next_attempt_at)
  WHERE (status = ANY (ARRAY['pending'::public.refund_status, 'processing'::public.refund_status]));

CREATE TRIGGER audit_refunds
  AFTER INSERT OR UPDATE ON public.refunds
  FOR EACH ROW
  EXECUTE FUNCTION internal.audit_row();

CREATE TRIGGER refunds_updated
  BEFORE UPDATE ON public.refunds
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "platform_admin_all_refunds" ON "public"."refunds"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "refunds_customer_read" ON "public"."refunds"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.bookings b
  WHERE ((b.id = refunds.booking_id) AND (b.customer_id = auth.uid())))));

CREATE POLICY "refunds_org_read" ON "public"."refunds"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."refunds" TO "anon", "authenticated", "postgres", "service_role";
