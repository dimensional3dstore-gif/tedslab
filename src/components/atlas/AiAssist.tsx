import { useCallback, useEffect, useMemo, useState } from "react";
import { BrainCircuit, RefreshCw, Sparkles, BookOpen } from "lucide-react";
import { CLUSTERS } from "@/data/catalog";
import { generateDailyArticles, getStoredArticles, type GeneratedArticle } from "@/lib/ai-generator";

const SUBJECTS = CLUSTERS.map((c) => c.id);

export function AiAssistPanel() {
  const [articles, setArticles] = useState<GeneratedArticle[]>([]);
  const [busy, setBusy] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>(SUBJECTS[0] ?? "biology");
  const [lastRun, setLastRun] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const { articles: stored, date } = getStoredArticles();
    setArticles(stored);
    setLastRun(date);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = useMemo(
    () => articles.filter((a) => a.subject === selectedSubject),
    [articles, selectedSubject],
  );

  const runGeneration = () => {
    setBusy(true);
    window.setTimeout(() => {
      const result = generateDailyArticles(SUBJECTS, 10);
      setArticles(result.articles);
      setLastRun(result.date);
      setBusy(false);
    }, 400);
  };

  return (
    <aside className="bio-panel sticky top-4 flex w-full max-w-sm shrink-0 flex-col gap-4 p-4 xl:w-80">
      <div className="flex items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <BrainCircuit className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">AI Assist</h2>
          <p className="text-xs text-muted-foreground">
            Generates 10 local articles per subject every day — no API key required.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={runGeneration}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {busy ? <RefreshCw className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        {busy ? "Generating…" : "Generate today's batch"}
      </button>

      {lastRun && (
        <p className="text-[11px] text-muted-foreground">
          Last batch: <span className="text-foreground">{lastRun}</span> · {articles.length} articles
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {SUBJECTS.map((id) => {
          const meta = CLUSTERS.find((c) => c.id === id);
          const active = selectedSubject === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedSubject(id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {meta?.title ?? id}
            </button>
          );
        })}
      </div>

      <div className="max-h-[28rem] space-y-2 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
            No articles yet for this subject. Run generation to create 10 local drafts.
          </p>
        ) : (
          filtered.map((a) => (
            <article
              key={a.id}
              className="rounded-lg border border-border bg-card/60 p-3 transition hover:border-primary/40"
            >
              <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-primary">
                <BookOpen className="size-3" />
                {a.subject}
              </div>
              <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
              <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {a.summary}
              </p>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}
