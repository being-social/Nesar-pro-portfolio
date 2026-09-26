CREATE TYPE "public"."org_status" AS ENUM (
  'pending',
  'active',
  'suspended',
  'archived'
);

GRANT USAGE ON TYPE "public"."org_status" TO "postgres";
