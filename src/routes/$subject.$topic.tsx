import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { ArticleCard } from "@/components/biopedia/ArticleCard";
import type { ArticleRow, Subject, TopicRow } from "@/lib/content";
import { fetchCatalogRow, fetchCatalogRows } from "@/lib/content";
import { ARTICLES, SUBJECTS, TOPICS } from "@/lib/catalog";
import { resolveImage } from "@/lib/images";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { ArrowLeft, BookOpen } from "lucide-react";

const subjectQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["subject", slug],
    queryFn: () => fetchCatalogRow<Subject>("subjects", "slug", slug, SUBJECTS),
  });

const topicQueryOptions = (subjectSlug: string, topicSlug: string) =>
  queryOptions({
    queryKey: ["topic", subjectSlug, topicSlug],
    queryFn: async () => {
      const rows = await fetchCatalogRows<TopicRow>("topics", TOPICS);
      return rows.find((row) => row.subject_slug === subjectSlug && row.slug === topicSlug) ?? null;
    },
  });

const topicArticlesQueryOptions = (topicSlug: string) =>
  queryOptions({
    queryKey: ["articles", "by-category", topicSlug],
    queryFn: async () => {
      const rows = await fetchCatalogRows<ArticleRow>("articles", ARTICLES);
      // A topic slug represents a shared category across the whole knowledge base.
      return rows.filter((article) => article.topic_slug === topicSlug && article.published);
    },
  });

export const Route = createFileRoute("/$subject/$topic")({
  loader: async ({ context, params }) => {
    const subject = await context.queryClient.ensureQueryData(subjectQueryOptions(params.subject));
    if (!subject) throw notFound();
    const topic = await context.queryClient.ensureQueryData(topicQueryOptions(params.subject, params.topic));
    if (!topic) throw notFound();
    const articles = await context.queryClient.ensureQueryData(topicArticlesQueryOptions(params.topic));
    return { subject, topic, articles };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.topic.title} — ${loaderData.subject.title} — Ted's Lab` : "Ted's Lab";
    const description = loaderData?.topic.blurb ?? "";
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
  component: TopicPage,
});

function TopicPage() {
  const { subject: initialSubject, topic: initialTopic, articles: initialArticles } = Route.useLoaderData();
  const { subject: subjectSlug, topic: topicSlug } = Route.useParams();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { data: subject = initialSubject } = useQuery({
    ...subjectQueryOptions(subjectSlug),
    initialData: initialSubject,
  });
  const { data: topic = initialTopic } = useQuery({
    ...topicQueryOptions(subjectSlug, topicSlug),
    initialData: initialTopic,
  });
  const { data: articles = initialArticles } = useQuery({
    ...topicArticlesQueryOptions(topicSlug),
    initialData: initialArticles,
  });

  return (
    <AppShell>
      {(q) => {
        const filtered = articles.filter((article) =>
          !q || `${article.title} ${article.excerpt ?? ""}`.toLowerCase().includes(q),
        );
        return (
          <>
            <Link to="/$subject" params={{ subject: subject.slug }} className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-3.5" />
              Back to {subject.title}
            </Link>

            <header className="bio-panel mt-4 overflow-hidden">
              {topic.image_url && (
                <img src={resolveImage(topic.image_url, null)} alt={topic.title} className="max-h-72 w-full object-cover" />
              )}
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{subject.title} · Topic</p>
                <h1 className="mt-2 break-words font-display text-3xl font-bold text-foreground md:text-4xl">{topic.title}</h1>
                {topic.blurb && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{topic.blurb}</p>}
                {topic.body && topic.body !== topic.blurb && (
                  <div className="prose prose-sm mt-5 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: topic.body }} />
                )}
              </div>
            </header>

            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Category library</p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-foreground">All articles in {topic.title}</h2>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
              </div>
              {filtered.length ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((article) => (
                    <ArticleCard key={article.id} article={article} saved={bookmarks.includes(article.slug)} onBookmarkClick={toggleBookmark} />
                  ))}
                </div>
              ) : (
                <div className="bio-panel flex flex-col items-center px-6 py-12 text-center">
                  <BookOpen className="size-8 text-muted-foreground" />
                  <h3 className="mt-3 font-display text-lg font-semibold">No published articles yet</h3>
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">Published articles in this category will appear here, including articles filed under other subjects.</p>
                  <Link to="/articles" className="mt-4 text-sm font-semibold text-primary hover:underline">Browse all articles</Link>
                </div>
              )}
            </section>
          </>
        );
      }}
    </AppShell>
  );
}
