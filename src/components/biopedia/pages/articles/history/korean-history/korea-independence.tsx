import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function KoreaIndependenceArticle() {
  return (
    <LegacyArticlePage
      title="Korea's Independence Movement"
      subject="Modern Korean history"
      summary="Korean resistance to Japanese colonial rule developed through domestic protest, cultural organizing, armed struggle, and diaspora activism."
      sections={[
        {
          heading: "March First Movement",
          body: "On 1 March 1919, declarations of independence sparked mass demonstrations across Korea. Colonial repression was severe, but the movement drew international attention and encouraged new organizing.",
        },
        {
          heading: "Liberation and division",
          body: "Japan's surrender in 1945 ended colonial rule, but occupation zones and Cold War politics divided the peninsula. Independence therefore began a new period of political struggle rather than immediate unity.",
        },
      ]}
    />
  );
}
