import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeCodeArticle() {
  return (
    <LegacyArticlePage
      title="Claude Code"
      subject="AI development tools"
      summary="Claude Code is Anthropic's agentic coding tool for understanding and changing codebases through terminal and editor workflows."
      sections={[
        {
          heading: "Safe repository workflows",
          body: "Keep tasks scoped, inspect diffs before accepting them, and use repository tests as evidence. Treat shell commands and external tool access as privileged operations that deserve explicit review.",
        },
      ]}
    />
  );
}
