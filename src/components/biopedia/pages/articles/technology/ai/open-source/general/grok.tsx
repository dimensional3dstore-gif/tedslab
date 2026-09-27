import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GrokModelsArticle() {
  return (
    <LegacyArticlePage
      title="Grok Models"
      subject="AI systems"
      summary="Grok is a family of language models and assistant products developed by xAI, available through consumer and developer services."
      sections={[
        {
          heading: "Product and API versions",
          body: "Model identifiers and available features vary over time. Confirm current documentation for context limits, tool access, data handling, rate limits, and licensing before integrating a specific release.",
        },
      ]}
    />
  );
}
