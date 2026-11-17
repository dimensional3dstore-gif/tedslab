import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleTemplate } from "@/components/biopedia/ArticleTemplate";
import { QUANTUMPEDIA_ARTICLES } from "@/data/quantumpedia";

export const Route = createFileRoute("/quantumpedia/articles/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `QuantumPedia — ${params.slug}` },
      {
        name: "description",
        content: "Read a QuantumPedia knowledge article in Ted's Lab.",
      },
    ],
  }),
  component: QuantumPediaArticlePage,
});

function QuantumPediaArticlePage() {
  const { slug } = Route.useParams();
  const article = QUANTUMPEDIA_ARTICLES.find((item) => item.slug === slug);
  if (!article) throw notFound();

  return <ArticleTemplate article={article} related={QUANTUMPEDIA_ARTICLES} />;
}
