import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { ArticleCard } from "@/components/biopedia/ArticleCard";
import type { ArticleRow, Subject, TopicRow } from "@/lib/content";
import { fetchCatalogRow, fetchCatalogRows } from "@/lib/content";
import { ARTICLES, SUBJECTS, TOPICS } from "@/lib/catalog";
import { resolveImage } from "@/lib/images";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { ArrowLeft, BookOpen, BrainCircuit, Sparkles, ArrowRight } from "lucide-react";

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

            <header className="relative isolate mt-4 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-card to-secondary/70 shadow-sm">
              {topic.image_url && (
                <img src={resolveImage(topic.image_url, null)} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
              )}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/85 to-background/45" />
              <div className="relative p-6 md:p-10">
                <Link to="/categories" className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowLeft className="size-3.5" /> Explore categories
                </Link>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{subject.title}</span>
                  <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">Learning category</span>
                </div>
                <h1 className="mt-4 max-w-3xl break-words font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{topic.title}</h1>
                {topic.blurb && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{topic.blurb}</p>}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><BookOpen className="size-4 text-primary" /> {filtered.length} published {filtered.length === 1 ? "article" : "articles"}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>Curated across Ted’s Lab</span>
                </div>
                {topic.body && topic.body !== topic.blurb && (
                  <div className="prose prose-sm mt-6 max-w-3xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: topic.body }} />
                )}
              </div>
            </header>

            {filtered.length > 0 && (
              <section className="mt-8">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Featured reading</p>
                </div>
                <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                  <ArticleCard article={filtered[0]} variant="featured" className="lg:flex-row" saved={bookmarks.includes(filtered[0].slug)} onBookmarkClick={toggleBookmark} />
                  <div className="bio-panel flex flex-col justify-between gap-5 p-6 md:p-7">
                    <div>
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><BrainCircuit className="size-5" /></div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Knowledge check</p>
                      <h2 className="mt-2 font-display text-2xl font-bold text-foreground">Ready to test what you know?</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Turn your reading into active recall with guided lessons, practice questions and subject quizzes in Study Lab.</p>
                    </div>
                    <Link to="/study" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Open Study Lab <ArrowRight className="size-4" /></Link>
                  </div>
                </div>
              </section>
            )}

            <section className="mt-10">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Explore the category</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">Article library</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Every published article filed under {topic.title}, across all subjects.</p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
              </div>
              {filtered.length ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.slice(1).map((article) => (
                    <ArticleCard key={article.id} article={article} saved={bookmarks.includes(article.slug)} onBookmarkClick={toggleBookmark} />
                  ))}
                  {filtered.length === 1 && <p className="text-sm text-muted-foreground">You’re all caught up — more articles will appear here as this category grows.</p>}
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
