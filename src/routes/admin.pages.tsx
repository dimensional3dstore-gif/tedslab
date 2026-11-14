import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ContentManager } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({ meta: [{ title: "Manage Pages — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Manage pages" description="Create, edit, publish and organize standalone site pages.">
      <ContentManager mode="pages" />
    </AdminPage>
  ),
});
