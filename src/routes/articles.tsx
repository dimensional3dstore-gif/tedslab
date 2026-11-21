import { createFileRoute, Outlet, useLocation, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { ArticleCard } from "@/components/biopedia/ArticleCard";
import { useArticles } from "@/lib/content";
import { useAuth } from "@/hooks/use-auth";

const title = "All Articles — Ted's Lab";
const description = "Browse all articles across every Ted's Lab subject.";

export const Route = createFileRoute("/articles")({
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
  const { data: articles = [], isFetching, error } = useArticles();
  const { isAdmin } = useAuth();

  if (pathname !== "/articles") {
    return <Outlet />;
  }

  return (
    <AppShell>
      {(q) => {
        const publishedArticles = articles.filter(
          (a) => a.published === true && (a.status == null || a.status === "published"),
        );
        const filtered = publishedArticles.filter(
          (a) =>
            !q || `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q),
        );

        return (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><PageHeader title="All Articles" description={description} /><div className="flex flex-wrap gap-2">{isAdmin ? <Link to="/admin/articles/new" preload="intent" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Write & publish article</Link> : <Link to="/articles/new" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Submit an article</Link>}</div></div>
            {isFetching && filtered.length === 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading articles" aria-busy="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={`article-skeleton-${index}`} aria-hidden="true" className="bio-panel animate-pulse overflow-hidden">
                    <div className="h-40 w-full bg-muted" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-24 rounded bg-muted" />
                      <div className="h-5 w-4/5 rounded bg-muted" />
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-2/3 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isFetching && filtered.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                {error ? "Articles are temporarily unavailable. Please try again shortly." : "No articles match your search."}
              </p>
            )}
            {filtered.length > 0 && (
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
            )}
          </>
        );
      }}
    </AppShell>
  );
}
