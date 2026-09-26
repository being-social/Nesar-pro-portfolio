CREATE TYPE "public"."booking_source" AS ENUM (
  'web',
  'pwa',
  'admin',
  'agent',
  'whatsapp',
  'api',
  'import'
);

GRANT USAGE ON TYPE "public"."booking_source" TO "postgres";
