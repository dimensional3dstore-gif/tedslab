import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ChatGptCodexArticle() {
  return (
    <LegacyArticlePage
      title="Codex Coding Agents"
      subject="AI development tools"
      summary="Codex refers to OpenAI coding models and agent experiences that can interpret tasks, edit repositories, and run development workflows."
      sections={[
        {
          heading: "Repository-aware work",
          body: "Define a bounded change, review the resulting diff, and run tests in an isolated environment. Agent output should be checked for unintended file changes, unsafe commands, and missing verification.",
        },
      ]}
    />
  );
}
