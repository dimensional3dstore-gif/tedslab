import { useMemo, useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, BookOpen, BrainCircuit, CheckCircle2, Clock3, FileText,
  GraduationCap, LockKeyhole, NotebookPen, PlayCircle, RotateCcw,
  ShieldCheck, Sparkles, Target, TimerReset
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useArticles, websiteFallbackArticles } from "@/lib/content";
import { layoutFromArticleBody } from "@/lib/article-layout";

type Question = { prompt: string; options: string[]; answer: number; explanation: string };

function makeQuestions(title: string, overview: string[]): Question[] {
  const concept = overview[0] || title;
  return [
    {
      prompt: `Which statement best explains the central idea of “${title}”?`,
      options: [
        "It is mainly a collection of facts to memorise.",
        `It explains a central idea and connects it to evidence or examples: ${concept.slice(0, 120)}`,
        "It cannot be applied outside the article.",
        "It is only relevant to specialists."
      ],
      answer: 1,
      explanation: "A strong answer explains the idea and connects it to evidence, examples or applications."
    },
    {
      prompt: "Which study strategy best demonstrates retrieval practice?",
      options: [
        "Re-reading the same paragraph repeatedly.",
        "Highlighting every sentence.",
        "Closing the article and explaining the idea from memory.",
        "Copying the article into your notes."
      ],
      answer: 2,
      explanation: "Retrieval practice requires bringing knowledge back from memory rather than simply recognising it."
    },
    {
      prompt: `How should you approach a new problem involving ${title}?`,
      options: [
        "Identify the relevant concept, apply it and justify the result.",
        "Guess without explaining.",
        "Only repeat the article heading.",
        "Ignore evidence that conflicts with your first answer."
      ],
      answer: 0,
      explanation: "Transfer means applying knowledge in a new context and explaining the reasoning."
    }
  ];
}

function StudyModePage() {
  const { slug } = Route.useParams();
  const { data: articles = [], isLoading } = useArticles();
  const [mode, setMode] = useState<"learn" | "notes" | "quiz" | "test">("learn");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [seconds, setSeconds] = useState(20 * 60);
  const [notes, setNotes] = useState("");

  const article = useMemo(
    () => (articles.length ? articles : websiteFallbackArticles).find((item) => item.slug === slug),
    [articles, slug],
  );
  const layout = useMemo(() => article ? (layoutFromArticleBody(article.body) ?? {
    version: 1 as const, tags: [], facts: [], overview: [article.excerpt ?? article.body ?? ""], sections: []
  }) : null, [article]);
  const questions = useMemo(() => layout && article ? makeQuestions(article.title, layout.overview) : [], [layout, article]);
  const score = questions.filter((q, i) => answers[i] === q.answer).length;

  useEffect(() => {
    const key = `tedslab:study-notes:${slug}`;
    setNotes(localStorage.getItem(key) ?? "");
  }, [slug]);

  useEffect(() => {
    if (mode !== "test" || !testStarted || seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(id);
  }, [mode, testStarted, seconds]);

  if (isLoading && !article) {
    return <AppShell><PageHeader title="Study Mode" description="Loading your lesson…" /><div className="bio-panel p-6 animate-pulse h-40" /></AppShell>;
  }

  if (!article || !layout) {
    return <AppShell><PageHeader title="Study Mode" description="The requested lesson could not be found." /><Link to="/study" className="text-primary">Return to Study Lab</Link></AppShell>;
  }

  const saveNotes = () => localStorage.setItem(`tedslab:study-notes:${slug}`, notes);
  const startTest = () => { setMode("test"); setTestStarted(true); setSeconds(20 * 60); setAnswers({}); setMarked(false); };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link to="/study" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to Study Lab
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <GraduationCap className="size-4" /> Ted's Lab Study Mode
          </div>
        </div>

        <header className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm">
          <div className="bg-primary/5 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Guided lesson</p>
                <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">{article.title}</h1>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.excerpt || layout.overview[0]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {layout.tags.slice(0, 6).map((tag) => <span key={tag} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>)}
                </div>
              </div>
              <div className="grid min-w-[180px] gap-2 rounded-xl border border-border bg-background/80 p-4 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Lesson</span><strong>30–45 min</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Resources</span><strong>Articles + quiz + notes</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Assessment</span><strong>Mastery check</strong></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-border md:grid-cols-5">
            {[
              ["learn", "Learn", BookOpen],
              ["notes", "Notes", NotebookPen],
              ["quiz", "Quiz", Target],
              ["test", "Test mode", ShieldCheck],
            ].map(([value, label, Icon]) => (
              <button key={value as string} type="button" onClick={() => setMode(value as typeof mode)}
                className={`inline-flex items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${mode === value ? "border-primary bg-primary/5 text-primary" : "border-transparent text-muted-foreground hover:bg-secondary"}`}>
                <Icon className="size-4" /> {label as string}
              </button>
            ))}
            <Link to="/notebook" className="inline-flex items-center justify-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary">
              <FileText className="size-4" /> Notebook
            </Link>
          </div>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
          <main className="min-w-0">
            {mode === "learn" && (
              <div className="space-y-5">
                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary"><Target className="size-5" /> Learning outcomes</div>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      `Define ${article.title} accurately using subject vocabulary.`,
                      "Explain the main ideas and supporting evidence.",
                      "Apply the concept to a new example.",
                      "Identify a misconception and correct it."
                    ].map((item) => <li key={item} className="flex gap-2 rounded-lg border border-border bg-secondary/30 p-3 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}
                  </ul>
                </section>
                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary"><BookOpen className="size-5" /> Teaching content</div>
                  <div className="mt-4 space-y-4">
                    {layout.overview.map((paragraph, i) => <div key={i} className="rounded-xl border border-border p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary">Teaching point {i + 1}</p><p className="mt-2 text-sm leading-7 text-foreground">{paragraph}</p></div>)}
                    {layout.sections.slice(0, 6).map((section) => <div key={section.heading} className="rounded-xl border border-border bg-secondary/20 p-4"><h2 className="font-semibold text-foreground">{section.heading}</h2>{section.paragraphs?.slice(0,2).map((p) => <p key={p.slice(0,40)} className="mt-2 text-sm leading-7 text-muted-foreground">{p}</p>)}</div>)}
                  </div>
                </section>
                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary"><Sparkles className="size-5" /> Active learning</div>
                  <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
                    <li>Close the article and explain the central idea from memory.</li>
                    <li>Write one worked example or labelled diagram.</li>
                    <li>Apply the concept to a new scenario and justify your answer.</li>
                  </ol>
                </section>
              </div>
            )}

            {mode === "notes" && (
              <section className="bio-panel p-6">
                <div className="flex items-center gap-2 text-lg font-bold"><NotebookPen className="size-5 text-primary" /> Lesson notes</div>
                <p className="mt-2 text-sm text-muted-foreground">Write your own explanation, questions and corrections. Notes are saved on this device.</p>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={saveNotes} placeholder="Write notes for this lesson…" className="mt-4 min-h-[360px] w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary" />
                <button type="button" onClick={saveNotes} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save notes</button>
              </section>
            )}

            {mode === "quiz" && (
              <section className="bio-panel p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><div className="flex items-center gap-2 text-lg font-bold"><Target className="size-5 text-primary" /> Mastery quiz</div><p className="mt-1 text-sm text-muted-foreground">Practice mode · feedback is available.</p></div>
                  {marked && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{score}/{questions.length} · {Math.round(score / questions.length * 100)}%</span>}
                </div>
                <div className="mt-5 space-y-4">
                  {questions.map((q, i) => <fieldset key={i} className="rounded-xl border border-border p-4"><legend className="px-1 text-sm font-semibold">{i+1}. {q.prompt}</legend><div className="mt-3 grid gap-2">{q.options.map((option, oi) => <label key={oi} className={`flex cursor-pointer gap-2 rounded-lg border p-3 text-sm ${answers[i] === oi ? "border-primary bg-primary/5" : "border-border"}`}><input type="radio" name={`q-${i}`} checked={answers[i] === oi} onChange={() => {setAnswers(v=>({...v,[i]:oi}));setMarked(false)}} />{option}</label>)}</div>{marked && <p className={`mt-3 text-xs ${answers[i] === q.answer ? "text-emerald-600" : "text-destructive"}`}>{answers[i] === q.answer ? "Correct. " : "Review this. "}{q.explanation}</p>}</fieldset>)}
                </div>
                <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setMarked(true)} disabled={Object.keys(answers).length !== questions.length} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Mark quiz</button><button type="button" onClick={() => {setAnswers({});setMarked(false)}} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm"><RotateCcw className="size-4"/>Reset</button></div>
              </section>
            )}

            {mode === "test" && (
              <section className="bio-panel p-6">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 font-bold"><LockKeyhole className="size-5 text-amber-600"/> Test mode · AI disabled</div>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">AI Tutor and Nexium are intentionally unavailable while this assessment is active. Use your own knowledge and notes only.</p>
                </div>
                {!testStarted ? <button type="button" onClick={startTest} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><PlayCircle className="size-4"/> Start 20-minute test</button> : (
                  <>
                    <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4"><span className="flex items-center gap-2 text-sm font-bold"><Clock3 className="size-4 text-primary"/> Time remaining</span><span className="font-mono text-lg font-bold text-primary">{String(Math.floor(seconds/60)).padStart(2,"0")}:{String(seconds%60).padStart(2,"0")}</span></div>
                    <div className="mt-5 space-y-4">{questions.map((q,i)=><fieldset key={i} className="rounded-xl border border-border p-4"><legend className="px-1 text-sm font-semibold">{i+1}. {q.prompt}</legend><div className="mt-3 grid gap-2">{q.options.map((option,oi)=><label key={oi} className={`flex cursor-pointer gap-2 rounded-lg border p-3 text-sm ${answers[i]===oi ? "border-primary bg-primary/5" : "border-border"}`}><input type="radio" name={`test-${i}`} checked={answers[i]===oi} onChange={()=>setAnswers(v=>({...v,[i]:oi}))}/>{option}</label>)}</div></fieldset>)}</div>
                    <button type="button" onClick={() => setMarked(true)} className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Submit test</button>
                    {marked && <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm"><strong>Test result: {score}/{questions.length}</strong><p className="mt-1 text-muted-foreground">Test mode has ended. You may now use the study tools again.</p></div>}
                  </>
                )}
              </section>
            )}
          </main>

          <aside className="space-y-4">
            <section className="bio-panel p-4">
              <h2 className="text-sm font-bold">Study tools</h2>
              <div className="mt-3 grid gap-2">
                <Link to="/ai" className={`flex items-center gap-3 rounded-lg border border-border p-3 text-sm font-medium hover:bg-secondary ${mode === "test" && testStarted && !marked ? "pointer-events-none opacity-40" : ""}`}><BrainCircuit className="size-4 text-primary"/>AI Tutor</Link>
                <Link to="/llm" className={`flex items-center gap-3 rounded-lg border border-border p-3 text-sm font-medium hover:bg-secondary ${mode === "test" && testStarted && !marked ? "pointer-events-none opacity-40" : ""}`}><Sparkles className="size-4 text-primary"/>Nexium</Link>
                <Link to="/notebook" className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm font-medium hover:bg-secondary"><NotebookPen className="size-4 text-primary"/>Notebook</Link>
                <button type="button" onClick={()=>setMode("notes")} className="flex items-center gap-3 rounded-lg border border-border p-3 text-left text-sm font-medium hover:bg-secondary"><FileText className="size-4 text-primary"/>Lesson Notes</button>
                <button type="button" onClick={()=>setMode("quiz")} className="flex items-center gap-3 rounded-lg border border-border p-3 text-left text-sm font-medium hover:bg-secondary"><Target className="size-4 text-primary"/>Quiz</button>
              </div>
            </section>
            <section className="bio-panel p-4">
              <h2 className="flex items-center gap-2 text-sm font-bold"><TimerReset className="size-4 text-primary"/> Study routine</h2>
              <ol className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
                <li>1. Learn the concept.</li><li>2. Make your own notes.</li><li>3. Retrieve from memory.</li><li>4. Complete the quiz.</li><li>5. Take the test when ready.</li>
              </ol>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/study/lesson/$slug")({
  head: () => ({ meta: [{ title: "Study Mode · Ted's Lab" }, { name: "description", content: "A guided Ted's Lab lesson with teaching content, notes, quizzes, study tools and a protected test mode." }] }),
  component: StudyModePage,
});
