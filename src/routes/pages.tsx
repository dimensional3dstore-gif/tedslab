import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { usePages } from "@/lib/content";
import { resolveImage } from "@/lib/images";

const title = "All Pages — Ted's Lab";
const description = "Browse all published pages on Ted's Lab.";

export const Route = createFileRoute("/pages")({
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
  component: PagesListPage,
});

function PagesListPage() {
  const { data: pages = [], isLoading } = usePages();

  return (
    <AppShell>
      {(q) => {
        const publishedPages = pages.filter((p) => p.published);
        const filtered = publishedPages.filter(
          (p) => !q || `${p.title} ${p.description ?? ""}`.toLowerCase().includes(q),
        );

        return (
          <>
            <PageHeader title="All Pages" description={description} />
            {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading pages…</p>}
            {!isLoading && filtered.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">No pages match your search.</p>
            )}
            <div className="mt-6 space-y-3">
              {filtered.map((page) => (
                <Link
                  key={page.id}
                  to={`/pages/$slug`}
                  params={{ slug: page.slug }}
                  className="flex items-start gap-4 bio-panel p-4 transition-colors hover:border-primary/50"
                >
                  {page.image_url && (
                    <img
                      src={resolveImage(page.image_url, null)}
                      alt={page.title}
                      loading="lazy"
                      width={200}
                      height={120}
                      className="h-24 w-32 shrink-0 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-foreground">{page.title}</h2>
                    {page.description && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {page.description}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-primary font-semibold">Read more →</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        );
      }}
    </AppShell>
  );
}
