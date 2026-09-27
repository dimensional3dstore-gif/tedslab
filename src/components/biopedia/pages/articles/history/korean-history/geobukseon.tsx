import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GeobukseonArticle() {
  return (
    <LegacyArticlePage
      title="The Geobukseon"
      subject="Korean naval history"
      summary="The geobukseon, or turtle ship, was a Joseon warship associated with Admiral Yi Sun-sin and the naval campaigns against Japanese forces in the 1590s."
      sections={[
        {
          heading: "Design and evidence",
          body: "Historical records describe covered decks and defensive features, but precise reconstructions remain debated. The ships were one element in a wider system of naval tactics, artillery, crews, and coastal knowledge.",
        },
        {
          heading: "Tactical role",
          body: "Geobukseon ships operated alongside other vessels rather than as a stand-alone weapon. Their later reputation reflects both wartime accounts and centuries of national remembrance.",
        },
      ]}
    />
  );
}
