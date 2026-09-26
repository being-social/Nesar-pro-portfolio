CREATE TABLE "public"."sports" (
  "code" text NOT NULL,
  "name" text NOT NULL,
  "icon" text,
  CONSTRAINT "sports_pkey" PRIMARY KEY (code)
);

ALTER TABLE "public"."sports"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sports_read" ON "public"."sports"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."sports" TO "anon", "authenticated", "postgres", "service_role";
