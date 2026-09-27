import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function Base44Article() {
  return (
    <LegacyArticlePage
      title="Base44 and AI App Building"
      subject="AI development tools"
      summary="Base44 is presented as an AI-assisted application-building service. Product capabilities, deployment options, and ownership terms should be checked against its current documentation."
      sections={[
        {
          heading: "Evaluate the whole workflow",
          body: "Prototype a small application, inspect the generated source, and test data access, authentication, and deployment controls before committing to a platform.",
        },
      ]}
    />
  );
}
