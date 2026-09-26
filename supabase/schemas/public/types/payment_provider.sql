CREATE TYPE "public"."payment_provider" AS ENUM (
  'razorpay',
  'cash',
  'upi_manual',
  'bank_transfer',
  'other',
  'upi_direct',
  'card_pos'
);

GRANT USAGE ON TYPE "public"."payment_provider" TO "postgres";
