import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function SejongArticle() {
  return (
    <LegacyArticlePage
      title="King Sejong the Great"
      subject="Korean history"
      summary="Sejong ruled Joseon from 1418 to 1450 and is associated with the creation and promulgation of Hangul, a writing system designed to represent Korean speech."
      sections={[
        {
          heading: "Learning and administration",
          body: "Sejong supported scholarly institutions and practical research in astronomy, agriculture, music, and governance. Hangul made literacy more accessible than classical Chinese writing alone.",
        },
        {
          heading: "A living writing system",
          body: "The alphabet's design connects letter shapes with articulatory features. Its development illustrates how language policy, scholarship, and statecraft can shape a society's cultural tools.",
        },
      ]}
    />
  );
}
