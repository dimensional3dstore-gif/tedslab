import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function EurekaStockadeArticle() {
  return (
    <LegacyArticlePage
      title="The Eureka Stockade"
      subject="Australian history"
      summary="The 1854 rebellion at Ballarat grew from miners' opposition to licence fees, policing, and limited political representation during the gold rush."
      sections={[
        {
          heading: "A protest becomes an uprising",
          body: "Goldfield miners organized around the Ballarat Reform League and built a stockade. Colonial troops attacked it on 3 December 1854; the confrontation was brief but politically consequential.",
        },
        {
          heading: "Reform and memory",
          body: "The trials that followed ended in acquittals, and several demands for reform gained wider support. Eureka later became a contested symbol of democratic rights and Australian national identity.",
        },
      ]}
    />
  );
}
