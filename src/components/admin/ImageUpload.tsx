import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export function ImageUpload({ value, onChange, pathPrefix = "images" }: { value: string; onChange: (url: string) => void; pathPrefix?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    if (!IMAGE_TYPES.has(file.type)) { setError("Use a JPG, PNG, WebP, or GIF image."); return; }
    if (file.size > MAX_IMAGE_BYTES) { setError("Images must be 10 MB or smaller."); return; }
    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = pathPrefix + "/" + crypto.randomUUID() + "." + extension;
      const { error: uploadError } = await supabase.storage.from("article-media").upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("article-media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally { setBusy(false); }
  }

  return <div className="space-y-2">
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" disabled={busy} onClick={() => document.getElementById("tedslab-image-upload-" + pathPrefix)?.click()}>
        {busy ? "Uploading image…" : value ? "Replace image" : "Upload image"}
      </Button>
      {value && <Button type="button" variant="ghost" onClick={() => onChange("")}>Remove</Button>}
    </div>
    <input id={"tedslab-image-upload-" + pathPrefix} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={event => { const file = event.target.files?.[0]; event.currentTarget.value = ""; if (file) void upload(file); }} />
    {value && <img src={value} alt="" className="max-h-48 w-full rounded-xl border border-border object-cover" />}
    {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP, or GIF · maximum 10 MB.</p>
  </div>;
}
