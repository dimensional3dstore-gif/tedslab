import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  BrainCircuit,
  CalendarCheck,
  Compass,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers3,
  Library,
  Microscope,
  NotebookPen,
  Search,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import { useArticles, useSubjects } from "@/lib/content";
import { useBookmarks } from "@/hooks/use-bookmarks";

const modules = [
  { title: "Knowledge Atlas", description: "Explore connected ideas, topics and interactive knowledge graphs.", to: "/knowledge-atlas", icon: Compass, tone: "from-sky-500/15 to-cyan-500/5", label: "DISCOVER" },
  { title: "Study Lab", description: "Follow your structured curriculum, lessons and daily assessments.", to: "/study", icon: GraduationCap, tone: "from-violet-500/15 to-indigo-500/5", label: "LEARN" },
  { title: "AI Tutor", description: "Ask questions, get explanations and work through difficult concepts.", to: "/ai", icon: BrainCircuit, tone: "from-emerald-500/15 to-teal-500/5", label: "GET HELP" },
  { title: "Exam Centre", description: "Practise with quizzes and build confidence through testing.", to: "/quizzes", icon: Target, tone: "from-amber-500/15 to-orange-500/5", label: "PRACTISE" },
  { title: "Research & Notes", description: "Capture ideas, organise notes and develop your own research.", to: "/notebook", icon: NotebookPen, tone: "from-pink-500/15 to-rose-500/5", label: "CREATE" },
  { title: "Academic Library", description: "Browse articles, reference material and learning resources.", to: "/articles", icon: Library, tone: "from-blue-500/15 to-indigo-500/5", label: "READ" },
  { title: "Flashcards", description: "Strengthen recall with focused revision sessions.", to: "/flashcards", icon: Layers3, tone: "from-fuchsia-500/15 to-purple-500/5", label: "REVISE" },
  { title: "Saved Workspace", description: "Return to bookmarked articles and resources.", to: "/saved", icon: BookOpen, tone: "from-lime-500/15 to-green-500/5", label: "YOUR SPACE" },
  { title: "Study Archive", description: "Review your completed curriculum days and study history.", to: "/study/archive", icon: CalendarCheck, tone: "from-slate-500/15 to-zinc-500/5", label: "YOUR RECORD" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ted's Lab — Academic Operating System" },
      { name: "description", content: "One connected workspace for discovery, learning, research and academic progress." },
    ],
  }),
  component: HomeDashboard,
});

function HomeDashboard() {
  const { data: subjects = [] } = useSubjects();
  const { data: articles = [] } = useArticles();
  const { bookmarks } = useBookmarks();
  const published = articles.filter((article) => article.published);

  return (
    <AppShell>
      <div className="space-y-7">
        <section className="relative isolate overflow-hidden rounded-3xl border border-primary/20 bg-card">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.16),transparent_55%)]" />
          <div className="grid gap-8 p-6 md:p-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-primary">
                <Sparkles className="size-3.5" /> THE ACADEMIC OPERATING SYSTEM
              </div>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Think bigger. <span className="text-primary">Learn deeper.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Ted's Lab brings your encyclopedia, study programme, AI tutor, assessments and research workspace together in one connected place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/study" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
                  <GraduationCap className="size-4" /> Continue learning <ArrowRight className="size-4" />
                </Link>
                <Link to="/knowledge-atlas" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
                  <Compass className="size-4" /> Explore the Atlas
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <BookOpen className="size-5 text-primary" />
                <p className="mt-4 font-display text-3xl font-bold text-foreground">{published.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Published articles</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <Atom className="size-5 text-primary" />
                <p className="mt-4 font-display text-3xl font-bold text-foreground">{subjects.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Knowledge subjects</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <Library className="size-5 text-primary" />
                <p className="mt-4 font-display text-3xl font-bold text-foreground">{bookmarks.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Saved resources</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <Trophy className="size-5 text-primary" />
                <p className="mt-4 font-display text-3xl font-bold text-foreground">365</p>
                <p className="mt-1 text-xs text-muted-foreground">Curriculum days</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-primary">YOUR WORKSPACE</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-foreground">Explore Ted's Lab</h2>
              <p className="mt-1 text-sm text-muted-foreground">Every tool has a place in your learning journey.</p>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2">Progress overview <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link key={module.title} to={module.to} className="group bio-panel relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${module.tone} opacity-70`} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid size-11 place-items-center rounded-xl border border-border bg-background/80 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.14em] text-muted-foreground">{module.label}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-foreground">{module.title}</h3>
                    <p className="mt-2 min-h-10 text-sm leading-6 text-muted-foreground">{module.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary transition-all group-hover:gap-2">Open module <ArrowRight className="size-3.5" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bio-panel p-5">
            <div className="flex items-center gap-2">
              <Search className="size-4 text-primary" />
              <h2 className="font-display text-lg font-bold text-foreground">Start with a question</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Search the knowledge collection or ask your tutor to explain a concept, compare ideas or help you prepare.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/articles" className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary">Browse articles</Link>
              <Link to="/ai" className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary">Ask AI Tutor</Link>
              <Link to="/quizzes" className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary">Take a quiz</Link>
            </div>
          </div>
          <div className="bio-panel flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center gap-2"><Award className="size-4 text-primary" /><h2 className="font-display text-lg font-bold text-foreground">Build your academic record</h2></div>
              <p className="mt-2 text-sm text-muted-foreground">Your next step is to complete a study session, save a useful resource or test what you know.</p>
            </div>
            <Link to="/study" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Open today's study plan <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
