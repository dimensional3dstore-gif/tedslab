
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAppProject, updateAppProject, deployAppProject } from "@/lib/app-studio";
import { AppShell } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/studio/$id")({
  head: () => ({ meta: [{ title: "App Project — Ted's Lab" }] }),
  component: ProjectPage,
});

function ProjectPage() {
  const { id } = Route.useParams();
  const { isAdmin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"html" | "css" | "js">("html");
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [saved, setSaved] = useState(true);
  const [editorError, setEditorError] = useState("");
  if (authLoading) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12">Checking administrator access…</main></AppShell>;
  if (!isAdmin) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12"><h1 className="text-2xl font-bold">Admin only</h1><p className="mt-2 text-sm text-muted-foreground">Only Ted's Lab administrators can manage deployed apps.</p></main></AppShell>;

  const query = useQuery({ queryKey: ["tedslab-app-project", id], queryFn: () => getAppProject({ data: { id } }) });

  useEffect(() => {
    if (query.data) {
      setCode({ html: query.data.html, css: query.data.css, js: query.data.js });
      setSaved(true);
    }
  }, [query.data]);

  const save = useMutation({
    mutationFn: () => updateAppProject({ data: { id, ...code } }),
    onSuccess: (project) => {
      setCode({ html: project.html, css: project.css, js: project.js });
      setSaved(true);
      setEditorError("");
      queryClient.setQueryData(["tedslab-app-project", id], project);
    },
    onError: (error) => setEditorError(error instanceof Error ? error.message : "Could not save code."),
  });
  const deploy = useMutation({
    mutationFn: () => deployAppProject({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tedslab-app-project", id] }),
  });

  if (query.isLoading) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12">Loading app…</main></AppShell>;
  if (query.error || !query.data) return <AppShell><main className="mx-auto max-w-5xl px-5 py-12"><p className="text-destructive">Unable to load this app.</p></main></AppShell>;

  const app = query.data;
  const srcDoc = "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><style>" + app.css + "</style></head><body>" + app.html + "<script>" + app.js.split("</script").join("<\\/script") + "<\\/script></body></html>";

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-5 py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link to="/studio" className="text-sm font-medium text-primary">← App Studio</Link>
            <h1 className="mt-3 font-display text-4xl font-bold">{app.name}</h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{app.prompt}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {app.deployment_url && <a href={app.deployment_url} target="_blank" rel="noreferrer" className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent">Open live app</a>}
            <button disabled={save.isPending || saved} onClick={() => save.mutate()} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50">{save.isPending ? "Saving…" : saved ? "Saved" : "Save code"}</button>
            <button disabled={deploy.isPending || !saved} onClick={() => deploy.mutate()} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{deploy.isPending ? "Deploying…" : app.status === "deployed" ? "Redeploy" : "Deploy app"}</button>
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

        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2">
              <div className="flex gap-1">
                {(["html", "css", "js"] as const).map((item) => (
                  <button key={item} type="button" onClick={() => setTab(item)} className={"rounded-lg px-3 py-1.5 text-xs font-semibold " + (tab === item ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                    {item === "js" ? "JavaScript" : item.toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">{tab === "html" ? "HTML" : tab === "css" ? "CSS" : "JavaScript"} · {code[tab].length.toLocaleString()} characters</span>
            </div>
            <textarea value={code[tab]} onChange={(event) => {
              setCode((current) => ({ ...current, [tab]: event.target.value }));
              setSaved(false);
              setEditorError("");
            }} spellCheck={false} wrap="off" aria-label={tab + " source code"} className="min-h-[680px] w-full resize-y border-0 bg-[#0b1020] p-4 font-mono text-[13px] leading-6 text-slate-100 outline-none" />
          </section>
          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">Live preview</span>
              <span className="text-xs text-muted-foreground">Unsaved edits preview automatically</span>
            </div>
            <iframe title={app.name} className="h-[680px] w-full bg-white" sandbox="allow-scripts" srcDoc={srcDoc} />
          </section>
        </div>
      </main>
    </AppShell>
  );
}
