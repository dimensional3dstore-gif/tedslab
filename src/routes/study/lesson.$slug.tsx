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
  const common = {
    learn: {
      title: "Concept briefing",
      purpose: "Build the core knowledge before you practise it.",
    },
    example: {
      title: "Worked example",
      purpose: "See a complete model and understand why each step works.",
    },
    practice: {
      title: "Guided practice",
      purpose: "Try the skill with prompts that gradually remove support.",
    },
    independent: {
      title: "Independent application",
      purpose: "Transfer the knowledge to a new problem without a worked solution.",
    },
  }[phase];

  if (subject === "Mathematics" || subject === "Advanced Mathematics") {
    return {
      ...common,
      teach: [
        `Today's mathematical focus is ${topic}. Start by identifying the quantities, relationships or structures that the problem is describing.`,
        "Use mathematical language precisely. Write down what is known, what must be found, and which operation, representation or rule connects them.",
        "A correct solution is more than an answer: show the method, keep units where relevant, and check whether the result is reasonable.",
      ],
      example: `Worked model: take a simple case related to ${topic}. First identify the known information, choose the relevant representation or rule, complete one step at a time, then substitute the result back into the original situation to check it.`,
      practice: [
        `Explain what ${topic} means in your own words.`,
        "Create one easy example and solve it, showing every step.",
        "Change one value in your example and solve the new version.",
      ],
      success: [
        "I can identify the mathematical structure before calculating.",
        "I can show a complete method rather than only an answer.",
        "I can check my result using estimation, substitution or another representation.",
      ],
    };
  }

  if (subject === "Science" || subject === "Biology" || subject === "Chemistry" || subject === "Physics" || subject === "Advanced Sciences") {
    return {
      ...common,
      teach: [
        `The scientific focus is ${topic}. Scientific understanding connects observations to models, mechanisms and evidence rather than relying on memorised statements alone.`,
        "Separate an observation from an explanation. An observation describes what was measured or seen; an explanation proposes why the pattern occurred.",
        "When evidence is collected, look for variables, patterns, uncertainty and alternative explanations. A strong conclusion is proportional to the evidence.",
      ],
      example: `Worked model: investigate a question connected to ${topic}. State a testable question, identify the independent and dependent variables, predict a result, describe how evidence would be collected, and explain what result would support the prediction.`,
      practice: [
        `Write one testable question about ${topic}.`,
        "Identify the variables and one factor that should be controlled.",
        "Describe what evidence would make your conclusion stronger or weaker.",
      ],
      success: [
        "I can distinguish evidence from an explanation.",
        "I can identify variables and describe a fair investigation.",
        "I can use evidence to support a conclusion and acknowledge limitations.",
      ],
    };
  }

  if (subject === "English" || subject === "Academic Writing") {
    return {
      ...common,
      teach: [
        `Today's literacy focus is ${topic}. Strong communication begins with a clear purpose, audience and central idea.`,
        "Build claims from evidence. A useful paragraph makes a point, gives relevant evidence or an example, explains its significance, and links back to the argument.",
        "Revise for meaning before polishing grammar. Ask whether each sentence contributes to the purpose and whether the evidence actually supports the claim.",
      ],
      example: `Worked model: write a short response about ${topic}. Begin with a clear claim, introduce one relevant example, explain how it supports the claim, then finish with a sentence that connects the evidence to the overall idea.`,
      practice: [
        `Write a one-sentence claim about ${topic}.`,
        "Add one specific example or piece of evidence.",
        "Explain why that evidence matters rather than merely repeating it.",
      ],
      success: [
        "I can state a clear claim.",
        "I can select relevant evidence and explain it.",
        "I can revise a response so every paragraph has a clear purpose.",
      ],
    };
  }

  if (subject === "Humanities" || subject === "Modern History" || subject === "Geography" || subject === "Economics") {
    return {
      ...common,
      teach: [
        `Today's humanities focus is ${topic}. The key skill is constructing an explanation from evidence, context and competing perspectives.`,
        "Ask who created a source, when and why. Context can change how reliable or useful a source is for a particular question.",
        "Avoid treating a single source as the whole story. Compare evidence, identify patterns and differences, then make a reasoned judgement.",
      ],
      example: `Worked model: examine a claim connected to ${topic}. Identify the claim, select two pieces of evidence, explain what each supports, compare their limitations, and finish with a justified conclusion.`,
      practice: [
        `Write one claim about ${topic} that could be investigated.`,
        "List two kinds of evidence that could support or challenge the claim.",
        "Explain one limitation or alternative interpretation.",
      ],
      success: [
        "I can distinguish a claim from evidence.",
        "I can explain why a source or data point is useful.",
        "I can reach a conclusion that is justified by multiple pieces of evidence.",
      ],
    };
  }

  if (subject === "Digital Technologies" || subject === "Computer Science") {
    return {
      ...common,
      teach: [
        `Today's computing focus is ${topic}. Good digital problem solving begins by decomposing a problem into smaller, testable parts.`,
        "Represent information clearly, define inputs and outputs, and make the sequence of operations explicit.",
        "Test with normal, boundary and unexpected cases. When something fails, isolate the smallest part that could be wrong and change one thing at a time.",
      ],
      example: `Worked model: design a small solution related to ${topic}. State the problem, define the input and expected output, sketch the algorithm or data structure, test it with an example, then record the result and any correction.`,
      practice: [
        `Decompose a small problem related to ${topic} into at least three steps.`,
        "Write the expected input and output.",
        "Invent an edge case that could make your first solution fail.",
      ],
      success: [
        "I can break a problem into manageable components.",
        "I can describe an algorithm or representation clearly.",
        "I can test and debug rather than assuming a solution works.",
      ],
    };
  }

  if (subject === "Health & Physical Education") {
    return {
      ...common,
      teach: [
        `Today's health and physical education focus is ${topic}. Effective decisions combine knowledge, personal goals, safety and evidence.`,
        "Use specific observations rather than vague judgements. In movement or fitness work, describe technique, intensity, recovery and the reason for a change.",
        "Health decisions should consider immediate and longer-term consequences, available support, and the context in which the decision is made.",
      ],
      example: `Worked model: apply ${topic} to a realistic scenario. Identify the goal, describe the safest or most effective option, justify it using relevant principles, and explain how you would evaluate the result.`,
      practice: [
        `Describe one goal related to ${topic}.`,
        "Choose an action that could help achieve it and justify the choice.",
        "Name one risk or limitation and explain how you would manage it.",
      ],
      success: [
        "I can explain a choice using relevant principles.",
        "I can identify risks and practical ways to manage them.",
        "I can evaluate whether a strategy is working and adjust it.",
      ],
    };
  }

  return {
    ...common,
    teach: [
      `Today's focus is ${topic}. Begin by defining the key idea and identifying the knowledge needed to use it.`,
      "Connect the idea to a concrete example, then explain the relationship rather than simply naming it.",
      "Strong learning includes retrieval, application and correction. If an answer is wrong, identify the exact step or assumption that caused the error.",
    ],
    example: `Worked model: take a simple situation involving ${topic}. Identify the central idea, apply it step by step, explain the reasoning, and check the result against the original question.`,
    practice: [
      `Explain ${topic} without looking at your notes.`,
      "Create a new example and solve or explain it.",
      "Write one misconception a learner might have and correct it.",
    ],
    success: [
      "I can explain the idea without copying the lesson.",
      "I can apply it to a new situation.",
      "I can identify and correct an error.",
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

  const studyDay = useMemo(() => study ? getStudyDay(7, study.day) : null, [study]);
  const level = useMemo(() => study ? GRADE_LEVELS.find((item) => item.grade === 7) : null, [study]);
  const subject = study && level ? level.subjects[(study.day - 1 + study.subjectNumber - 1) % level.subjects.length] : null;
  const concept = study && subject ? getStudyDay(7, Math.min(365, study.day + study.subjectNumber - 1)).topic : null;
  const phase = study && study.lessonIndex >= 0 && study.lessonIndex < 4 ? (["learn", "example", "practice", "independent"] as Phase[])[study.lessonIndex] : null;
  const lesson = subject && concept && phase ? makeLesson(subject, concept, phase) : null;
  const questions = subject && concept ? makeQuestions(subject, concept) : [];
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const activeMinutes = Math.floor(activeSeconds / 60);
  const plannedMinutes = 60;
  const remainingMinutes = Math.max(0, plannedMinutes - Math.floor(activeSeconds / 60));
  const lessonProgress = lessonComplete ? 100 : Math.min(95, Math.round(((study?.lessonIndex ?? 0) + 0.25) / 4 * 100));

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

  if (!study || !studyDay || !level || !subject || !concept || !phase || !lesson) {
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
        </div>

        <header className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm">
          <div className="bg-primary/5 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Day {study.day} · {studyDay.type} · Lesson {study.lessonIndex + 1} of 4</p>
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
                <div className="flex justify-between"><span className="text-muted-foreground">Week</span><strong>{studyDay.week}</strong></div>
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
                {["Concept briefing", "Worked example", "Guided practice", "Independent application"].map((item, i) => <li key={item} className={`flex gap-2 ${i === study.lessonIndex ? "font-bold text-primary" : ""}`}><span>{i + 1}.</span><span>{item}</span></li>)}
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
