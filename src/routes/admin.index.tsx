import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Admin overview" description="Monitor your content library and manage the Ted's Lab publishing workspace.">
      <AdminDashboard />
    </AdminPage>
  ),
});
