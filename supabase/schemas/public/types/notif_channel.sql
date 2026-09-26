CREATE TYPE "public"."notif_channel" AS ENUM (
  'email',
  'whatsapp',
  'sms',
  'push',
  'in_app'
);

GRANT USAGE ON TYPE "public"."notif_channel" TO "postgres";
