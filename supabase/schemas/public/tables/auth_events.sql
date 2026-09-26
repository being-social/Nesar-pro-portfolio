CREATE TABLE "public"."auth_events" (
  "id"         bigint                   NOT NULL DEFAULT nextval('public.auth_events_id_seq'::regclass),
  "phone"      text,
  "email"      extensions.citext,
  "user_id"    uuid,
  "kind"       text                     NOT NULL,
  "channel"    text,
  "ip"         inet,
  "user_agent" text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "auth_events_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."auth_events"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."auth_events_id_seq" OWNED BY "public"."auth_events"."id";

CREATE INDEX auth_events_phone_idx ON public.auth_events USING btree (phone, created_at DESC);

CREATE POLICY "platform_admin_all_auth_events" ON "public"."auth_events"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."auth_events" TO "anon", "authenticated", "postgres", "service_role";
