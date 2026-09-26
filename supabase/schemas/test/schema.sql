CREATE SCHEMA "test";

GRANT USAGE ON SCHEMA "test" TO "authenticated";

GRANT CREATE, USAGE ON SCHEMA "test" TO "postgres";

GRANT USAGE ON SCHEMA "test" TO "service_role";
