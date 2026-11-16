import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArticleCard } from "./ArticleCard";
import type { ArticleRow, Subject } from "@/lib/content";
import { NODES } from "@/data/catalog";
import { getArticle } from "@/data/articles/compose";

const SUBJECT_CLUSTERS: Record<string, string[]> = {
  science: ["physics"],
  technology: ["computing"],
  philosophy: ["philosophy"],
  mathematics: ["mathematics"],
  biology: ["biology"],
  history: ["history"],
  mind: ["mind"],
  systems: ["systems"],
};

function atlasRows(kind: "figure" | "concept"): ArticleRow[] {
  return NODES.filter((node) => node.kind === kind).map((node, index) => {
    const article = getArticle(node.id)!;
    return {
      id: `atlas-${node.id}`,
      slug: `atlas-${node.id}`,
      title: article.title,
      excerpt: article.summary,
      body: article.body,
      minutes: Math.max(4, Math.round(article.wordCount / 220)),
      tone: kind === "figure" ? "Figure" : "Concept",
      subject_slug: node.cluster,
      section_slug: null,
      topic_slug: kind,
      image_key: null,
      image_url: null,
      video_url: null,
      published: true,
      status: "published",
      sort: index,
    };
  });
}

function Scroller({ title, items, viewAll }: {
  title: string;
  items: ArticleRow[];
  viewAll?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) =>
    ref.current?.scrollBy({ left: direction * 340, behavior: "smooth" });

  return (
    <section className="mt-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground">{items.length}</span>
          {viewAll && <Link to={viewAll} className="text-xs font-medium text-primary hover:underline">View all</Link>}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`} className="grid size-8 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"><ChevronLeft className="size-4" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`} className="grid size-8 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"><ChevronRight className="size-4" /></button>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">No published articles in this category yet.</p>
      ) : (
        <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
          {items.map((article) => (
            <ArticleCard key={article.id} article={article} showBookmark={false} variant="featured" className="w-[min(78vw,16rem)] shrink-0 snap-start" />
          ))}
        </div>
      )}
    </section>
  );
}

export function HomepageArticleSections({ categories, articles, query }: {
  categories: Subject[];
  articles: ArticleRow[];
  query: string;
}) {
  const figures = atlasRows("figure");
  const concepts = atlasRows("concept");
  const matches = (article: ArticleRow) =>
    !query || `${article.title} ${article.excerpt ?? ""} ${article.subject_slug ?? ""}`.toLowerCase().includes(query);

  return (
    <div className="mt-8 space-y-7">
      {categories.map((category) => {
        const clusters = SUBJECT_CLUSTERS[category.slug] ?? [category.slug];
        const categoryArticles = [
          ...articles.filter((article) => article.subject_slug === category.slug),
          ...[...figures, ...concepts].filter((article) => clusters.includes(article.subject_slug ?? "")),
        ].filter(matches);
        return (
          <section key={category.id} className="bio-panel p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Category</p>
                <h2 className="font-display text-lg font-semibold">{category.title}</h2>
                {category.description && <p className="mt-1 text-xs text-muted-foreground">{category.description}</p>}
              </div>
              <Link to={`/${category.slug}`} className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2">Explore <ChevronRight className="size-3.5" /></Link>
            </div>
            <Scroller title={`${category.title} articles`} items={categoryArticles} />
          </section>
        );
      })}
      <section className="bio-panel p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Knowledge Atlas</p>
        <h2 className="font-display text-lg font-semibold">Figures</h2>
        <p className="mt-1 text-xs text-muted-foreground">The people whose work shaped fields, discoveries and ideas.</p>
        <Scroller title="Figure articles" items={figures.filter(matches)} viewAll="/knowledge-atlas" />
      </section>
      <section className="bio-panel p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Knowledge Atlas</p>
        <h2 className="font-display text-lg font-semibold">Concepts</h2>
        <p className="mt-1 text-xs text-muted-foreground">Core ideas, theories and principles across the knowledge graph.</p>
        <Scroller title="Concept articles" items={concepts.filter(matches)} viewAll="/knowledge-atlas" />
      </section>
    </div>
  );
}
