CREATE TABLE "public"."ledger_entries" (
  "id"          bigint                   NOT NULL DEFAULT nextval('public.ledger_entries_id_seq'::regclass),
  "org_id"      uuid                     NOT NULL,
  "booking_id"  uuid,
  "payment_id"  uuid,
  "refund_id"   uuid,
  "amount"      bigint                   NOT NULL,
  "memo"        text,
  "occurred_at" timestamp with time zone NOT NULL DEFAULT now(),
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "ledger_entries_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "ledger_entries_pkey" PRIMARY KEY (id),
  CONSTRAINT "ledger_entries_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "ledger_entries_payment_id_fkey" FOREIGN KEY (payment_id) REFERENCES public.payments(id),
  CONSTRAINT "ledger_entries_refund_id_fkey" FOREIGN KEY (refund_id) REFERENCES public.refunds(id)
);

ALTER TABLE "public"."ledger_entries"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."ledger_entries_id_seq" OWNED BY "public"."ledger_entries"."id";

ALTER TABLE "public"."ledger_entries"
  ADD COLUMN "account" public.ledger_account NOT NULL;

CREATE INDEX ledger_booking_idx ON public.ledger_entries USING btree (booking_id);

CREATE INDEX ledger_org_time_idx ON public.ledger_entries USING btree (org_id, occurred_at DESC);

CREATE POLICY "ledger_org_read" ON "public"."ledger_entries"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_ledger_entries" ON "public"."ledger_entries"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."ledger_entries" TO "anon", "authenticated", "postgres", "service_role";
