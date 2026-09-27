import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ArticleCreator } from "@/components/admin/ArticleCreator";
import { useArticles } from "@/lib/content";

export const Route = createFileRoute("/admin/articles")({
  head: () => ({ meta: [{ title: "Manage Articles — Ted's Lab" }] }),
  component: AdminArticlesPage,
});

function AdminArticlesPage() {
  const { data: articles = [] } = useArticles();
  return <AdminPage title="Manage articles" description="Create and preview consistent encyclopedia articles.">
    <div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{articles.length} catalog articles available.</p><Link to="/admin/articles/new" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">New article</Link></div>
    <div className="grid gap-3 md:grid-cols-2">{articles.slice(0, 12).map((article) => <Link key={article.id} to="/articles/$slug" params={{ slug: article.slug }} className="bio-panel p-4 hover:border-primary/50"><h2 className="font-semibold text-foreground">{article.title}</h2><p className="mt-1 text-xs text-muted-foreground">{article.published ? "Published" : "Draft"}</p></Link>)}</div>
  </AdminPage>;
}
