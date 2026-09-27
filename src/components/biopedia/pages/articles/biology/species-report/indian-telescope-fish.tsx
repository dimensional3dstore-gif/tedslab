import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function IndianTelescopeFishArticle() {
  return (
    <LegacyArticlePage
      title="Indian Telescope Fish"
      subject="Species report"
      summary="The Indian telescope fish is an ornamental goldfish variety selected for prominent, upward-facing eyes; it is a domesticated form of Carassius auratus."
      sections={[
        {
          heading: "Selective breeding",
          body: "Telescope eyes arise through generations of artificial selection, not adaptation to a wild habitat. Eye shape and protrusion vary between lines and can increase vulnerability to injury.",
        },
        {
          heading: "Care and welfare",
          body: "A spacious, clean aquarium and compatible tankmates reduce stress and physical damage. The fish's vision and swimming ability should guide tank design and feeding routines.",
        },
      ]}
    />
  );
}
