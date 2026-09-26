CREATE TYPE "public"."payment_status" AS ENUM (
  'created',
  'authorized',
  'captured',
  'failed',
  'refunded',
  'partially_refunded'
);

GRANT USAGE ON TYPE "public"."payment_status" TO "postgres";
