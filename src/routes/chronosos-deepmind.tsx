import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import {
  ArrowRight, Atom, BrainCircuit, CheckCircle2, Code2, Compass,
  FlaskConical, Globe2, LockKeyhole, Microscope, Network, Orbit,
  Radar, ShieldCheck, Sparkles, Workflow,
} from "lucide-react";

export const Route = createFileRoute("/chronosos-deepmind")({
  head: () => ({
    meta: [
      { title: "ChronosOS Deepmind — Research, Development & Intelligence" },
      { name: "description", content: "ChronosOS Deepmind is the research and development corporation founded by Ted Han, and the builder and curator of Ted's Lab." },
    ],
  }),
  component: ChronosOSDeepmindPage,
});

const researchAreas = [
  { icon: BrainCircuit, number: "01", title: "Applied intelligence", text: "Explore useful AI systems, autonomous workflows, human-computer interaction, and tools that help people turn complex ideas into practical outcomes." },
  { icon: Globe2, number: "02", title: "Internet intelligence", text: "Develop technologies that improve how people discover, understand, verify, navigate, and safely use information across the internet." },
  { icon: Microscope, number: "03", title: "Scientific computing", text: "Build interactive scientific software, visual exploration environments, simulation interfaces, and accessible research tools." },
  { icon: Network, number: "04", title: "Knowledge infrastructure", text: "Connect structured knowledge, educational resources, datasets, and digital experiences into coherent systems that can grow over time." },
  { icon: ShieldCheck, number: "05", title: "Trust and safety engineering", text: "Integrate privacy, security, provenance, accessibility, and responsible-use considerations throughout the development lifecycle." },
  { icon: Code2, number: "06", title: "Software and systems", text: "Prototype applications, extensions, developer tools, and operating-system experiences that make digital technology more capable." },
];

const portfolio = [
  { icon: Orbit, name: "Lost Atlas", type: "3D planetary exploration", description: "An immersive exploration experience for discovering ecosystems, terrain, organisms, and connected natural systems.", to: "/lost-atlas", action: "Explore Lost Atlas" },
  { icon: Atom, name: "MicroAtlas", type: "Microscopic life explorer", description: "A scientific learning environment for exploring microorganisms, cellular structures, and foundational microbiology.", to: "/microatlas", action: "Explore MicroAtlas" },
  { icon: FlaskConical, name: "Ted's Lab", type: "Knowledge and learning platform", description: "The curated learning encyclopedia bringing articles, topics, visual resources, and interactive study tools together.", to: "/", action: "Visit Ted's Lab" },
] as const;

const lifecycle = [
  { icon: Compass, title: "Investigate", text: "Define the problem, examine existing research, identify users, and establish measurable questions." },
  { icon: FlaskConical, title: "Experiment", text: "Test concepts through prototypes, technical studies, simulations, and structured evaluation." },
  { icon: Workflow, title: "Engineer", text: "Turn validated concepts into maintainable software with clear architecture, documentation, and quality checks." },
  { icon: CheckCircle2, title: "Validate and curate", text: "Review reliability, usability, safety, and evidence before integrating work into the wider ecosystem." },
];

function ChronosOSDeepmindPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl space-y-8 pb-12">
        <section className="relative isolate overflow-hidden rounded-[2rem] border border-violet-500/25 bg-[#080b18] px-6 py-12 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_15%,rgba(139,92,246,.28),transparent_34%),radial-gradient(ellipse_at_10%_90%,rgba(6,182,212,.16),transparent_35%)]" />
          <div className="pointer-events-none absolute -right-24 top-8 -z-10 size-80 rounded-full border border-violet-300/10" />
          <div className="pointer-events-none absolute -right-8 top-24 -z-10 size-48 rounded-full border border-cyan-300/15" />
          <div className="relative max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.2em] text-violet-200">
              <Sparkles className="size-3.5" /> Independent research & development
            </div>
            <p className="font-mono text-xs uppercase tracking-[.28em] text-cyan-200/80">ChronosOS Deepmind</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Research the possible.<br /><span className="text-violet-300">Build what matters.</span></h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              ChronosOS Deepmind is the research and development corporation founded by Ted Han, and the builder and curator of Ted&apos;s Lab. It brings research, software engineering, intelligent systems, and digital safety together to create technology that makes the internet and the tools built on it more useful, understandable, and secure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#research" className="inline-flex items-center gap-2 rounded-xl bg-violet-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200">Explore research areas <ArrowRight className="size-4" /></a>
              <a href="#portfolio" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View the portfolio</a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2"><LockKeyhole className="size-3.5 text-cyan-300" /> Safety-led engineering</span>
              <span className="inline-flex items-center gap-2"><Radar className="size-3.5 text-violet-300" /> Research-driven development</span>
              <span className="inline-flex items-center gap-2"><Atom className="size-3.5 text-cyan-300" /> Curated knowledge systems</span>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-500">The organisation</p>
            <h2 className="mt-3 font-display text-2xl font-bold">An R&D engine for a smarter digital world.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">ChronosOS Deepmind exists to turn ambitious concepts into useful, carefully designed technology. Its work spans exploratory research, product development, software architecture, and the long-term curation of connected digital experiences.</p>
            <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-violet-500">Founder</p>
              <p className="mt-1 text-lg font-semibold">Ted Han</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Founder of ChronosOS Deepmind · Builder and curator of Ted&apos;s Lab</p>
            </div>
          </div>
          <div id="research" className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-500">Research agenda</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Six connected areas of investigation.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Research programmes are designed to reinforce one another rather than operate as isolated projects.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {researchAreas.map((area) => {
                const Icon = area.icon;
                return <article key={area.number} className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-violet-500">{area.number} / PROGRAMME</span><Icon className="size-4 text-violet-500" /></div>
                  <h3 className="mt-3 text-sm font-semibold">{area.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{area.text}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-500">Curated portfolio</p><h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Research translated into experiences.</h2></div>
            <span className="text-xs text-muted-foreground">The Ted&apos;s Lab ecosystem</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {portfolio.map((item) => {
              const Icon = item.icon;
              return <article key={item.name} className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg">
                <div className="grid size-12 place-items-center rounded-2xl bg-violet-500/10 text-violet-500"><Icon className="size-6" /></div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.18em] text-muted-foreground">{item.type}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{item.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <Link to={item.to} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition group-hover:gap-3">{item.action}<ArrowRight className="size-4" /></Link>
              </article>;
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-500">Development methodology</p><h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">From question to dependable product.</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Every initiative follows a repeatable lifecycle. Evidence and testing inform decisions at each stage, while safety and accessibility remain continuous requirements.</p></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {lifecycle.map((step, index) => {
              const Icon = step.icon;
              return <article key={step.title} className="relative rounded-2xl border border-border bg-background/60 p-5">
                <div className="flex items-center justify-between"><Icon className="size-5 text-violet-500" /><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{step.text}</p>
              </article>;
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border border-cyan-500/20 bg-[linear-gradient(120deg,rgba(8,145,178,.08),rgba(139,92,246,.08))] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-300"><ShieldCheck className="size-5" /><p className="text-xs font-semibold uppercase tracking-[.2em]">Responsible by design</p></div>
            <h2 className="mt-3 font-display text-2xl font-bold">Trust is an engineering requirement.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">ChronosOS Deepmind treats security, privacy, transparent provenance, accessibility, and human oversight as design constraints from the beginning—not as features added after release.</p>
            <div className="mt-5 flex flex-wrap gap-2">{["Privacy-conscious","Evidence-aware","Accessible","Secure by design","Human-centred"].map((tag)=><span key={tag} className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground">{tag}</span>)}</div>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-violet-500/25 bg-[#0b0c1b] p-6 text-white sm:p-8">
            <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Build with the lab</p><h2 className="mt-3 font-display text-2xl font-bold">Ideas need a place to become real.</h2><p className="mt-3 text-sm leading-7 text-slate-300">Explore the platform or continue curating its knowledge and research content.</p></div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-violet-300 px-4 py-2.5 text-sm font-semibold text-slate-950">Open Ted&apos;s Lab <ArrowRight className="size-4" /></Link>
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Admin workspace</Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
