import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  Search,
  Sparkles,
  Atom,
  Layers3,
  FileText,
  X,
} from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import {
  useArticles,
  usePages,
  useSubjects,
  useTopics,
} from "@/lib/content";

export const Route = createFileRoute("/search-lab")({
  validateSearch: (search: Record<string, unknown>) => ({\n    q: typeof search.q === "string" ? search.q : "",\n  }),\n  head: () => ({
    meta: [
      { title: "Search Lab — Ted's Lab" },
      {
        name: "description",
        content:
          "Search Ted's Lab articles, subjects, topics and pages with Search Lab.",
      },
    ],
  }),
  component: SearchLab,
});

function normalize(text: string) {\n  return text.toLowerCase().normalize("NFKD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9\\s-]/g, " ").replace(/\\s+/g, " ").trim();\n}\n\ntype Result = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "Article" | "Subject" | "Topic" | "Page";
  score: number;
};

function SearchLab() {
  const { data: articles } = useArticles();
  const { data: subjects } = useSubjects();
  const { data: topics } = useTopics();
  const { data: pages } = usePages();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filter, setFilter] = useState<"All" | Result["type"]>("All");

  const results = useMemo(() => {
    const q = normalize(submittedQuery);
    if (!q) return [];

    const terms = q.split(/\s+/).filter(Boolean);
    const scoreText = (text: string) => {
      const normalized = text.toLowerCase();
      let score = 0;
      if (normalized === q) score += 100;
      if (normalized.startsWith(q)) score += 45;
      if (normalized.includes(q)) score += 25;
      for (const term of terms) {
        if (normalized.includes(term)) score += 8;
      }
      return score;
    };

    const all: Result[] = [
      ...(articles ?? [])
        .filter((a) => a.published === true)
        .map((a) => ({
          id: "article-" + a.id,
          title: a.title,
          description: a.excerpt ?? a.body?.replace(/<[^>]+>/g, "").slice(0, 180) ?? "",
          href: "/articles/" + a.slug,
          type: "Article" as const,
          score: scoreText(
            [a.title, a.excerpt ?? "", a.body ?? "", a.subject_slug ?? "", a.topic_slug].join(" "),
          ),
        })),
      ...(subjects ?? []).map((s) => ({
        id: "subject-" + s.id,
        title: s.title,
        description: s.description ?? "",
        href: "/" + s.slug,
        type: "Subject" as const,
        score: scoreText(s.title, true) + scoreText(s.description ?? ""),
      })),
      ...(topics ?? []).map((t) => ({
        id: "topic-" + t.id,
        title: t.title,
        description: t.blurb ?? t.body?.replace(/<[^>]+>/g, "").slice(0, 180) ?? "",
        href: "/" + t.subject_slug + "/" + t.slug,
        type: "Topic" as const,
        score: scoreText(t.title, true) + scoreText([t.blurb ?? "", t.body ?? "", t.subject_slug].join(" ")),
      })),
      ...(pages ?? [])
        .filter((p) => p.published === true)
        .map((p) => ({
          id: "page-" + p.id,
          title: p.title,
          description: p.description ?? "",
          href: "/pages/" + p.slug,
          type: "Page" as const,
          score: scoreText(p.title, true) + scoreText([p.description ?? "", p.body ?? ""].join(" ")),
        })),
    ];

    return all
      .filter((result) => result.score > 0)
      .filter((result) => filter === "All" || result.type === filter)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 50);
  }, [articles, subjects, topics, pages, submittedQuery, filter]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setFilter("All");
  };

  const clear = () => {
    setQuery("");
    setSubmittedQuery("");
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl">
        <section
          className={
            submittedQuery
              ? "pt-6 pb-5"
              : "flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center pb-20"
          }
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Search className="size-8 text-primary" />
            </div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Ted's Lab
            </p>
            <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Search Lab
            </h1>
            {!submittedQuery && (
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Search the knowledge inside Ted's Lab. Find articles, subjects,
                topics and pages from one fast, simple search box.
              </p>
            )}
          </div>

          <form onSubmit={submit} className="mx-auto mt-7 w-full max-w-2xl">
            <div className="group flex items-center rounded-full border border-border bg-background px-5 shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md">
              <Search className="mr-3 size-5 shrink-0 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Ted's Lab"
                aria-label="Search Ted's Lab"
                className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={clear}
                  aria-label="Clear search"
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
              <button
                type="submit"
                className="ml-2 hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:block"
              >
                Search
              </button>
            </div>
          </form>

          {!submittedQuery && (
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              {["quantum mechanics", "artificial intelligence", "history", "mathematics"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      setSubmittedQuery(suggestion);
                    }}
                    className="rounded-full border border-border bg-card px-3 py-1.5 hover:border-primary/40 hover:text-primary"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          )}
        </section>

        {submittedQuery && (
          <section className="pb-12">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {contentLoading ? "Searching…" : `${results.length} result${results.length === 1 ? "" : "s"} for`}
                </p>
                <h2 className="text-xl font-semibold">“{submittedQuery}”</h2>
              </div>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(submittedQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium hover:border-primary/40 hover:text-primary"
              >
                Search the web
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["All", "Article", "Subject", "Topic", "Page"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === item
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {contentLoading ? (\n              <div className="mt-5 space-y-3" aria-label="Loading search results">\n                {[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse rounded-xl bg-secondary/60" />)}\n              </div>\n            ) : results.length ? (
              <div className="mt-5 divide-y divide-border">
                {results.map((result) => (
                  <article key={result.id} className="py-5">
                    <Link to={result.href} className="group block">
                      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                        {result.type === "Article" && <BookOpen className="size-3.5" />}
                        {result.type === "Subject" && <Atom className="size-3.5" />}
                        {result.type === "Topic" && <Layers3 className="size-3.5" />}
                        {result.type === "Page" && <FileText className="size-3.5" />}
                        <span>{result.type}</span>
                        <span>·</span>
                        <span className="truncate">{result.href}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-primary group-hover:underline">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                          {result.description}
                        </p>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Sparkles className="mx-auto size-7 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">No results found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a broader term, a subject name, a topic, or a different spelling.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Globe2 className="size-3.5" />
              <span>Search Lab indexes Ted's Lab content and opens results inside Ted's Lab.</span>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
