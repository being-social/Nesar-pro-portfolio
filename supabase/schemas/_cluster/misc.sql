SELECT cron.schedule_in_database('calendar-sync', '*/2 * * * *', 'select internal.call_edge(''calendar-sync'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('complete-bookings', '*/15 * * * *', 'select public.complete_past_bookings()', 'postgres', NULL, true);

SELECT cron.schedule_in_database('daily-summary', '30 1 * * *', 'select internal.call_edge(''daily-summary'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('deliver-webhooks', '* * * * *', 'select internal.call_edge(''deliver-webhooks'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('enqueue-reminders', '*/10 * * * *', 'select public.enqueue_reminders()', 'postgres', NULL, true);

SELECT cron.schedule_in_database('expire-holds', '* * * * *', 'select public.expire_holds()', 'postgres', NULL, true);

SELECT cron.schedule_in_database('process-outbox', '* * * * *', 'select internal.call_edge(''process-outbox'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('process-refunds', '*/2 * * * *', 'select internal.call_edge(''process-refunds'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('purge-deleted-users', '0 20 * * 0', 'select internal.call_edge(''purge-deleted-users'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('reconcile-payments', '*/5 * * * *', 'select internal.call_edge(''reconcile-payments'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('release-payouts', '0 21 * * *', 'select internal.call_edge(''release-payouts'')', 'postgres', NULL, true);

SELECT cron.schedule_in_database('renew-calendar-watch', '0 */6 * * *', 'select internal.call_edge(''calendar-sync'', ''{"renew_watch":true}'')', 'postgres', NULL, true);
