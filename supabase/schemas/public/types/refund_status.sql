CREATE TYPE "public"."refund_status" AS ENUM (
  'pending',
  'processing',
  'processed',
  'failed',
  'manual'
);

GRANT USAGE ON TYPE "public"."refund_status" TO "postgres";
