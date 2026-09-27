import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function HappyseedArticle() {
  return (
    <LegacyArticlePage
      title="Happyseed: Product Verification"
      subject="AI development tools"
      summary="The Happyseed label does not identify a widely documented coding platform with stable, independently verifiable capabilities. Treat this page as a research checkpoint."
      sections={[
        {
          heading: "Verify before recommending",
          body: "Confirm the publisher, product documentation, supported export formats, privacy terms, and current release. Avoid relying on similarly named products or promotional descriptions without a traceable source.",
        },
      ]}
    />
  );
}
