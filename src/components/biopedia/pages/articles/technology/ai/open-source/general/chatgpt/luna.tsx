import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ChatGptLunaArticle() {
  return (
    <LegacyArticlePage
      title="Luna: Verify the Model Identity"
      subject="AI model study"
      summary="Luna is not a generally documented OpenAI model identifier. No specific capabilities are attributed here without a verifiable provider source."
      sections={[
        {
          heading: "Keep model references traceable",
          body: "Record the provider, exact API identifier, release date, and documentation link for each production model. Recheck these details when changing vendors or upgrading a model.",
        },
      ]}
    />
  );
}
