import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ContentManager } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/subjects")({
  head: () => ({ meta: [{ title: "Manage Subjects — Ted's Lab" }] }),
  component: () => (
    <AdminPage
      title="Manage subjects"
      description="Create and curate top-level subjects, their descriptions, icons and banner images."
    >
      <ContentManager mode="subjects" />
    </AdminPage>
  ),
});
