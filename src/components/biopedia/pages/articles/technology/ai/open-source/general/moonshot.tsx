import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function MoonshotAIArticle() {
  return (
    <LegacyArticlePage
      title="Moonshot AI and the Kimi Models"
      subject="AI systems"
      summary="Moonshot AI is a developer of language models and assistant products under the Kimi name, with releases and access methods that evolve over time."
      sections={[
        {
          heading: "Products and deployment",
          body: "Distinguish hosted assistants, model APIs, and downloadable weights. Check current documentation for regional availability, terms, data handling, and model-specific capabilities before integrating a service.",
        },
      ]}
    />
  );
}
