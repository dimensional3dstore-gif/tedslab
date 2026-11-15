import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminResourceCreator } from "@/components/admin/AdminResourceCreator";

export const Route = createFileRoute("/admin/quizzes/new")({
  head: () => ({ meta: [{ title: "Add Quiz — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Add quiz" description="Create a quiz question and publish it for learners.">
      <AdminResourceCreator mode="quiz" />
    </AdminPage>
  ),
});
