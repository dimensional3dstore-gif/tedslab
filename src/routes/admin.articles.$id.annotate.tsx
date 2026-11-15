import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/articles/$id/annotate")({
  head: () => ({ meta: [{ title: "Annotate Article — Ted's Lab" }] }),
  component: ArticleAnnotationPage,
});

function ArticleAnnotationPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState("Article");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<"editorial" | "scientific" | "citation" | "fact_check">("scientific");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.from("articles").select("title").eq("id", id).maybeSingle();
      if (active && data?.title) setArticleTitle(data.title);
    })();
    return () => { active = false; };
  }, [id]);

  async function saveAnnotation(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("article_annotations").insert({
      article_id: id,
      title: title.trim(),
      note: note.trim(),
      kind,
      published,
    });
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Annotation saved.");
    setTitle("");
    setNote("");
  }

  return (
    <AdminPage title="Annotate article" description={`Add scientific, editorial, citation, or fact-check notes to “${articleTitle}”.`}>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <Link to="/admin/articles" className="text-primary hover:underline">Manage articles</Link>
        <span className="text-muted-foreground">/</span>
        <Link to="/admin/articles/$id" params={{ id }} className="text-primary hover:underline">Edit article</Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Annotate</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={saveAnnotation} className="bio-panel space-y-5 p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Article annotation</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{articleTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Record a precise note without changing the article's main text.</p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Annotation title</span>
            <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Clarify the mechanism described in Section 2" />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Annotation type</span>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}>
              <option value="scientific">Scientific</option>
              <option value="editorial">Editorial</option>
              <option value="citation">Citation</option>
              <option value="fact_check">Fact check</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Note</span>
            <Textarea required minLength={10} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write the annotation, evidence, correction, or editorial instruction…" className="min-h-44" />
          </label>

          <label className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3 text-sm">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Publish this annotation to readers
          </label>

          {message && <p className={message === "Annotation saved." ? "text-sm text-emerald-600" : "text-sm text-destructive"}>{message}</p>}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save annotation"}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin/articles/$id", params: { id } })}>Back to editor</Button>
          </div>
        </form>

        <aside className="bio-panel h-fit p-5">
          <h3 className="font-semibold">Publishing workflow</h3>
          <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li><strong className="text-foreground">1.</strong> Edit the article.</li>
            <li><strong className="text-foreground">2.</strong> Add evidence or editorial annotations.</li>
            <li><strong className="text-foreground">3.</strong> Review the annotation.</li>
            <li><strong className="text-foreground">4.</strong> Publish when ready.</li>
          </ol>
        </aside>
      </div>
    </AdminPage>
  );
}
