import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/pages-list")({
  head: () => ({ meta: [{ title: "All Pages — Ted's Lab" }] }),
  component: () => <AdminPage title="All pages" description="A complete editorial index of site pages."><div className="bio-panel p-5 text-sm text-muted-foreground">The page index will populate from your persistence layer.</div></AdminPage>,
});
