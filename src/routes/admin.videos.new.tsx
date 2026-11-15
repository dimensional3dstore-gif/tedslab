import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminResourceCreator } from "@/components/admin/AdminResourceCreator";

export const Route = createFileRoute("/admin/videos/new")({
  head: () => ({ meta: [{ title: "Add Video — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Add video" description="Create a video resource and publish it to the Ted's Lab library.">
      <AdminResourceCreator mode="video" />
    </AdminPage>
  ),
});
