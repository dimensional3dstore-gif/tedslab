import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ContentManager } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/pages-list")({
  head: () => ({ meta: [{ title: "All Pages — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="All pages" description="Create, edit and manage every published page and draft.">
      <ContentManager mode="pages" />
    </AdminPage>
  ),
});
