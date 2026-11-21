import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { SlidesManager } from "@/components/admin/SlidesManager";

export const Route = createFileRoute("/admin/slides")({
  head: () => ({ meta: [{ title: "Manage Slides — Ted's Lab" }] }),
  component: () => (
    <AdminPage
      title="Slides"
      description="Create, edit, reorder, enable, disable, and publish Ted's Lab homepage slides."
    >
      <SlidesManager />
    </AdminPage>
  ),
});
