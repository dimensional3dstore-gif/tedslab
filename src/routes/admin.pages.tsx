import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({ meta: [{ title: "Manage Pages — Ted's Lab" }] }),
  component: () => <AdminPage title="Manage pages" description="Review and publish the evergreen pages that support the encyclopedia."><div className="bio-panel p-5 text-sm text-muted-foreground">Page editing is ready for the content and persistence layer you will connect here.</div></AdminPage>,
});
