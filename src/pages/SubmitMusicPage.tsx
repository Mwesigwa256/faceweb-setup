import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { uploadFileResumable, safeFileName } from "@/lib/uploadFile";

// Supabase free plan limits each file to 50MB. Raise this if you upgrade
// (Pro plan allows much larger files; also raise the limit in
// Supabase Dashboard -> Project Settings -> Storage).
const MAX_VIDEO_MB = 50;
const MAX_LYRICS_MB = 10;
const LYRICS_EXTENSIONS = ["pdf", "doc", "docx"];

const optionalText = z.string().trim().max(300).optional().or(z.literal(""));
const optionalDate = z.string().optional().or(z.literal(""));
const requiredText = (msg: string) => z.string().trim().min(1, msg).max(300);

const fileField = (label: string) =>
  z
    .custom<FileList>((v) => typeof FileList !== "undefined" && v instanceof FileList, `${label} is required`)
    .refine((files) => files?.length === 1, `${label} is required`);

const schema = z.object({
  format: z.enum(["2k", "16:9"], { required_error: "Select a format" }),
  version: z.enum(["original", "clean", "dirty"], { required_error: "Select a version" }),
  video: fileField("Video file")
    .refine((f) => f?.[0]?.type.startsWith("video/"), "Must be a video file")
    .refine((f) => (f?.[0]?.size ?? 0) <= MAX_VIDEO_MB * 1024 * 1024, `Video must be ${MAX_VIDEO_MB}MB or smaller`),
  lyrics: fileField("Lyrics file")
    .refine(
      (f) => LYRICS_EXTENSIONS.includes(f?.[0]?.name.split(".").pop()?.toLowerCase() ?? ""),
      "Lyrics must be a PDF, DOC or DOCX file",
    )
    .refine((f) => (f?.[0]?.size ?? 0) <= MAX_LYRICS_MB * 1024 * 1024, `Lyrics must be ${MAX_LYRICS_MB}MB or smaller`),

  artistName: requiredText("Artist name is required"),
  trackTitle: requiredText("Track title is required"),
  albumTitle: optionalText,
  videoDirector: optionalText,
  lengthMin: z.coerce.number({ invalid_type_error: "Required" }).int().min(0).max(59),
  lengthSec: z.coerce.number({ invalid_type_error: "Required" }).int().min(0).max(59),
  recordLabel: requiredText("Record label/artist is required"),
  writers: optionalText,
  publishers: optionalText,

  digitalRelease: optionalDate,
  physicalRelease: optionalDate,
  albumRelease: optionalDate,
  artistCountry: optionalText,
  producedCountry: requiredText("Country of production is required"),

  printName: requiredText("Name is required"),
  position: requiredText("Position is required"),
  repLabel: requiredText("Record label/artist is required"),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),

  agreedPayment: z.literal(true, { errorMap: () => ({ message: "You must accept this to submit" }) }),
  agreedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms to submit" }) }),
}).refine((d) => d.lengthMin * 60 + d.lengthSec > 0, {
  message: "Video length is required",
  path: ["lengthSec"],
});

type FormValues = z.infer<typeof schema>;

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-600 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" /> {message}
    </p>
  ) : null;

const SubmitMusicPage = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (!isSupabaseConfigured) {
      toast.error("Submissions are not available right now. Please email us instead.");
      return;
    }

    const submissionId = crypto.randomUUID();
    const video = data.video[0];
    const lyrics = data.lyrics[0];
    const totalBytes = video.size + lyrics.size;
    let lyricsDone = 0;

    try {
      setProgress(0);

      const lyricsPath = await uploadFileResumable(
        lyrics,
        `lyrics/${submissionId}/${safeFileName(lyrics.name)}`,
        (up) => {
          lyricsDone = up;
          setProgress(Math.round((up / totalBytes) * 100));
        },
      );

      const videoPath = await uploadFileResumable(
        video,
        `videos/${submissionId}/${safeFileName(video.name)}`,
        (up) => setProgress(Math.round(((lyricsDone + up) / totalBytes) * 100)),
      );

      const blankToNull = (v?: string) => (v && v.trim() ? v.trim() : null);

      const { error } = await supabase.from("music_submissions").insert({
        id: submissionId,
        format: data.format,
        version: data.version,
        video_path: videoPath,
        lyrics_path: lyricsPath,
        artist_name: data.artistName,
        track_title: data.trackTitle,
        album_title: blankToNull(data.albumTitle),
        video_director: blankToNull(data.videoDirector),
        video_length_sec: data.lengthMin * 60 + data.lengthSec,
        record_label: data.recordLabel,
        writers: blankToNull(data.writers),
        publishers: blankToNull(data.publishers),
        digital_release: blankToNull(data.digitalRelease),
        physical_release: blankToNull(data.physicalRelease),
        album_release: blankToNull(data.albumRelease),
        artist_country: blankToNull(data.artistCountry),
        produced_country: data.producedCountry,
        rep_name: data.printName.toUpperCase(),
        rep_position: data.position,
        rep_label: data.repLabel,
        rep_phone: data.phone,
        rep_email: data.email,
        agreed_payment: data.agreedPayment,
        agreed_terms: data.agreedTerms,
      });

      if (error) throw error;

      setProgress(100);
      setSubmitted(true);
      reset();
      toast.success("Video submitted successfully! We will review it shortly.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission failed. Please check your connection and try again.");
    } finally {
      setProgress(null);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <h1 className="text-2xl font-bold">Submission received</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you! Your video and form have been received. Face TV Management will contact you
              about payment details and the next steps of your submission.
            </p>
            <Button onClick={() => setSubmitted(false)} className="bg-red-600 hover:bg-red-700 text-white">
              Submit another video
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Face TV Video Submission Form and Payments</h1>
            <p className="text-red-100">
              Face Tv uploads are for artists only.
            </p>
            <p className="text-red-100">
              Please fill in all details below and submit the completed form with the video and lyrics.
            </p>
          </div>

          <div className="p-8">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8 text-sm text-red-800 dark:text-red-200">
              <p className="font-semibold mb-1">NOTE:</p>
              <p>NO VIDEOS WILL BE CONSIDERED FOR ACQUISITION OR PLAYLIST MEETINGS WITHOUT A FULLY COMPLETED SUBMISSION FORM AND PAYMENTS.
                IF ACCEPTED, THIS MUSIC VIDEO'S ON-SCREEN CLIP TITLE WILL APPEAR AS ENTERED ON THIS FORM INCLUDING CAPITALISATION, ABBREVIATIONS AND PUNCTUATION.

                PLEASE ENSURE YOUR INFORMATION IS ENTERED ACCURATELY!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
              <fieldset disabled={isSubmitting} className="space-y-8">
              {/* Media Formats & Files */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Media Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="format">Format delivered to Face TV *</Label>
                    <Controller
                      name="format"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                          <SelectTrigger id="format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2k">2k (high definition)</SelectItem>
                            <SelectItem value="16:9">16:9 HD</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError message={errors.format?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="version">Version *</Label>
                    <Controller
                      name="version"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                          <SelectTrigger id="version">
                            <SelectValue placeholder="Select version" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="original">Original Full Version</SelectItem>
                            <SelectItem value="clean">Clean</SelectItem>
                            <SelectItem value="dirty">Dirty</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError message={errors.version?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Upload Video File * (max {MAX_VIDEO_MB}MB)
                    </Label>
                    <Input id="video-upload" type="file" accept="video/*" className="cursor-pointer" {...register("video")} />
                    <FieldError message={errors.video?.message as string | undefined} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lyrics-upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Upload Lyrics (PDF/DOC) *
                    </Label>
                    <Input id="lyrics-upload" type="file" accept=".pdf,.doc,.docx" className="cursor-pointer" {...register("lyrics")} />
                    <FieldError message={errors.lyrics?.message as string | undefined} />
                  </div>
                </div>
              </div>

              {/* Track Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Track Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="artistName">Name of Artist(s) *</Label>
                    <Input id="artistName" placeholder="e.g. John Doe ft. Jane" {...register("artistName")} />
                    <FieldError message={errors.artistName?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trackTitle">Track Title *</Label>
                    <Input id="trackTitle" placeholder="Track Name" {...register("trackTitle")} />
                    <FieldError message={errors.trackTitle?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="albumTitle">Album Title</Label>
                    <Input id="albumTitle" placeholder="Album Name (if applicable)" {...register("albumTitle")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoDirector">Video Director(s)</Label>
                    <Input id="videoDirector" placeholder="Director Name" {...register("videoDirector")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lengthMin">Video Length *</Label>
                    <div className="flex gap-4">
                      <div className="flex-1 flex items-center gap-2">
                        <Input id="lengthMin" type="number" min="0" max="59" placeholder="00" className="w-full" {...register("lengthMin")} />
                        <span className="text-sm text-gray-500">Min</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <Input id="lengthSec" type="number" min="0" max="59" placeholder="00" className="w-full" {...register("lengthSec")} />
                        <span className="text-sm text-gray-500">Sec</span>
                      </div>
                    </div>
                    <FieldError message={errors.lengthMin?.message || errors.lengthSec?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordLabel">Record Label/Artist *</Label>
                    <Input id="recordLabel" placeholder="Label Name" {...register("recordLabel")} />
                    <p className="text-xs text-gray-500">Licensed by UPRS</p>
                    <FieldError message={errors.recordLabel?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="writers">Writer(s) (Full Names)</Label>
                    <Input id="writers" placeholder="Writers" {...register("writers")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishers">Publisher(s)</Label>
                    <Input id="publishers" placeholder="Publishers" {...register("publishers")} />
                  </div>
                </div>
              </div>

              {/* Release & Origin */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Release & Origin</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="digitalRelease">Digital Release Date</Label>
                    <Input id="digitalRelease" type="date" {...register("digitalRelease")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="physicalRelease">Physical Release Date</Label>
                    <Input id="physicalRelease" type="date" {...register("physicalRelease")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="albumRelease">Album Release Date</Label>
                    <Input id="albumRelease" type="date" {...register("albumRelease")} />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="artistCountry">Country of Origin of Artist</Label>
                    <Input id="artistCountry" placeholder="Country" {...register("artistCountry")} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="producedCountry">Country in which Video Produced *</Label>
                    <Input id="producedCountry" placeholder="Country of production company" {...register("producedCountry")} />
                    <FieldError message={errors.producedCountry?.message} />
                  </div>
                </div>
              </div>

              {/* Authorised Representative */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Authorised Representative</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="printName">Print Name (BLOCK CAPITALS) *</Label>
                    <Input id="printName" placeholder="YOUR NAME" className="uppercase" {...register("printName")} />
                    <FieldError message={errors.printName?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input id="position" placeholder="e.g. Director, Artist Manager" {...register("position")} />
                    <FieldError message={errors.position?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repLabel">Record Label/Artist *</Label>
                    <Input id="repLabel" placeholder="Label/Artist" {...register("repLabel")} />
                    <FieldError message={errors.repLabel?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+256..." {...register("phone")} />
                    <FieldError message={errors.phone?.message} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border dark:border-gray-800 space-y-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4">
                  <p>
                    <strong>TERMS OF SUBMISSION:</strong> This Video is hereby given to Face TV and its affiliates for exhibition on Face TV and other channels owned, operated and/or licensed by UPRS, on All Media Platforms, In Perpetuity, WORLDWIDE unless you specify a limited territory.
                  </p>
                  <p>
                    Face TV will make minor edits to videos and add informational signs containing age rating where required in order to comply with any applicable laws or broadcast regulations by <strong>UCC (Uganda Communications Commission)</strong>.
                  </p>
                  <p>
                    This form is governed by the law of Uganda and the parties hereby submit to the exclusive jurisdiction of the Uganda Courts, UPRS and UCC at large.
                  </p>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t dark:border-gray-800">
                  <Controller
                    name="agreedPayment"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="agreedPayment"
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="agreedPayment"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      I understand that submitting this form does not complete the submission process.
                      I acknowledge that applicable fees may be required, and I agree to be contacted by
                      Face TV Management regarding payment details and further processing of my submission.
                    </label>
                    <FieldError message={errors.agreedPayment?.message} />
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t dark:border-gray-800">
                  <Controller
                    name="agreedTerms"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="agreedTerms"
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="agreedTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      I agree to the terms and conditions and confirm that I am the Copyright Owner of the Music Video Master ("Record Label/Artist") or their Authorised Representative.
                    </label>
                    <FieldError message={errors.agreedTerms?.message} />
                  </div>
                </div>

                {progress !== null && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-3" />
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                      Uploading… {progress}% — please keep this page open.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Video & Form"}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Or scan this completed form with attached lyrics and email <a href="mailto:mwesigwasophie12@gmail.com" className="text-red-600 hover:underline">mwesigwasophie12@gmail.com</a>
                </p>
              </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitMusicPage;
