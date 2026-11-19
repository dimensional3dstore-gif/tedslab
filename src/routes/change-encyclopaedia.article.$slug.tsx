import { createFileRoute } from "@tanstack/react-router";
import { ArticleTemplate } from "@/components/biopedia/ArticleTemplate";
import { useArticles, websiteFallbackArticles } from "@/lib/content";

export const Route = createFileRoute("/change-encyclopaedia/article/$slug")({
  head: ({ params }) => ({ meta: [{ title: "Change Article — Ted's Lab" }] }),
  component: ChangeArticlePage,
});

function ChangeArticlePage() {
  const { slug } = Route.useParams();
  const { data: articles = [], isLoading } = useArticles();
  const article = (articles.length ? articles : websiteFallbackArticles).find(item => item.slug === slug && item.subject_slug === "change-encyclopaedia");
  if (isLoading && !article) return <main className="p-6 text-sm text-muted-foreground">Loading article…</main>;
  if (!article) return <main className="p-6 text-sm text-muted-foreground">Change article not found.</main>;
  const related = articles.filter(item => item.subject_slug === "change-encyclopaedia" && item.topic_slug === article.topic_slug && item.slug !== article.slug);
  return <ArticleTemplate article={article} related={related} />;
}
