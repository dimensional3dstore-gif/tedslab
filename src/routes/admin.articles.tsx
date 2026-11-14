import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { useArticles } from "@/lib/content";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/articles")({
  head: () => ({ meta: [{ title: "Manage Articles — Ted's Lab" }] }),
  component: AdminArticlesPage,
});

function AdminArticlesPage() {
  const { data: articles = [], isLoading, error } = useArticles();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const visibleArticles = useMemo(() => articles.filter((article) => {
    const matchesSearch = `${article.title} ${article.slug} ${article.excerpt ?? ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "all" || (filter === "published" ? article.published : !article.published);
    return matchesSearch && matchesStatus;
  }).sort((a, b) => (b.published ? 1 : 0) - (a.published ? 1 : 0) || a.title.localeCompare(b.title)), [articles, search, filter]);

  return (
    <AdminPage title="Manage articles" description="Edit, preview, draft, publish and maintain every scientific article.">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm text-muted-foreground">{articles.length} articles · {articles.filter((item) => item.published).length} published · {articles.filter((item) => !item.published).length} drafts</p></div>
        <Link to="/admin/articles/new" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">New article</Link>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles, slugs and summaries…" />
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} aria-label="Filter articles">
          <option value="all">All articles</option><option value="published">Published</option><option value="draft">Drafts</option>
        </select>
      </div>
      {error && <p role="alert" className="text-sm text-destructive">Unable to load articles. Check your connection and admin permissions.</p>}
      {isLoading ? <p className="text-sm text-muted-foreground">Loading articles…</p> : (
        <div className="grid gap-3">
          {visibleArticles.map((article) => (
            <article key={article.id} className="bio-panel flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold text-foreground">{article.title}</h2><span className={article.published ? "rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-600" : "rounded-full bg-amber-500/10 px-2 py-1 text-[11px] text-amber-600"}>{article.published ? "Published" : "Draft"}</span></div>
                <p className="mt-1 truncate text-xs text-muted-foreground">/{article.slug}{article.excerpt ? ` · ${article.excerpt}` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                {article.published && <Link to="/articles/$slug" params={{ slug: article.slug }} className="rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-secondary">View</Link>}
                <Link to="/admin/articles/$id" params={{ id: article.id }} className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Edit</Link>
              </div>
            </article>
          ))}
          {!visibleArticles.length && <p className="bio-panel p-5 text-sm text-muted-foreground">No articles match this search.</p>}
        </div>
      )}
    </AdminPage>
  );
}
