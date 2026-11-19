import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export function MediaUpload({
  value,
  onChange,
  pathPrefix = "articles",
}: {
  value: string;
  onChange: (url: string) => void;
  pathPrefix?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    if (!VIDEO_TYPES.has(file.type)) {
      setError("Use an MP4, WebM, or MOV video.");
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      setError("Videos must be 100 MB or smaller.");
      return;
    }
    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const path = `${pathPrefix}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("article-media")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("article-media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={busy} onClick={() => document.getElementById("tedslab-video-upload")?.click()}>
          {busy ? "Uploading video…" : value ? "Replace video" : "Upload video"}
        </Button>
        {value && <Button type="button" variant="ghost" onClick={() => onChange("")}>Remove</Button>}
      </div>
      <input
        id="tedslab-video-upload"
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.currentTarget.value = "";
          if (file) void upload(file);
        }}
      />
      {value && <video src={value} controls className="max-h-48 w-full rounded-xl border border-border bg-black" />}
      {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
      <p className="text-[11px] text-muted-foreground">MP4, WebM, or MOV · maximum 100 MB.</p>
    </div>
  );
}
