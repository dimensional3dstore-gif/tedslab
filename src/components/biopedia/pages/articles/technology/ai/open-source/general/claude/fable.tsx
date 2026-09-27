import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeFableArticle() {
  return (
    <LegacyArticlePage
      title="Claude Fable: Release Verification"
      subject="AI model study"
      summary="The Fable label is not a standard, verifiable Claude model tier in the provider's established product naming. Treat references to it as unconfirmed until an official release is documented."
      sections={[
        {
          heading: "Avoiding model-name confusion",
          body: "Before selecting a model, confirm its identifier in the provider's API documentation and console. Do not infer availability, performance, or safety behavior from unofficial labels or speculative release lists.",
        },
      ]}
    />
  );
}
