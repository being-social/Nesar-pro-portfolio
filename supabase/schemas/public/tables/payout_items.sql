CREATE TABLE "public"."payout_items" (
  "payout_id"       uuid   NOT NULL,
  "booking_id"      uuid   NOT NULL,
  "amount"          bigint NOT NULL,
  "ledger_entry_id" bigint,
  CONSTRAINT "payout_items_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "payout_items_ledger_entry_id_fkey" FOREIGN KEY (ledger_entry_id) REFERENCES public.ledger_entries(id),
  CONSTRAINT "payout_items_payout_id_fkey" FOREIGN KEY (payout_id) REFERENCES public.payouts(id) ON DELETE CASCADE
);

ALTER TABLE "public"."payout_items"
  ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX payout_items_ledger_uq ON public.payout_items USING btree (ledger_entry_id)
  WHERE (ledger_entry_id IS NOT NULL);

CREATE INDEX payout_items_payout_idx ON public.payout_items USING btree (payout_id);

CREATE POLICY "payout_items_org_read" ON "public"."payout_items"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.payouts p
  WHERE ((p.id = payout_items.payout_id) AND public.has_org_role(p.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role])))));

CREATE POLICY "platform_admin_all_payout_items" ON "public"."payout_items"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."payout_items" TO "anon", "authenticated", "postgres", "service_role";
