import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { Atom, FlaskConical, Microscope, Dna, Info } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/microatlas")({
  head: () => ({ meta: [{ title: "MicroAtlas — Ted's Lab" }] }),
  component: MicroAtlasPage,
});

const organisms = [
  { id: "bacterium", name: "Bacterium", scientific: "Escherichia coli", type: "Prokaryote · Gram-negative", icon: Microscope, accent: "#22c55e", size: "1–3 µm", habitat: "Intestinal tract, soil, water", description: "A model bacterium used extensively in microbiology, genetics, biotechnology, and recombinant protein research." },
  { id: "virus", name: "Virus", scientific: "SARS-CoV-2", type: "RNA Virus · Betacoronavirus", icon: Atom, accent: "#facc15", size: "80–120 nm", habitat: "Obligate intracellular parasite", description: "An enveloped positive-sense RNA virus whose structural biology has been central to modern virology and vaccine research." },
  { id: "fungi", name: "Fungi", scientific: "Saccharomyces cerevisiae", type: "Eukaryote · Ascomycota", icon: FlaskConical, accent: "#c084fc", size: "5–10 µm", habitat: "Sugary environments, fermentation", description: "Baker's yeast and a foundational eukaryotic model for genetics, cell biology, and biotechnology." },
  { id: "protozoa", name: "Protozoa", scientific: "Paramecium", type: "Eukaryote · Ciliate", icon: Dna, accent: "#38bdf8", size: "100–300 µm", habitat: "Freshwater", description: "A ciliated unicellular organism used to explore motility, feeding, osmoregulation, and cellular organization." },
  { id: "archaea", name: "Archaea", scientific: "Halobacterium", type: "Prokaryote · Halophile", icon: Atom, accent: "#fb7185", size: "1–5 µm", habitat: "Hypersaline environments", description: "A salt-loving archaeon illustrating the diversity of cellular life beyond bacteria and eukaryotes." },
  { id: "algae", name: "Microalgae", scientific: "Chlorella", type: "Eukaryote · Green alga", icon: Microscope, accent: "#4ade80", size: "2–10 µm", habitat: "Freshwater and marine systems", description: "A photosynthetic microalga studied for ecology, biotechnology, carbon fixation, and bioresource research." },
];

function MicroAtlasPage() {
  const [selectedId, setSelectedId] = useState("bacterium");
  const selected = organisms.find((o) => o.id === selectedId) ?? organisms[0];
  const Icon = selected.icon;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-[#1e2d45] bg-[#0a0f1e] text-[#e8f4f8] shadow-2xl">
        <header className="border-b border-[#1e2d45] bg-[#0a0f1e]/90 px-5 py-4 backdrop-blur sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"><Microscope className="size-5" /></div>
              <div>
                <h1 className="font-display text-xl font-bold">MicroAtlas</h1>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Interactive Microbiology Reference</p>
              </div>
            </div>
            <div className="font-mono text-[10px] text-slate-500">{organisms.length} organisms · Developed by Ted Han</div>
          </div>
        </header>
        <nav className="flex overflow-x-auto border-b border-[#1e2d45] bg-[#080c16]">
          {organisms.map((org) => {
            const OrgIcon = org.icon;
            const active = org.id === selectedId;
            return (
              <button key={org.id} onClick={() => setSelectedId(org.id)} className="flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 font-mono text-[10px] uppercase tracking-wide transition" style={{ color: active ? org.accent : "#546e7a", borderColor: active ? org.accent : "transparent", background: active ? org.accent + "12" : "transparent" }}>
                <OrgIcon className="size-3.5" />{org.name}
              </button>
            );
          })}
        </nav>
        <div className="grid min-h-[560px] lg:grid-cols-2">
          <div className="relative grid place-items-center overflow-hidden border-b border-[#1e2d45] bg-black lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#164e63 1px, transparent 1px), linear-gradient(90deg,#164e63 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative grid size-72 place-items-center rounded-full border" style={{ borderColor: selected.accent + "55", boxShadow: "0 0 80px " + selected.accent + "18" }}>
              <div className="absolute inset-8 rounded-full border" style={{ borderColor: selected.accent + "35" }} />
              <div className="absolute inset-20 rounded-full" style={{ background: selected.accent + "18" }} />
              <Icon className="relative size-24" style={{ color: selected.accent }} strokeWidth={1} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded border border-[#1e2d45] bg-[#080c16]/90 p-3 font-mono text-[9px] text-slate-500">STRUCTURAL DIAGRAM · SELECT AN ORGANISM TO EXPLORE</div>
          </div>
          <section className="space-y-6 overflow-y-auto p-6 sm:p-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: selected.accent }}>{selected.type}</p>
              <h2 className="mt-2 font-display text-3xl font-bold">{selected.name}</h2>
              <p className="mt-1 font-serif text-lg italic" style={{ color: selected.accent }}>{selected.scientific}</p>
              <p className="mt-4 text-sm leading-7 text-[#94b4c1]">{selected.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-[#1e2d45] bg-[#111827] p-4"><p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Typical size</p><p className="mt-2 text-sm">{selected.size}</p></div>
              <div className="border border-[#1e2d45] bg-[#111827] p-4"><p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Habitat</p><p className="mt-2 text-sm">{selected.habitat}</p></div>
            </div>
            <div className="flex items-start gap-3 border border-cyan-900/50 bg-cyan-950/20 p-4 text-xs leading-6 text-slate-400"><Info className="mt-0.5 size-4 shrink-0 text-cyan-400" />MicroAtlas is a research interface developed by Ted Han for Ted's Lab.</div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
