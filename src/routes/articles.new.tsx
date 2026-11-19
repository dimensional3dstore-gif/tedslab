import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { ArticleSubmission } from "@/components/articles/ArticleSubmission";

export const Route = createFileRoute("/articles/new")({
  head: () => ({ meta: [{ title: "Submit Article — Ted's Lab" }] }),
  component: () => (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Submit an article" description="Propose a new Ted's Lab article. Submissions are reviewed before publication." />
        <div className="mx-auto w-full max-w-4xl"><ArticleSubmission /></div>
      </div>
    </AppShell>
  ),
});
