import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, BookOpen, BrainCircuit, CheckCircle2, Clock3, FileText,
  GraduationCap, LockKeyhole, NotebookPen, RotateCcw, ShieldCheck,
  Sparkles, Target, TimerReset, Lightbulb, PenLine
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { GRADE_LEVELS, getStudyDay } from "@/lib/study-enlist";
import { useArticles, websiteFallbackArticles } from "@/lib/content";
import { layoutFromArticleBody } from "@/lib/article-layout";

type Phase = "learn" | "example" | "practice" | "independent";
type Lesson = {
  title: string;
  purpose: string;
  teach: string[];
  example: string;
  practice: string[];
  success: string[];
};

type Question = { prompt: string; options: string[]; answer: number; explanation: string };

function makeLesson(subject: string, topic: string, phase: Phase): Lesson {
  const phaseContent: Record<Phase, { title: string; purpose: string }> = {
    learn: {
      title: "Build the concept",
      purpose: "Learn the key idea, vocabulary, relationships and mental model before attempting independent work.",
    },
    example: {
      title: "Worked example",
      purpose: "Follow a complete model, identify the reasoning behind each step and compare it with the lesson objective.",
    },
    practice: {
      title: "Guided practice",
      purpose: "Use the new knowledge with scaffolding, then remove the support as your confidence increases.",
    },
    independent: {
      title: "Independent application",
      purpose: "Transfer the learning to a new situation and justify your answer without copying the worked model.",
    },
  };

  const phaseInfo = phaseContent[phase];
  const mathematics = /fraction|decimal|percent|number|algebra|pattern|measurement|geometry|statistic|probability|modelling|proof|function|calculus|vector|matrix|equation|ratio/i.test(topic);
  const science = /inquiry|living|ecosystem|matter|material|force|energy|motion|earth|space|climate|cell|heredity|evolution|experimental|atomic|bond|reaction|stoichiometry|rate|equilibrium|acid|organic|quantum|wave|electric|field/i.test(topic);
  const humanities = /history|chronology|source|geography|place|environment|civic|citizen|economic|resource|culture|identity|sustainability|global|conflict|revolution|trade|population|settlement|market|policy/i.test(topic);
  const technology = /digital|algorithm|comput|program|debug|network|cyber|data|information|software|system|security|ai|database/i.test(topic);
  const literacy = /reading|vocabulary|sentence|grammar|narrative|writing|persuasive|argument|informative|speaking|text|research|referenc|thesis|evidence|citation/i.test(topic);

  if (subject === "Mathematics" || subject === "Advanced Mathematics" || mathematics) {
    return {
      ...phaseInfo,
      teach: [
        `Start with the structure of ${topic}: identify the quantities, representations, rules or relationships before choosing a calculation.`,
        "Write the known information and the target separately. This prevents a familiar formula or procedure from being used simply because it looks relevant.",
        "Choose a representation that makes the relationship visible: a number line, table, diagram, equation, graph, formula or worked calculation.",
        `For ${topic}, keep each transformation explicit. After every major step ask: what changed, why is that step valid, and what does the result mean in the original problem?`,
        "Finish with a check: estimate, substitute, use a second method, or compare the answer with the original conditions.",
      ],
      example: `Worked model for ${topic}: identify the goal → list the known values → choose the relevant representation or rule → complete one transformation at a time → interpret the result → check it against the original conditions.`,
      practice: [
        `Define ${topic} in your own words and give one example not copied from the lesson.`,
        "Solve a short problem using a clearly labelled method.",
        "Change one condition in your problem and explain how the solution changes.",
        "Write one plausible mistake and explain exactly why it is wrong.",
      ],
      success: [
        "I can identify the mathematical structure before calculating.",
        "I can show and justify each important step.",
        "I can apply the idea to a changed problem.",
        "I can check whether my result is reasonable.",
      ],
    };
  }

  if (subject === "Science" || subject === "Biology" || subject === "Chemistry" || subject === "Physics" || subject === "Advanced Sciences" || science) {
    return {
      ...phaseInfo,
      teach: [
        `Today's scientific idea is ${topic}. Separate what can be observed or measured from the model used to explain it.`,
        "Identify the system, variables and mechanism. A strong explanation tells the learner what changes, what stays controlled and why the observed pattern follows.",
        "Use evidence rather than certainty language. Measurements have uncertainty, investigations have limitations and one result rarely proves a universal claim.",
        `For ${topic}, connect the concept to a prediction: if the model is correct, what should we observe, measure or calculate?`,
        "Evaluate the explanation by asking whether the evidence supports it, whether another explanation could fit the same evidence, and what further test would discriminate between them.",
      ],
      example: `Worked model for ${topic}: question → hypothesis/model → variables → method or evidence → predicted pattern → observed result → explanation → limitation → next investigation.`,
      practice: [
        `Write one testable question about ${topic}.`,
        "Identify the independent variable, dependent variable and one important control.",
        "Predict a result and explain which observation would support your prediction.",
        "Name one limitation and one improvement that would make the evidence stronger.",
      ],
      success: [
        "I can distinguish an observation from an explanation.",
        "I can connect a scientific model to a prediction.",
        "I can use evidence and uncertainty appropriately.",
        "I can identify a limitation and propose a useful improvement.",
      ],
    };
  }

  if (subject === "Humanities" || subject === "Modern History" || subject === "Geography" || subject === "Economics" || humanities) {
    return {
      ...phaseInfo,
      teach: [
        `Today's focus is ${topic}. Define the central concept and the question a learner is actually being asked to answer.`,
        "Place evidence in context: ask who produced it, when, why, what perspective it represents and what it can or cannot establish.",
        "Separate description from explanation. Description tells us what happened or what the data shows; explanation connects causes, consequences, relationships or incentives.",
        `For ${topic}, compare at least two pieces of evidence or perspectives before reaching a judgement.`,
        "A strong conclusion is proportionate to the evidence. State the judgement, identify the strongest support and acknowledge the most important limitation or counterargument.",
      ],
      example: `Worked model for ${topic}: establish context → state a claim → select evidence → explain how the evidence supports the claim → compare another perspective → evaluate limitations → reach a justified judgement.`,
      practice: [
        `Write one investigable claim about ${topic}.`,
        "List two pieces of evidence that could support or challenge the claim.",
        "Explain why one source, statistic or perspective is more useful for the question than another.",
        "Write a two-sentence judgement that includes evidence and one limitation.",
      ],
      success: [
        "I can distinguish claims, evidence and explanations.",
        "I can evaluate the usefulness and limitations of evidence.",
        "I can compare perspectives rather than relying on one source.",
        "I can reach a justified judgement.",
      ],
    };
  }

  if (subject === "Digital Technologies" || subject === "Computer Science" || technology) {
    return {
      ...phaseInfo,
      teach: [
        `Today's computing focus is ${topic}. Define the problem, inputs, outputs and constraints before writing a solution.`,
        "Decompose the task into smaller operations that can be tested independently.",
        "Represent information explicitly using variables, tables, data structures, diagrams, algorithms or interfaces as appropriate.",
        `For ${topic}, test normal cases as well as boundary and unexpected cases. A solution is not complete until you know where it fails and why.`,
        "When debugging, reproduce the failure, isolate the smallest faulty step, change one thing at a time and retest.",
      ],
      example: `Worked model for ${topic}: define the problem → specify input/output → decompose → design the algorithm or representation → test an ordinary case → test an edge case → diagnose → refine.`,
      practice: [
        `Decompose a small problem involving ${topic} into at least four steps.`,
        "Write one example input and the exact output you expect.",
        "Create an edge case that could break a first attempt.",
        "Describe one likely bug and the test that would reveal it.",
      ],
      success: [
        "I can define inputs, outputs and constraints.",
        "I can decompose a problem into testable parts.",
        "I can test normal and edge cases.",
        "I can explain a bug and a reasoned fix.",
      ],
    };
  }

  if (subject === "English" || subject === "Academic Writing" || subject === "Critical Thinking" || literacy) {
    return {
      ...phaseInfo,
      teach: [
        `Today's communication focus is ${topic}. Begin with purpose, audience and the central claim or idea.`,
        "A strong paragraph introduces a point, uses relevant evidence or an example, explains its significance and connects back to the overall purpose.",
        "Evidence does not speak for itself. Explain what a quotation, example, statistic or observation shows and why it matters.",
        `For ${topic}, revise for reasoning before surface polish. Remove repetition, unsupported claims and sentences that do not advance the central idea.`,
        "Test the response from the reader's perspective: Is the claim clear? Is the evidence sufficient? Could a reasonable reader misunderstand the intended meaning?",
      ],
      example: `Worked model for ${topic}: establish purpose → state a precise claim → select evidence → integrate it → explain its significance → connect it to the argument → revise for clarity and precision.`,
      practice: [
        `Write a one-sentence claim about ${topic}.`,
        "Add one specific example or piece of evidence and explain what it demonstrates.",
        "Write one counterargument or alternative interpretation, then respond to it fairly.",
        "Revise your paragraph by removing one unsupported or unnecessary sentence.",
      ],
      success: [
        "I can state a precise claim and purpose.",
        "I can select relevant evidence.",
        "I can explain evidence instead of merely repeating it.",
        "I can revise for clarity, relevance and logical strength.",
      ],
    };
  }

  return {
    ...phaseInfo,
    teach: [
      `Today's focus is ${topic}. Define the central idea and the vocabulary needed to discuss it accurately.`,
      "Connect the idea to a concrete example and explain the relationship rather than only naming the example.",
      "Retrieve the idea from memory, then compare your explanation with the lesson. Correction is part of learning.",
      `Use ${topic} in a new situation. Ask what stays the same, what changes and which part of the original idea still applies.`,
      "Finish by explaining the concept in plain language and identifying one question that would take the learning further.",
    ],
    example: `Worked model for ${topic}: define → illustrate → explain the relationship → apply to a new situation → check the reasoning → identify a limitation or extension.`,
    practice: [
      `Explain ${topic} without looking at your notes.`,
      "Create a new example and explain why it demonstrates the concept.",
      "Write one misconception a learner might have and correct it.",
      "Write one extension question that could lead to deeper study.",
    ],
    success: [
      "I can explain the central idea without copying the lesson.",
      "I can apply it to a new situation.",
      "I can identify and correct a misconception.",
      "I can ask a useful next question.",
    ],
  };
}

function makeQuestions(subject: string, topic: string): Question[] {
  const q: Question[] = [
    {
      prompt: `What is the strongest way to demonstrate understanding of ${topic}?`,
      options: [
        "Repeat the topic title.",
        "Define the idea, explain how it works and apply it to evidence or an example.",
        "Memorise one sentence and use it for every question.",
        "Avoid unfamiliar examples.",
      ],
      answer: 1,
      explanation: "Understanding requires explanation and transfer, not only recognition or repetition.",
    },
    {
      prompt: `In a ${subject} lesson, why should you explain your reasoning?`,
      options: [
        "So a marker can see the method, evidence or decision behind the answer.",
        "Because longer answers are always better.",
        "Because the final answer never matters.",
        "So you can avoid checking your work.",
      ],
      answer: 0,
      explanation: "Reasoning makes the thinking process visible and allows errors or unsupported claims to be corrected.",
    },
    {
      prompt: `Which action best shows transfer of learning about ${topic}?`,
      options: [
        "Copying the worked example exactly.",
        "Changing the heading of the notes.",
        "Using the underlying idea to solve or explain a new situation.",
        "Reading the same paragraph again without testing yourself.",
      ],
      answer: 2,
      explanation: "Transfer means applying knowledge beyond the exact example used during instruction.",
    },
  ];
  return q;
}

function parseStudySlug(slug: string) {
  const match = slug.match(/^study-day-(\d+)-subject-(\d+)-lesson-(\d+)$/);
  if (!match) return null;
  return { day: Number(match[1]), subjectNumber: Number(match[2]), lessonIndex: Number(match[3]) - 1 };
}

function StudyModePage() {
  const { slug } = Route.useParams();
  const study = parseStudySlug(slug);
  const { data: articles = [], isLoading } = useArticles();
  const [mode, setMode] = useState<"learn" | "notes" | "quiz" | "test">("learn");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [seconds, setSeconds] = useState(20 * 60);
  const [notes, setNotes] = useState("");
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [lastActivity, setLastActivity] = useState(() => Date.now());
  const [lessonComplete, setLessonComplete] = useState(false);
  const [activityState, setActivityState] = useState<"active" | "paused">("active");

  const article = useMemo(
    () => (articles.length ? articles : websiteFallbackArticles).find((item) => item.slug === slug),
    [articles, slug],
  );
  const articleLayout = useMemo(() => article ? layoutFromArticleBody(article.body) : null, [article]);

  const lessonContext = study ?? (article ? { day: 1, subjectNumber: 1, lessonIndex: 0 } : null);
  const isArticleLesson = !study && !!article;
  const studyDay = useMemo(() => lessonContext ? getStudyDay(7, lessonContext.day) : null, [lessonContext]);
  const level = useMemo(() => lessonContext ? GRADE_LEVELS.find((item) => item.grade === 7) : null, [lessonContext]);
  const subject = isArticleLesson ? "Knowledge Atlas" : lessonContext && level ? level.subjects[(lessonContext.day - 1 + lessonContext.subjectNumber - 1) % level.subjects.length] : null;
  const concept = isArticleLesson ? article?.title ?? null : lessonContext && subject ? getStudyDay(7, Math.min(365, lessonContext.day + lessonContext.subjectNumber - 1)).topic : null;
  const phase = lessonContext && lessonContext.lessonIndex >= 0 && lessonContext.lessonIndex < 4 ? (["learn", "example", "practice", "independent"] as Phase[])[lessonContext.lessonIndex] : null;
  const lesson = subject && concept && phase ? makeLesson(subject, concept, phase) : null;
  const questions = subject && concept ? makeQuestions(subject, concept) : [];
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const activeMinutes = Math.floor(activeSeconds / 60);
  const plannedMinutes = 60;
  const remainingMinutes = Math.max(0, plannedMinutes - Math.floor(activeSeconds / 60));
  const lessonProgress = lessonComplete ? 100 : Math.min(95, Math.round(((lessonContext?.lessonIndex ?? 0) + 0.25) / 4 * 100));

  useEffect(() => {
    const key = `tedslab:study-notes:${slug}`;
    setNotes(localStorage.getItem(key) ?? "");
    setLessonComplete(localStorage.getItem(`tedslab:study-complete:${slug}`) === "true");
  }, [slug]);

  useEffect(() => {
    const onActivity = () => {
      setLastActivity(Date.now());
      setActivityState("active");
    };
    const onVisibility = () => {
      if (document.hidden) setActivityState("paused");
      else {
        setLastActivity(Date.now());
        setActivityState("active");
      }
    };
    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("touchstart", onActivity, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const inactive = Date.now() - lastActivity > 90_000;
      const active = !document.hidden && !inactive;
      setActivityState(active ? "active" : "paused");
      if (active) setActiveSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [lastActivity]);

  useEffect(() => {
    if (mode !== "test" || !testStarted || seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(id);
  }, [mode, testStarted, seconds]);

  if (!lessonContext || !studyDay || !level || !subject || !concept || !phase || !lesson) {
    if (article && articleLayout) {
      return <AppShell><PageHeader title="Study Mode" description={article.excerpt || article.title} /><div className="bio-panel p-6"><h2 className="text-2xl font-bold">{article.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{articleLayout.overview.join(" ")}</p><Link to="/study" className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Return to Study Lab</Link></div></AppShell>;
    }
    if (isLoading) return <AppShell><PageHeader title="Study Mode" description="Loading your lesson…" /><div className="bio-panel p-6 animate-pulse h-40" /></AppShell>;
    return <AppShell><PageHeader title="Study Mode" description="Lesson not found." /><Link to="/study" className="text-primary">Return to Study Lab</Link></AppShell>;
  }

  const saveNotes = () => localStorage.setItem(`tedslab:study-notes:${slug}`, notes);
  const completeLesson = () => {
    setLessonComplete(true);
    localStorage.setItem(`tedslab:study-complete:${slug}`, "true");
  };
  const startTest = () => { setMode("test"); setTestStarted(true); setSeconds(20 * 60); setAnswers({}); setMarked(false); };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link to="/study" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to Study Lab</Link>
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"><GraduationCap className="size-4" /> Ted's Lab Study Mode</div>
        </div>
        <section className="mb-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Lesson progress</p>
              <p className="mt-1 text-sm text-muted-foreground">{lessonComplete ? "Lesson completed. You can continue to the next lesson." : "Work through the lesson, practise, then complete the lesson when you are ready."}</p>
            </div>
            <span className="text-sm font-bold text-foreground">{lessonProgress}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${lessonProgress}%` }} /></div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="inline-flex items-center gap-2 font-medium text-muted-foreground"><Clock3 className="size-4 text-primary" /> Active study: {activeMinutes} min · {remainingMinutes} min remaining</span>
            <span className={`rounded-full px-2.5 py-1 font-semibold ${activityState === "active" ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-700"}`}>{activityState === "active" ? "Active study time" : "Study time paused"}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Study time is based on active learning. If you leave the browser, switch tabs, or remain inactive, the active timer pauses and your expected study time extends. This keeps progress based on time actually spent studying.</p>
        </section>

        <header className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm">
          <div className="bg-primary/5 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{isArticleLesson ? "Knowledge Atlas · Article lesson" : `Day ${lessonContext.day} · ${studyDay.type}`} · Lesson {lessonContext.lessonIndex + 1} of 4</p>
                <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">{subject}: {concept}</h1>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{lesson.purpose} This is a {level.label} lesson designed to be completed actively, not just read.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">{level.stage}</span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">60 minutes</span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">{subject}</span>
                </div>
              </div>
              <div className="grid min-w-[190px] gap-2 rounded-xl border border-border bg-background/80 p-4 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Programme</span><strong>365-day Study Lab</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{isArticleLesson ? "Source" : "Week"}</span><strong>{isArticleLesson ? "Ted's Lab article" : studyDay.week}</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Assessment</span><strong>Exit check + quiz</strong></div>
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
              <button key={value as string} type="button" onClick={() => setMode(value as typeof mode)} className={`inline-flex items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold ${mode === value ? "border-primary bg-primary/5 text-primary" : "border-transparent text-muted-foreground hover:bg-secondary"}`}>
                <Icon className="size-4" /> {label as string}
              </button>
            ))}
            <Link to="/notebook" className="inline-flex items-center justify-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary"><FileText className="size-4" /> Notebook</Link>
          </div>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
          <main className="min-w-0">
            {mode === "learn" && (
              <div className="space-y-5">
                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary"><Target className="size-5" /> Lesson objective</div>
                  <p className="mt-3 text-base leading-7 text-foreground">{lesson.purpose}</p>
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">You will be successful when</p>
                    <ul className="mt-3 space-y-2">{lesson.success.map((item) => <li key={item} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul>
                  </div>
                </section>

                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-lg font-bold"><BookOpen className="size-5 text-primary" /> Direct teaching</div>
                  <div className="mt-4 space-y-4">{lesson.teach.map((paragraph, i) => <div key={i} className="rounded-xl border border-border bg-secondary/20 p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary">Teaching point {i + 1}</p><p className="mt-2 text-sm leading-7 text-foreground">{paragraph}</p></div>)}</div>
                </section>

                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-lg font-bold"><Lightbulb className="size-5 text-primary" /> {lesson.title}</div>
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">Worked model</p>
                    <p className="mt-2 text-sm leading-7 text-foreground">{lesson.example}</p>
                  </div>
                </section>

                <section className="bio-panel p-6">
                  <div className="flex items-center gap-2 text-lg font-bold"><PenLine className="size-5 text-primary" /> Student task</div>
                  <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted-foreground">{lesson.practice.map((item) => <li key={item}>{item}</li>)}</ol>
                  <div className="mt-5 rounded-xl border border-border p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">Exit ticket</p>
                    <p className="mt-2 text-sm text-foreground">Without looking back, write three sentences explaining what you learned, one example, and one question you still have.</p>
                  </div>
                  <button type="button" onClick={completeLesson} disabled={lessonComplete} className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:cursor-default disabled:opacity-60">{lessonComplete ? "Lesson completed" : "Complete lesson"}</button>
                </section>
              </div>
            )}

            {mode === "notes" && (
              <section className="bio-panel p-6">
                <div className="flex items-center gap-2 text-lg font-bold"><NotebookPen className="size-5 text-primary" /> Lesson notes</div>
                <p className="mt-2 text-sm text-muted-foreground">Record your own explanation, examples, mistakes and questions. Notes are saved on this device.</p>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={saveNotes} placeholder="Write notes for this lesson…" className="mt-4 min-h-[360px] w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary" />
                <button type="button" onClick={saveNotes} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save notes</button>
              </section>
            )}

            {mode === "quiz" && (
              <section className="bio-panel p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><div className="flex items-center gap-2 text-lg font-bold"><Target className="size-5 text-primary" /> Lesson mastery quiz</div><p className="mt-1 text-sm text-muted-foreground">Answer from memory first. Feedback appears after marking.</p></div>
                  {marked && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{score}/{questions.length} · {Math.round(score / questions.length * 100)}%</span>}
                </div>
                <div className="mt-5 space-y-4">{questions.map((q, i) => <fieldset key={i} className="rounded-xl border border-border p-4"><legend className="px-1 text-sm font-semibold">{i + 1}. {q.prompt}</legend><div className="mt-3 grid gap-2">{q.options.map((option, oi) => <label key={oi} className={`flex cursor-pointer gap-2 rounded-lg border p-3 text-sm ${answers[i] === oi ? "border-primary bg-primary/5" : "border-border"}`}><input type="radio" name={`q-${i}`} checked={answers[i] === oi} onChange={() => { setAnswers(v => ({ ...v, [i]: oi })); setMarked(false); }} />{option}</label>)}</div>{marked && <p className={`mt-3 text-xs ${answers[i] === q.answer ? "text-emerald-600" : "text-destructive"}`}>{answers[i] === q.answer ? "Correct. " : "Review this. "}{q.explanation}</p>}</fieldset>)}</div>
                <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setMarked(true)} disabled={Object.keys(answers).length !== questions.length} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Mark quiz</button><button type="button" onClick={() => { setAnswers({}); setMarked(false); }} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm"><RotateCcw className="size-4" />Reset</button></div>
              </section>
            )}

            {mode === "test" && (
              <section className="bio-panel p-6">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><div className="flex items-center gap-2 font-bold"><LockKeyhole className="size-5 text-amber-600" /> Test mode · AI disabled</div><p className="mt-1 text-xs leading-6 text-muted-foreground">AI Tutor and Nexium are unavailable while this assessment is active. Use your own knowledge and notes only.</p></div>
                {!testStarted ? <button type="button" onClick={startTest} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Start 20-minute test</button> : (
                  <>
                    <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4"><span className="flex items-center gap-2 text-sm font-bold"><Clock3 className="size-4 text-primary" /> Time remaining</span><span className="font-mono text-lg font-bold text-primary">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span></div>
                    <div className="mt-5 space-y-4">{questions.map((q, i) => <fieldset key={i} className="rounded-xl border border-border p-4"><legend className="px-1 text-sm font-semibold">{i + 1}. {q.prompt}</legend><div className="mt-3 grid gap-2">{q.options.map((option, oi) => <label key={oi} className={`flex cursor-pointer gap-2 rounded-lg border p-3 text-sm ${answers[i] === oi ? "border-primary bg-primary/5" : "border-border"}`}><input type="radio" name={`test-${i}`} checked={answers[i] === oi} onChange={() => setAnswers(v => ({ ...v, [i]: oi }))} />{option}</label>)}</div></fieldset>)}</div>
                    <button type="button" onClick={() => setMarked(true)} className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Submit test</button>
                    {marked && <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm"><strong>Test result: {score}/{questions.length} · {Math.round(score / questions.length * 100)}%</strong><p className="mt-1 text-muted-foreground">Test mode has ended. You may now use the study tools again.</p></div>}
                  </>
                )}
              </section>
            )}
          </main>

          <aside className="space-y-4">
            <section className="bio-panel p-4">
              <h2 className="text-sm font-bold">Lesson tools</h2>
              <div className="mt-3 grid gap-2">
                <Link to="/ai" className={`flex items-center gap-3 rounded-lg border border-border p-3 text-sm font-medium hover:bg-secondary ${mode === "test" && testStarted && !marked ? "pointer-events-none opacity-40" : ""}`}><BrainCircuit className="size-4 text-primary" />AI Tutor</Link>
                <Link to="/llm" className={`flex items-center gap-3 rounded-lg border border-border p-3 text-sm font-medium hover:bg-secondary ${mode === "test" && testStarted && !marked ? "pointer-events-none opacity-40" : ""}`}><Sparkles className="size-4 text-primary" />Nexium</Link>
                <Link to="/notebook" className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm font-medium hover:bg-secondary"><NotebookPen className="size-4 text-primary" />Notebook</Link>
                <button type="button" onClick={() => setMode("notes")} className="flex items-center gap-3 rounded-lg border border-border p-3 text-left text-sm font-medium hover:bg-secondary"><FileText className="size-4 text-primary" />Lesson Notes</button>
                <button type="button" onClick={() => setMode("quiz")} className="flex items-center gap-3 rounded-lg border border-border p-3 text-left text-sm font-medium hover:bg-secondary"><Target className="size-4 text-primary" />Quiz</button>
              </div>
            </section>
            <section className="bio-panel p-4">
              <h2 className="flex items-center gap-2 text-sm font-bold"><TimerReset className="size-4 text-primary" /> Lesson sequence</h2>
              <ol className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
                {["Concept briefing", "Worked example", "Guided practice", "Independent application"].map((item, i) => <li key={item} className={`flex gap-2 ${i === lessonContext.lessonIndex ? "font-bold text-primary" : ""}`}><span>{i + 1}.</span><span>{item}</span></li>)}
              </ol>
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs leading-5 text-muted-foreground">
                <strong className="text-foreground">Progress is earned through active study.</strong> Leaving the lesson or remaining inactive pauses the active-time clock, so the lesson may take longer to finish.
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/study/lesson/$slug")({
  head: () => ({ meta: [{ title: "Study Lesson · Ted's Lab" }, { name: "description", content: "A structured Ted's Lab lesson with explicit teaching, worked examples, guided practice, independent application, notes, quizzes and assessment." }] }),
  component: StudyModePage,
});
