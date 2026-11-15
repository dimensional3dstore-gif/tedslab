import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { ArticleCard } from "@/components/biopedia/ArticleCard";
import { useArticles } from "@/lib/content";

const title = "All Articles — Ted's Lab";
const description = "Browse all articles across every Ted's Lab subject.";

export const Route = createFileRoute("/articles")({
  validateSearch: (search: Record<string, unknown>) => ({ search: typeof search.search === "string" ? search.search : "", subject: typeof search.subject === "string" ? search.subject : "" }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { pathname } = useLocation();
  const { search: routeSearch, subject: routeSubject } = Route.useSearch();
  const { data: articles = [], isLoading } = useArticles();

  if (pathname !== "/articles") {
    return <Outlet />;
  }

  return (
    <AppShell>
      {(q) => {
        const publishedArticles = articles.filter((a) => a.published);
        const searchTerm = (q || routeSearch).trim().toLowerCase();
        const topicMatches = publishedArticles.filter(
          (a) => !searchTerm || `${a.title} ${a.excerpt ?? ""} ${a.subject_slug ?? ""}`.toLowerCase().includes(searchTerm),
        );
        const filtered = topicMatches.length > 0 ? topicMatches : routeSubject ? publishedArticles.filter((a) => a.subject_slug === routeSubject) : topicMatches;

        return (
          <>
            <PageHeader title="All Articles" description={description} />
            {isLoading && (
              <p className="mt-6 text-sm text-muted-foreground">
                Loading articles…
              </p>
            )}
            {!isLoading && filtered.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                No articles match your search.
              </p>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  showBookmark={false}
                  variant="default"
                />
              ))}
            </div>
          </>
        );
      }}
    </AppShell>
  );
}
