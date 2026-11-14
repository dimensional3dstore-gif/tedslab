import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ArticleCreator } from "@/components/admin/ArticleCreator";

export const Route = createFileRoute("/admin/articles/new")({
  head: () => ({ meta: [{ title: "New Article — Ted's Lab" }] }),
  component: () => (
    <AdminPage
      title="New article"
      description="Draft a structured article and verify its reader-facing layout."
    >
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <Link to="/admin/articles" className="text-primary hover:underline">Manage articles</Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Create article</span>
      </div>
      <ArticleCreator />
    </AdminPage>
  ),
});
