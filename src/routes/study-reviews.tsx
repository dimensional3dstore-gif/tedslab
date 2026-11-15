import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseAuthClient } from "@/integrations/supabase/auth";
import { BarChart3, BookOpenCheck, Target, Trophy } from "lucide-react";

type ProgressRow = {
  subject: string;
  status: "not_started" | "in_progress" | "completed";
  quiz_score: number | null;
  curriculum_day: number;
  updated_at: string;
};

export const Route = createFileRoute("/study-reviews")({
  head: () => ({ meta: [{ title: "Study Reviews — Ted's Lab" }, { name: "description", content: "Review mastery, quiz results and curriculum progress." }] }),
  component: StudyReviewsPage,
});

function StudyReviewsPage() {
  const { user, loading } = useAuth();
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) { setBusy(false); return; }
    let active = true;
    void (async () => {
      try {
        const client = getSupabaseAuthClient();
        const { data, error: queryError } = await client
          .from("study_progress")
          .select("subject,status,quiz_score,curriculum_day,updated_at")
          .order("updated_at", { ascending: false })
          .limit(500);
        if (queryError) throw queryError;
        if (active) setRows((data ?? []) as ProgressRow[]);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Could not load study reviews.");
      } finally {
        if (active) setBusy(false);
      }
    })();
    return () => { active = false; };
  }, [user, loading]);

  const completed = rows.filter((row) => row.status === "completed");
  const scored = completed.filter((row) => row.quiz_score !== null);
  const average = scored.length ? Math.round(scored.reduce((sum, row) => sum + Number(row.quiz_score), 0) / scored.length) : 0;
  const subjectSummary = useMemo(() => {
    const map = new Map<string, { completed: number; total: number; scores: number[] }>();
    for (const row of rows) {
      const item = map.get(row.subject) ?? { completed: 0, total: 0, scores: [] };
      item.total += 1;
      if (row.status === "completed") item.completed += 1;
      if (row.quiz_score !== null) item.scores.push(Number(row.quiz_score));
      map.set(row.subject, item);
    }
    return [...map.entries()].map(([subject, item]) => ({ subject, ...item, average: item.scores.length ? Math.round(item.scores.reduce((a,b) => a+b,0) / item.scores.length) : null })).sort((a,b) => b.completed-a.completed);
  }, [rows]);

  return (
    <AppShell>
      <PageHeader title="Study Reviews" description="A candid record of what you have mastered, what needs work and where to focus next." />
      <div className="mt-6 space-y-6">
        {!user && !loading ? <div className="bio-panel p-6"><h2 className="font-semibold">Sign in to see your reviews</h2><p className="mt-2 text-sm text-muted-foreground">Your progress is private to your student account and approved guardians.</p></div> : null}
        {error ? <div role="alert" className="bio-panel p-4 text-sm text-destructive">{error}</div> : null}
        <div className="grid gap-3 sm:grid-cols-3">
          <Metric icon={<BookOpenCheck />} label="Lessons completed" value={busy ? "…" : String(completed.length)} />
          <Metric icon={<Target />} label="Average quiz score" value={busy ? "…" : scored.length ? `${average}%` : "—"} />
          <Metric icon={<Trophy />} label="Assessments recorded" value={busy ? "…" : String(scored.length)} />
        </div>
        <section className="bio-panel p-5">
          <div className="mb-4 flex items-center gap-2"><BarChart3 className="size-5 text-primary" /><h2 className="font-semibold">Subject review</h2></div>
          {busy ? <p className="text-sm text-muted-foreground">Loading your learning record…</p> : subjectSummary.length ? <div className="space-y-4">{subjectSummary.map((item) => <div key={item.subject}><div className="mb-1 flex items-center justify-between gap-3 text-sm"><span className="font-medium">{item.subject}</span><span className="text-muted-foreground">{item.completed}/{item.total} complete{item.average === null ? "" : ` · ${item.average}% average`}</span></div><div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, item.total ? item.completed / item.total * 100 : 0)}%` }} /></div></div>)}</div> : <p className="text-sm text-muted-foreground">No study records yet. Complete your first lesson in Study Enlist to start your review history.</p>}
        </section>
        <section className="bio-panel p-5">
          <h2 className="font-semibold">Recent work</h2>
          <div className="mt-3 divide-y divide-border">{rows.slice(0, 12).map((row, index) => <div key={`${row.subject}-${row.curriculum_day}-${index}`} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><span className="font-medium">{row.subject}</span><span className="ml-2 text-muted-foreground">Day {row.curriculum_day}</span></div><div className="text-muted-foreground">{row.status.replace("_", " ")}{row.quiz_score === null ? "" : ` · ${Math.round(Number(row.quiz_score))}%`}</div></div>)}</div>
        </section>
      </div>
    </AppShell>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="bio-panel p-4"><div className="mb-2 flex items-center gap-2 text-primary">{icon}<span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span></div><div className="text-2xl font-bold">{value}</div></div>;
}
