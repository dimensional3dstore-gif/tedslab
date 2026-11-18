
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createAppProject } from "@/lib/app-studio";
import { AppShell } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/studio/new")({
  head: () => ({ meta: [{ title: "Create App — Ted's Lab" }] }),
  component: NewAppPage,
});

function NewAppPage() {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (authLoading) return <AppShell><main className="mx-auto max-w-4xl px-5 py-12">Checking administrator access…</main></AppShell>;
  if (!isAdmin) return <AppShell><main className="mx-auto max-w-4xl px-5 py-12"><h1 className="text-2xl font-bold">Admin only</h1><p className="mt-2 text-sm text-muted-foreground">Only Ted's Lab administrators can create and deploy apps.</p></main></AppShell>;

  async function create() {
    setError(""); setBusy(true);
    try {
      const project = await createAppProject({ data: { name, prompt } });
      await navigate({ to: "/studio/$id", params: { id: project.id } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "App generation failed.");
    } finally { setBusy(false); }
  }

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ted's Lab App Studio</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">What should we build?</h1>
          <p className="mt-3 text-muted-foreground">Describe the app like you would to a developer. Ted's Lab generates the first working version as a standalone web app.</p>
        </div>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <label className="text-sm font-semibold">App name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Study Timer" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30" />
          <label className="mt-6 block text-sm font-semibold">Describe your app</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={9} placeholder="Build a clean study timer with 25-minute focus sessions, a pause button, progress ring, sound toggle, and a history of completed sessions." className="mt-2 w-full resize-y rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["landing page", "dashboard", "calculator", "study tool", "portfolio"].map((example) => (
              <button key={example} type="button" onClick={() => setPrompt((value) => value || "Build a polished " + example + " with a responsive design and working interactions.")} className="rounded-full border border-border px-3 py-1.5 hover:bg-accent">{example}</button>
            ))}
          </div>
          {error && <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}
          <button disabled={busy || !name.trim() || !prompt.trim()} onClick={create} className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Generating your app…" : "Generate app"}</button>
        </div>
      </main>
    </AppShell>
  );
}
