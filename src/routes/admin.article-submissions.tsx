import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { upsertCustomArticle } from "@/lib/article-store";
import type { ArticleRow } from "@/lib/content";

type Submission = {
  id: string; title: string; slug: string; excerpt: string; body: string;
  subject_slug: string; sector_slug: string; topic_slug: string; status: string;
  submitted_by: string; created_at: string; source_references?: string[];
};

export const Route = createFileRoute("/admin/article-submissions")({
  head: () => ({ meta: [{ title: "Article Submissions — Ted's Lab" }] }),
  component: ArticleSubmissionsPage,
});

function ArticleSubmissionsPage() {
  const { isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    const { data, error: queryError } = await supabase.from("article_submissions").select("*").order("created_at", { ascending: false });
    if (queryError) setError(queryError.message);
    else setRows((data ?? []) as Submission[]);
  }

  useEffect(() => { if (isAdmin) void load(); }, [isAdmin]);

  async function publish(row: Submission) {
    setBusy(row.id); setError("");
    try {
      const layout = {
        version: 1,
        tags: ["Community submission", row.sector_slug],
        facts: [
          { label: "Sector", value: row.sector_slug },
          { label: "Topic", value: row.topic_slug },
          { label: "Origin", value: "Community submission" },
        ],
        overview: [row.excerpt],
        sections: [{ heading: "Article", paragraphs: row.body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean) }],
        references: row.source_references ?? [],
      };
      const article: ArticleRow = {
        id: "submission-" + row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        body: JSON.stringify(layout),
        minutes: Math.max(2, Math.ceil(row.body.split(/\s+/).length / 220)),
        tone: "community",
        subject_slug: row.subject_slug,
        section_slug: null,
        topic_slug: row.topic_slug,
        sector_slug: row.sector_slug,
        image_key: "sci-earth",
        image_url: null,
        video_url: null,
        published: true,
        expert_reviewed: true,
        status: "published",
        sort: 1000,
      };
      await upsertCustomArticle(article);
      const { error: updateError } = await supabase.from("article_submissions").update({ status: "approved", reviewed_at: new Date().toISOString() }).eq("id", row.id);
      if (updateError) throw updateError;
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to publish submission.");
    } finally { setBusy(null); }
  }

  if (loading) return <AdminPage title="Article submissions" description="Review community article proposals.">Checking administrator access…</AdminPage>;
  if (!isAdmin) return <AdminPage title="Admin only" description="Only Ted's Lab administrators can review article submissions." />;
  return <AdminPage title="Article submissions" description="Review community proposals, then publish approved articles into the main encyclopedia.">
    {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
    <div className="grid gap-3">
      {rows.map(row => <article key={row.id} className="bio-panel p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-muted px-2 py-1 text-[11px]">{row.status}</span><span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] text-primary">{row.sector_slug}</span></div><h2 className="mt-2 text-lg font-semibold">{row.title}</h2><p className="mt-1 text-sm text-muted-foreground">{row.excerpt}</p><p className="mt-2 text-xs text-muted-foreground">Topic: {row.topic_slug} · Submitted {new Date(row.created_at).toLocaleString()}</p></div>
          <div className="flex gap-2">{row.status !== "approved" && <button disabled={busy===row.id} onClick={() => void publish(row)} className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50">{busy===row.id ? "Publishing…" : "Publish article"}</button>}</div>
        </div>
      </article>)}
      {!rows.length && <div className="bio-panel p-6 text-sm text-muted-foreground">No article submissions yet.</div>}
    </div>
  </AdminPage>;
}
