-- Calls the notify-submission Edge Function whenever a new submission is inserted.
-- Run in Supabase Dashboard -> SQL Editor AFTER deploying the Edge Function.
--
-- One-time, BEFORE running this file, store the shared secret in Vault
-- (use the same value as the NOTIFY_WEBHOOK_SECRET Edge Function secret):
--   select vault.create_secret('<your-secret>', 'notify_webhook_secret');

create extension if not exists pg_net;

create or replace function public.notify_new_submission()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  webhook_secret text;
begin
  select decrypted_secret into webhook_secret
  from vault.decrypted_secrets
  where name = 'notify_webhook_secret'
  limit 1;

  perform net.http_post(
    url     := 'https://fryltjvkitqahteiwpcn.supabase.co/functions/v1/notify-submission',
    body    := jsonb_build_object('record', to_jsonb(new)),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', coalesce(webhook_secret, '')
    ),
    timeout_milliseconds := 10000
  );
  return new;
exception when others then
  -- Never block a submission because the notification failed
  raise warning 'notify_new_submission failed: %', sqlerrm;
  return new;
end;
$$;

revoke all on function public.notify_new_submission() from public, anon, authenticated;

drop trigger if exists on_music_submission_created on public.music_submissions;
create trigger on_music_submission_created
  after insert on public.music_submissions
  for each row execute function public.notify_new_submission();
