import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function PhiFourArticle() {
  return (
    <LegacyArticlePage
      title="Phi-4 Models"
      subject="Open models"
      summary="Phi-4 is a Microsoft model series focused on compact language-model performance, with releases and availability defined by their model cards."
      sections={[
        {
          heading: "Small-model evaluation",
          body: "Compare the precise checkpoint on target tasks and hardware. Review model-card limitations, licensing, and safety notes; compact size does not guarantee accuracy or suitability for high-stakes use.",
        },
      ]}
    />
  );
}
