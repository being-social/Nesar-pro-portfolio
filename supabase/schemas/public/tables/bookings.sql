CREATE TABLE "public"."bookings" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "short_code"          text                     NOT NULL DEFAULT ('GB'::text || upper(encode(extensions.gen_random_bytes(4), 'hex'::text))),
  "org_id"              uuid                     NOT NULL,
  "venue_id"            uuid                     NOT NULL,
  "resource_id"         uuid                     NOT NULL,
  "session_template_id" uuid,
  "booking_date"        date                     NOT NULL,
  "period"              tstzrange                NOT NULL,
  "buffer_minutes"      integer                  NOT NULL DEFAULT 0,
  "blocked_period"      tstzrange                NOT NULL,
  "customer_id"         uuid,
  "customer_name"       text,
  "customer_phone"      text,
  "customer_email"      extensions.citext,
  "customer_org_name"   text,
  "purpose"             text,
  "attendees"           integer,
  "notes"               text,
  "internal_notes"      text,
  "currency"            character(3)             NOT NULL DEFAULT 'INR'::bpchar,
  "base_amount"         bigint                   NOT NULL,
  "discount_amount"     bigint                   NOT NULL DEFAULT 0,
  "convenience_fee"     bigint                   NOT NULL DEFAULT 0,
  "gst_amount"          bigint                   NOT NULL DEFAULT 0,
  "gst_rate_bp"         integer                  NOT NULL DEFAULT 0,
  "prices_include_gst"  boolean                  NOT NULL DEFAULT true,
  "total_amount"        bigint                   NOT NULL,
  "advance_amount"      bigint                   NOT NULL,
  "amount_paid"         bigint                   NOT NULL DEFAULT 0,
  "amount_refunded"     bigint                   NOT NULL DEFAULT 0,
  "platform_commission" bigint                   NOT NULL DEFAULT 0,
  "price_breakdown"     jsonb                    NOT NULL DEFAULT '[]'::jsonb,
  "pricing_rule_id"     uuid,
  "coupon_code"         text,
  "policy_snapshot"     jsonb                    NOT NULL,
  "session_snapshot"    jsonb,
  "hold_expires_at"     timestamp with time zone,
  "hold_extended"       boolean                  NOT NULL DEFAULT false,
  "idempotency_key"     text,
  "terms_accepted_at"   timestamp with time zone,
  "terms_ip"            inet,
  "razorpay_order_id"   text,
  "payment_link_id"     text,
  "confirmed_at"        timestamp with time zone,
  "checked_in_at"       timestamp with time zone,
  "checked_out_at"      timestamp with time zone,
  "completed_at"        timestamp with time zone,
  "no_show_at"          timestamp with time zone,
  "cancelled_at"        timestamp with time zone,
  "cancelled_by"        uuid,
  "cancel_reason"       text,
  "refund_due_amount"   bigint,
  "disputed_at"         timestamp with time zone,
  "created_by"          uuid,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "series_id"           uuid,
  "payment_mode"        text                     NOT NULL DEFAULT 'online'::text,
  "pav_state"           text                     NOT NULL DEFAULT 'none'::text,
  CONSTRAINT "bookings_advance_amount_check" CHECK ((advance_amount >= 0)),
  CONSTRAINT "bookings_advance_le_total" CHECK ((advance_amount <= total_amount)),
  CONSTRAINT "bookings_amount_paid_check" CHECK ((amount_paid >= 0)),
  CONSTRAINT "bookings_amount_refunded_check" CHECK ((amount_refunded >= 0)),
  CONSTRAINT "bookings_attendees_check" CHECK (((attendees >= 1) AND (attendees <= 1000))),
  CONSTRAINT "bookings_base_amount_check" CHECK ((base_amount >= 0)),
  CONSTRAINT "bookings_convenience_fee_check" CHECK ((convenience_fee >= 0)),
  CONSTRAINT "bookings_discount_amount_check" CHECK ((discount_amount >= 0)),
  CONSTRAINT "bookings_gst_amount_check" CHECK ((gst_amount >= 0)),
  CONSTRAINT "bookings_pav_state_check" CHECK ((pav_state = ANY (ARRAY['none'::text, 'awaiting_approval'::text, 'approved'::text, 'refused'::text]))),
  CONSTRAINT "bookings_payment_mode_check" CHECK ((payment_mode = ANY (ARRAY['online'::text, 'pay_at_venue'::text]))),
  CONSTRAINT "bookings_period_valid" CHECK ((lower(period) < upper(period))),
  CONSTRAINT "bookings_pkey" PRIMARY KEY (id),
  CONSTRAINT "bookings_razorpay_order_id_key" UNIQUE (razorpay_order_id),
  CONSTRAINT "bookings_short_code_key" UNIQUE (short_code),
  CONSTRAINT "bookings_total_amount_check" CHECK ((total_amount >= 0)),
  CONSTRAINT "bookings_total_consistent" CHECK ((total_amount = (((base_amount - discount_amount) + convenience_fee) +
CASE
    WHEN prices_include_gst THEN (0)::bigint
    ELSE gst_amount
END))),
  CONSTRAINT "bookings_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "bookings_pricing_rule_id_fkey" FOREIGN KEY (pricing_rule_id) REFERENCES public.pricing_rules(id),
  CONSTRAINT "bookings_cancelled_by_fkey" FOREIGN KEY (cancelled_by) REFERENCES public.profiles(id),
  CONSTRAINT "bookings_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.profiles(id),
  CONSTRAINT "bookings_series_id_fkey" FOREIGN KEY (series_id) REFERENCES public.recurring_series(id),
  CONSTRAINT "bookings_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES public.resources(id),
  CONSTRAINT "bookings_session_template_id_fkey" FOREIGN KEY (session_template_id) REFERENCES public.session_templates(id),
  CONSTRAINT "bookings_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id)
);

ALTER TABLE "public"."bookings"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."bookings"
  ADD COLUMN "source" public.booking_source NOT NULL DEFAULT 'web'::public.booking_source;

ALTER TABLE "public"."bookings"
  ADD COLUMN "status" public.booking_status NOT NULL DEFAULT 'held'::public.booking_status;

ALTER TABLE "public"."bookings"
  ADD COLUMN "cancel_initiator" public.cancel_initiator;

ALTER TABLE "public"."bookings"
  ADD COLUMN "customer_type" public.customer_type NOT NULL DEFAULT 'individual'::public.customer_type;

ALTER TABLE "public"."bookings"
  ADD CONSTRAINT "bookings_customer_or_manual" CHECK (((customer_id IS
    NOT NULL) OR
    (source = ANY (ARRAY['admin'::public.booking_source, 'import'::public.booking_source, 'agent'::public.booking_source, 'whatsapp'::public.booking_source,
    'api'::public.booking_source]))));

ALTER TABLE "public"."bookings"
  ADD CONSTRAINT "bookings_hold_needs_expiry" CHECK (((status <> ALL (ARRAY['held'::public.booking_status, 'pending_payment'::public.booking_status])) OR (hold_expires_at IS
    NOT NULL)));

ALTER TABLE "public"."bookings"
  ADD CONSTRAINT "bookings_no_overlap" EXCLUDE USING gist (resource_id WITH =, blocked_period WITH &&)
    WHERE
    ((status = ANY (ARRAY['held'::public.booking_status, 'pending_payment'::public.booking_status, 'confirmed'::public.booking_status, 'checked_in'::public.booking_status,
    'completed'::public.booking_status])));

CREATE INDEX bookings_customer_idx ON public.bookings USING btree (customer_id, created_at DESC);

CREATE UNIQUE INDEX bookings_idempotency_uq ON public.bookings USING btree (idempotency_key)
  WHERE (idempotency_key IS NOT NULL);

CREATE INDEX bookings_org_date_idx ON public.bookings USING btree (org_id, booking_date DESC);

CREATE INDEX bookings_pav_queue_idx ON public.bookings USING btree (org_id, pav_state)
  WHERE (pav_state = 'awaiting_approval'::text);

CREATE INDEX bookings_resource_period_idx ON public.bookings USING gist (resource_id, period)
  WHERE
    (status = ANY (ARRAY['held'::public.booking_status, 'pending_payment'::public.booking_status, 'confirmed'::public.booking_status, 'checked_in'::public.booking_status,
    'completed'::public.booking_status]));

CREATE INDEX bookings_status_expiry_idx ON public.bookings USING btree (hold_expires_at)
  WHERE (status = ANY (ARRAY['held'::public.booking_status, 'pending_payment'::public.booking_status]));

CREATE INDEX bookings_venue_date_idx ON public.bookings USING btree (venue_id, booking_date);

CREATE TRIGGER bookings_before_write
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION internal.bookings_before_write();

CREATE TRIGGER bookings_broadcast
  AFTER INSERT OR UPDATE OF status, period ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION internal.broadcast_availability();

CREATE TRIGGER bookings_guard_direct_update
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION internal.bookings_guard_direct_update();

CREATE TRIGGER bookings_guard_pav
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION internal.bookings_guard_pav();

CREATE TRIGGER bookings_status_history
  AFTER INSERT OR UPDATE OF status ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION internal.record_booking_status();

CREATE POLICY "bookings_customer_read" ON "public"."bookings"
  FOR SELECT
  TO "authenticated"
  USING ((customer_id = auth.uid()));

CREATE POLICY "bookings_member_read" ON "public"."bookings"
  FOR SELECT
  TO "authenticated"
  USING (public.is_org_member(org_id));

CREATE POLICY "bookings_member_update" ON "public"."bookings"
  FOR UPDATE
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "platform_admin_all_bookings" ON "public"."bookings"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."bookings" TO "anon", "authenticated", "postgres", "service_role";
