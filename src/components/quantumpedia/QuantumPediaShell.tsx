import { useState, type ReactNode } from "react";
import { Atom, BookOpen, FlaskConical, Grid2X2, Search, Sparkles, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type QPSection = "overview" | "concepts" | "equations" | "laboratory" | "research" | "tools";

const sections = [
  ["overview", "Overview", Grid2X2],
  ["concepts", "Concepts", BookOpen],
  ["equations", "Equations", Atom],
  ["laboratory", "Laboratory", FlaskConical],
  ["research", "Research", Sparkles],
  ["tools", "Tools", Grid2X2],
] as const;

export function QPPanel({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-2xl border border-primary/15 bg-card/80 shadow-sm", className)}>{children}</section>;
}

export function QuantumPediaShell({ section, onSectionChange, children }: { section: QPSection; onSectionChange: (s: QPSection) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary"><Atom className="size-5" /></div>
          <div className="hidden sm:block"><p className="text-sm font-bold tracking-[.16em]">QUANTUMPAEDIA</p><p className="text-[9px] uppercase tracking-[.24em] text-muted-foreground">Ted's Lab Knowledge Tool</p></div>
        </div>
        <div className="ml-4 hidden flex-1 md:flex"><div className="flex w-full max-w-xl items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"><Search className="size-4 text-muted-foreground" /><input placeholder="Search QuantumPedia…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></div></div>
        <div className="ml-auto flex items-center gap-2"><Link to="/knowledge-atlas" className="hidden rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary lg:inline-flex">Knowledge Atlas</Link><button type="button" onClick={() => setMobileOpen(true)} className="rounded-lg border border-border p-2 md:hidden">☰</button></div>
      </header>
      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border bg-card/70 p-3 md:block">
          <div className="mb-4 rounded-xl border border-primary/15 bg-primary/5 p-3"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-primary">Knowledge</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Quantum computing, physics, mathematics, experiments and research.</p></div>
          <nav className="space-y-1">{sections.map(([id,label,Icon]) => <button key={id} type="button" onClick={() => onSectionChange(id)} className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm", section === id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary")}><Icon className="size-4" />{label}</button>)}</nav>
        </aside>
        {mobileOpen && <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)}><aside className="h-full w-72 bg-background p-4" onClick={(e) => e.stopPropagation()}><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2"><Atom className="size-5 text-primary" /><span className="font-bold">QuantumPedia</span></div><button type="button" onClick={() => setMobileOpen(false)}><X className="size-5" /></button></div><nav className="space-y-1">{sections.map(([id,label,Icon]) => <button key={id} type="button" onClick={() => { onSectionChange(id); setMobileOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm", section === id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary")}><Icon className="size-4" />{label}</button>)}</nav></aside></div>}
        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
