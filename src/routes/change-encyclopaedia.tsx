import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles, fetchCatalogRows } from "@/lib/content";
import type { ArticleRow, TopicRow } from "@/lib/content";
import { CHANGE_ARTICLES, CHANGE_SUBJECT, CHANGE_TOPICS } from "@/lib/catalog";
import { resolveImage } from "@/lib/images";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/change-encyclopaedia")({
  component: ChangeEncyclopaediaPage,
  head: () => ({
    meta: [
      { title: "Change Encyclopaedia — Ted's Lab" },
      {
        name: "description",
        content:
          "Explore how Earth and Earth-like worlds change through geological, climatic, atmospheric, oceanic, biological and human-driven processes.",
      },
      { property: "og:title", content: "Change Encyclopaedia — Ted's Lab" },
      {
        property: "og:description",
        content:
          "An encyclopaedia of planetary change, from slow geological processes to rapid extreme events.",
      },
    ],
  }),
});

function ChangeEncyclopaediaPage() {
  const [search, setSearch] = useState("");
  const { data: articles = [], isLoading: articlesLoading } = useArticles();
  const { data: topics = [], isLoading: topicsLoading } = useQuery({
    queryKey: ["change-encyclopaedia", "topics"],
    queryFn: async () => {
      const rows = await fetchCatalogRows<TopicRow>("topics", CHANGE_TOPICS);
      return rows.filter((topic) => topic.subject_id === CHANGE_SUBJECT.id);
    },
    initialData: CHANGE_TOPICS,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const changeArticles = useMemo(
    () =>
      (articles as ArticleRow[]).filter(
        (article) =>
          article.subject_slug === CHANGE_SUBJECT.slug && article.published,
      ),
    [articles],
  );

  const visibleArticles = changeArticles.filter((article) => {
    const term = search.trim().toLowerCase();
    return (
      !term ||
      `${article.title} ${article.excerpt ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title={CHANGE_SUBJECT.title}
          description={CHANGE_SUBJECT.description}
          actions={
            <Link
              to="/change-encyclopaedia/new"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Add an article
            </Link>
          }
        />

        <section className="bio-panel overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Planetary change
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                A reference for worlds in motion
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Earth is not static. Continents move, climates shift, oceans
                circulate, ecosystems reorganise and life evolves. This
                encyclopaedia brings those processes together so you can study
                change as one connected Earth-system story.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border px-3 py-1">10 topics</span>
                <span className="rounded-full border px-3 py-1">{changeArticles.length} reference articles</span>
                <span className="rounded-full border px-3 py-1">Earth systems</span>
              </div>
            </div>
            <div className="min-h-56 bg-muted">
              <img
                src={resolveImage(CHANGE_SUBJECT.image_url, CHANGE_SUBJECT.image_key)}
                alt=""
                width={768}
                height={432}
                className="h-full min-h-56 w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Explore the encyclopaedia</h2>
              <p className="text-xs text-muted-foreground">
                Browse the major pathways through planetary change.
              </p>
            </div>
            <input
              aria-label="Search Change Encyclopaedia"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search change…"
              className="h-9 w-56 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          {topicsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bio-panel overflow-hidden p-0">
                  <Skeleton className="h-32 w-full rounded-none" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="mt-3 h-3 w-full" />
                    <Skeleton className="mt-2 h-3 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {topics
                .filter(
                  (topic) =>
                    !search ||
                    `${topic.title} ${topic.blurb ?? ""}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .map((topic) => (
                  <Link
                    key={topic.id}
                    to={`/change-encyclopaedia/${topic.slug}`}
                    className="bio-panel block overflow-hidden transition-colors hover:border-primary/50"
                  >
                    <img
                      src={resolveImage(topic.image_url, "sci-earth")}
                      alt=""
                      width={512}
                      height={288}
                      loading="lazy"
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-semibold">{topic.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {topic.blurb}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Reference articles</h2>
            <p className="text-xs text-muted-foreground">
              Detailed articles connecting individual processes to the wider Earth system.
            </p>
          </div>

          {articlesLoading ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bio-panel p-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="mt-3 h-5 w-4/5" />
                  <Skeleton className="mt-3 h-3 w-full" />
                  <Skeleton className="mt-2 h-3 w-11/12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="bio-panel block p-4 transition-colors hover:border-primary/50"
                >
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Reference article
                  </p>
                  <h3 className="mt-1 text-sm font-semibold">{article.title}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
