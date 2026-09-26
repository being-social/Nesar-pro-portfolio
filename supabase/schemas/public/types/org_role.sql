CREATE TYPE "public"."org_role" AS ENUM (
  'owner',
  'admin',
  'manager',
  'staff'
);

GRANT USAGE ON TYPE "public"."org_role" TO "postgres";
