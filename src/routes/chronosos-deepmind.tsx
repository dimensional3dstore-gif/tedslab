import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { BrainCircuit, FlaskConical, Globe2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/chronosos-deepmind")({
  head: () => ({ meta: [{ title: "ChronosOS Deepmind — Ted's Lab" }] }),
  component: ChronosOSDeepmindPage,
});

const pillars = [
  { icon: FlaskConical, title: "Research & Development", text: "Prototype intelligent systems, scientific tools, applications, and extensions that turn ambitious ideas into working software." },
  { icon: Globe2, title: "Internet Intelligence", text: "Build tools that make the internet more useful, understandable, resilient, and safer for the people who use it." },
  { icon: ShieldCheck, title: "Safety by Design", text: "Curate technology with security, privacy, provenance, and responsible deployment treated as first-class engineering requirements." },
  { icon: BrainCircuit, title: "Curated Intelligence", text: "Connect research, software, datasets, experiments, and educational experiences into a coherent ecosystem." },
];

function ChronosOSDeepmindPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,.24),transparent_32%),radial-gradient(circle_at_15%_70%,rgba(6,182,212,.14),transparent_30%),linear-gradient(135deg,#090a16,#111126_55%,#090a16)] px-7 py-10 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-violet-400/20" />
          <div className="absolute -right-8 -top-8 size-40 rounded-full border border-cyan-400/20" />
          <div className="relative max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-violet-200"><Sparkles className="size-3.5" />ChronosOS Deepmind</div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">Research. Build. Curate.</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">ChronosOS Deepmind is the research and development corporation, builder, and curator of Ted&apos;s Lab — founded by Ted Han. Its mission is to create ambitious software, intelligent systems, and safer digital experiences that make knowledge and technology more accessible.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-violet-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-violet-300">Explore Ted&apos;s Lab <ArrowRight className="size-4" /></Link>
              <Link to="/microatlas" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">View MicroAtlas</Link>
            </div>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return <article key={pillar.title} className="rounded-2xl border border-border bg-card/80 p-6"><div className="grid size-11 place-items-center rounded-xl bg-violet-500/10 text-violet-500"><Icon className="size-5" /></div><h2 className="mt-5 font-display text-xl font-semibold">{pillar.title}</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">{pillar.text}</p></article>;
          })}
        </section>
        <section className="rounded-2xl border border-border bg-card/70 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">The Lab ecosystem</p>
          <h2 className="mt-2 font-display text-2xl font-bold">A place for experiments to become products.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">ChronosOS Deepmind provides the research and product layer behind Ted&apos;s Lab, from educational knowledge systems to new software and scientific interfaces.</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-sm font-medium"><BrainCircuit className="size-4 text-violet-500" />Founded by Ted Han</div>
        </section>
      </div>
    </AppShell>
  );
}
