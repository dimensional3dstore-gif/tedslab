import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function YiSunSinArticle() {
  return (
    <LegacyArticlePage
      title="Admiral Yi Sun-sin"
      subject="Korean history"
      summary="Yi Sun-sin (1545–1598) was a Joseon naval commander whose campaigns helped defend Korea during the Japanese invasions of 1592–1598."
      sections={[
        {
          heading: "Command and naval strategy",
          body: "Yi coordinated fleets, logistics, and coastal defenses under difficult conditions. His victories interrupted Japanese maritime supply and helped change the strategic balance of the war.",
        },
        {
          heading: "Evidence and remembrance",
          body: "The Nanjung Ilgi, Yi's wartime diary, provides an unusually direct account of command and daily experience. Later generations have remembered him as a central figure in Korean history.",
        },
      ]}
    />
  );
}
