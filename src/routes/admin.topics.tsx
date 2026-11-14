import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ContentManager } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/topics")({
  head: () => ({ meta: [{ title: "Manage Topics — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Manage topics" description="Create and curate topics within each section.">
      <ContentManager mode="topics" />
    </AdminPage>
  ),
});
