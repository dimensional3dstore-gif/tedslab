import { useEffect, useState } from "react";
import { BookOpen, Bookmark, BookmarkCheck, LoaderCircle, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ArticleRow } from "@/lib/content";

type Turn = { role: "user" | "assistant"; content: string };
type SavedExplanation = { id: string; articleSlug: string; articleTitle: string; content: string; savedAt: string };
const SAVED_EXPLANATIONS_KEY = "tedslab:saved-nexium-explanations:v1";

export function ArticleConceptExplainer({ article }: { article: ArticleRow }) {
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const explain = async (prompt?: string) => {
    const userPrompt = (prompt ?? question).trim();
    if (!userPrompt || busy) return;
    const nextTurns: Turn[] = [...turns, { role: "user", content: userPrompt }];
    setTurns(nextTurns);
    setQuestion("");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/llm/api/nexium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are Nexium, the concept tutor inside Ted's Lab. Explain the requested concept accurately, patiently and at the learner's level. Start with a plain-language definition, then explain how and why it works, use a relatable analogy and a concrete example, define important vocabulary, and finish with one short check-for-understanding question. Use clear headings and concise paragraphs. If the article does not contain enough information, say so rather than inventing facts. Keep the explanation focused on the article context.",
            },
            {
              role: "user",
              content: `Article title: ${article.title}\nSubject: ${article.subject_slug ?? "General"}\nArticle summary: ${article.excerpt ?? ""}\nArticle content: ${(article.body ?? "").slice(0, 14000)}\n\nLearner request: ${userPrompt}`,
            },
            ...nextTurns.slice(1).map((turn) => ({ role: turn.role, content: turn.content })),
          ],
        }),
      });
      const payload = await response.json();
      if (!response.ok || typeof payload.answer !== "string") {
        throw new Error(payload.error ?? "Nexium could not explain this concept.");
      }
      const responseText = payload.answer;
      setTurns((current) => [...current, { role: "assistant", content: responseText }]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Nexium could not explain this concept.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-primary/25 bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-foreground">Understand this concept</h2>
            <p className="text-sm text-muted-foreground">Ask Nexium to teach it with simple explanations, analogies and examples.</p>
          </div>
        </div>
        <Button type="button" variant="outline" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Close tutor" : "Explain with Nexium"}
        </Button>
      </div>
      {expanded && (
        <div className="space-y-4 border-t border-border p-5">
          {turns.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {[
                "Explain the main concept in simple terms",
                "Give me a real-world analogy and example",
                "What are the most important ideas to remember?",
                "Explain it step by step for a beginner",
              ].map((prompt) => (
                <button key={prompt} type="button" disabled={busy} onClick={() => void explain(prompt)} className="rounded-full border border-border bg-secondary px-3 py-2 text-xs text-foreground hover:border-primary/40 disabled:opacity-50">
                  {prompt}
                </button>
              ))}
            </div>
          )}
          {turns.map((turn, index) => (
            <article key={index} className={turn.role === "user" ? "ml-auto max-w-[90%] rounded-xl bg-primary/10 p-3" : "max-w-full rounded-xl border border-border bg-background p-4"}>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{turn.role === "user" ? "You asked" : "Nexium explains"}</p>
              <div className="whitespace-pre-wrap text-sm leading-7 text-foreground">{turn.content}</div>
              {turn.role === "assistant" && (
                <div className="mt-3 flex justify-end border-t border-border pt-2">
                  <Button type="button" size="sm" variant="ghost" onClick={() => toggleSave(turn.content)} className="gap-2">
                    {savedIds.includes(`${article.slug}:${turn.content}`) ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                    {savedIds.includes(`${article.slug}:${turn.content}`) ? "Saved" : "Save explanation"}
                  </Button>
                </div>
              )}
            </article>
          ))}
          {busy && <p className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="size-4 animate-spin" /> Nexium is preparing your explanation…</p>}
          
          
          <form onSubmit={(event) => { event.preventDefault(); void explain(); }} className="flex gap-2">
            <Input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question about this article…" disabled={!config || busy} />
            <Button type="submit" disabled={busy || !question.trim()}><Send className="size-4" /><span className="sr-only">Send question</span></Button>
          </form>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <p className="flex items-center gap-2 text-xs text-muted-foreground"><BookOpen className="size-3.5" /> Explanations use this article as context. Check important facts against the reference.</p>
        </div>
      )}
    </section>
  );
}
