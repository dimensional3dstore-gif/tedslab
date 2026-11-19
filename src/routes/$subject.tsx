import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import type { ArticleRow, Subject, TopicRow } from "@/lib/content";
import { fetchCatalogRow, fetchCatalogRows, useArticles, websiteFallbackArticles } from "@/lib/content";
import { TOPICS, SUBJECTS } from "@/lib/catalog";
import { resolveImage } from "@/lib/images";
import { Skeleton } from "@/components/ui/skeleton";

const subjectQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["subject", slug],
    queryFn: () => fetchCatalogRow<Subject>("subjects", "slug", slug, SUBJECTS),
    initialData: SUBJECTS.find((subject) => subject.slug === slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

const subjectTopicsQueryOptions = (subjectId: string) =>
  queryOptions({
    queryKey: ["topics", "by-subject", subjectId],
    queryFn: async () => {
      const rows = await fetchCatalogRows<TopicRow>("topics", TOPICS);
      return rows.filter((row) => row.subject_id === subjectId);
    },
    initialData: TOPICS.filter((topic) => topic.subject_id === subjectId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const Route = createFileRoute("/$subject")({
  loader: async ({ context, params }) => {
    const subject = await context.queryClient.ensureQueryData(
      subjectQueryOptions(params.subject),
    );
    if (!subject) {
      const articles = await fetchCatalogRows<ArticleRow>(
        "articles",
        websiteFallbackArticles,
      );
      const article = articles.find(
        (row) => row.slug === params.subject && row.published,
      );
      if (article) {
        throw redirect({
          to: "/articles/$slug",
          params: { slug: article.slug },
        });
      }
      throw notFound();
    }
    const topics = await context.queryClient.ensureQueryData(
      subjectTopicsQueryOptions(subject.id),
    );
    return { subject, topics };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.subject.title} — Ted's Lab`
      : "Ted's Lab";
    const description = loaderData?.subject.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { subject: initialSubject } = Route.useLoaderData();
  const { data: allArticles = [], error: articlesError, isLoading: articlesLoading } = useArticles();
  const [articleSearch, setArticleSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const { data: subject } = useQuery({
    ...subjectQueryOptions(initialSubject.slug),
    initialData: initialSubject,
  });
  const { data: topics, isLoading: topicsLoading } = useQuery({
    ...subjectTopicsQueryOptions(subject!.id),
    initialData: Route.useLoaderData().topics,
  });
  const subjectArticles = useMemo(
    () => (allArticles as ArticleRow[]).filter((article) => article.subject_slug === subject!.slug && article.published),
    [allArticles, subject],
  );
  const visibleArticles = subjectArticles.filter((article) => {
    const matchesTopic = topicFilter === "all" || article.topic_slug === topicFilter;
    const term = articleSearch.trim().toLowerCase();
    const matchesSearch = !term || (article.title + " " + (article.excerpt ?? "")).toLowerCase().includes(term);
    return matchesTopic && matchesSearch;
  });

  return (
    <AppShell>
      {(q) => (
        <>
          <PageHeader
            title={subject!.title}
            description={subject!.description ?? ""}
          />
          <section className="mt-6">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Articles</h2>
                <p className="text-xs text-muted-foreground">{visibleArticles.length} of {subjectArticles.length} published articles</p>
                {articlesError && <p role="alert" className="mt-1 text-xs text-destructive">Unable to load saved articles from the database: {articlesError instanceof Error ? articlesError.message : "Database query failed."}</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                <input aria-label="Search subject articles" value={articleSearch} onChange={(event) => setArticleSearch(event.target.value)} placeholder="Search articles…" className="h-9 w-48 rounded-md border border-input bg-background px-3 text-sm" />
                <select aria-label="Filter articles by topic" value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="all">All topics</option>
                  {(topics ?? []).map((topic) => <option key={topic.id} value={topic.slug}>{topic.title}</option>)}
                </select>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleArticles.map((article) => (
                <Link key={article.id} to={"/articles/" + article.slug} className="bio-panel block p-4 transition-colors hover:border-primary/50" aria-label={`Read article: ${article.title}`}>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{(topics ?? []).find((topic) => topic.slug === article.topic_slug)?.title ?? article.topic_slug}</p>
                  <h3 className="mt-1 text-sm font-semibold">{article.title}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{article.excerpt}</p>
                </Link>
              ))}
              {!visibleArticles.length && <p className="bio-panel p-4 text-sm text-muted-foreground">No published articles match these filters.</p>}
            </div>
          </section>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {(topics ?? [])
              .filter(
                (s) =>
                  !q ||
                  `${s.title} ${s.blurb ?? ""}`.toLowerCase().includes(q),
              )
              .map((s) => (
                <Link
                  key={s.id}
                  to={`/${subject!.slug}/${s.slug}`}
                  className="block overflow-hidden bio-panel transition-colors hover:border-primary/50"
                >
                  <img
                    src={resolveImage(s.image_url, null)}
                    alt={s.title}
                    loading="lazy"
                    width={512}
                    height={288}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-sm font-semibold">{s.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {s.blurb}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
