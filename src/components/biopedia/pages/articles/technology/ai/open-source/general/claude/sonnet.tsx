import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeSonnetArticle() {
  return (
    <LegacyArticlePage
      title="Claude Sonnet"
      subject="AI model study"
      summary="Claude Sonnet is Anthropic's general-purpose model tier, positioned to balance reasoning quality, speed, and operating cost."
      sections={[
        {
          heading: "Task-based evaluation",
          body: "Test the exact model version on the work it will perform, including long-context retrieval, structured output, and tool use. Treat vendor benchmarks as a starting point rather than a substitute for local evaluation.",
        },
      ]}
    />
  );
}
