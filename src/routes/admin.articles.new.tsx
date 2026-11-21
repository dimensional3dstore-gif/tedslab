import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ArticleCreator } from "@/components/admin/ArticleCreator";

export const Route = createFileRoute("/admin/articles/new")({
  head: () => ({ meta: [{ title: "Write & Publish Article — Ted's Lab" }] }),
  component: () => (
    <AdminPage
      title="Write & publish article"
      description="Write a structured Ted's Lab article, preview the reader experience, save a draft, or publish it when ready."
    >
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <Link to="/admin/articles" className="text-primary hover:underline">Manage articles</Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Write & publish</span>
      </div>
      <ArticleCreator />
    </AdminPage>
  ),
});
