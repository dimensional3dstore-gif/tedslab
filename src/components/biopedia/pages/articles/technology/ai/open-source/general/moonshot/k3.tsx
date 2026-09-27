import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function MoonshotK3Article() {
  return (
    <LegacyArticlePage
      title="Kimi K3"
      subject="AI model study"
      summary="This profile is a comparison entry for the Kimi K3 label. Verify the exact model release and provider before relying on a name that may refer to a preview or future product."
      sections={[
        {
          heading: "A release-aware comparison",
          body: "Record the model identifier, release date, interface, and evaluation source. Compare reproducible task performance, context handling, safety behavior, and cost rather than inferring capability from a version label.",
        },
      ]}
    />
  );
}
