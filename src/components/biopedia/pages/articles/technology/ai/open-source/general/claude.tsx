import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeModelsArticle() {
  return (
    <LegacyArticlePage
      title="Claude Models"
      subject="AI systems"
      summary="Claude is a family of language models and assistant tools developed by Anthropic, offered through hosted products and APIs."
      sections={[
        {
          heading: "Capabilities and safeguards",
          body: "Different model tiers trade speed, cost, and capability. Review current documentation for supported features, retention settings, and safety guidance, then test the selected version with real tasks.",
        },
      ]}
    />
  );
}
