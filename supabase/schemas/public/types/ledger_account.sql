CREATE TYPE "public"."ledger_account" AS ENUM (
  'customer_payment',
  'refund',
  'gateway_fee',
  'platform_commission',
  'owner_net',
  'adjustment'
);

GRANT USAGE ON TYPE "public"."ledger_account" TO "postgres";
