import * as tus from "tus-js-client";
import { SUPABASE_ANON_KEY, SUPABASE_URL, SUBMISSIONS_BUCKET } from "@/lib/supabase";

/**
 * Uploads a file to Supabase Storage using the resumable (TUS) protocol.
 * Resumable uploads survive flaky connections and report progress,
 * which matters for large music video files.
 */
export function uploadFileResumable(
  file: File,
  objectPath: string,
  onProgress?: (bytesUploaded: number, bytesTotal: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `${SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY ?? "",
        "x-upsert": "false",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: SUBMISSIONS_BUCKET,
        objectName: objectPath,
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024, // Supabase requires exactly 6MB chunks
      onError: (error) => reject(error),
      onProgress: (uploaded, total) => onProgress?.(uploaded, total),
      onSuccess: () => resolve(objectPath),
    });

    // Resume a previous interrupted upload of the same file if one exists
    upload.findPreviousUploads().then((previous) => {
      if (previous.length) upload.resumeFromPreviousUpload(previous[0]);
      upload.start();
    });
  });
}

/** Makes a filename safe for a storage object key. */
export function safeFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";
  const ext = dot > 0 ? name.slice(dot + 1).replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : "";
  return ext ? `${base}.${ext}` : base;
}
