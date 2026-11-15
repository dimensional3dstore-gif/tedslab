import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { Pate } from "@/ai/page";
import { useStudentPermissions } from "@/hooks/use-student-permissions";

const title = "AI Tutor — Ted's Lab";
const description =
  "Get study guidance from the built-in AI tutor using the project knowledge files.";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AIPage,
});

function AIPage() {
  const permissions = useStudentPermissions();
  return (
    <AppShell>
      <PageHeader
        title="AI Tutor"
        description="Ask a question and I will respond using the built-in study and biology knowledge files."
      />
      <div className="mt-6">
        {permissions.loading ? <div className="bio-panel p-5 text-sm text-muted-foreground">Checking parental permissions…</div> : permissions.aiAssistanceAllowed ? <Pate /> : <div className="bio-panel p-5"><h2 className="font-semibold text-foreground">AI assistance is not enabled</h2><p className="mt-2 text-sm text-muted-foreground">A parent or guardian has not enabled AI assistance for this learner. Ask them to review the permission in the Parent Portal.</p></div>}
      </div>
    </AppShell>
  );
}
