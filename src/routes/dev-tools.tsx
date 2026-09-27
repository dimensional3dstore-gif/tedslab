import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenText,
  Check,
  Copy,
  Database,
  FileCode2,
  Search,
  Settings2,
  Workflow,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { Input } from "@/components/ui/input";
import { supabaseAuthConfigured } from "@/integrations/supabase/auth";

export const Route = createFileRoute("/dev-tools")({ component: DeveloperTools });

const tools = [
  {
    title: "Article studio",
    category: "Content",
    description: "Create and review encyclopedia articles.",
    path: "/admin/articles",
    icon: BookOpenText,
  },
  {
    title: "Page registry",
    category: "Content",
    description: "Manage published pages and their metadata.",
    path: "/admin/pages",
    icon: FileCode2,
  },
  {
    title: "Topic structure",
    category: "Content",
    description: "Inspect sections, topics, and their hierarchy.",
    path: "/admin/topics",
    icon: Workflow,
  },
  {
    title: "Knowledge atlas",
    category: "Explore",
    description: "Navigate the linked concept graph.",
    path: "/knowledge-atlas",
    icon: Database,
  },
  {
    title: "Account settings",
    category: "System",
    description: "Inspect profile and account preferences.",
    path: "/settings",
    icon: Settings2,
  },
] as const;

const categories = ["All", "Content", "Explore", "System"] as const;

function DeveloperTools() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${tool.title} ${tool.description} ${tool.path}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const copyDiagnostics = async () => {
    const report = {
      origin: window.location.origin,
      route: window.location.pathname,
      mode: import.meta.env.MODE,
      online: navigator.onLine,
      authConfigured: supabaseAuthConfigured,
      userAgent: navigator.userAgent,
      capturedAt: new Date().toISOString(),
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <AppShell>
      <div className="space-y-7">
        <PageHeader
          title="Developer tools"
          description="A route-indexed workbench for content, system settings, and knowledge exploration."
        />

        <section className="bio-panel p-4 sm:p-5" aria-label="Find developer tools">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools or routes"
                className="pl-9"
                aria-label="Search tools or routes"
              />
            </div>
            <div
              className="flex flex-wrap gap-1 rounded-md border border-border p-1"
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${category === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2" aria-label="Developer tools list">
          {filteredTools.map(({ title, category: toolCategory, description, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="bio-panel group flex min-w-0 items-start gap-4 p-5 transition-colors hover:border-primary/50 hover:bg-secondary/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">{title}</span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {toolCategory}
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {description}
                </span>
                <span className="mt-3 block truncate font-mono text-xs text-primary">{path}</span>
              </span>
            </Link>
          ))}
          {filteredTools.length === 0 && (
            <p className="col-span-full rounded-md border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
              No tools match this search.
            </p>
          )}
        </section>

        <section className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Runtime diagnostics</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Copy browser, route, and auth configuration details for a bug report.
            </p>
            {copyState === "error" && (
              <p role="alert" className="mt-2 text-xs text-destructive">
                Clipboard access failed. Open this page in a secure browser context and retry.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={copyDiagnostics}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {copyState === "copied" ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
            {copyState === "copied" ? "Copied" : "Copy diagnostics"}
          </button>
        </section>
      </div>
    </AppShell>
  );
}
