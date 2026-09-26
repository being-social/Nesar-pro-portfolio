CREATE VIEW "public"."v_org_revenue_daily" WITH (security_invoker=true) AS  SELECT org_id,
    ((occurred_at AT TIME ZONE 'Asia/Kolkata'::text))::date AS day,
    sum(amount) FILTER (WHERE (account = 'customer_payment'::public.ledger_account)) AS collected,
    (- sum(amount) FILTER (WHERE (account = 'refund'::public.ledger_account))) AS refunded,
    (- sum(amount) FILTER (WHERE (account = 'gateway_fee'::public.ledger_account))) AS fees,
    sum(amount) FILTER (WHERE (account = 'owner_net'::public.ledger_account)) AS net
   FROM public.ledger_entries
  GROUP BY org_id, (((occurred_at AT TIME ZONE 'Asia/Kolkata'::text))::date);

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."v_org_revenue_daily" TO "anon", "authenticated", "postgres", "service_role";
