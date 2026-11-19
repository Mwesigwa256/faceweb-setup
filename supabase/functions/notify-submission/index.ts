// Supabase Edge Function: emails Face TV when a new music submission arrives.
// Triggered by the database trigger in migrations/002_submission_email_trigger.sql.
//
// Required secrets (Dashboard -> Edge Functions -> Secrets, or `supabase secrets set`):
//   RESEND_API_KEY         API key from https://resend.com
//   NOTIFY_WEBHOOK_SECRET  Same value stored in Vault as 'notify_webhook_secret'
// Optional:
//   NOTIFY_TO              Recipient(s), comma separated (default facetvuganda2@gmail.com)
//   NOTIFY_FROM            Sender (default "Face TV Submissions <onboarding@resend.dev>")
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically.

import { createClient } from "npm:@supabase/supabase-js@2";

const BUCKET = "submissions";
const LINK_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // download links valid for 7 days

type Submission = Record<string, string | number | boolean | null>;

const escapeHtml = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatLength = (sec: unknown) => {
  const s = Number(sec) || 0;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const constantTimeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const expectedSecret = Deno.env.get("NOTIFY_WEBHOOK_SECRET") ?? "";
  const givenSecret = req.headers.get("x-webhook-secret") ?? "";
  if (!expectedSecret || !constantTimeEqual(givenSecret, expectedSecret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) return new Response("RESEND_API_KEY not set", { status: 500 });

  let record: Submission;
  try {
    ({ record } = await req.json());
    if (!record?.id) throw new Error("missing record");
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Signed links so staff can download the private files straight from the email
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const signedUrl = async (path: unknown) => {
    if (!path) return null;
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(String(path), LINK_EXPIRY_SECONDS, { download: true });
    if (error) console.error("signed url error", path, error.message);
    return data?.signedUrl ?? null;
  };
  const [videoUrl, lyricsUrl] = await Promise.all([
    signedUrl(record.video_path),
    signedUrl(record.lyrics_path),
  ]);

  const rows: [string, unknown][] = [
    ["Artist(s)", record.artist_name],
    ["Track title", record.track_title],
    ["Album", record.album_title],
    ["Video director", record.video_director],
    ["Length", formatLength(record.video_length_sec)],
    ["Format", record.format],
    ["Version", record.version],
    ["Record label/artist", record.record_label],
    ["Writers", record.writers],
    ["Publishers", record.publishers],
    ["Digital release", record.digital_release],
    ["Physical release", record.physical_release],
    ["Album release", record.album_release],
    ["Artist country", record.artist_country],
    ["Produced in", record.produced_country],
    ["Representative", record.rep_name],
    ["Position", record.rep_position],
    ["Rep label/artist", record.rep_label],
    ["Phone", record.rep_phone],
    ["Email", record.rep_email],
    ["Submitted", record.created_at],
    ["Submission ID", record.id],
  ];

  const tableRows = rows
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 12px;font-weight:600">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const button = (url: string | null, label: string) =>
    url
      ? `<a href="${escapeHtml(url)}" style="display:inline-block;margin:4px 8px 4px 0;padding:10px 18px;background:#dc2626;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">${label}</a>`
      : `<span style="color:#999">${label}: unavailable</span>`;

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto">
    <div style="background:#b91c1c;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0">
      <h2 style="margin:0">New music video submission</h2>
      <p style="margin:6px 0 0">${escapeHtml(record.artist_name)} – ${escapeHtml(record.track_title)}</p>
    </div>
    <div style="border:1px solid #eee;border-top:0;padding:16px 12px;border-radius:0 0 8px 8px">
      <table style="border-collapse:collapse;width:100%;font-size:14px">${tableRows}</table>
      <div style="padding:16px 12px 4px">
        ${button(videoUrl, "Download video")}
        ${button(lyricsUrl, "Download lyrics")}
        <p style="color:#888;font-size:12px">Download links expire in 7 days. Files are always available in
        Supabase → Storage → submissions.</p>
      </div>
    </div>
  </div>`;

  const to = (Deno.env.get("NOTIFY_TO") ?? "facetvuganda2@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = Deno.env.get("NOTIFY_FROM") ?? "Face TV Submissions <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: record.rep_email || undefined,
      subject: `New submission: ${record.artist_name} – ${record.track_title}`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error", res.status, body);
    return new Response(`Email failed: ${body}`, { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
