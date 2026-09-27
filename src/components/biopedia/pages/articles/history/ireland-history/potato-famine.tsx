import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function PotatoFamineArticle() {
  return (
    <LegacyArticlePage
      title="The Great Irish Famine"
      subject="Irish history"
      summary="The potato blight of the 1840s collided with poverty, land insecurity, and British relief policy, causing mass death and emigration."
      sections={[
        {
          heading: "Crop failure and exposure",
          body: "A disease affecting potato crops removed the staple food of millions of rural Irish people. The crisis lasted several seasons, while dependence on a single crop and unequal landholding left families with few reserves.",
        },
        {
          heading: "Consequences and interpretation",
          body: "Death, displacement, and migration reshaped Ireland and its diaspora. Historians examine both the biological failure and the political choices that determined how food, relief, and land were managed.",
        },
      ]}
    />
  );
}
