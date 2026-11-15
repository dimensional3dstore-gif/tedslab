import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminResourceCreator } from "@/components/admin/AdminResourceCreator";

export const Route = createFileRoute("/admin/flashcards/new")({
  head: () => ({ meta: [{ title: "Add Flashcard — Ted's Lab" }] }),
  component: () => (
    <AdminPage title="Add flashcard" description="Create a flashcard and publish it for learners.">
      <AdminResourceCreator mode="flashcard" />
    </AdminPage>
  ),
});
