import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { ChangeArticleSubmission } from "@/components/change/ChangeArticleSubmission";

export const Route = createFileRoute("/change-encyclopaedia/new")({
  head: () => ({
    meta: [{ title: "Add Change Article — Ted's Lab" }],
  }),
  component: () => (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Change Encyclopaedia"
          title="Add an article"
          description="Propose a scientific reference article about planetary change. Community submissions are reviewed before publication."
        />
        <div className="mx-auto w-full max-w-4xl">
          <ChangeArticleSubmission />
        </div>
      </div>
    </AppShell>
  ),
});
