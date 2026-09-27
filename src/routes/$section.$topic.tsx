import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ContentLayout } from "@/components/biopedia/ContentLayout";
import { ArticleCard } from "@/components/biopedia/ArticleCard";
import { AppShell } from "@/components/biopedia/AppShell";
import { supabase } from "@/integrations/supabase/client";
import type { TopicRow } from "@/lib/content";
import { resolveImage } from "@/lib/images";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const db = supabase as unknown as { from: (table: string) => any };

const topicQueryOptions = (sectionSlug: string, topicSlug: string) =>
  queryOptions({
    queryKey: ["topic", sectionSlug, topicSlug],
    queryFn: async () => {
      const { data, error } = await db
        .from("topics")
        .select("*")
        .eq("slug", topicSlug)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as TopicRow | null;
    },
  });

const topicArticlesQueryOptions = (topicSlug: string) =>
  queryOptions({
    queryKey: ["articles", "by-topic", topicSlug],
    queryFn: async () => {
      const { data, error } = await db
        .from("articles")
        .select("*")
        .eq("topic_slug", topicSlug)
        .eq("published", true)
        .order("sort", { ascending: true });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

const sectionQueryOptions = (sectionSlug: string) =>
  queryOptions({
    queryKey: ["section", sectionSlug],
    queryFn: async () => {
      const { data, error } = await db
        .from("sections")
        .select("*")
        .eq("slug", sectionSlug)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as any;
    },
  });

export const Route = createFileRoute("/$section/$topic")({
  loader: async ({ context, params }) => {
    const section = await context.queryClient.ensureQueryData(
      sectionQueryOptions(params.section)
    );
    if (!section) throw notFound();

    const topic = await context.queryClient.ensureQueryData(
      topicQueryOptions(params.section, params.topic)
    );
    if (!topic) throw notFound();

    const articles = await context.queryClient.ensureQueryData(
      topicArticlesQueryOptions(params.topic)
    );

    return { section, topic, articles };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.topic.title} — Ted's Lab` : "Ted's Lab";
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
  component: TopicDetailPage,
});

function TopicDetailPage() {
  const { subject: subjectSlug, section: sectionSlug, topic: topicSlug } = Route.useParams();
  const { section: initialSection, topic: initialTopic, articles: initialArticles } = Route.useLoaderData();
  const { bookmarks, toggleBookmark } = useBookmarks();

  const { data: section } = useQuery({
    ...sectionQueryOptions(sectionSlug),
    initialData: initialSection,
  });

  const { data: topic } = useQuery({
    ...topicQueryOptions(sectionSlug, topicSlug),
    initialData: initialTopic,
  });

  const { data: articles = [] } = useQuery({
    ...topicArticlesQueryOptions(topicSlug),
    initialData: initialArticles,
  });

  return (
    <AppShell>
      {(q) => {
        const filtered = articles.filter(
          (a) => !q || `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q),
        );

        return (
          <>
            <Link
              to={`/${subjectSlug}/${sectionSlug}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to {section?.title}
            </Link>

            <div className="mt-4">
              {/* Header Section */}
              <header className="bio-panel p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="font-display text-3xl font-bold text-foreground break-words">
                      {topic!.title}
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {topic!.blurb}
                    </p>
                    {section && (
                      <div className="mt-4 flex items-center gap-2">
                        <Link
                          to={`/${subjectSlug}/${sectionSlug}`}
                          className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {section.title}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Image Section */}
              {topic!.image_url && (
                <div className="mt-6 overflow-hidden rounded-lg">
                  <img
                    src={resolveImage(topic!.image_url, null)}
                    alt={topic!.title}
                    className="w-full"
                    loading="eager"
                  />
                </div>
              )}

              {/* Body Section */}
              {topic!.body && (
                <div className="mt-6 bio-panel p-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: topic!.body }} />
                  </div>
                </div>
              )}

              {/* Articles Section */}
              {articles.length > 0 && (
                <>
                  <div className="mt-8 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      Related Articles ({filtered.length})
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((article) => {
                      const saved = bookmarks.includes(article.slug);
                      return (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          saved={saved}
                          onBookmarkClick={toggleBookmark}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        );
      }}
    </AppShell>
  );
}
