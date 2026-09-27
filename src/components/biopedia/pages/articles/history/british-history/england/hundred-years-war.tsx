import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function HundredYearsWarArticle() {
  return (
    <LegacyArticlePage
      title="The Hundred Years' War"
      subject="Medieval European history"
      summary="The long conflict between the English and French crowns, conventionally dated 1337–1453, combined dynastic claims, territorial disputes, and changing military technology."
      sections={[
        {
          heading: "A changing conflict",
          body: "Campaigns alternated with truces and civil conflict. Longbow tactics, artillery, and paid forces altered how armies fought, while the English crown's claim to France remained a central source of tension.",
        },
        {
          heading: "The end of English rule in France",
          body: "French political consolidation and military recovery gradually reversed earlier English gains. The war strengthened royal institutions and left durable memories in both kingdoms.",
        },
      ]}
    />
  );
}
