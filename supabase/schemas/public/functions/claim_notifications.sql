CREATE OR REPLACE FUNCTION public.claim_notifications (
  p_limit integer DEFAULT 50
)
  RETURNS SETOF public.notifications
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  return query
  with due as (
    select id from public.notifications
     where status in ('queued','failed','sending')
       and scheduled_for <= now()
       and coalesce(next_attempt_at, now()) <= now()
     order by scheduled_for
     limit greatest(p_limit, 1)
     for update skip locked
  )
  update public.notifications n
     set status = 'sending',
         next_attempt_at = now() + interval '10 minutes'
    from due
   where n.id = due.id
  returning n.*;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."claim_notifications"(integer) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."claim_notifications"(integer) FROM PUBLIC;
