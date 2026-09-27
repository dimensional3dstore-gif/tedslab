import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function WorldWarIIArticle() {
  return (
    <LegacyArticlePage
      title="World War II"
      subject="World history"
      summary="The 1939–1945 conflict involved combatants across multiple continents and included aggressive expansion, occupation, genocide, and the use of atomic weapons."
      sections={[
        {
          heading: "Global conflict",
          body: "The war grew from expansionist regimes and unresolved political crises. Civilian populations faced occupation, forced displacement, strategic bombing, and mass violence, including the Holocaust.",
        },
        {
          heading: "A transformed world",
          body: "The Allied victory reshaped international power and accelerated decolonization. The United Nations, postwar reconstruction, and the emerging Cold War defined a new political order.",
        },
      ]}
    />
  );
}
