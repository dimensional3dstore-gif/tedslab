import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ChatGptAstraArticle() {
  return (
    <LegacyArticlePage
      title="Astra: Verify the Model Identity"
      subject="AI model study"
      summary="Astra is not a generally documented OpenAI model identifier. Treat claims about its features as unverified until they can be tied to an official release."
      sections={[
        {
          heading: "Use supported identifiers",
          body: "Check the provider's model catalog and API references before adding a model name to application code. This prevents integrations from depending on a speculative or unrelated label.",
        },
      ]}
    />
  );
}
