import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseAuthClient } from "@/integrations/supabase/auth";
import { Bell, CheckCircle2, Clock3, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [{ title: "Parent Portal · Ted's Lab" }, { name: "description", content: "Manage learner permissions and monitor Study Enlist progress." }] }),
  component: ParentPortal,
});

type GuardianLink = {
  id: string;
  student_id: string;
  guardian_email: string;
  status: string;
  ai_assistance_allowed: boolean | null;
  browser_lock_enabled: boolean | null;
};
type StudentProfile = {
  student_id: string;
  date_of_birth: string;
  grade_level: number;
  onboarding_complete: boolean;
  start_date: string;
};
type ProgressRow = { student_id: string; curriculum_day: number; status: string; quiz_score: number | null };
type Notice = { id: string; title: string; message: string; created_at: string; read_at: string | null };

function ParentPortal() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<GuardianLink[]>([]);
  const [approved, setApproved] = useState<GuardianLink[]>([]);
  const [profiles, setProfiles] = useState<Record<string, StudentProfile>>({});
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [notifications, setNotifications] = useState<Notice[]>([]);
  const [gradeChoice, setGradeChoice] = useState<Record<string, number>>({});
  const [aiChoice, setAiChoice] = useState<Record<string, boolean>>({});
  const [browserChoice, setBrowserChoice] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const loadPortal = useCallback(async () => {
    if (!user?.email) return;
    const client = getSupabaseAuthClient();
    const [pendingResult, approvedResult, noticeResult] = await Promise.all([
      client.from("student_guardians").select("id,student_id,guardian_email,status,ai_assistance_allowed,browser_lock_enabled").eq("guardian_email", user.email.toLowerCase()).eq("status", "pending"),
      client.from("student_guardians").select("id,student_id,guardian_email,status,ai_assistance_allowed,browser_lock_enabled").eq("guardian_id", user.id).eq("status", "approved"),
      client.from("study_notifications").select("id,title,message,created_at,read_at").eq("recipient_id", user.id).order("created_at", { ascending: false }).limit(20),
    ]);
    if (pendingResult.error) throw pendingResult.error;
    if (approvedResult.error) throw approvedResult.error;
    if (noticeResult.error) throw noticeResult.error;
    const pendingRows = (pendingResult.data ?? []) as GuardianLink[];
    const approvedRows = (approvedResult.data ?? []) as GuardianLink[];
    setPending(pendingRows);
    setApproved(approvedRows);
    setNotifications((noticeResult.data ?? []) as Notice[]);
    const ids = [...new Set([...pendingRows, ...approvedRows].map((item) => item.student_id))];
    if (!ids.length) { setProfiles({}); setProgress([]); return; }
    const [profileResult, progressResult] = await Promise.all([
      client.from("student_profiles").select("student_id,date_of_birth,grade_level,onboarding_complete,start_date").in("student_id", ids),
      client.from("study_progress").select("student_id,curriculum_day,status,quiz_score").in("student_id", ids),
    ]);
    if (profileResult.error) throw profileResult.error;
    if (progressResult.error) throw progressResult.error;
    const profileMap: Record<string, StudentProfile> = {};
    for (const profile of (profileResult.data ?? []) as StudentProfile[]) profileMap[profile.student_id] = profile;
    setProfiles(profileMap);
    setProgress((progressResult.data ?? []) as ProgressRow[]);
    setGradeChoice((current) => {
      const next = { ...current };
      for (const profile of Object.values(profileMap)) if (next[profile.student_id] === undefined) next[profile.student_id] = profile.grade_level;
      return next;
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    let active = true;
    void loadPortal().catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "Unable to load the Parent Portal."); });
    return () => { active = false; };
  }, [user, loadPortal]);

  const sendSignInLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true); setError(""); setNotice("");
    try {
      const { error: authError } = await getSupabaseAuthClient().auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: `${window.location.origin}/parent` },
      });
      if (authError) throw authError;
      setNotice("A secure Parent Portal sign-in link has been sent. Open it from the parent or guardian's email account.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to send the sign-in link.");
    } finally { setSending(false); }
  };

  const approveChild = async (link: GuardianLink) => {
    if (!user) return;
    setSaving(link.id); setError(""); setNotice("");
    try {
      const grade = gradeChoice[link.student_id] ?? profiles[link.student_id]?.grade_level ?? 1;
      const now = new Date().toISOString();
      const client = getSupabaseAuthClient();
      const { error: approvalError } = await client.from("student_guardians").update({
        guardian_id: user.id,
        status: "approved",
        ai_assistance_allowed: aiChoice[link.id] ?? false,
        browser_lock_enabled: browserChoice[link.id] ?? true,
        approved_at: now,
      }).eq("id", link.id).eq("status", "pending");
      if (approvalError) throw approvalError;
      const { error: profileError } = await client.from("student_profiles").update({
        grade_level: grade, onboarding_complete: true, updated_at: now,
      }).eq("student_id", link.student_id);
      if (profileError) throw profileError;
      setNotice("Learner account approved. Study Enlist is now available with the permissions you selected.");
      await loadPortal();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to approve this learner.");
    } finally { setSaving(null); }
  };

  const markRead = async (id: string) => {
    const { error: updateError } = await getSupabaseAuthClient().from("study_notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    if (updateError) setError(updateError.message);
    else setNotifications((current) => current.map((item) => item.id === id ? { ...item, read_at: new Date().toISOString() } : item));
  };

  if (loading) return <AppShell><div className="bio-panel p-6 text-sm text-muted-foreground">Loading Parent Portal…</div></AppShell>;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Parent Portal" description="Approve learner access, set study permissions and follow daily curriculum progress." />
        {!user ? (
          <section className="bio-panel mx-auto max-w-xl p-6">
            <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="size-5" /></div>
            <h2 className="mt-4 text-xl font-bold text-foreground">Parent or guardian sign-in</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use the email address that received the learner invitation. We will send a secure, password-free sign-in link.</p>
            <form onSubmit={sendSignInLink} className="mt-5 space-y-3">
              <label className="block text-sm font-medium text-foreground" htmlFor="parent-email">Parent email</label>
              <input id="parent-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground" />
              <button disabled={sending} className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">{sending ? "Sending…" : "Email secure sign-in link"}</button>
            </form>
          </section>
        ) : (
          <>
            <section className="grid gap-3 sm:grid-cols-3">
              <div className="bio-panel p-4"><Users className="size-5 text-primary" /><p className="mt-2 text-2xl font-bold text-foreground">{approved.length}</p><p className="text-xs text-muted-foreground">Approved learners</p></div>
              <div className="bio-panel p-4"><Clock3 className="size-5 text-primary" /><p className="mt-2 text-2xl font-bold text-foreground">{pending.length}</p><p className="text-xs text-muted-foreground">Pending approvals</p></div>
              <div className="bio-panel p-4"><Bell className="size-5 text-primary" /><p className="mt-2 text-2xl font-bold text-foreground">{notifications.filter((item) => !item.read_at).length}</p><p className="text-xs text-muted-foreground">Unread notifications</p></div>
            </section>

            {pending.length > 0 && <section className="space-y-4">
              <div><h2 className="text-xl font-bold text-foreground">Learner approval required</h2><p className="mt-1 text-sm text-muted-foreground">Confirm the year level and choose both permissions before activating the account.</p></div>
              {pending.map((link) => {
                const profile = profiles[link.student_id];
                return <article key={link.id} className="bio-panel space-y-4 p-5">
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">New learner invitation</p><h3 className="mt-1 text-lg font-bold text-foreground">Learner account</h3><p className="text-xs text-muted-foreground">Student ID: {link.student_id.slice(0, 8)}… · Guardian email: {link.guardian_email}</p></div>
                  {profile && <div className="rounded-lg bg-secondary/40 p-3 text-sm text-muted-foreground">Date of birth: {profile.date_of_birth} · Recommended year level: Grade {profile.grade_level}</div>}
                  <div className="space-y-2"><label className="block text-sm font-medium text-foreground" htmlFor={`grade-${link.id}`}>Confirm year level</label><select id={`grade-${link.id}`} value={gradeChoice[link.student_id] ?? profile?.grade_level ?? 1} onChange={(event) => setGradeChoice((current) => ({ ...current, [link.student_id]: Number(event.target.value) }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">{Array.from({ length: 13 }, (_, index) => index + 1).map((grade) => <option key={grade} value={grade}>Grade {grade}</option>)}</select></div>
                  <label className="flex items-start gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={aiChoice[link.id] ?? false} onChange={(event) => setAiChoice((current) => ({ ...current, [link.id]: event.target.checked }))} className="mt-1 accent-primary" /><span><strong className="block text-sm text-foreground">Allow AI assistance</strong><span className="text-xs text-muted-foreground">Permit AI-powered study help where available. You can change this permission later.</span></span></label>
                  <label className="flex items-start gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={browserChoice[link.id] ?? true} onChange={(event) => setBrowserChoice((current) => ({ ...current, [link.id]: event.target.checked }))} className="mt-1 accent-primary" /><span><strong className="block text-sm text-foreground">Enable supervised study mode</strong><span className="text-xs text-muted-foreground">Keep the learner in Ted's Lab study flow and enable in-platform focus restrictions. This does not lock other browser tabs or device applications.</span></span></label>
                  <button type="button" onClick={() => void approveChild(link)} disabled={saving === link.id || !profile} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40">{saving === link.id ? "Approving…" : "Approve and activate learner"}</button>
                </article>;
              })}
            </section>}

            {approved.length > 0 && <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Learner progress</h2>
              {approved.map((link) => {
                const profile = profiles[link.student_id];
                const rows = progress.filter((item) => item.student_id === link.student_id);
                const complete = rows.filter((item) => item.status === "completed").length;
                const latestDay = Math.max(0, ...rows.map((item) => item.curriculum_day));
                return <article key={link.id} className="bio-panel p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold text-foreground">Learner · Grade {profile?.grade_level ?? "—"}</h3><p className="mt-1 text-xs text-muted-foreground">Started {profile?.start_date ?? "—"} · Latest active day {latestDay}</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{complete} lessons completed</span></div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-lg bg-secondary/40 p-3"><p className="text-lg font-bold text-foreground">{link.ai_assistance_allowed ? "Allowed" : "Not allowed"}</p><p className="text-xs text-muted-foreground">AI assistance</p></div><div className="rounded-lg bg-secondary/40 p-3"><p className="text-lg font-bold text-foreground">{link.browser_lock_enabled ? "Enabled" : "Disabled"}</p><p className="text-xs text-muted-foreground">Supervised study mode</p></div></div>
                  <p className="mt-3 text-xs text-muted-foreground">Daily target: five completed subject lessons. Notifications appear here if a learner misses a day.</p>
                </article>;
              })}
            </section>}

            <section className="space-y-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><Bell className="size-5 text-primary" /> Notifications</h2>
              {notifications.length === 0 ? <p className="bio-panel p-4 text-sm text-muted-foreground">No notifications yet.</p> : notifications.map((item) => <div key={item.id} className="bio-panel flex items-start justify-between gap-3 p-4"><div><p className="text-sm font-semibold text-foreground">{item.title}</p><p className="mt-1 text-sm text-muted-foreground">{item.message}</p><p className="mt-2 text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()}</p></div>{!item.read_at && <button type="button" onClick={() => void markRead(item.id)} className="shrink-0 rounded-md border border-border px-2 py-1 text-xs">Mark read</button>}</div>)}
            </section>
          </>
        )}
        {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
        {notice && <p role="status" className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">{notice}</p>}
      </div>
    </AppShell>
  );
}
