import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function HighlandClearancesArticle() {
  return (
    <LegacyArticlePage
      title="The Highland Clearances"
      subject="Scottish history"
      summary="From the late eighteenth into the nineteenth century, changes in land use and estate management displaced many Highland communities."
      sections={[
        {
          heading: "Land, livelihoods, and removal",
          body: "Some tenants were evicted as landowners shifted from small-scale farming toward sheep grazing and other commercial uses. The pace and local causes varied, and economic pressure also drove migration.",
        },
        {
          heading: "A lasting diaspora",
          body: "Many displaced people moved to Scottish cities or emigrated overseas. The Clearances remain central to debates about land ownership, language, memory, and the transformation of rural Scotland.",
        },
      ]}
    />
  );
}
