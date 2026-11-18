
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAppProject, deployAppProject } from "@/lib/app-studio";
import { AppShell } from "@/components/biopedia/AppShell";

export const Route = createFileRoute("/studio/$id")({
  head: () => ({ meta: [{ title: "App Project — Ted's Lab" }] }),
  component: ProjectPage,
});

function ProjectPage() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["tedslab-app-project", id], queryFn: () => getAppProject({ data: { id } }) });
  const deploy = useMutation({
    mutationFn: () => deployAppProject({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tedslab-app-project", id] }),
  });

  if (query.isLoading) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12">Loading app…</main></AppShell>;
  if (query.error || !query.data) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12"><p className="text-destructive">Unable to load this app.</p></main></AppShell>;

  const app = query.data;
  const srcDoc = "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><style>" +
    app.css + "</style></head><body>" + app.html + "<script>" + app.js.replace(/<\\/script/gi, "<\\\\/script") + "<\\/script></body></html>";

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link to="/studio" className="text-sm font-medium text-primary">← App Studio</Link>
            <h1 className="mt-3 font-display text-4xl font-bold">{app.name}</h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{app.prompt}</p>
          </div>
          <div className="flex gap-2">
            {app.deployment_url && <a href={app.deployment_url} target="_blank" rel="noreferrer" className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent">Open Vercel preview</a>}
            <button disabled={deploy.isPending} onClick={() => deploy.mutate()} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">{deploy.isPending ? "Deploying…" : app.status === "deployed" ? "Redeploy" : "Deploy app"}</button>
          </div>
        </div>

        {deploy.error && <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{deploy.error.message}</div>}
        {app.custom_domain && (
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Ted's Lab address</p>
            <p className="mt-1 font-mono text-sm">{app.custom_domain}</p>
            <p className="mt-1 text-xs text-muted-foreground">This address becomes active after tedslab.app is connected to Vercel.</p>
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold">Live preview</span>
            <span className="text-xs text-muted-foreground">Generated static app</span>
          </div>
          <iframe title={app.name} className="h-[680px] w-full bg-white" sandbox="allow-scripts" srcDoc={srcDoc} />
        </section>
      </main>
    </AppShell>
  );
}
