import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { BookOpenText, PlayCircle, ChevronRight } from "lucide-react";

const title = "Video Tutorials — Ted's Lab";
const description = "Learn the platform with short, step-by-step video guides for studying, notes, and AI-powered learning.";

const tutorials = [
  {
    slug: "getting-started",
    title: "Getting Started with Ted's Lab",
    duration: "4 min",
    description: "Learn how to browse subjects, save articles, and start your study journey.",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    slug: "using-notes",
    title: "How to Use the Notes Tool",
    duration: "3 min",
    description: "Capture study summaries, quick ideas, and revision reflections in your notebook.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "using-ai-tutor",
    title: "Using the AI Tutor",
    duration: "5 min",
    description: "Ask focused questions, get study explanations, and turn content into revision prompts.",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    slug: "saving-content",
    title: "Saving and Organizing Study Content",
    duration: "4 min",
    description: "Bookmark articles and build a personal learning library that is easy to revisit.",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
];

export const Route = createFileRoute("/tutorials")({
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
  component: TutorialsPage,
});

function TutorialsPage() {
  return (
    <AppShell>
      <PageHeader title="Video tutorials" description={description} />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {tutorials.map((item) => (
          <Link
            key={item.slug}
            to="/videos/$slug"
            params={{ slug: item.slug }}
            className="bio-panel flex flex-col overflow-hidden transition-colors hover:border-primary/50"
          >
            <div className="relative">
              <div className="aspect-video w-full bg-gradient-to-br from-primary/15 via-secondary to-muted" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-background/80 text-primary shadow-sm backdrop-blur-sm">
                  <PlayCircle className="size-7" />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary">
                  <BookOpenText className="size-3" />
                  Tutorial
                </span>
                <span className="text-[11px] text-muted-foreground">{item.duration}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Watch tutorial
                <ChevronRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
