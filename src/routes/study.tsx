import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, LockKeyhole, Target } from "lucide-react";
import { EXAM_PATHWAYS, GRADE_LEVELS, getDailyLessons, getStudyDay, getYearStructure } from "@/lib/study-enlist";
import { DailyLessonCard } from "@/components/study/DailyLessonCard";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseAuthClient } from "@/integrations/supabase/auth";
import { useStudentPermissions } from "@/hooks/use-student-permissions";

export const Route = createFileRoute("/study")({
  head: () => ({ meta: [{ title: "Study Enlist · 365-day curriculum — Ted's Lab" }, { name: "description", content: "A rigorous 365-day Australian learning programme for Grades 1–13, with daily lessons, weekly mastery tests and exam preparation." }] }),
  component: StudyEnlistPage,
});

function StudyEnlistPage() {
  const [grade, setGrade] = useState(7);
  const [day, setDay] = useState(1);
  const [showAllWeeks, setShowAllWeeks] = useState(false);
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  const [onboarding, setOnboarding] = useState<"loading" | "pending" | "ready">("loading");
  const [progressError, setProgressError] = useState("");
  const { user, loading: authLoading } = useAuth();
  const permissions = useStudentPermissions();
  const level = GRADE_LEVELS.find((item) => item.grade === grade)!;
  const today = getStudyDay(grade, day);
  const weeks = useMemo(() => getYearStructure(grade), [grade]);
  const lessons = useMemo(() => getDailyLessons(grade, day), [grade, day]);
  const visibleWeeks = showAllWeeks ? weeks : weeks.slice(0, 12);
  const setGradeLevel = (value: number) => { setGrade(value); setDay(1); };
  const moveDay = (delta: number) => setDay((value) => Math.min(365, Math.max(1, value + delta)));

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setOnboarding("ready"); setCompletedSubjects([]); return; }
    let active = true;
    const loadProgress = async () => {
      try {
        const client = getSupabaseAuthClient();
        const { data: profile, error: profileError } = await client.from("student_profiles").select("grade_level,onboarding_complete").eq("student_id", user.id).maybeSingle();
        if (profileError) throw profileError;
        if (profile && !profile.onboarding_complete) {
          if (active) { setOnboarding("pending"); setCompletedSubjects([]); }
          return;
        }
        const activeGrade = profile?.grade_level ?? grade;
        if (profile?.grade_level && active) setGrade(profile.grade_level);
        const { data, error } = await client.from("study_progress").select("subject,status").eq("student_id", user.id).eq("grade_level", activeGrade).eq("curriculum_day", day);
        if (error) throw error;
        if (active) {
          setCompletedSubjects((data ?? []).filter((item) => item.status === "completed").map((item) => item.subject));
          setOnboarding("ready");
          setProgressError("");
        }
      } catch (error) {
        if (active) { setProgressError(error instanceof Error ? error.message : "Unable to load study progress."); setOnboarding("ready"); }
      }
    };
    void loadProgress();
    return () => { active = false; };
  }, [user, authLoading, grade, day]);

  const completeLesson = async (subject: string, quizScore: number) => {
    if (!user) return;
    try {
      const now = new Date().toISOString();
      const { error } = await getSupabaseAuthClient().from("study_progress").upsert({
        student_id: user.id, grade_level: grade, curriculum_day: day, subject,
        status: "completed", quiz_score: quizScore, completed_at: now, updated_at: now,
      }, { onConflict: "student_id,grade_level,curriculum_day,subject" });
      if (error) throw error;
      setCompletedSubjects((current) => current.includes(subject) ? current : [...current, subject]);
      setProgressError("");
    } catch (error) {
      setProgressError(error instanceof Error ? error.message : "Unable to save lesson progress.");
    }
  };

  return (
    <AppShell>
      <div className="space-y-7">
        {permissions.browserLockEnabled && <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4"><div><p className="font-semibold text-foreground">Supervised study mode is enabled</p><p className="mt-1 text-xs text-muted-foreground">Ted’s Lab will keep the learner focused within this study experience. Full-screen mode is optional and does not block other browser tabs or device applications.</p></div><button type="button" onClick={() => { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen?.(); }} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">{typeof document !== "undefined" && document.fullscreenElement ? "Exit full screen" : "Start focus session"}</button></div>}

        <PageHeader title="Study Enlist" description="A disciplined, 365-day learning programme built into Ted’s Lab. Every day has a defined learning task; every seventh day is a mastery assessment; Day 365 is the cumulative final examination and portfolio." />
        <section className="overflow-hidden rounded-2xl border border-primary/25 bg-card">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div><div className="flex items-center gap-2 text-sm font-semibold text-primary"><GraduationCap className="size-5" /> THE 365-DAY STANDARD</div><h2 className="mt-3 font-display text-3xl font-bold text-foreground">One year. Thirteen grade levels. Daily progress.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Follow a fixed sequence of explicit teaching, worked examples, guided practice, independent application, retrieval and assessment. Progress is mastery-led, not merely time-led.</p></div>
            <div className="grid grid-cols-2 gap-3">{[{n:"365",l:"planned days"},{n:"52",l:"weekly cycles"},{n:"80%",l:"weekly mastery target"},{n:"13",l:"grade levels"}].map((item) => <div key={item.l} className="rounded-xl border border-border bg-secondary/40 p-4"><p className="font-display text-2xl font-bold text-foreground">{item.n}</p><p className="mt-1 text-xs text-muted-foreground">{item.l}</p></div>)}</div>
          </div>
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-foreground">Choose your grade</h2><p className="mt-1 text-xs text-muted-foreground">Select the learner’s current level. Grades 11–12 align to senior secondary pathways; Grade 13 is an optional advanced extension year.</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{level.stage}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">{GRADE_LEVELS.map((item) => <button key={item.grade} type="button" onClick={() => setGradeLevel(item.grade)} className={`rounded-xl border p-3 text-left transition-colors ${grade === item.grade ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary/30 text-foreground hover:bg-secondary"}`}><span className="block text-xs opacity-70">LEVEL {item.grade}</span><span className="mt-1 block text-sm font-bold">{item.label.replace(" · Advanced", "")}</span></button>)}</div>
          <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4"><h3 className="font-semibold text-foreground">{level.label} · {level.focus}</h3><p className="mt-2 text-xs text-muted-foreground">Subjects: {level.subjects.join(" · ")}</p></div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <div className="bio-panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Daily lesson planner</p><h2 className="mt-1 text-xl font-bold text-foreground">Day {day} of 365</h2></div><div className="flex items-center gap-2"><button type="button" onClick={() => moveDay(-1)} disabled={day === 1} className="rounded-lg border border-border p-2 disabled:opacity-30" aria-label="Previous day"><ChevronLeft className="size-4" /></button><button type="button" onClick={() => moveDay(1)} disabled={day === 365} className="rounded-lg border border-border p-2 disabled:opacity-30" aria-label="Next day"><ChevronRight className="size-4" /></button></div></div>
            <div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Week {today.week}</span><span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{today.type}</span></div>
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{today.topic}</h3><p className="mt-1 text-sm font-medium text-primary">Five daily subjects: {lessons.map((lesson) => lesson.subject).join(" · ")}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{today.description}</p>
            <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Required evidence of learning</p><p className="mt-2 text-sm text-foreground">{today.assessment}</p></div>
            <div className="mt-4 grid grid-cols-7 gap-1.5">{Array.from({length:7},(_,index)=>{const n=(Math.ceil(day/7)-1)*7+index+1;return <button key={n} type="button" onClick={()=>setDay(n)} className={`rounded-lg py-2 text-xs font-semibold ${day===n?"bg-primary text-primary-foreground":n>365?"bg-transparent text-muted-foreground/30":"bg-secondary text-muted-foreground hover:bg-primary/10"}`} disabled={n>365}>{n<=365?n:"—"}</button>})}</div>
          </div>
          <div className="bio-panel p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><Target className="size-5 text-primary" /> Non-negotiable weekly cycle</h2>
            <ol className="mt-4 space-y-3">{["Explicit teaching and vocabulary","Deep understanding and misconceptions","Worked examples and modelling","Guided practice with feedback","Independent application","Cumulative retrieval and extension","Weekly mastery test (80% target)"].map((item,index)=><li key={item} className="flex items-start gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index+1}</span><span className="pt-1 text-sm text-muted-foreground">{item}</span></li>)}</ol>
            <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><p className="flex items-center gap-2 text-sm font-semibold text-foreground"><LockKeyhole className="size-4 text-amber-600" /> Mastery gate</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">A weekly score below 80% triggers a required correction session: review errors, revisit prerequisite concepts, complete a fresh practice set and retest before marking the week mastered.</p></div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Five-subject learning day</p><h2 className="mt-1 text-2xl font-bold text-foreground">Day {day} · Five subject lessons</h2><p className="mt-1 text-sm text-muted-foreground">Each lesson includes explicit teaching, a flashcard deck, a mastery quiz, related Knowledge Atlas articles and a video resource.</p></div>
            <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground">{completedSubjects.length}/5 completed</span>
          </div>
          {onboarding === "pending" && <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"><p className="font-semibold text-foreground">Waiting for parent or guardian approval</p><p className="mt-1 text-sm text-muted-foreground">Your parent must complete the secure invitation and approve your learning settings before Study Enlist can be used.</p><a href="/parent" className="mt-3 inline-flex rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Open parent portal</a></div>}
          {progressError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{progressError}</p>}
          {onboarding !== "pending" && <div className="grid gap-5 xl:grid-cols-2">{lessons.map((lesson) => <DailyLessonCard key={lesson.id} lesson={lesson} completed={completedSubjects.includes(lesson.subject)} onComplete={(score) => void completeLesson(lesson.subject, score)} signedIn={Boolean(user)} />)}</div>}
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><CalendarDays className="size-5 text-primary" /> 52-week curriculum map</h2><p className="mt-1 text-xs text-muted-foreground">Each week includes six learning/practice days and a seventh-day mastery assessment. Day 365 is the final capstone.</p></div><button type="button" onClick={()=>setShowAllWeeks((value)=>!value)} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground">{showAllWeeks?"Show first 12 weeks":"Show all 52 weeks"}</button></div>
          <div className="mt-4 divide-y divide-border">{visibleWeeks.map((week)=><button key={week.week} type="button" onClick={()=>setDay(week.assessmentDay-6)} className="flex w-full flex-wrap items-center justify-between gap-3 py-3 text-left hover:bg-secondary/40"><div><p className="text-xs font-semibold text-primary">WEEK {week.week} · {week.subject}</p><p className="mt-1 text-sm font-medium text-foreground">{week.topic}</p></div><span className="text-xs text-muted-foreground">Days {(week.week-1)*7+1}–{week.assessmentDay} · Test day <ChevronRight className="inline size-3" /></span></button>)}</div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/40 p-3 text-xs text-muted-foreground"><CheckCircle2 className="size-4 shrink-0 text-primary" /> Day 365: cumulative final examination, applied capstone and next-grade readiness review.</div>
        </section>

        <section className="bio-panel p-5">
          <h2 className="text-lg font-bold text-foreground">Australian examination and competition pathways</h2><p className="mt-1 text-xs text-muted-foreground">Preparation is mapped to relevant ages and pathways. Official dates, eligibility, formats and syllabuses can change; always verify current requirements with the exam organiser or education authority.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">{EXAM_PATHWAYS.map((exam)=><div key={exam.name} className="rounded-xl border border-border bg-secondary/25 p-4"><h3 className="font-semibold text-foreground">{exam.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exam.detail}</p></div>)}</div>
        </section>
      </div>
    </AppShell>
  );
}
