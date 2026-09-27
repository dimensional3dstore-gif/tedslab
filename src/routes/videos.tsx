import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useVideos } from "@/lib/content";
import { resolveImage, subjectImageKey } from "@/lib/images";

const title = "Videos — Ted's Lab";
const description = "Watch curated videos covering topics across every Ted's Lab subject.";

export const Route = createFileRoute("/videos")({
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
  component: VideosPage,
});

function VideosPage() {
  const { data: videos = [], isLoading } = useVideos();

  return (
    <AppShell>
      {(q) => {
        const filtered = videos.filter(
          (v) => !q || `${v.title} ${v.description ?? ""}`.toLowerCase().includes(q),
        );
        return (
          <>
            <PageHeader title="Videos" description={description} />
            {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading videos…</p>}
            {!isLoading && filtered.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">No videos match your search.</p>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => (
                <Link
                  key={v.id}
                  to="/videos/$slug"
                  params={{ slug: v.slug }}
                  className="flex flex-col overflow-hidden bio-panel transition-colors hover:border-primary/50"
                >
                  <img
                    src={resolveImage(
                      v.poster_url,
                      v.subject_slug ? (subjectImageKey[v.subject_slug] ?? null) : null,
                    )}
                    alt={v.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="text-sm font-semibold">{v.title}</h2>
                    {v.description && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {v.description}
                      </p>
                    )}
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
