import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "video" | "quiz" | "flashcard";

const config = {
  video: { table: "videos", label: "video", title: "Add video" },
  quiz: { table: "quizzes", label: "quiz", title: "Add quiz" },
  flashcard: { table: "flashcards", label: "flashcard", title: "Add flashcard" },
} as const;

export function AdminResourceCreator({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [published, setPublished] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const slugify = (value: string) =>
    value.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "untitled";

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    const id = `${mode}-${crypto.randomUUID()}`;
    const common = {
      id,
      published,
      updated_at: new Date().toISOString(),
    };
    let payload: Record<string, unknown>;

    if (mode === "video") {
      if (!title.trim() || !url.trim()) {
        setError("A video title and URL are required.");
        setBusy(false);
        return;
      }
      payload = { ...common, slug: slugify(slug || title), title: title.trim(), description: description.trim() || null, url: url.trim(), poster_url: null, subject_slug: null, sort: 0 };
    } else if (mode === "quiz") {
      const parsedOptions = options.split("\n").map((item) => item.trim()).filter(Boolean);
      if (!title.trim() || !question.trim() || parsedOptions.length < 2 || !answer.trim()) {
        setError("Add a title, question, at least two options, and the correct answer.");
        setBusy(false);
        return;
      }
      payload = { ...common, slug: slugify(slug || title), title: title.trim(), question: question.trim(), options: parsedOptions, answer: answer.trim(), sort: 0 };
    } else {
      if (!front.trim() || !back.trim()) {
        setError("Add both sides of the flashcard.");
        setBusy(false);
        return;
      }
      payload = { ...common, front: front.trim(), back: back.trim(), sort: 0 };
    }

    try {
      const { error: saveError } = await supabase.from(config[mode].table).insert(payload);
      if (saveError) throw saveError;
      await navigate({ to: "/admin" });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save this item. Check your admin permissions and Supabase connection.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="bio-panel max-w-2xl space-y-5 p-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Admin Studio</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">{config[mode].title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Create a real Supabase-backed {config[mode].label} for Ted's Lab.</p>
      </div>

      {mode !== "flashcard" && (
        <>
          <label className="block space-y-1 text-xs text-muted-foreground">Title<Input value={title} onChange={(e) => { setTitle(e.target.value); if (!slug) setSlug(slugify(e.target.value)); }} required /></label>
          <label className="block space-y-1 text-xs text-muted-foreground">URL slug<Input value={slug} onChange={(e) => setSlug(e.target.value)} /></label>
        </>
      )}

      {mode === "video" && (
        <>
          <label className="block space-y-1 text-xs text-muted-foreground">Video URL<Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" required /></label>
          <label className="block space-y-1 text-xs text-muted-foreground">Description<textarea className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" value={description} onChange={(e) => setDescription(e.target.value)} /></label>
        </>
      )}

      {mode === "quiz" && (
        <>
          <label className="block space-y-1 text-xs text-muted-foreground">Question<textarea className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" value={question} onChange={(e) => setQuestion(e.target.value)} required /></label>
          <label className="block space-y-1 text-xs text-muted-foreground">Options (one per line)<textarea className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" value={options} onChange={(e) => setOptions(e.target.value)} required /></label>
          <label className="block space-y-1 text-xs text-muted-foreground">Correct answer<Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Exact option text" required /></label>
        </>
      )}

      {mode === "flashcard" && (
        <>
          <label className="block space-y-1 text-xs text-muted-foreground">Front<Input value={front} onChange={(e) => setFront(e.target.value)} required /></label>
          <label className="block space-y-1 text-xs text-muted-foreground">Back<textarea className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" value={back} onChange={(e) => setBack(e.target.value)} required /></label>
        </>
      )}

      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publish immediately</label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>{busy ? "Saving…" : published ? "Create & publish" : "Save draft"}</Button>
        <Button type="button" variant="outline" onClick={() => void navigate({ to: "/admin" })}>Cancel</Button>
      </div>
    </form>
  );
}
