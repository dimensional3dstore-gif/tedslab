import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Ted's Lab" }] }),
  component: () => <AdminPage title="Admin workspace" description="Manage encyclopedia content, local AI, and deployment operations."><AdminDashboard /></AdminPage>,
});
