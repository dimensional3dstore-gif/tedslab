import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listPublishedApps } from "@/lib/app-studio";
import { AppShell } from "@/components/biopedia/AppShell";

export const Route = createFileRoute("/apps")({
  head: () => ({
    meta: [
      { title: "Apps — Ted's Lab" },
      { name: "description", content: "Explore apps published on Ted's Lab." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://tedslab.app/apps" }],
  }),
  component: AppsPage,
});

function AppsPage() {
  const query = useQuery({ queryKey: ["published-tedslab-apps"], queryFn: () => listPublishedApps() });
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ted's Lab</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Apps</h1>
          <p className="mt-3 text-muted-foreground">Discover web apps published by Ted's Lab. Each app has its own public address under tedslab.app.</p>
        </header>
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(query.data ?? []).map((app) => (
            <article key={app.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <p className="mt-2 line-clamp-4 text-sm text-muted-foreground">{app.prompt}</p>
              <a
                href={app.custom_domain ? "https://" + app.custom_domain : app.deployment_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Open app
              </a>
            </article>
          ))}
        </section>
        {!query.isLoading && !(query.data?.length) && (
          <p className="mt-10 text-sm text-muted-foreground">No public apps have been published yet.</p>
        )}
      </main>
    </AppShell>
  );
}
