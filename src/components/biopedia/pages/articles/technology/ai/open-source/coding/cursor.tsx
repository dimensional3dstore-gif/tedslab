import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function CursorArticle() {
  return (
    <LegacyArticlePage
      title="Cursor"
      subject="AI development tools"
      summary="Cursor is an AI-enabled code editor built around repository-aware chat, inline editing, and agentic programming workflows."
      sections={[
        {
          heading: "Keep the developer in control",
          body: "Review proposed diffs, run focused tests, and protect secrets and generated files. Repository context can improve assistance, but it does not replace understanding the application architecture.",
        },
      ]}
    />
  );
}
