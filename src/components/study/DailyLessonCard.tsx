import { useState } from "react";
import { BookOpen, Brain, CheckCircle2, CirclePlay, Layers3, LockKeyhole } from "lucide-react";
import type { DailyStudyLesson } from "@/lib/study-enlist";

export function DailyLessonCard({
  lesson,
  completed,
  onComplete,
  signedIn,
}: {
  lesson: DailyStudyLesson;
  completed: boolean;
  onComplete: () => void;
  signedIn: boolean;
}) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState(false);
  const score = lesson.quiz.filter((question, index) => answers[index] === question.answer).length;
  const ready = lesson.quiz.every((_, index) => answers[index] !== undefined);
  const mastered = marked && score / lesson.quiz.length >= 0.8;

  return (
    <article className="bio-panel overflow-hidden">
      <div className="border-b border-border bg-secondary/30 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{lesson.subject}</span>
          <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{lesson.estimatedMinutes} min · {lesson.lessonType}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-foreground">{lesson.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A structured lesson with explicit teaching, guided practice, independent transfer and a mastery check.</p>
      </div>

      <div className="space-y-5 p-5">
        <section>
          <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><CheckCircle2 className="size-4 text-primary" /> Learning objectives</h4>
          <ul className="mt-2 space-y-2">{lesson.objectives.map((objective) => <li key={objective} className="text-sm text-muted-foreground">• {objective}</li>)}</ul>
        </section>

        <section>
          <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><BookOpen className="size-4 text-primary" /> Lesson sequence</h4>
          <ol className="mt-2 space-y-3">{lesson.teachingSequence.map((step, index) => <li key={step.heading} className="rounded-lg border border-border p-3"><p className="text-xs font-semibold text-primary">STEP {index + 1} · {step.heading}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.task}</p></li>)}</ol>
        </section>

        <section>
          <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><Layers3 className="size-4 text-primary" /> Flashcard deck · {lesson.flashcards.length} cards</h4>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">{lesson.flashcards.map((card, index) => <button key={card.front} type="button" onClick={() => setRevealed((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])} className="min-h-24 rounded-lg border border-border bg-secondary/20 p-3 text-left hover:border-primary/50"><span className="text-[10px] font-semibold uppercase tracking-wider text-primary">CARD {index + 1}</span><p className="mt-1 text-sm font-semibold text-foreground">{revealed.includes(index) ? card.back : card.front}</p><span className="mt-2 block text-xs text-muted-foreground">{revealed.includes(index) ? "Click to show question" : "Click to reveal answer"}</span></button>)}</div>
        </section>

        <section>
          <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><Brain className="size-4 text-primary" /> Mastery quiz · {lesson.quiz.length} questions</h4>
          <div className="mt-2 space-y-3">{lesson.quiz.map((question, index) => <fieldset key={question.question} className="rounded-lg border border-border p-3"><legend className="px-1 text-sm font-semibold text-foreground">{index + 1}. {question.question}</legend><div className="mt-2 grid gap-2">{question.options.map((option, optionIndex) => <label key={option} className={`flex cursor-pointer items-start gap-2 rounded-md border p-2 text-sm ${answers[index] === optionIndex ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground"}`}><input type="radio" name={`${lesson.id}-q${index}`} checked={answers[index] === optionIndex} disabled={marked} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-0.5 accent-primary" />{option}</label>)}</div>{marked && <p className="mt-2 text-xs text-muted-foreground">{question.explanation}</p>}</fieldset>)}</div>
          <div className="mt-3 flex flex-wrap items-center gap-3"><button type="button" disabled={!ready || marked} onClick={() => setMarked(true)} className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40">Mark quiz</button>{marked && <span className="text-sm font-semibold text-foreground">Score {score}/{lesson.quiz.length} · {Math.round(score / lesson.quiz.length * 100)}%</span>}</div>
          {marked && <p className="mt-2 text-xs text-muted-foreground">{mastered ? "Mastery achieved. You may complete this lesson." : "Review the teaching sequence and flashcards, then reset your quiz and try again. The completion target is 80%."}</p>}
        </section>

        <section className="grid gap-2 sm:grid-cols-2">
          <a href={lesson.articleUrl} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:border-primary/50"><BookOpen className="size-5 text-primary" /><span><strong className="block text-sm text-foreground">Related articles</strong><span className="text-xs text-muted-foreground">Explore {lesson.topic} in Knowledge Atlas</span></span></a>
          <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border p-3 hover:border-primary/50"><CirclePlay className="size-5 text-primary" /><span><strong className="block text-sm text-foreground">Lesson video</strong><span className="text-xs text-muted-foreground">Find a video for {lesson.topic}</span></span></a>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">{completed ? "Lesson completed" : "Complete the quiz with at least 80% to finish"}</span>
          <button type="button" onClick={onComplete} disabled={!signedIn || completed || !mastered} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">{completed ? <CheckCircle2 className="size-4" /> : <LockKeyhole className="size-4" />}{completed ? "Completed" : "Complete lesson"}</button>
        </div>
        {!signedIn && <p className="text-xs text-muted-foreground">Sign in to save lesson completion and report progress to your parent portal.</p>}
      </div>
    </article>
  );
}
