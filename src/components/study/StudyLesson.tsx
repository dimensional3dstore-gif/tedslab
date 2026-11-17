import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpenCheck, Brain, CheckCircle2, ChevronDown, ClipboardCheck, GraduationCap, Lightbulb, RotateCcw, Target } from "lucide-react";
import type { ArticleRow } from "@/lib/content";
import type { ArticleLayout } from "@/lib/article-layout";

type Question = { prompt: string; options: string[]; answer: number; explanation: string };

function makeQuestions(title: string, concepts: string[]): Question[] {
  const lead = concepts[0] ?? title;
  const second = concepts[1] ?? "the supporting evidence";
  return [
    { prompt: `Which approach best demonstrates understanding of “${title}”?`, options: ["Memorise the title without explaining it", `Define the idea, explain ${lead.toLowerCase()} and apply it to an example`, "Ignore the evidence and rely on a guess", "Copy a sentence without understanding it"], answer: 1, explanation: "Strong understanding combines an accurate definition, an explanation of the main idea and a relevant application." },
    { prompt: `When analysing ${title}, what should a strong learner do with ${second.toLowerCase()}?`, options: ["Treat it as unrelated detail", "Repeat it without interpretation", "Connect it to the central claim and explain its significance", "Avoid checking whether it is reliable"], answer: 2, explanation: "Evidence and supporting concepts should be connected to the central explanation, not simply repeated." },
    { prompt: "Which response shows transfer of learning?", options: ["Applying the concept to a new example and justifying the result", "Repeating the heading", "Leaving the question blank", "Selecting an answer at random"], answer: 0, explanation: "Transfer means using an idea in a new context and explaining why it applies." },
  ];
}

export function StudyLesson({ article, layout }: { article: ArticleRow; layout: ArticleLayout }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showMarking, setShowMarking] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const concepts = useMemo(() => [
    ...layout.overview,
    ...layout.sections.flatMap((section) => [...(section.paragraphs ?? []), ...(section.cards ?? []).map((card) => `${card.title}: ${card.text}`)]),
  ].filter(Boolean), [layout]);
  const questions = useMemo(() => makeQuestions(article.title, concepts), [article.title, concepts]);
  const vocabulary = useMemo(() => {
    const words = `${article.title} ${layout.tags.join(" ")} ${layout.sections.map((section) => section.heading).join(" ")}`
      .split(/[^A-Za-z][^A-Za-z'-]*/).map((word) => word.trim()).filter((word) => word.length > 5);
    return [...new Set(words)].slice(0, 8);
  }, [article.title, layout]);
  const score = questions.filter((question, index) => answers[index] === question.answer).length;
  const ready = questions.every((_, index) => answers[index] !== undefined);

  return (
    <section id="study-lesson" className="mt-10 scroll-mt-6 overflow-hidden rounded-2xl border border-primary/25 bg-card shadow-sm">
      <div className="border-b border-border bg-primary/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary"><GraduationCap className="size-5" /> STUDY ENLIST · ARTICLE LESSON</div>
          <span className="rounded-full border border-primary/20 bg-background px-3 py-1 text-xs text-muted-foreground">30–45 minute lesson</span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Master this article: {article.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">A structured lesson follows every encyclopedia article: clear outcomes, direct instruction, worked examples, guided practice, independent application and a mastery check.</p>
        <Link to="/study/lesson/$slug" params={{ slug: article.slug }} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Study Now <GraduationCap className="size-4" /></Link>
      </div>

      <div className="space-y-7 p-6">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground"><Target className="size-5 text-primary" /> 1. Learning outcomes</h3>
          <p className="mt-2 text-sm text-muted-foreground">By the end of this lesson, you should be able to:</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              `Define ${article.title} accurately using subject-specific vocabulary.`,
              `Explain the central ideas and mechanisms described in this article.`,
              "Interpret supporting examples, evidence, diagrams or data where provided.",
              "Apply the concepts to a new question and justify your reasoning.",
            ].map((item) => <li key={item} className="flex gap-2 rounded-lg border border-border bg-secondary/30 p-3 text-sm text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground"><BookOpenCheck className="size-5 text-primary" /> 2. Key vocabulary</h3>
          <div className="mt-3 flex flex-wrap gap-2">{vocabulary.map((word) => <span key={word} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">{word}</span>)}</div>
          <p className="mt-2 text-xs text-muted-foreground">Define each term in your own words and use it in a complete subject-specific sentence.</p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground"><Lightbulb className="size-5 text-primary" /> 3. Explicit teaching and worked knowledge</h3>
          <div className="mt-3 space-y-3">
            {layout.overview.slice(0, 4).map((paragraph, index) => <div key={index} className="rounded-xl border border-border p-4"><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">Teaching point {index + 1}</p><p className="text-sm leading-relaxed text-foreground">{paragraph}</p></div>)}
            {layout.sections.slice(0, 5).map((section, index) => <div key={section.heading} className="rounded-xl border border-border bg-secondary/25 p-4"><h4 className="font-semibold text-foreground">{section.heading}</h4>{section.paragraphs?.slice(0, 2).map((paragraph, pi) => <p key={pi} className="mt-2 text-sm leading-relaxed text-muted-foreground">{paragraph}</p>)}{section.cards?.slice(0, 3).map((card) => <div key={card.title} className="mt-3 border-l-2 border-primary/50 pl-3"><p className="text-sm font-medium text-foreground">{card.title}</p><p className="mt-1 text-sm text-muted-foreground">{card.text}</p></div>)}</div>)}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground"><Brain className="size-5 text-primary" /> 4. Guided and independent practice</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li><strong className="text-foreground">Retrieval:</strong> Close the article and write a 3–5 sentence explanation from memory.</li>
            <li><strong className="text-foreground">Guided:</strong> Re-open the article. Select one section and turn its main idea into a labelled diagram, flowchart or worked solution.</li>
            <li><strong className="text-foreground">Independent:</strong> Explain how two ideas in the article connect. Include a specific example and justify the connection.</li>
            <li><strong className="text-foreground">Transfer:</strong> Invent a new real-world scenario where the concept applies, then explain what would change if one condition were different.</li>
          </ol>
          <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
            <p className="text-sm font-semibold text-foreground">Written response challenge</p>
            <p className="mt-1 text-sm text-muted-foreground">“Explain the central idea of {article.title}, analyse at least two supporting concepts from the article, and evaluate why this knowledge matters.”</p>
            <p className="mt-2 text-xs text-muted-foreground">Marking guide: accurate knowledge (4), explanation and reasoning (4), relevant evidence/example (4), clarity and terminology (3). Total: 15 marks.</p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-lg font-bold text-foreground"><ClipboardCheck className="size-5 text-primary" /> 5. Mastery check</h3><span className="text-xs text-muted-foreground">3 questions · target 80%+</span></div>
          <div className="mt-3 space-y-4">{questions.map((question, index) => <fieldset key={index} className="rounded-xl border border-border p-4"><legend className="px-1 text-sm font-semibold text-foreground">{index + 1}. {question.prompt}</legend><div className="mt-2 grid gap-2">{question.options.map((option, optionIndex) => <label key={optionIndex} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm transition-colors ${answers[index] === optionIndex ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}><input type="radio" name={`study-question-${index}`} checked={answers[index] === optionIndex} onChange={() => { setAnswers((previous) => ({ ...previous, [index]: optionIndex })); setShowMarking(false); }} className="mt-0.5 accent-primary" />{option}</label>)}</div>{showMarking && <p className={`mt-3 text-xs ${answers[index] === question.answer ? "text-emerald-600" : "text-destructive"}`}>{answers[index] === question.answer ? "Correct. " : "Not quite. "}{question.explanation}</p>}</fieldset>)}</div>
          <div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" disabled={!ready} onClick={() => setShowMarking(true)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">Mark my answers</button><button type="button" onClick={() => { setAnswers({}); setShowMarking(false); }} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground"><RotateCcw className="size-4" /> Reset</button>{showMarking && <span className="text-sm font-semibold text-foreground">Score: {score}/{questions.length} ({Math.round(score / questions.length * 100)}%)</span>}</div>
          {showMarking && <p className="mt-2 text-sm text-muted-foreground">{score / questions.length >= 0.8 ? "Mastery target achieved. Continue to the next lesson and revisit this topic during weekly review." : "Mastery target not yet achieved. Re-read the teaching points, correct your notes and retry before progressing."}</p>}
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 p-4">
          <button type="button" onClick={() => setShowAnswers((value) => !value)} className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground"><span>6. Lesson completion checklist and self-review</span><ChevronDown className={`size-4 transition-transform ${showAnswers ? "rotate-180" : ""}`} /></button>
          {showAnswers && <ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li>□ I can explain the article without reading it.</li><li>□ I can define the key vocabulary accurately.</li><li>□ I can complete a new application question independently.</li><li>□ I have corrected every error and recorded one question for further study.</li></ul>}
        </div>
      </div>
    </section>
  );
}
