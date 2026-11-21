import React, { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ArrowRight,
  FlaskConical,
  Microscope,
  Sigma,
  Sparkles,
  BookOpen,
  Network,
  Clock,
  TrendingUp,
  ChevronRight,
  Send,
} from 'lucide-react';
import { Image } from '@/components/ui/image';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import MiniGraph from '@/components/quantum/MiniGraph';
import ArticleCard from '@/components/common/ArticleCard';
import SaveButton from '@/components/common/SaveButton';
import { Panel, SectionHeading, Chip } from '@/components/common/Kit';
import { articles, articleBySlug } from '@/data/articles';
import { disciplines } from '@/data/disciplines';
import { simulations } from '@/data/simulations';
import { papers } from '@/data/papers';
import { scientists } from '@/data/scientists';
import { useLibrary } from '@/lib/library';

const HERO_IMAGE = 'https://media.base44.com/images/public/6ae6ca409153c2456ee8c780/2595419b4_generated_image.png';

const TERMS = [
  { term: 'Decoherence', text: 'Loss of phase coherence when a system entangles with its environment, suppressing interference.' },
  { term: 'Eigenstate', text: 'A state whose measurement outcome is certain; it evolves only by acquiring a phase.' },
  { term: 'Visibility', text: 'Contrast of an interference pattern; reduced as which-path information becomes available.' },
  { term: 'Coherence time', text: 'The timescale over which a quantum superposition retains a definite phase relation.' },
  { term: 'Tsirelson bound', text: 'The maximum CHSH correlation value, 2√2, achievable by quantum mechanics.' },
  { term: 'Squeezed state', text: 'A state with reduced uncertainty in one quadrature, increased in the complementary one.' },
  { term: 'Fidelity', text: 'Measure of closeness between a prepared state and an ideal target state.' }
];

export default function Home() {
  const { openSearch } = useOutletContext() || {};
  const { history, saved, settings } = useLibrary();

  const featured = ['quantum-entanglement', 'quantum-superposition', 'quantum-tunnelling', 'quantum-computing', 'quantum-field-theory']
    .map(articleBySlug)
    .filter(Boolean);

  const term = useMemo(() => TERMS[new Date().getDate() % TERMS.length], []);
  const recentPapers = useMemo(() => [...papers].sort((a, b) => b.year - a.year).slice(0, 5), []);
  const featuredScientists = scientists.filter((s) => ['max-planck', 'niels-bohr', 'erwin-schrodinger', 'werner-heisenberg', 'paul-dirac', 'john-bell', 'richard-feynman', 'alain-aspect'].includes(s.slug));
  const recommended = articles.filter((a) => ['quantum-mechanics', 'bell-test', 'photon'].includes(a.slug));

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="qp-fade-up relative overflow-hidden rounded-2xl border border-[var(--qp-accent)]/18">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Quantum field visualisation with cyan and violet energy filaments"
            fittingType="fill"
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05101f] via-[#061225]/85 to-[#061225]/30" />
          <div className="absolute inset-0 qp-grid-bg opacity-40" />
        </div>
        <QuantumVisual variant="entanglement" className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-25" animate={false} />

        <div className="relative px-5 py-10 sm:px-9 sm:py-14 lg:py-16">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--qp-accent)] qp-blink" />
            <p className="qp-label">Quantum knowledge system · build 2026.11</p>
          </div>
          <h1 className="mt-4 max-w-2xl text-[30px] font-semibold leading-[1.08] tracking-tight text-[#f0f6ff] sm:text-[42px] lg:text-[48px]">
            THE QUANTUM<br />
            <span className="qp-text-gradient">KNOWLEDGE SYSTEM</span>
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-[#a8bcd3] sm:text-[14.5px]">
            Explore the fundamental principles, mathematical foundations and scientific discoveries of the quantum world —
            with working simulations, rendered equations and a structured research index.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link
              to="/knowledge"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--qp-accent)] px-4 py-2 text-[12px] font-medium text-[#04121f] transition-colors hover:bg-[#5ad8ff]"
            >
              Explore Quantum Science <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/laboratory"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--qp-accent)]/30 bg-[#0b203b]/70 px-4 py-2 text-[12px] text-[#d6f3ff] transition-colors hover:border-[var(--qp-accent)]/60"
            >
              <FlaskConical className="h-3.5 w-3.5" /> Enter Quantum Laboratory
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--qp-accent)]/30 bg-[var(--qp-accent)]/10 px-4 py-2 text-[12px] text-[#e2d5ff] transition-colors hover:border-[var(--qp-accent)]/60"
            >
              <Microscope className="h-3.5 w-3.5" /> Discover Research
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[10.5px] text-[#7088a5]">
            <span className="mono">{articles.length} articles</span>
            <span className="mono">{disciplines.length} disciplines</span>
            <span className="mono">{simulations.length} simulations</span>
            <span className="mono">{papers.length} indexed publications</span>
            <span className="mono">{scientists.length} scientists</span>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="space-y-6">
          {/* FEATURED DISCOVERIES */}
          <section>
            <SectionHeading
              eyebrow="Featured discoveries"
              title="Defining results of the quantum era"
              description="Editorial entries on the results that reshaped our account of matter and information."
              action={<Link to="/explore" className="flex items-center gap-1 text-[11px] text-[var(--qp-accent)] hover:underline">All articles <ChevronRight className="h-3 w-3" /></Link>}
            />
            <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
              {featured.slice(0, 2).map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="qp-panel qp-hover group relative overflow-hidden">
                  <div className="relative h-44 sm:h-52">
                    <QuantumVisual variant={a.hero} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061225] via-[#061225]/45 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-[var(--qp-accent)]/30 bg-[#061225]/70 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[#9fd8ff]">{a.type}</span>
                        <span className="text-[10px] text-[#8fa8c2]">{a.readingTime} min read</span>
                      </div>
                      <h3 className="mt-2 text-[17px] font-semibold leading-snug text-[#f0f6ff] group-hover:text-[#bfe6ff]">{a.title}</h3>
                      <p className="mt-1 max-w-xl line-clamp-2 text-[11.5px] leading-relaxed text-[#a8bcd3]">{a.abstract}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.slice(2).map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="qp-panel qp-hover group flex flex-col overflow-hidden">
                  <div className="h-24">
                    <QuantumVisual variant={a.hero} className="h-full w-full opacity-80" />
                  </div>
                  <div className="p-3">
                    <p className="qp-label">{a.category}</p>
                    <h3 className="mt-1 text-[12.5px] font-semibold text-[#f0f6ff] group-hover:text-[#bfe6ff]">{a.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[10.5px] leading-relaxed text-[#8fa8c2]">{a.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* DISCIPLINES */}
          <section>
            <SectionHeading
              eyebrow="Disciplines"
              title="Explore quantum disciplines"
              description="Twelve connected fields, each with its own research areas, theories and experiments."
              action={<Link to="/knowledge" className="flex items-center gap-1 text-[11px] text-[var(--qp-accent)] hover:underline">Discipline index <ChevronRight className="h-3 w-3" /></Link>}
            />
            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {disciplines.slice(0, 6).map((d) => (
                <Link key={d.slug} to={`/knowledge/${d.slug}`} className="qp-panel-soft qp-hover group flex items-start gap-3 p-3">
                  <span className="mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[var(--qp-accent)]/20">
                    <QuantumVisual variant={d.visual} className="h-full w-full" animate={false} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium text-[#eaf4ff] group-hover:text-[#bfe6ff]">{d.name}</span>
                    <span className="mt-0.5 block line-clamp-2 text-[10.5px] leading-relaxed text-[#7f98b3]">{d.summary}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* FEATURED ARTICLES */}
          <section>
            <SectionHeading
              eyebrow="Featured articles"
              title="From the encyclopaedia"
              description="Reviewed entries with equations, experimental evidence and references."
            />
            <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>

          {/* INTERACTIVE SCIENCE */}
          <section>
            <SectionHeading
              eyebrow="Interactive science"
              title="Working simulations"
              description="Every module runs a real mathematical model in the browser — no external quantum hardware involved."
              action={<Link to="/laboratory" className="flex items-center gap-1 text-[11px] text-[var(--qp-accent)] hover:underline">Simulation centre <ChevronRight className="h-3 w-3" /></Link>}
            />
            <div className="mt-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {simulations.slice(0, 3).map((s) => (
                <Link key={s.slug} to={s.to} className="qp-panel qp-hover group overflow-hidden">
                  <div className="h-28">
                    <QuantumVisual variant={s.visual} className="h-full w-full" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="qp-label">{s.category}</p>
                      <span className="mono text-[9px] text-[#6f88a3]">{s.minutes} min</span>
                    </div>
                    <h3 className="mt-1 text-[12.5px] font-semibold text-[#f0f6ff] group-hover:text-[#bfe6ff]">{s.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[10.5px] leading-relaxed text-[#8fa8c2]">{s.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* RECENT RESEARCH */}
            <section>
              <SectionHeading eyebrow="Recent research" title="Indexed publications" />
              <Panel className="mt-3.5 divide-y divide-[var(--qp-accent)]/8">
                {recentPapers.slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/research?tab=publications&paper=${p.id}`} className="group block px-3.5 py-3 transition-colors hover:bg-[#102b4b]/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-[11.5px] font-medium leading-snug text-[#eaf4ff] group-hover:text-[#bfe6ff]">{p.title}</p>
                        <p className="mt-1 text-[10px] text-[#7088a5]">{p.authors[0]}{p.authors.length > 1 ? ' et al.' : ''} · {p.journal}</p>
                      </div>
                      <span className="mono shrink-0 text-[10px] text-[var(--qp-accent)]/80">{p.year}</span>
                    </div>
                  </Link>
                ))}
              </Panel>
            </section>

            {/* SCIENTISTS */}
            <section>
              <SectionHeading
                eyebrow="Scientists of the field"
                title="The people behind the theory"
                action={<Link to="/scientists" className="flex items-center gap-1 text-[11px] text-[var(--qp-accent)] hover:underline">Directory <ChevronRight className="h-3 w-3" /></Link>}
              />
              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                {featuredScientists.slice(0, 4).map((s) => (
                  <Link key={s.slug} to={`/scientists/${s.slug}`} className="qp-panel-soft qp-hover flex items-center gap-2.5 p-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--qp-accent)]/30 bg-[var(--qp-accent)]/10 text-[11px] font-medium text-[#dcc9ff]">
                      {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[11.5px] text-[#eaf4ff]">{s.name}</span>
                      <span className="mono block text-[9px] text-[#7088a5]">{s.years}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* KNOWLEDGE CONNECTIONS */}
          <section>
            <SectionHeading
              eyebrow="Knowledge connections"
              title="How the concepts link"
              description="Every article is a node in a relational graph of prerequisites, consequences and experimental tests."
              action={<Link to="/graph" className="flex items-center gap-1 text-[11px] text-[var(--qp-accent)] hover:underline">Open graph <ChevronRight className="h-3 w-3" /></Link>}
            />
            <Panel className="mt-3.5 flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-[280px] flex-1">
                <MiniGraph className="w-full" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-[11.5px] leading-relaxed text-[#a8bcd3]">
                  Quantum mechanics anchors the network: superposition and entanglement branch into computing and information,
                  while the Schrödinger equation connects to the mathematics workspace and the laboratory.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Quantum Mechanics', 'Quantum Information', 'Quantum Computing', 'Quantum Optics'].map((g) => (
                    <Chip key={g} as="span">{g}</Chip>
                  ))}
                </div>
              </div>
            </Panel>
          </section>
        </div>

        {/* RIGHT RAIL */}
        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Terminology of the day</p>
            </div>
            <p className="mt-2 text-[13px] font-medium text-[#eaf4ff]">{term.term}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#8fa8c2]">{term.text}</p>
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center justify-between">
              <p className="qp-label">Recently viewed</p>
              <Clock className="h-3 w-3 text-[#4f6b88]" />
            </div>
            {history.length === 0 ? (
              <p className="mt-2 text-[11px] leading-relaxed text-[#7088a5]">
                Nothing yet. Open an article and it will appear here.
              </p>
            ) : (
              <div className="mt-2 space-y-1.5">
                {history.slice(0, 4).map((h) => (
                  <Link key={h.id + h.at} to={h.to} className="block truncate text-[11.5px] text-[#c3d6e8] hover:text-[var(--qp-accent)]">
                    {h.title}
                  </Link>
                ))}
              </div>
            )}
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label">Reading progress</p>
            <div className="mt-2.5 space-y-2.5">
              {[
                { label: 'Articles opened', value: history.length, total: articles.length },
                { label: 'Saved to library', value: saved.length, total: articles.length + papers.length }
              ].map((row) => {
                const pct = Math.min(100, Math.round((row.value / row.total) * 100));
                return (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-[10.5px] text-[#8fa8c2]">
                      <span>{row.label}</span>
                      <span className="mono text-[#7088a5]">{row.value}/{row.total}</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#102b4b]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/collections" className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[var(--qp-accent)] hover:underline">
              Open library <ChevronRight className="h-3 w-3" />
            </Link>
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Recommended</p>
            </div>
            <div className="mt-2 space-y-2">
              {recommended.map((a) => (
                <div key={a.slug} className="flex items-start justify-between gap-2">
                  <Link to={`/articles/${a.slug}`} className="min-w-0">
                    <p className="truncate text-[11.5px] text-[#e6f2ff] hover:text-[var(--qp-accent)]">{a.title}</p>
                    <p className="text-[9.5px] text-[#7088a5]">{a.readingTime} min · {a.difficulty}</p>
                  </Link>
                  <SaveButton item={{ id: `article:${a.slug}`, type: 'Article', title: a.title, subtitle: a.subtitle, to: `/articles/${a.slug}` }} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="relative overflow-hidden p-3.5">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--qp-accent)]/20 blur-2xl" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#c9b2ff]" />
              <p className="qp-label">AI Quantum Assistant</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#a8bcd3]">
              Ask for an explanation at beginner, intermediate or advanced level, with equations derived step by step.
            </p>
            <Link
              to="/assistant"
              className="mt-2.5 flex w-full items-center justify-between rounded-lg border border-[var(--qp-accent)]/25 bg-[#0b203b]/60 px-2.5 py-1.5 text-[10.5px] text-[#bfa8ff] hover:border-[var(--qp-accent)]/50"
            >
              <span className="flex items-center gap-1.5"><Send className="h-3 w-3" /> Ask the assistant</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to="/assistant" className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[#c9b2ff] hover:underline">
              Open console <ChevronRight className="h-3 w-3" />
            </Link>
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <Sigma className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Reading mode</p>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#8fa8c2]">
              Currently <span className="text-[#d6f3ff]">{settings.readingMode === 'learning' ? 'Learning' : 'Standard'}</span> mode.
              Learning mode adds key-idea callouts and a glossary at the top of each article.
            </p>
            <Link to="/settings" className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[var(--qp-accent)] hover:underline">
              Change in settings <ChevronRight className="h-3 w-3" />
            </Link>
          </Panel>

          <div className="flex items-center justify-center gap-2 py-2 text-[9px] uppercase tracking-[0.22em] text-[#3f5b78]">
            <Network className="h-3 w-3" /> Quantumpaedia · scientific knowledge OS
          </div>
        </aside>
      </div>
    </div>
  );
}