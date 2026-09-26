CREATE OR REPLACE FUNCTION internal.broadcast_availability()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare j jsonb; v_state text;
begin
  j := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
  if tg_table_name = 'availability_blocks' then
    v_state := case when tg_op = 'DELETE' or (j->>'deleted_at') is not null then 'free' else 'blocked' end;
  else
    v_state := case when (j->>'status') in ('held','pending_payment') then 'held'
                    when (j->>'status') in ('confirmed','checked_in','completed') then 'booked'
                    else 'free' end;
  end if;
  perform realtime.send(
    jsonb_build_object('table', tg_table_name, 'resource_id', j->>'resource_id', 'period', j->>'period', 'state', v_state),
    'availability', 'resource:' || (j->>'resource_id'), false);
  return null;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."broadcast_availability"() TO "postgres";
