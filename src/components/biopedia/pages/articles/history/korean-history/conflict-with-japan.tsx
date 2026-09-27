import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function JapaneseInvasionsOfKoreaArticle() {
  return (
    <LegacyArticlePage
      title="The Japanese Invasions of Korea"
      subject="Korean history"
      summary="The invasions of 1592–1598, known in Korea as the Imjin War, brought Joseon Korea into a devastating conflict with forces sent by Toyotomi Hideyoshi."
      sections={[
        {
          heading: "War on land and sea",
          body: "Japanese armies initially advanced rapidly, while Joseon forces and local militias organized resistance. Admiral Yi Sun-sin's naval campaigns disrupted Japanese supply routes across the southern coast.",
        },
        {
          heading: "Regional consequences",
          body: "Ming China intervened in support of Joseon, and the war caused extensive loss of life and cultural destruction. Its legacy shaped Korean, Japanese, and Chinese historical memory.",
        },
      ]}
    />
  );
}
