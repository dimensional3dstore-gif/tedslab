import { useState, type ReactNode } from "react";
import { Atom, BookOpen, FlaskConical, Grid2X2, Search, Sparkles, X, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { QUANTUMPEDIA_ARTICLES } from "@/data/quantumpedia";

export type QPSection = "overview" | "concepts" | "equations" | "laboratory" | "research" | "tools";

const sections = [
  ["overview", "Overview", Grid2X2],
  ["concepts", "Concepts", BookOpen],
  ["equations", "Equations", Atom],
  ["laboratory", "Laboratory", FlaskConical],
  ["research", "Research", Sparkles],
  ["tools", "Tools", Grid2X2],
] as const;

const GREEN = "#39d98a";

export function QPPanel({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-xl border bg-[#061225]/80 shadow-[0_10px_40px_rgba(0,0,0,.18)]", className)} style={{ borderColor: ${GREEN}22 }}>{children}</section>;
}

export function QuantumPediaShell({ section, onSectionChange, children }: { section: QPSection; onSectionChange: (s: QPSection) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#03101f] text-[#f0f6ff]">
      <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-[#061225]/95 px-3 backdrop-blur-xl sm:px-4" style={{ borderColor: ${GREEN}20 }}>
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border bg-[#0b203b]" style={{ borderColor: ${GREEN}55 }}>
            <Atom className="h-4 w-4" style={{ color: GREEN }} strokeWidth={1.6} />
            <span className="absolute inset-0 rounded-lg blur-md" style={{ backgroundColor: ${GREEN}12 }} />
          </div>
          <div className="hidden leading-none sm:block">
            <p className="text-[13px] font-semibold tracking-[0.14em]">QUANTUMPAEDIA</p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.28em] text-[#7088a5]">ChronosOS · OMNI · Ted's Lab</p>
          </div>
        </div>
        <div className="ml-3 hidden flex-1 md:flex">
          <div className="flex w-full max-w-xl items-center gap-2 rounded-md border bg-[#091b32]/70 px-3 py-2" style={{ borderColor: ${GREEN}18 }}>
            <Search className="h-3.5 w-3.5 text-[#7088a5]" />
            <input placeholder="Search quantum topics, equations, articles…" className="w-full bg-transparent text-[11.5px] text-[#eef6ff] outline-none placeholder:text-[#7088a5]" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Link to="/" className="hidden rounded-md border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#a8bcd3] hover:text-[#f0f6ff] lg:inline-flex" style={{ borderColor: ${GREEN}18 }}>Ted's Lab</Link>
          <button type="button" onClick={() => setMobileOpen(true)} className="rounded-md border p-1.5 text-[#a8bcd3] md:hidden" style={{ borderColor: ${GREEN}18 }} aria-label="Open QuantumPedia navigation">☰</button>
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[248px] shrink-0 overflow-y-auto border-r bg-[#061225]/95 p-3 md:block" style={{ borderColor: ${GREEN}18 }}>
          <div className="mb-3 rounded-xl border bg-[#091b32]/70 p-3.5" style={{ borderColor: ${GREEN}25 }}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>QuantumPedia</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#8fa8c2]">The QuantumPedia knowledge environment, preserved from the supplied source export and adapted only for Ted's Lab integration.</p>
          </div>
          <nav className="space-y-0.5">
            {sections.map(([id, label, Icon]) => (
              <button key={id} type="button" onClick={() => onSectionChange(id)} className={cn("group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12px] transition-colors", section === id ? "text-[#e8fff3]" : "text-[#a8bcd3] hover:bg-[#102b4b]/50 hover:text-[#f0f6ff]")} style={section === id ? { backgroundColor: ${GREEN}14, boxShadow: "inset 0 0 0 1px " + GREEN + "2e" } : undefined}>
                <Icon className="h-3.5 w-3.5" style={section === id ? { color: GREEN } : undefined} strokeWidth={1.7} />{label}
              </button>
            ))}
          </nav>
          <div className="my-4 h-px" style={{ backgroundColor: ${GREEN}18 }} />
          <div>
            <div className="flex items-center justify-between px-2 pb-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>Articles</p>
              <span className="font-mono text-[9px] text-[#4f6b88]">{QUANTUMPEDIA_ARTICLES.length}</span>
            </div>
            <nav className="space-y-0.5">
              {QUANTUMPEDIA_ARTICLES.map((article) => (
                <Link key={article.slug} to="/quantumpedia/articles/$slug" params={{ slug: article.slug }} className="group flex items-start gap-2 rounded-lg px-2.5 py-2 text-[10.5px] leading-snug text-[#8fa8c2] hover:bg-[#102b4b]/50 hover:text-[#f0f6ff]">
                  <FileText className="mt-0.5 h-3 w-3 shrink-0 opacity-60" style={{ color: GREEN }} />
                  <span className="line-clamp-2">{article.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-4 rounded-xl border p-3" style={{ borderColor: ${GREEN}18, backgroundColor: ${GREEN}08 }}>
            <p className="text-[9px] uppercase tracking-[0.18em]" style={{ color: GREEN }}>Knowledge system</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#7088a5]">Articles are available here and through Ted's Lab's normal article system.</p>
          </div>
        </aside>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-[#03101f]/75 md:hidden" onClick={() => setMobileOpen(false)}>
            <aside className="h-full w-[300px] overflow-y-auto bg-[#061225] p-4" onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2"><Atom className="h-4 w-4" style={{ color: GREEN }} /><span className="text-xs font-bold tracking-[0.12em]">QUANTUMPAEDIA</span></div>
                <button type="button" onClick={() => setMobileOpen(false)}><X className="h-4 w-4" /></button>
              </div>
              <nav className="space-y-1">
                {sections.map(([id, label, Icon]) => (
                  <button key={id} type="button" onClick={() => { onSectionChange(id); setMobileOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs", section === id ? "text-[#e8fff3]" : "text-[#a8bcd3]")} style={section === id ? { backgroundColor: ${GREEN}14 } : undefined}>
                    <Icon className="size-4" style={section === id ? { color: GREEN } : undefined} />{label}
                  </button>
                ))}
              </nav>
              <div className="my-4 h-px" style={{ backgroundColor: ${GREEN}18 }} />
              <p className="mb-2 px-2 text-[9px] uppercase tracking-[0.2em]" style={{ color: GREEN }}>Articles</p>
              <nav className="space-y-1">
                {QUANTUMPEDIA_ARTICLES.map((article) => (
                  <Link key={article.slug} to="/quantumpedia/articles/$slug" params={{ slug: article.slug }} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-[10.5px] leading-snug text-[#8fa8c2] hover:bg-[#102b4b]/50 hover:text-[#f0f6ff]">{article.title}</Link>
                ))}
              </nav>
            </aside>
          </div>
        )}
        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
