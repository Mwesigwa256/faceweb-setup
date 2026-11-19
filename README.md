# Welcome to your  project

TODO: Document your project here

## Music submissions (Supabase)

The Submit Music page (`/submit-music`) uploads the video + lyrics to Supabase Storage
and saves the form to the `music_submissions` table.

### Setup
1. Create a project at https://supabase.com.
2. In **SQL Editor**, run `supabase/migrations/001_music_submissions.sql`.
3. Copy `.env.example` to `.env.local` and fill in the values from
   **Project Settings → API** (Project URL and `anon` public key).
4. Restart `npm run dev`.

### Viewing submissions
- Form data: **Table Editor → music_submissions** (update `status` / `admin_notes` there).
- Files: **Storage → submissions** (`videos/<id>/…` and `lyrics/<id>/…`).

The public can only *insert* submissions and *upload* files; they cannot read, list,
or delete anything.

### File size limit
The free plan caps uploads at 50MB per file. To accept bigger videos, upgrade to Pro,
raise the limit in **Project Settings → Storage**, and update `MAX_VIDEO_MB` in
`src/pages/SubmitMusicPage.tsx`.

### Email notifications
Each new submission triggers `supabase/functions/notify-submission`, which emails
facetvuganda2@gmail.com (via [Resend](https://resend.com)) with the details and 7-day
download links. Setup:
1. Resend API key → Edge Function secret `RESEND_API_KEY`.
2. Generate a random secret → Edge Function secret `NOTIFY_WEBHOOK_SECRET`, and in SQL Editor:
   `select vault.create_secret('<secret>', 'notify_webhook_secret');`
3. Deploy: `npx supabase functions deploy notify-submission --no-verify-jwt --project-ref fryltjvkitqahteiwpcn`
4. Run `supabase/migrations/002_submission_email_trigger.sql` in SQL Editor.

Optional secrets: `NOTIFY_TO` (comma-separated recipients), `NOTIFY_FROM` (needs a verified domain in Resend).
