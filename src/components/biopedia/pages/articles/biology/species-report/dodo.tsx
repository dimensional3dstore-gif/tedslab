import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function DodoArticle() {
  return (
    <LegacyArticlePage
      title="The Dodo"
      subject="Species report"
      summary="The dodo (Raphus cucullatus) was a large, flightless pigeon endemic to Mauritius; it disappeared within decades of sustained human contact in the seventeenth century."
      sections={[
        {
          heading: "Island ecology",
          body: "The dodo evolved in an island environment without the same mammalian predators found on continents. Introduced animals, habitat change, and hunting all contributed to its decline.",
        },
        {
          heading: "What extinction records teach",
          body: "Descriptions and remains are fragmentary, so scientific reconstruction requires careful comparison of historical sources, anatomy, and ecology. The dodo remains a case study in human-driven extinction.",
        },
      ]}
    />
  );
}
