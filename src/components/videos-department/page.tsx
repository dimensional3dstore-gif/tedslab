import { Link } from "@tanstack/react-router";
import { useVideos } from "@/lib/content";

export default function VideoLibraryPage() {
  const { data: videos = [], isLoading, error } = useVideos();
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Video library</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse lessons and demonstrations from across the encyclopedia.
        </p>
      </header>
      {isLoading && (
        <p role="status" className="text-sm text-muted-foreground">
          Loading videos…
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          The video library could not be loaded.
        </p>
      )}
      {!isLoading && !error && videos.length === 0 && (
        <p className="rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
          No videos have been published yet.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Link
            key={video.id}
            to="/videos/$slug"
            params={{ slug: video.slug }}
            className="overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50"
          >
            <div className="aspect-video bg-secondary">
              {video.poster_url && (
                <img
                  src={video.poster_url}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-foreground">{video.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{video.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
