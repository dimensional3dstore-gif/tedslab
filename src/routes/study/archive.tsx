import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import {
  Archive,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

function StudyArchivePage() {
  const [archivedDays, setArchivedDays] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("teds-lab-study-archive");
      if (saved) setArchivedDays(JSON.parse(saved));
    } catch {
      // Ignore unavailable or malformed local archive data.
    }
  }, []);

  return (
    <AppShell>
      <div className="space-y-7">
        <PageHeader
          title="Study Lab Archive"
          description="The official Ted's Lab website archive for completed Study Lab work. Archived study is preserved here separately from the active 365-day programme."
        />

        <section className="overflow-hidden rounded-2xl border border-primary/25 bg-card">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Archive className="size-5" /> ARCHIVED STUDY LAB
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                Study Lab · 365-day curriculum
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                This archive records the completed Study Lab programme: three
                subjects per day, sequential lessons, one-hour lesson blocks,
                subject quizzes and the final daily assessment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "365", l: "days" },
                { n: "3", l: "subjects / day" },
                { n: "4", l: "lessons / subject" },
                { n: "60", l: "minutes / lesson" },
              ].map((item) => (
                <div key={item.l} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="font-display text-2xl font-bold text-foreground">{item.n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bio-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Archive status
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">
                Completed study days
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {archivedDays.length
                  ? archivedDays.length + " day" + (archivedDays.length === 1 ? "" : "s") + " archived on this device."
                  : "No completed study days have been archived on this device yet."}
              </p>
            </div>
            <ShieldCheck className="size-7 text-primary" />
          </div>

          {archivedDays.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {archivedDays.map((day) => (
                <Link
                  key={day}
                  to="/study"
                  className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <CalendarDays className="size-4" /> DAY {day}
                    </span>
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                  <p className="mt-2 text-sm font-bold text-foreground">Completed Study Lab</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Return to the Study Lab and select this day.
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-border bg-secondary/20 p-6 text-center">
              <Archive className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-semibold text-foreground">Archive is ready</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Complete a day in Study Lab, then choose “Archive completed study” to place it here.
              </p>
            </div>
          )}
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="bio-panel p-5">
            <BookOpen className="size-6 text-primary" />
            <h2 className="mt-3 text-lg font-bold text-foreground">What is preserved</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Three daily subjects and their concepts</li>
              <li>• Four sequential lesson stages per subject</li>
              <li>• One-hour lesson block structure</li>
              <li>• Subject quizzes and daily final assessment</li>
              <li>• Weekly 80% mastery cycle</li>
            </ul>
          </div>

          <div className="bio-panel p-5">
            <GraduationCap className="size-6 text-primary" />
            <h2 className="mt-3 text-lg font-bold text-foreground">Return to active Study Lab</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Continue the live 365-day programme without removing anything from the archive.
            </p>
            <Link
              to="/study"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
            >
              <ChevronLeft className="size-4" /> Back to Study Lab
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/study/archive")({
  head: () => ({
    meta: [
      { title: "Study Lab Archive · Ted's Lab" },
      {
        name: "description",
        content: "Archived Study Lab work and the completed 365-day curriculum on Ted's Lab.",
      },
    ],
  }),
  component: StudyArchivePage,
});
