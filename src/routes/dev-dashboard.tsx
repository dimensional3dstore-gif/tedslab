import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Globe2,
  LockKeyhole,
  Radio,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { supabaseAuthConfigured } from "@/integrations/supabase/auth";

export const Route = createFileRoute("/dev-dashboard")({ component: DeveloperDashboard });

function DeveloperDashboard() {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    updateOnline();
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  const checks = [
    {
      name: "Browser network",
      detail:
        online === null
          ? "Checking connection"
          : online
            ? "Browser reports an active connection"
            : "Browser is offline",
      state: online === null ? "checking" : online ? "ready" : "attention",
      icon: Globe2,
    },
    {
      name: "Account authentication",
      detail: supabaseAuthConfigured
        ? "Supabase credentials are configured"
        : "Supabase credentials are missing",
      state: supabaseAuthConfigured ? "ready" : "attention",
      icon: LockKeyhole,
    },
    {
      name: "Application route",
      detail: "Developer dashboard is responding in this browser session",
      state: "ready",
      icon: Radio,
    },
  ] as const;

  return (
    <AppShell>
      <div className="space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <PageHeader
            title="Developer dashboard"
            description="Live checks from this browser session and its configured services."
          />
          <span className="mb-1 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground">
            <Activity className="size-3.5 text-primary" /> Client diagnostics
          </span>
        </div>

        <section aria-label="Runtime checks" className="grid gap-3 sm:grid-cols-3">
          {checks.map(({ name, detail, state, icon: Icon }) => (
            <article key={name} className="bio-panel min-w-0 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-md bg-secondary text-foreground">
                  <Icon className="size-4" />
                </span>
                {state === "ready" ? (
                  <CheckCircle2 className="size-4 text-primary" />
                ) : state === "attention" ? (
                  <CircleAlert className="size-4 text-bio-amber" />
                ) : (
                  <span className="size-2 animate-pulse rounded-full bg-muted-foreground" />
                )}
              </div>
              <h2 className="mt-5 text-sm font-semibold text-foreground">{name}</h2>
              <p className="mt-1 min-h-10 text-sm leading-relaxed text-muted-foreground">
                {detail}
              </p>
              <p className="mt-4 border-t border-border pt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {state === "ready"
                  ? "Ready"
                  : state === "attention"
                    ? "Needs attention"
                    : "Checking"}
              </p>
            </article>
          ))}
        </section>

        <section className="bio-panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold text-foreground">Connected surfaces</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Jump to the configured areas this dashboard can verify.
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              MODE: {import.meta.env.MODE.toUpperCase()}
            </span>
          </div>
          <div className="divide-y divide-border">
            <SurfaceRow
              title="ChronosOS sign-in"
              path="/chronos-os"
              detail="Login-only OS access surface"
            />
            <SurfaceRow
              title="Article management"
              path="/admin/articles"
              detail="Content authoring and review"
            />
            <SurfaceRow
              title="Knowledge atlas"
              path="/knowledge-atlas"
              detail="Browse linked topics and concepts"
            />
          </div>
        </section>

        <p className="text-xs leading-relaxed text-muted-foreground">
          These checks reflect this browser and build configuration. They do not represent remote
          uptime or deployment health.
        </p>
      </div>
    </AppShell>
  );
}

function SurfaceRow({ title, path, detail }: { title: string; path: string; detail: string }) {
  return (
    <Link
      to={path}
      className="group flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-secondary/50"
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{detail}</span>
      </span>
      <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground group-hover:text-primary">
        {path} <ArrowUpRight className="size-3.5" />
      </span>
    </Link>
  );
}
