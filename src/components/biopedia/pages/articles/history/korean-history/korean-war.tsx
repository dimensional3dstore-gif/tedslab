import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function KoreanWarArticle() {
  return (
    <LegacyArticlePage
      title="The Korean War"
      subject="Modern Korean history"
      summary="The Korean War began in 1950 when North Korean forces crossed the 38th parallel, drawing in United Nations forces led by the United States and Chinese forces."
      sections={[
        {
          heading: "A divided peninsula",
          body: "The war followed the division of Korea after Japanese colonial rule and escalating political conflict. Front lines shifted dramatically before settling near the original dividing line.",
        },
        {
          heading: "Armistice, not a peace treaty",
          body: "The 1953 armistice halted major fighting and established the Demilitarized Zone, but no peace treaty formally ended the war. The division continues to shape security and family life on the peninsula.",
        },
      ]}
    />
  );
}
