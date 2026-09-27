import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GreatDepressionArticle() {
  return (
    <LegacyArticlePage
      title="The Great Depression"
      subject="World history"
      summary="Beginning with financial crises in 1929, the Great Depression became a prolonged international contraction marked by bank failures, unemployment, and falling production."
      sections={[
        {
          heading: "More than a stock-market crash",
          body: "The downturn reflected interacting weaknesses in banking, credit, demand, and international trade. Its timing and severity differed between countries, and policy responses shaped recovery.",
        },
        {
          heading: "Political and social consequences",
          body: "Mass unemployment changed household life and increased pressure for public relief and economic reform. The crisis also contributed to political instability and influenced the institutions built after World War II.",
        },
      ]}
    />
  );
}
