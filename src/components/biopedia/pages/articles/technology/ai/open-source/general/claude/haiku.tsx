import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeHaikuArticle() {
  return (
    <LegacyArticlePage
      title="Claude Haiku"
      subject="AI model study"
      summary="Claude Haiku is Anthropic's fast, lower-latency model tier, intended for responsive assistance and tasks where throughput matters."
      sections={[
        {
          heading: "Choosing a model tier",
          body: "Measure quality on representative prompts alongside latency, token use, and reliability. Model availability and naming vary by release; consult current Anthropic documentation for exact identifiers and limits.",
        },
      ]}
    />
  );
}
