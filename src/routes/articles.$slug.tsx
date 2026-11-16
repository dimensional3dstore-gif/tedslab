import { createFileRoute } from "@tanstack/react-router";
import { ArticleTemplate } from "@/components/biopedia/ArticleTemplate";
import { websiteFallbackArticles, useArticles } from "@/lib/content";

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
  const { data: articles = [], isLoading, isFetching } = useArticles();

  const article =
    (articles.length > 0 ? articles : websiteFallbackArticles).find(
      (a) => a.slug === slug,
    ) ?? websiteFallbackArticles.find((a) => a.slug === slug);
  if (isLoading || (isFetching && !article)) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 sm:px-6" aria-label="Loading article" aria-busy="true">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-3 w-48 rounded bg-muted" />
          <div className="h-10 w-3/4 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-56 rounded-2xl bg-muted sm:h-80" />
          <div className="space-y-3">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Article not found.
      </div>
    );
  }

  return <ArticleTemplate article={article} related={articles} />;
}
