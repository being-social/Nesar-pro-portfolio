CREATE TYPE "public"."venue_status" AS ENUM (
  'draft',
  'pending_review',
  'active',
  'inactive'
);

GRANT USAGE ON TYPE "public"."venue_status" TO "postgres";
