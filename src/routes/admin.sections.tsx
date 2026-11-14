import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ContentManager } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/sections")({
  head: () => ({ meta: [{ title: "Manage Sections — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Manage sections" description="Create and organize subject sections and learning pathways.">
      <ContentManager mode="sections" />
    </AdminPage>
  ),
});
