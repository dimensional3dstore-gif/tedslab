
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listAppProjects } from "@/lib/app-studio";
import { AppShell } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/studio")({
  head: () => ({ meta: [{ title: "App Studio — Ted's Lab" }] }),
  component: StudioPage,
});

function StudioPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const query = useQuery({ queryKey: ["tedslab-app-projects"], queryFn: () => listAppProjects() });
  if (authLoading) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12">Checking administrator access…</main></AppShell>;
  if (!isAdmin) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12"><h1 className="text-2xl font-bold">Deployment Platform</h1><p className="mt-2 text-sm text-muted-foreground">Ted's Lab app deployment is available to administrators only.</p></main></AppShell>;

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ted's Lab Apps</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">App Studio</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">Build an app from a prompt, edit it, and publish it as its own site on the Ted's Lab app network.</p>
          </div>
          <Link to="/studio/new" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90">+ Create app</Link>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { label: "GitHub", value: "dimensional3dstore-gif/tedslab", detail: "Source repository" },
            { label: "Supabase", value: "Ted's Lab database", detail: "Projects + app metadata" },
            { label: "Vercel", value: "tedslab", detail: "Production deployments" },
          ].map((connection) => (
            <div key={connection.label} className="rounded-2xl border border-border bg-card px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{connection.label}</p>
              <p className="mt-1 text-sm font-semibold">{connection.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{connection.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
          <p className="text-sm font-semibold">Ted's Lab deployment pipeline</p>
          <p className="mt-1 text-sm text-muted-foreground">App Studio stores project state in Supabase, keeps Ted's Lab as the source repository, and publishes generated apps through Vercel.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(query.data ?? []).map((app) => (
            <Link key={app.id} to="/studio/$id" params={{ id: app.id }} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">{app.name.slice(0, 1).toUpperCase()}</div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">{app.status}</span>
              </div>
              <h2 className="mt-5 text-lg font-semibold">{app.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{app.prompt}</p>
              <div className="mt-5 text-xs font-medium text-primary">{app.custom_domain || "Ready to publish"} →</div>
            </Link>
          ))}
        </div>
        {query.isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading your apps…</p>}
        {!query.isLoading && !(query.data?.length) && (

        )}
      </main>
    </AppShell>
  );
}
