-- Face TV music video submissions
-- Run this once in Supabase Dashboard -> SQL Editor -> New query.

-- 1. Submissions table -------------------------------------------------------
create table if not exists public.music_submissions (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  status              text not null default 'pending'
                        check (status in ('pending', 'reviewing', 'accepted', 'rejected')),

  -- Media details
  format              text not null check (format in ('2k', '16:9')),
  version             text not null check (version in ('original', 'clean', 'dirty')),
  video_path          text not null,
  lyrics_path         text not null,

  -- Track information
  artist_name         text not null,
  track_title         text not null,
  album_title         text,
  video_director      text,
  video_length_sec    integer not null check (video_length_sec > 0),
  record_label        text not null,
  writers             text,
  publishers          text,

  -- Release & origin
  digital_release     date,
  physical_release    date,
  album_release       date,
  artist_country      text,
  produced_country    text not null,

  -- Authorised representative
  rep_name            text not null,
  rep_position        text not null,
  rep_label           text not null,
  rep_phone           text not null,
  rep_email           text not null,

  -- Agreements
  agreed_payment      boolean not null check (agreed_payment),
  agreed_terms        boolean not null check (agreed_terms),

  admin_notes         text
);

create index if not exists music_submissions_created_at_idx
  on public.music_submissions (created_at desc);

-- 2. Row Level Security: public can INSERT only, never read/update/delete -----
alter table public.music_submissions enable row level security;

drop policy if exists "Public can submit" on public.music_submissions;
create policy "Public can submit"
  on public.music_submissions
  for insert
  to anon, authenticated
  with check (status = 'pending' and admin_notes is null);

-- Staff view submissions through the Supabase dashboard (service role bypasses RLS).

-- 3. Private storage bucket for videos and lyrics ----------------------------
insert into storage.buckets (id, name, public)
values ('submissions', 'submissions', false)
on conflict (id) do nothing;

-- Public can upload into the bucket (under videos/ or lyrics/), but not list,
-- download, overwrite or delete anything.
drop policy if exists "Public can upload submission files" on storage.objects;
create policy "Public can upload submission files"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] in ('videos', 'lyrics')
  );
