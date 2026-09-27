import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";

const tutorialMap: Record<string, { title: string; description: string; videoUrl: string; duration: string }> = {
  "getting-started": {
    title: "Getting Started with Ted's Lab",
    description: "Learn how to browse subjects, save study material, and build a routine with the library and dashboard.",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    duration: "4 min",
  },
  "using-notes": {
    title: "How to Use the Notes Tool",
    description: "Use the notebook to record key ideas, chapter summaries, and quick revision reminders.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "3 min",
  },
  "using-ai-tutor": {
    title: "Using the AI Tutor",
    description: "Ask effective questions and use AI to turn content into study prompts and deeper explanations.",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    duration: "5 min",
  },
  "saving-content": {
    title: "Saving and Organizing Study Content",
    description: "Bookmark the articles and materials you want to revisit, so your learning stays focused and organized.",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    duration: "4 min",
  },
};

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
    // ignore invalid urls
  }
  return null;
}

export const Route = createFileRoute("/tutorials/$slug")({
  head: () => ({
    meta: [{ title: "Tutorial — Ted's Lab" }],
  }),
  component: TutorialPage,
});

function TutorialPage() {
  const { slug } = Route.useParams();
  const tutorial = tutorialMap[slug];

  if (!tutorial) {
    return (
      <AppShell>
        <div className="bio-panel p-6">
          <p className="text-sm text-muted-foreground">Tutorial not found.</p>
          <Link to="/tutorials" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <ArrowLeft className="size-4" />
            Back to tutorials
          </Link>
        </div>
      </AppShell>
    );
  }

  const embedUrl = getEmbedUrl(tutorial.videoUrl);

  return (
    <AppShell>
      <div>
        <Link to="/tutorials" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" />
          Back to tutorials
        </Link>

        <div className="mt-4">
          <PageHeader title={tutorial.title} description={`${tutorial.description} Duration: ${tutorial.duration}`} />

          <div className="mt-6 overflow-hidden rounded-lg bio-panel">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={tutorial.title}
                className="aspect-video w-full"
                allow="accelerate-compressor; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-secondary text-sm text-muted-foreground">
                Video preview unavailable.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
