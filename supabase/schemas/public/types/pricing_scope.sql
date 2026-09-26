CREATE TYPE "public"."pricing_scope" AS ENUM (
  'base',
  'day_of_week',
  'holiday',
  'date_range',
  'date',
  'customer_type',
  'hour_range'
);

GRANT USAGE ON TYPE "public"."pricing_scope" TO "postgres";
