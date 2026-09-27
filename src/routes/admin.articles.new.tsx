import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ArticleCreator } from "@/components/admin/ArticleCreator";

export const Route = createFileRoute("/admin/articles/new")({
  head: () => ({ meta: [{ title: "New Article — Ted's Lab" }] }),
  component: () => <AdminPage title="New article" description="Draft a structured article and verify its reader-facing layout."><ArticleCreator /></AdminPage>,
});
