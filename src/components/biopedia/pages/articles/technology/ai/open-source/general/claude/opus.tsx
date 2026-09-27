import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeOpusArticle() {
  return (
    <LegacyArticlePage
      title="Claude Opus"
      subject="AI model study"
      summary="Claude Opus is Anthropic's high-capability model tier, designed for demanding reasoning and knowledge work."
      sections={[
        {
          heading: "When deeper reasoning is useful",
          body: "Evaluate complex analysis, coding, and long-document tasks against their error costs. Stronger model tiers may increase latency and expense, so route only suitable tasks to them and validate outputs.",
        },
      ]}
    />
  );
}
