import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/studio")({
  head: () => ({ meta: [{ title: "Deployment Platform — Ted's Lab" }] }),
  component: StudioPage,
});

function StudioPage() {
  const { isAdmin, loading: authLoading } = useAuth();

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl px-5 py-12">
        {authLoading ? (
          <p className="text-sm text-muted-foreground">Checking administrator access…</p>
        ) : !isAdmin ? (
          <div>
            <h1 className="text-2xl font-bold">Deployment Platform</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Ted's Lab app deployment is available to administrators only.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Ted's Lab
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
              Deployment Platform
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Ted's Lab production deployments are managed by administrators.
            </p>
          </div>
        )}
      </main>
    </AppShell>
  );
}
