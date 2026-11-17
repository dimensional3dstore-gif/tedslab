import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  GraduationCap,
  LockKeyhole,
  PlayCircle,
  Target,
  Trophy,
  Archive,
  Clock3,
} from "lucide-react";
import {
  EXAM_PATHWAYS,
  GRADE_LEVELS,
  getStudyDay,
  getYearStructure,
} from "@/lib/study-enlist";

type DailySubject = {
  subject: string;
  concept: string;
  lessons: string[];
  quiz: string[];
};

const LESSON_DURATION_MINUTES = 60;

const LESSON_SEQUENCE = [
  "Concept briefing",
  "Worked example",
  "Guided practice",
  "Independent application",
];

function getDailySubjects(grade: number, day: number): DailySubject[] {
  const level = GRADE_LEVELS.find((item) => item.grade === grade) ?? GRADE_LEVELS[0];
  const primary = getStudyDay(grade, day);
  const subjectCount = level.subjects.length;

  return Array.from({ length: 3 }, (_, index) => {
    const subject = level.subjects[(day - 1 + index) % subjectCount];
    const source = getStudyDay(grade, Math.min(365, Math.max(1, day + index)));
    const concept =
      index === 0
        ? source.topic
        : `${subject}: ${source.topic}`;

    return {
      subject,
      concept,
      lessons: LESSON_SEQUENCE.map(
        (step) => `${step} — ${concept}`,
      ),
      quiz: [
        `Explain the key idea behind ${concept}.`,
        `Apply ${concept} to a new example.`,
        `Identify and correct one common misconception about ${concept}.`,
      ],
    };
  });
}

function StudySubjectCard({
  item,
  subjectNumber,
  onComplete,
  completed,
}: {
  item: DailySubject;
  subjectNumber: number;
  onComplete: () => void;
  completed: boolean;
}) {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(LESSON_DURATION_MINUTES * 60);

  useEffect(() => {
    if (completed || quizOpen) return;
    const timer = window.setInterval(() => {
      setSecondsRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [completed, quizOpen, lessonIndex]);

  useEffect(() => {
    setSecondsRemaining(LESSON_DURATION_MINUTES * 60);
  }, [lessonIndex]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;
  const lessonTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

  const nextLesson = () => {
    if (lessonIndex < item.lessons.length - 1) {
      setLessonIndex((value) => value + 1);
      return;
    }
    setQuizOpen(true);
  };

  return (
    <article className="bio-panel overflow-hidden">
      <div className="border-b border-border bg-secondary/30 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Subject {subjectNumber}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
              {item.subject}
            </h3>
          </div>
          {completed ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <CheckCircle2 className="size-4" /> Complete
            </span>
          ) : (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              Lesson {lessonIndex + 1} of {item.lessons.length}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <BookOpen className="size-4" /> Concept
          </div>
          <p className="mt-2 text-base font-semibold text-foreground">
            {item.concept}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Lessons
          </p>
          <div className="mt-3 space-y-2">
            {item.lessons.map((lesson, index) => (
              <Link
                to="/study/lesson/$slug"
                params={{ slug: `study-day-${day}-subject-${subjectNumber}-lesson-${index + 1}` }}
                className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
                  index === lessonIndex && !completed
                    ? "border-primary/40 bg-primary/5 hover:bg-primary/10"
                    : index < lessonIndex || completed
                      ? "border-primary/20 bg-secondary/20 hover:bg-secondary"
                      : "border-border bg-card hover:border-primary/30 hover:bg-secondary/30"
                }`}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground">
                    {LESSON_SEQUENCE[index]}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{lesson}</p>
                </div>
                {(index < lessonIndex || completed) && (
                  <CheckCircle2 className="ml-auto size-4 shrink-0 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-secondary/30 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Clock3 className="size-4 text-primary" />
              60-minute lesson block
            </div>
            <span className="font-mono text-sm font-bold text-primary">{lessonTime}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Every lesson is designed as a full one-hour study block for teaching, notes, examples, practice and retrieval.
          </p>
        </div>

        {!quizOpen && !completed && (
          <button
            type="button"
            onClick={nextLesson}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <PlayCircle className="size-4" />
            {lessonIndex === item.lessons.length - 1
              ? "Finish lessons & open quiz"
              : "Complete lesson & continue"}
          </button>
        )}

        {quizOpen && !completed && (
          <div className="mt-5 rounded-xl border border-border bg-secondary/20 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <CircleHelp className="size-4 text-primary" /> Subject Quiz
            </div>
            <div className="mt-3 space-y-2">
              {item.quiz.map((question, index) => (
                <div key={question} className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-medium text-foreground">
                    {index + 1}. {question}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onComplete}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary/10 px-4 py-3 text-sm font-bold text-primary hover:bg-primary/15"
            >
              <CheckCircle2 className="size-4" /> Mark subject quiz complete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function StudyEnlistPage() {
  const [grade, setGrade] = useState(7);
  const [day, setDay] = useState(1);
  const [showAllWeeks, setShowAllWeeks] = useState(false);
  const [completedSubjects, setCompletedSubjects] = useState<number[]>([]);
  const [archivedDays, setArchivedDays] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("teds-lab-study-archive");
      if (saved) setArchivedDays(JSON.parse(saved));
    } catch {
      // Ignore unavailable or malformed local archive data.
    }
  }, []);

  const archiveCurrentDay = () => {
    if (completedSubjects.length !== 3) return;
    setArchivedDays((current) => {
      const next = current.includes(day) ? current : [...current, day].sort((a, b) => a - b);
      window.localStorage.setItem("teds-lab-study-archive", JSON.stringify(next));
      return next;
    });
  };
  const level = GRADE_LEVELS.find((item) => item.grade === grade)!;
  const today = getStudyDay(grade, day);
  const weeks = useMemo(() => getYearStructure(grade), [grade]);
  const dailySubjects = useMemo(() => getDailySubjects(grade, day), [grade, day]);
  const visibleWeeks = showAllWeeks ? weeks : weeks.slice(0, 12);
  const allSubjectsComplete = completedSubjects.length === 3;

  const setGradeLevel = (value: number) => {
    setGrade(value);
    setDay(1);
    setCompletedSubjects([]);
  };

  const moveDay = (delta: number) => {
    setDay((value) => Math.min(365, Math.max(1, value + delta)));
    setCompletedSubjects([]);
  };

  const completeSubject = (subjectNumber: number) => {
    setCompletedSubjects((current) =>
      current.includes(subjectNumber)
        ? current
        : [...current, subjectNumber],
    );
  };

  return (
    <AppShell>
      <div className="space-y-7">
        <PageHeader
          title="Study Lab"
          description="A strict, sequential daily learning programme. Enlisted students complete three subjects each day, moving through each lesson in order before taking the subject quiz and the final end-of-lessons quiz."
        />

        <section className="overflow-hidden rounded-2xl border border-primary/25 bg-card">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <GraduationCap className="size-5" /> STUDY LAB ENLISTMENT
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                Day {day}: complete the work. Then earn the next day.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Your daily programme is deliberately sequential: Subject 1,
                Subject 2, Subject 3, then the End Of Lessons Quiz. Do not skip
                a lesson. Each subject must reach its quiz before the final
                daily assessment unlocks.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "3", l: "subjects / day" },
                { n: "4", l: "lessons / subject" },
                { n: "3", l: "quiz questions / subject" },
                { n: "1", l: "end-of-day quiz" },
              ].map((item) => (
                <div
                  key={item.l}
                  className="rounded-xl border border-border bg-secondary/40 p-4"
                >
                  <p className="font-display text-2xl font-bold text-foreground">
                    {item.n}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Enlisted programme
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose the learner's grade. The daily subjects are generated
                from the 365-day curriculum for that level.
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {level.stage}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {GRADE_LEVELS.map((item) => (
              <button
                key={item.grade}
                type="button"
                onClick={() => setGradeLevel(item.grade)}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  grade === item.grade
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary/30 text-foreground hover:bg-secondary"
                }`}
              >
                <span className="block text-xs opacity-70">
                  LEVEL {item.grade}
                </span>
                <span className="mt-1 block text-sm font-bold">
                  {item.label.replace(" · Advanced", "")}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
            <h3 className="font-semibold text-foreground">
              {level.label} · {level.focus}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Subjects: {level.subjects.join(" · ")}
            </p>
          </div>
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Subjects Of The Day
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">
                Day {day} of 365
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                Week {today.week}
              </span>
              <button
                type="button"
                onClick={() => moveDay(-1)}
                disabled={day === 1}
                className="rounded-lg border border-border p-2 disabled:opacity-30"
                aria-label="Previous day"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => moveDay(1)}
                disabled={day === 365}
                className="rounded-lg border border-border p-2 disabled:opacity-30"
                aria-label="Next day"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            {dailySubjects.map((item, index) => (
              <StudySubjectCard
                key={`${item.subject}-${index}`}
                item={item}
                subjectNumber={index + 1}
                completed={completedSubjects.includes(index + 1)}
                onComplete={() => completeSubject(index + 1)}
              />
            ))}
          </div>
        </section>

        <section
          className={`bio-panel p-5 ${
            allSubjectsComplete
              ? "border-primary/40 bg-primary/5"
              : "border-border"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                End Of Lessons Quiz
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">
                {allSubjectsComplete
                  ? "Daily final assessment unlocked"
                  : "Complete all three subject quizzes first"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                This cumulative quiz checks whether the learner can retrieve,
                connect and apply today's three concepts without relying on the
                lesson screens.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="size-6 text-primary" />
              <span className="text-sm font-bold text-foreground">
                {completedSubjects.length}/3 subjects complete
              </span>
            </div>
          </div>

          {allSubjectsComplete && (
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {dailySubjects.map((item, index) => (
                <div
                  key={item.subject}
                  className="rounded-xl border border-primary/20 bg-card p-4"
                >
                  <p className="text-xs font-semibold text-primary">
                    FINAL QUIZ · {index + 1}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {item.subject}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Retrieve the concept, apply it to a new problem, and
                    explain your reasoning.
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            disabled={!allSubjectsComplete}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Target className="size-4" />
            Start End Of Lessons Quiz
          </button>
          <button
            type="button"
            disabled={!allSubjectsComplete}
            onClick={archiveCurrentDay}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Archive className="size-4" />
            {archivedDays.includes(day) ? "Day archived" : "Archive completed study"}
          </button>
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Website archive
              </p>
              <h2 className="mt-1 text-xl font-bold text-foreground">
                Study Lab Archive
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                View completed Study Lab work separately from the active programme.
              </p>
            </div>
            <Link
              to="/study/archive"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10"
            >
              <Archive className="size-4" /> Open website archive
            </Link>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Study Archive
              </p>
              <h2 className="mt-1 text-xl font-bold text-foreground">
                Completed study days
              </h2>
            </div>
            <Archive className="size-5 text-primary" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Completed days are kept in the learner's local Study Archive so finished work is separated from the active programme.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {archivedDays.length ? archivedDays.map((archivedDay) => (
              <button
                key={archivedDay}
                type="button"
                onClick={() => setDay(archivedDay)}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
              >
                Day {archivedDay}
              </button>
            )) : (
              <span className="text-xs text-muted-foreground">No completed days archived yet.</span>
            )}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <div className="bio-panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Daily lesson planner
                </p>
                <h2 className="mt-1 text-xl font-bold text-foreground">
                  {today.subject} · {today.topic}
                </h2>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                {today.type}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {today.description}
            </p>
            <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Required evidence of learning
              </p>
              <p className="mt-2 text-sm text-foreground">{today.assessment}</p>
            </div>
          </div>

          <div className="bio-panel p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Target className="size-5 text-primary" /> Non-negotiable weekly
              cycle
            </h2>
            <ol className="mt-4 space-y-3">
              {[
                "Explicit teaching and vocabulary",
                "Deep understanding and misconceptions",
                "Worked examples and modelling",
                "Guided practice with feedback",
                "Independent application",
                "Cumulative retrieval and extension",
                "Weekly mastery test (80% target)",
              ].map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <LockKeyhole className="size-4 text-amber-600" /> Mastery gate
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                A weekly score below 80% triggers a required correction
                session: review errors, revisit prerequisite concepts, complete
                a fresh practice set and retest before marking the week mastered.
              </p>
            </div>
          </div>
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <CalendarDays className="size-5 text-primary" /> 52-week
                curriculum map
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Each week includes six learning/practice days and a seventh-day
                mastery assessment. Day 365 is the final capstone.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAllWeeks((value) => !value)}
              className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground"
            >
              {showAllWeeks ? "Show first 12 weeks" : "Show all 52 weeks"}
            </button>
          </div>
          <div className="mt-4 divide-y divide-border">
            {visibleWeeks.map((week) => (
              <button
                key={week.week}
                type="button"
                onClick={() => setDay(Math.max(1, week.assessmentDay - 6))}
                className="flex w-full flex-wrap items-center justify-between gap-3 py-3 text-left hover:bg-secondary/40"
              >
                <div>
                  <p className="text-xs font-semibold text-primary">
                    WEEK {week.week} · {week.subject}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {week.topic}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  Days {(week.week - 1) * 7 + 1}–{week.assessmentDay} · Test day{" "}
                  <ChevronRight className="inline size-3" />
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/40 p-3 text-xs text-muted-foreground">
            <CheckCircle2 className="size-4 shrink-0 text-primary" /> Day 365:
            cumulative final examination, applied capstone and next-grade
            readiness review.
          </div>
        </section>

        <section className="bio-panel p-5">
          <h2 className="text-lg font-bold text-foreground">
            Australian examination and competition pathways
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Preparation is mapped to relevant ages and pathways. Official
            dates, eligibility, formats and syllabuses can change; always
            verify current requirements with the exam organiser or education
            authority.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {EXAM_PATHWAYS.map((exam) => (
              <div
                key={exam.name}
                className="rounded-xl border border-border bg-secondary/25 p-4"
              >
                <h3 className="font-semibold text-foreground">{exam.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {exam.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Study Lab · 365-day curriculum — Ted's Lab" },
      {
        name: "description",
        content:
          "A strict 365-day Study Lab with three subjects per day, sequential lessons, subject quizzes and an end-of-lessons quiz.",
      },
    ],
  }),
  component: StudyEnlistPage,
});
