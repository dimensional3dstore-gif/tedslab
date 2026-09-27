import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ChatGptArticle() {
  return (
    <LegacyArticlePage
      title="ChatGPT and GPT Models"
      subject="AI systems"
      summary="ChatGPT is OpenAI's conversational assistant product, backed by models whose capabilities and availability vary by plan and release."
      sections={[
        {
          heading: "Product versus model",
          body: "The ChatGPT application includes product features beyond the underlying model API. For software integrations, use a supported API and verify data controls, model identifiers, and usage terms.",
        },
      ]}
    />
  );
}
