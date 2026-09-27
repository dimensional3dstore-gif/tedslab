import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function RichardLionheartArticle() {
  return (
    <LegacyArticlePage
      title="Richard I, the Lionheart"
      subject="Medieval English history"
      summary="Richard I ruled from 1189 to 1199, spending much of his reign campaigning abroad, including during the Third Crusade."
      sections={[
        {
          heading: "A king at war",
          body: "Richard's military reputation grew through campaigns in France and the eastern Mediterranean. His departure and captivity placed heavy financial and administrative demands on his kingdom.",
        },
        {
          heading: "Legacy",
          body: "The image of Richard as a heroic crusader is stronger than the record of his day-to-day rule. His reign illustrates how medieval monarchy relied on taxation, alliances, and personal military leadership.",
        },
      ]}
    />
  );
}
