import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ChatGptSolArticle() {
  return (
    <LegacyArticlePage
      title="Sol: Verify the Model Identity"
      subject="AI model study"
      summary="Sol is not a generally documented OpenAI model identifier. This entry treats the name as unverified rather than assigning it unsupported capabilities."
      sections={[
        {
          heading: "Check the source",
          body: "Use OpenAI's current model catalog and API documentation to confirm any model name. Similar internal, project, or third-party labels should not be mistaken for a supported public model.",
        },
      ]}
    />
  );
}
