import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function MicrosoftCopilotArticle() {
  return (
    <LegacyArticlePage
      title="Microsoft Copilot"
      subject="AI systems"
      summary="Microsoft Copilot is a collection of assistant experiences integrated into consumer, productivity, and developer products."
      sections={[
        {
          heading: "Context shapes capability",
          body: "Features differ between Copilot products, subscriptions, and organizational configurations. Identify the exact product before assessing its connected data, privacy controls, or supported workflows.",
        },
      ]}
    />
  );
}
