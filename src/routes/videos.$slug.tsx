import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useVideos } from "@/lib/content";

export const Route = createFileRoute("/videos/$slug")({
  head: () => ({
    meta: [{ title: "Video — Ted's Lab" }],
  }),
  component: VideoDetailPage,
});

function getEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    /* ignore invalid urls */
  }
  return null;
}

function VideoDetailPage() {
  const { slug } = Route.useParams();
  const { data: videos = [], isLoading } = useVideos();
  const video = videos.find((v) => v.slug === slug);

  return (
    <AppShell>
      <>
        <Link
          to="/videos"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to videos
        </Link>
        {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading video…</p>}
        {!isLoading && !video && (
          <p className="mt-6 text-sm text-muted-foreground">Video not found.</p>
        )}
        {video && (
          <div className="mt-4">
            <PageHeader title={video.title} description={video.description ?? ""} />
            <div className="mt-6 overflow-hidden rounded-lg bio-panel">
              {(() => {
                const embedUrl = getEmbedUrl(video.url);
                if (embedUrl) {
                  return (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="aspect-video w-full"
                      allow="accelerate-compressor; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video
                    src={video.url}
                    poster={video.poster_url ?? undefined}
                    controls
                    className="aspect-video w-full bg-muted"
                  />
                );
              })()}
            </div>
          </div>
        )}
      </>
    </AppShell>
  );
}
