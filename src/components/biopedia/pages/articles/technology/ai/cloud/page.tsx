import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function CloudAiPage() {
  return (
    <LegacyArticlePage
      title="Cloud AI"
      subject="Artificial intelligence"
      summary="Cloud AI delivers model inference and training through remotely operated infrastructure, exposing capabilities through hosted interfaces or APIs."
      sections={[
        {
          heading: "Operational responsibilities",
          body: "Cloud services reduce local hardware needs but introduce network dependencies, usage costs, data-governance questions, and vendor-specific limits. Evaluate retention controls, regions, availability, and exit options.",
        },
      ]}
    />
  );
}
