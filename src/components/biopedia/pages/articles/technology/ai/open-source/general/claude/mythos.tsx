import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ClaudeMythosArticle() {
  return (
    <LegacyArticlePage
      title="Claude Mythos: Release Verification"
      subject="AI model study"
      summary="The Mythos label should be treated as unverified unless Anthropic publishes an official model release and identifier."
      sections={[
        {
          heading: "Verify before adoption",
          body: "Model names may circulate ahead of confirmed documentation. Check the vendor's current model catalog, supported API identifier, release notes, and terms before building against a claimed tier.",
        },
      ]}
    />
  );
}
