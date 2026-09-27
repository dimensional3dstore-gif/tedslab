import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { glossary } from "@/lib/biopedia-sections";

const title = "Biology Glossary — Ted's Lab";
const description = "Clear definitions for the biology terms you meet most often, A to Z.";

export const Route = createFileRoute("/glossary")({
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
  component: GlossaryPage,
});

function GlossaryPage() {
  return (
    <AppShell>
      {(q) => {
        const items = q
          ? glossary.filter((g) => `${g.term} ${g.definition}`.toLowerCase().includes(q))
          : glossary;
        return (
          <>
            <PageHeader title="Glossary" description={description} />
            {items.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">No terms match your search.</p>
            ) : (
              <dl className="mt-6 divide-y divide-border bio-panel">
                {items.map((g) => (
                  <div key={g.term} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr]">
                    <dt className="text-sm font-semibold text-primary">{g.term}</dt>
                    <dd className="text-sm text-muted-foreground">{g.definition}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        );
      }}
    </AppShell>
  );
}
