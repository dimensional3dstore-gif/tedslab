import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { fullTimeline } from "@/lib/biopedia-sections";

const title = "Timeline of Life — Ted's Lab";
const description =
  "Four and a half billion years of Earth history, from the first cells to human civilization.";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <AppShell>
      {(q) => {
        const items = q
          ? fullTimeline.filter((t) =>
              `${t.when} ${t.what} ${t.detail}`.toLowerCase().includes(q),
            )
          : fullTimeline;
        return (
          <>
            <PageHeader title="Timeline of Life" description={description} />
            <ol className="mt-6 space-y-4 border-l border-border pl-6">
              {items.map((t) => (
                <li key={t.when + t.what} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-primary" />
                  <p className="text-xs font-semibold tracking-wide text-bio-cyan">{t.when}</p>
                  <h2 className="text-sm font-semibold">{t.what}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{t.detail}</p>
                </li>
              ))}
            </ol>
          </>
        );
      }}
    </AppShell>
  );
}
