import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useSubjects, useSections } from "@/lib/content";

const title = "All Categories — Ted's Lab";
const description =
  "Browse every Ted's Lab category, from organisms and cells to biotechnology and evolution.";

export const Route = createFileRoute("/categories")({
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
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: subjects } = useSubjects();
  const { data: sections } = useSections();

  const items = subjects ?? [];

  return (
    <AppShell>
      {(q) => (
        <>
          <PageHeader title="All Categories" description={description} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items
              .filter((s) => !q || `${s.title} ${s.description ?? ""}`.toLowerCase().includes(q))
              .map((s) => {
                const topicCount = (sections ?? []).filter(
                  (sec) => sec.subject_id === s.id,
                ).length;
                return (
                  <Link
                    key={s.id}
                    to={`/${s.slug}`}
                    className="block bio-panel p-4 transition-colors hover:border-primary/50"
                  >
                    <h2 className="text-sm font-semibold">{s.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <p className="mt-3 text-xs text-primary">{topicCount} sections</p>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </AppShell>
  );
}
