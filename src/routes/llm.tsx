import { createFileRoute } from "@tanstack/react-router";
import { ChroniumAIPage } from "@/llm/components/import-local/page";
import { useStudentPermissions } from "@/hooks/use-student-permissions";

export const Route = createFileRoute("/llm")({
  head: () => ({
    meta: [{ title: "Local AI — Ted's Lab" }],
  }),
  component: LLMPage,
});

function LLMPage() {
  const permissions = useStudentPermissions();
  if (permissions.loading) return <div className="bio-panel m-6 p-5 text-sm text-muted-foreground">Checking parental permissions…</div>;
  if (!permissions.aiAssistanceAllowed) return <div className="bio-panel m-6 p-5"><h2 className="font-semibold text-foreground">AI assistance is not enabled</h2><p className="mt-2 text-sm text-muted-foreground">A parent or guardian has not enabled AI assistance for this learner. Ask them to review the permission in the Parent Portal.</p></div>;
  return <ChroniumAIPage />;
}
