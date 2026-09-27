import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function LovableArticle() {
  return (
    <LegacyArticlePage
      title="Lovable"
      subject="AI development tools"
      summary="Lovable is an AI-assisted application development platform that turns natural-language requests into editable web projects."
      sections={[
        {
          heading: "From prompt to maintainable code",
          body: "A generated interface still needs code review, accessibility checks, secure data boundaries, and deployment testing. Keep project history and verify integrations before publishing changes.",
        },
      ]}
    />
  );
}
