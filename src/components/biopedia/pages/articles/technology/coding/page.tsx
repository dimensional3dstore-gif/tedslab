import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function CodingPage() {
  return (
    <LegacyArticlePage
      title="Coding and Software Development"
      subject="Technology"
      summary="Software development transforms requirements into tested, maintainable instructions through design, implementation, collaboration, and iteration."
      sections={[
        {
          heading: "A reliable development loop",
          body: "Understand the behavior, make a focused change, run the narrowest useful tests, and review the resulting diff. Version control, clear interfaces, and automated checks make changes easier to reason about.",
        },
      ]}
    />
  );
}
