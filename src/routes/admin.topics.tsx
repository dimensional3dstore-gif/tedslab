import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/topics")({
  head: () => ({ meta: [{ title: "Manage Topics — Ted's Lab" }] }),
  component: () => <AdminPage title="Manage topics" description="Curate the concepts that connect sections and articles."><div className="bio-panel p-5 text-sm text-muted-foreground">Topic management is ready for your database and publishing workflow.</div></AdminPage>,
});
