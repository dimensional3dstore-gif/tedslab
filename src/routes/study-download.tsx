import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { Download, GraduationCap, LockKeyhole, ShieldCheck, Star, BookOpenCheck } from "lucide-react";

const releasesUrl = "https://github.com/dimensional3dstore-gif/tedslab/releases/latest";
const repoReleasesUrl = "https://github.com/dimensional3dstore-gif/tedslab/releases";

export const Route = createFileRoute("/study-download")({
  head: () => ({
    meta: [
      { title: "Study Lab for Mac — Ted's Lab" },
      { name: "description", content: "Enrol in Study Lab and download the Apple Silicon macOS study app." },
    ],
  }),
  component: StudyDownloadPage,
});

function StudyDownloadPage() {
  return (
    <AppShell>
      <PageHeader title="Study Lab for Mac" description="A dedicated desktop space for serious learning, revision and supervised assessments." />
      <div className="mx-auto mt-8 max-w-5xl space-y-6">
        <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white md:p-10">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold"><GraduationCap className="size-4" /> STUDY LAB · APPLE SILICON</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Your study desk. No distractions by design.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 md:text-base">Enrol in the 365-day Study Enlist, then use the Mac app for focused lessons, concept practice, flashcards and test sessions.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/study" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100"><GraduationCap className="size-4" /> Enlist in Study</Link>
              <a href={releasesUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"><Download className="size-4" /> Download latest DMG</a>
            </div>
            <p className="mt-3 text-xs text-slate-300">For Apple Silicon Macs · GitHub Releases · ARM64</p>
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<BookOpenCheck className="size-5" />} title="Concept study" text="Structured lesson sessions with recall, practice and mastery checks." />
          <Feature icon={<LockKeyhole className="size-5" />} title="Assessment focus" text="Fullscreen supervised sessions with navigation and developer tools restricted inside the app." />
          <Feature icon={<ShieldCheck className="size-5" />} title="Parent-aware" text="Student AI permissions and progress continue to follow the Parent Portal settings." />
        </div>
        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Install in three steps</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Complete parent-approved enrolment in Study Enlist.</li>
            <li>Download the latest <a className="font-semibold text-primary underline" href={releasesUrl} target="_blank" rel="noreferrer">Study Lab ARM64 DMG</a> from GitHub Releases.</li>
            <li>Open the DMG and drag Study Lab into Applications. Launch and sign in with your Ted's Lab student account.</li>
          </ol>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">The app provides an in-app focus environment, not a system-wide Mac lock. A school or parent who needs full-device single-app enforcement must configure an appropriate macOS device-management/kiosk profile.</p>
          <a href={repoReleasesUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><Star className="size-4" /> View all Study Lab releases</a>
        </section>
      </div>
    </AppShell>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>;
}
