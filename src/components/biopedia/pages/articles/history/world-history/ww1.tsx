import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function WorldWarIArticle() {
  return (
    <LegacyArticlePage
      title="World War I"
      subject="World history"
      summary="The 1914–1918 war began in a crisis among European powers and expanded through alliances into a global conflict involving industrial armies and empires."
      sections={[
        {
          heading: "From crisis to total war",
          body: "Militarism, imperial competition, nationalism, and alliance commitments formed the wider setting for the July Crisis. Trench warfare, artillery, disease, and blockade shaped life at the front and home.",
        },
        {
          heading: "Armistice and aftermath",
          body: "The armistice of 11 November 1918 ended the fighting, while peace settlements redrew borders and dismantled empires. Political upheaval and unresolved grievances influenced the decades that followed.",
        },
      ]}
    />
  );
}
