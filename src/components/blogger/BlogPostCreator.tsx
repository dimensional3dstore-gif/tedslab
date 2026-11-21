import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSaveBlogPost, type BlogPost } from "@/lib/blogger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock3, Eye, PenLine, Save, Send } from "lucide-react";

export function BlogPostCreator({ existing }: { existing?: BlogPost }) {
  const navigate = useNavigate();
  const save = useSaveBlogPost();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [cover, setCover] = useState(existing?.cover_image_url ?? "");
  const [tags, setTags] = useState(existing?.tags.join(", ") ?? "");
  const [error, setError] = useState("");
  const [savedStatus, setSavedStatus] = useState(existing?.status ?? "draft");

  const preview = useMemo(
    () => ({
      title: title.trim() || "Untitled post",
      excerpt: excerpt.trim(),
      body: body.trim() || "Start writing your post to see the reader preview.",
      cover: cover.trim(),
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    }),
    [title, excerpt, body, cover, tags],
  );

  const submit = async (status: "draft" | "published") => {
    setError("");
    setSavedStatus(status);
    if (!title.trim()) {
      setError("Add a title before saving.");
      return;
    }
    if (status === "published" && !body.trim()) {
      setError("Add some content before publishing.");
      return;
    }

    try {
      const post = await save.mutateAsync({
        id: existing?.id,
        title,
        excerpt,
        body,
        cover_image_url: cover,
        tags: preview.tags,
        status,
      });
      await navigate({ to: "/blogger/$slug", params: { slug: post.slug } });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save the post.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bio-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Ted's Lab Blogger Studio</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            {existing ? "Edit and publish post" : "Write and publish a post"}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Write in the editor, check the reader preview, save a draft, or publish when the post is ready.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background/70 px-3 py-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Status:</span> {savedStatus === "published" ? "Published" : "Draft"}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,26rem)_1fr]">
        <section className="bio-panel p-5">
          <div className="mb-5 flex items-center gap-2">
            <PenLine className="size-4 text-primary" />
            <h3 className="font-display text-lg font-semibold">Writing</h3>
          </div>

          <div className="space-y-4">
            <label className="block space-y-1 text-xs text-muted-foreground">
              Title
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give your post a clear title" />
            </label>

            <label className="block space-y-1 text-xs text-muted-foreground">
              Excerpt
              <Textarea value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="A short introduction for cards and search results…" />
            </label>

            <label className="block space-y-1 text-xs text-muted-foreground">
              Post content
              <Textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Write your post here…"
                className="min-h-[420px] resize-y text-sm leading-7"
              />
            </label>

            <label className="block space-y-1 text-xs text-muted-foreground">
              Cover image URL
              <Input value={cover} onChange={(event) => setCover(event.target.value)} placeholder="https://example.com/cover.jpg" />
            </label>

            <label className="block space-y-1 text-xs text-muted-foreground">
              Tags
              <Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="science, study, ideas" />
            </label>

            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-wrap gap-2 border-t border-border pt-4">
              <Button disabled={save.isPending || !title.trim()} onClick={() => void submit("draft")} variant="outline"><Save className="mr-2 size-4" />
                {save.isPending ? "Saving…" : "Save draft"}
              </Button>
              <Button disabled={save.isPending || !title.trim() || !body.trim()} onClick={() => void submit("published")}><Send className="mr-2 size-4" />
                {save.isPending ? "Publishing…" : "Publish post"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => void navigate({ to: "/blogger" })}>
                Cancel
              </Button>
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-border bg-background p-5">
          <div className="mb-4 flex items-center gap-2">
            <Eye className="size-4 text-primary" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Live preview</p>
              <p className="text-xs text-muted-foreground">This is how the published post will read.</p>
            </div>
          </div>

          <article className="mx-auto w-full max-w-3xl">
            {preview.cover && (
              <img src={preview.cover} alt="" className="mb-6 max-h-[420px] w-full rounded-xl object-cover" />
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" />
              <span>Preview</span>
              {preview.tags.map((tag) => <span key={tag} className="rounded-full bg-secondary px-2 py-1">#{tag}</span>)}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{preview.title}</h1>
            {preview.excerpt && <p className="mt-4 text-lg leading-8 text-muted-foreground">{preview.excerpt}</p>}
            <div className="mt-8 whitespace-pre-wrap text-[16px] leading-8 text-foreground/90">{preview.body}</div>
          </article>
        </section>
      </div>
    </div>
  );
}
