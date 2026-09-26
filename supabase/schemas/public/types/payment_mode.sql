CREATE TYPE "public"."payment_mode" AS ENUM (
  'platform',
  'own_razorpay',
  'route'
);

GRANT USAGE ON TYPE "public"."payment_mode" TO "postgres";
