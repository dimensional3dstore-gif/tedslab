import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { useArticles } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/articles/$slug/annotations")({
  head: () => ({ meta: [{ title: "Article Annotations — Ted's Lab" }] }),
  component: ArticleAnnotationsPage,
});

function ArticleAnnotationsPage() {
  const { slug } = Route.useParams();
  const { data: articles = [] } = useArticles();
  const article = articles.find((item) => item.slug === slug);
  const { data: annotations, isLoading } = usePublicAnnotations(article?.id);

  if (!article) return <div className="p-6 text-sm text-muted-foreground">Article not found.</div>;

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/articles/$slug" params={{ slug }} className="text-primary hover:underline">← {article.title}</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Annotations</span>
        </div>
        <header className="rounded-2xl border border-border bg-card/80 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Article annotations</p>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-foreground">{article.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Published scientific and editorial notes associated with this article.</p>
        </header>
        {isLoading ? <p className="text-sm text-muted-foreground">Loading annotations…</p> : annotations?.length ? (
          <div className="space-y-4">
            {annotations.map((annotation) => (
              <article key={annotation.id} className="rounded-2xl border border-border bg-card/80 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-foreground">{annotation.title}</h2>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{annotation.kind.replace("_", " ")}</span>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{annotation.note}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
            <h2 className="font-semibold text-foreground">No published annotations yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">This article has no public annotations.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function usePublicAnnotations(articleId?: string) {
  return {
    data: undefined as Array<{ id: string; title: string; note: string; kind: string }> | undefined,
    isLoading: Boolean(articleId),
  };
}
