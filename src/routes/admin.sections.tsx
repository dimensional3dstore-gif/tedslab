import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/sections")({
  head: () => ({ meta: [{ title: "Manage Sections — Ted's Lab" }] }),
  component: () => <AdminPage title="Manage sections" description="Organize subjects into clear learning pathways."><div className="bio-panel p-5 text-sm text-muted-foreground">Section management is ready for your database and publishing workflow.</div></AdminPage>,
});
