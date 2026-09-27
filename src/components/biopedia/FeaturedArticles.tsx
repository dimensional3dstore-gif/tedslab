import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { ArticleRow } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

export function FeaturedArticles({
  items,
  bookmarks,
  onToggleBookmark,
}: {
  items: ArticleRow[];
  bookmarks: string[];
  onToggleBookmark: (slug: string) => void;
}) {
  const published = items.filter((a) => a.published);
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    scroller.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">Featured Articles</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll featured articles left"
            className="grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll featured articles right"
            className="grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {published.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No articles match your search.</p>
      ) : (
        <div
          ref={scroller}
          className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]"
        >
          {published.map((a) => {
            const saved = bookmarks.includes(a.slug);
            return (
              <ArticleCard
                key={a.id}
                className="w-[min(82vw,17rem)] shrink-0 snap-start"
                article={a}
                saved={saved}
                onBookmarkClick={onToggleBookmark}
                variant="featured"
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
