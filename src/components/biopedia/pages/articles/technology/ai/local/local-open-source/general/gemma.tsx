import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GemmaArticle() {
  return (
    <LegacyArticlePage
      title="Gemma Models"
      subject="Open models"
      summary="Gemma is Google's family of openly available model weights and tooling, distributed under model-specific terms."
      sections={[
        {
          heading: "Check the license and format",
          body: "Open availability does not mean every use is unrestricted. Confirm the exact model's license, intended hardware, safety guidance, and supported inference formats before deployment.",
        },
      ]}
    />
  );
}
