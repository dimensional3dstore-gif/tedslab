import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function LocalAiPage() {
  return (
    <LegacyArticlePage
      title="Local Artificial Intelligence"
      subject="Computing"
      summary="Local AI runs some or all inference on hardware under the user's control instead of sending every request to a hosted model service."
      sections={[
        {
          heading: "Benefits and trade-offs",
          body: "Local execution can improve offline access and data control, but it still depends on secure software, licensed models, sufficient hardware, and realistic performance expectations.",
        },
      ]}
    />
  );
}
