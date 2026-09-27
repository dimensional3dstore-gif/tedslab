import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GptMiniArticle() {
  return (
    <LegacyArticlePage
      title="Compact GPT Models"
      subject="AI model study"
      summary="Small and mini model variants aim to reduce latency and cost while retaining useful general-purpose language capabilities."
      sections={[
        {
          heading: "Measure the trade-offs",
          body: "Compare quality on representative tasks, not only broad benchmark scores. Smaller models can be effective for classification, extraction, and short-form assistance when paired with validation and clear failure handling.",
        },
      ]}
    />
  );
}
