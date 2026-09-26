CREATE TYPE "public"."customer_type" AS ENUM (
  'individual',
  'academy',
  'club',
  'corporate',
  'school'
);

GRANT USAGE ON TYPE "public"."customer_type" TO "postgres";
