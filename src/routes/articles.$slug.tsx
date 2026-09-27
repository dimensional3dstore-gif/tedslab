import { createFileRoute } from "@tanstack/react-router";
import { ArticleTemplate } from "@/components/biopedia/ArticleTemplate";
import { fallbackArticles, useArticles } from "@/lib/content";

export const Route = createFileRoute("/articles/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Article — Ted's Lab` },
      { name: "description", content: `Read article on Ted's Lab` },
    ],
  }),
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { slug } = Route.useParams();
  const { data: articles = [], isLoading } = useArticles();

  const article =
    (articles.length > 0 ? articles : fallbackArticles).find((a) => a.slug === slug) ??
    fallbackArticles.find((a) => a.slug === slug);
  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading article...</div>;
  }

  if (!article) {
    return <div className="p-6 text-sm text-muted-foreground">Article not found.</div>;
  }

  return <ArticleTemplate article={article} related={articles} />;
}
