CREATE TYPE "public"."refund_reason" AS ENUM (
  'customer_cancel',
  'owner_cancel',
  'weather',
  'slot_taken',
  'duplicate_payment',
  'amount_mismatch',
  'dispute',
  'goodwill',
  'other'
);

GRANT USAGE ON TYPE "public"."refund_reason" TO "postgres";
