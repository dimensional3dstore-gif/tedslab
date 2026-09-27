import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CircleHelp, Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { Input } from "@/components/ui/input";

const helpTopics = [
  {
    category: "Getting started",
    title: "Finding an article or subject",
    summary: "Browse by subject or search titles, topics, and article text.",
    details:
      "Use the sidebar to open a subject and its sections, or visit All Articles for the complete published index.",
    to: "/articles",
    linkLabel: "Browse articles",
  },
  {
    category: "Accounts",
    title: "Signing in and saved work",
    summary: "Your account keeps supported saved-content features associated with your profile.",
    details:
      "Sign in with the account connected to this deployment. If sign-in is unavailable, confirm the Supabase account service has been configured by the site administrator.",
    to: "/auth",
    linkLabel: "Open sign in",
  },
  {
    category: "Study tools",
    title: "Using Chronium AI with a local model",
    summary: "Connect to a running oMLX server, discover a model, load it, then start chat.",
    details:
      "The default server address is http://127.0.0.1:8000. The app checks /v1/models and loads a selected model through oMLX before enabling chat. In a normal browser, the oMLX CORS allowlist must include this site's origin; the packaged desktop bridge uses loopback access.",
    to: "/llm",
    linkLabel: "Open Chronium AI",
  },
  {
    category: "Study tools",
    title: "Translation provider setup",
    summary: "Translation requires a compatible provider endpoint configured for the deployment.",
    details:
      "The translator posts text, source language, and target language to VITE_TRANSLATE_API_URL. If that setting is absent, the page reports that translation is not configured instead of showing a fake result.",
    to: "/translate",
    linkLabel: "Open translator",
  },
  {
    category: "Desktop app",
    title: "Installing ChronosOS on Mac",
    summary: "Download the Apple Silicon DMG and open the disk image on a compatible Mac.",
    details:
      "The current DMG is unsigned and requires internet access for the hosted sign-in page. macOS may show a first-open security warning. The desktop download is large; if a deployment host rejects it, publish the DMG through an artifact host and update the download URL.",
    to: "/download",
    linkLabel: "Download ChronosOS",
  },
  {
    category: "Reference",
    title: "Reading Lost Planet records",
    summary: "Each species page distinguishes known records from estimates and unresolved causes.",
    details:
      "Extinction dates can refer to a last confirmed sighting, a final captive animal, or a broad prehistoric interval. The record explains which kind of evidence is available and flags uncertain causes.",
    to: "/lost-atlas",
    linkLabel: "Explore Lost Planet",
  },
];

const categories = ["All topics", ...new Set(helpTopics.map((topic) => topic.category))];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const search = query.trim().toLowerCase();
  const visibleTopics = helpTopics.filter((topic) => {
    const matchesCategory = category === "All topics" || topic.category === category;
    const matchesSearch =
      !search || `${topic.title} ${topic.summary} ${topic.details}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader
          title="Help Centre"
          description="Answers for accounts, study tools, the desktop app, and the encyclopedia."
        />
        <label className="relative block max-w-2xl">
          <span className="sr-only">Search help topics</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search help topics"
            className="pl-9"
          />
        </label>
        <div
          role="tablist"
          aria-label="Help categories"
          className="flex flex-wrap gap-1 border-b border-border"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={`border-b-2 px-3 py-2 text-sm ${category === item ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <section aria-label="Help topics" className="divide-y divide-border border-y border-border">
          {visibleTopics.map((topic) => (
            <details key={topic.title} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {topic.category}
                  </span>
                  <span className="mt-1 block font-semibold text-foreground">{topic.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{topic.summary}</span>
                </span>
                <CircleHelp className="mt-1 size-4 shrink-0 text-muted-foreground group-open:text-primary" />
              </summary>
              <div className="ml-0 mt-4 max-w-3xl border-l-2 border-primary/30 pl-4 sm:ml-2">
                <p className="text-sm leading-relaxed text-muted-foreground">{topic.details}</p>
                <Link
                  to={topic.to}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  {topic.linkLabel}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </details>
          ))}
          {visibleTopics.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No help topics match that search.
            </p>
          )}
        </section>
      </div>
    </AppShell>
  );
}
