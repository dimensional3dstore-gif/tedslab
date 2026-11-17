import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { Search, BookOpen, ArrowUpRight } from "lucide-react";

type DictionaryEntry = {
  term: string;
  definition: string;
  field: string;
};

const entries: DictionaryEntry[] = [
  { term: "Algorithm", definition: "A finite sequence of precise steps used to solve a problem or perform a computation.", field: "Computing" },
  { term: "Atom", definition: "The smallest unit of an element that retains the chemical identity of that element.", field: "Chemistry" },
  { term: "Cell", definition: "The basic structural and functional unit of living organisms.", field: "Biology" },
  { term: "Compound", definition: "A substance formed when two or more different elements are chemically bonded together.", field: "Chemistry" },
  { term: "DNA", definition: "Deoxyribonucleic acid, the molecule that stores hereditary genetic information in most living organisms.", field: "Biology" },
  { term: "Ecosystem", definition: "A community of organisms interacting with one another and with the non-living parts of their environment.", field: "Biology" },
  { term: "Energy", definition: "The capacity of a system to do work or produce change.", field: "Physics" },
  { term: "Evolution", definition: "The change in inherited characteristics of populations across generations.", field: "Biology" },
  { term: "Force", definition: "An interaction that can change an object's motion; force is measured in newtons.", field: "Physics" },
  { term: "Gene", definition: "A segment of genetic material that contributes to a heritable characteristic or biological function.", field: "Biology" },
  { term: "Gravity", definition: "The attractive interaction associated with mass, responsible for phenomena such as falling objects and orbital motion.", field: "Physics" },
  { term: "Hypothesis", definition: "A testable proposed explanation for an observation or scientific question.", field: "Science" },
  { term: "Ion", definition: "An atom or molecule with a net electric charge because it has gained or lost electrons.", field: "Chemistry" },
  { term: "Molecule", definition: "A group of two or more atoms held together by chemical bonds and acting as a unit.", field: "Chemistry" },
  { term: "Neuron", definition: "A specialised cell that receives, processes, and transmits information through the nervous system.", field: "Biology" },
  { term: "Orbit", definition: "The path followed by an object under the influence of gravity or another central force.", field: "Physics" },
  { term: "Photosynthesis", definition: "The process by which plants, algae, and some microorganisms convert light energy into chemical energy.", field: "Biology" },
  { term: "Quantum", definition: "A discrete amount of a physical quantity, especially as used in quantum physics.", field: "Physics" },
  { term: "Reaction", definition: "A chemical process in which substances are transformed into new substances.", field: "Chemistry" },
  { term: "Relativity", definition: "Einstein's theories describing how measurements of space, time, motion, and gravity depend on physical conditions.", field: "Physics" },
  { term: "Species", definition: "A group of organisms defined by a shared set of characteristics; in biology, species concepts vary by context.", field: "Biology" },
  { term: "Theory", definition: "A well-supported explanatory framework built from evidence, testing, and repeated observation.", field: "Science" },
  { term: "Variable", definition: "A quantity or characteristic that can change and be measured, controlled, or investigated.", field: "Science" },
  { term: "Velocity", definition: "The rate at which an object's position changes, including its direction of motion.", field: "Physics" },
  { term: "Web", definition: "A network of interlinked resources accessed through the internet using web protocols and browsers.", field: "Computing" },
  { term: "Machine learning", definition: "A branch of computing in which systems learn patterns from data to make predictions or decisions.", field: "Computing" },
  { term: "Neural network", definition: "A computational model made of connected processing units that can learn patterns from examples.", field: "Computing" },
  { term: "Probability", definition: "A numerical measure from 0 to 1 describing the likelihood of an event.", field: "Mathematics" },
  { term: "Derivative", definition: "A mathematical quantity representing how a function changes with respect to its input.", field: "Mathematics" },
  { term: "Integer", definition: "A whole number that can be positive, negative, or zero.", field: "Mathematics" },
];

export const Route = createFileRoute("/dictionary")({
  head: () => ({
    meta: [
      { title: "Dictionary — Ted's Lab" },
      { name: "description", content: "A searchable, growing dictionary of concepts used across Ted's Lab." },
    ],
  }),
  component: DictionaryPage,
});

function DictionaryPage() {
  const [field, setField] = useState("All");

  return (
    <AppShell>
      {(query) => {
        const fields = ["All", ...Array.from(new Set(entries.map((entry) => entry.field))).sort()];
        const filtered = useMemo(() => {
          return entries
            .filter((entry) => field === "All" || entry.field === field)
            .filter((entry) => !query || `${entry.term} ${entry.definition} ${entry.field}`.toLowerCase().includes(query))
            .sort((a, b) => a.term.localeCompare(b.term));
        }, [field, query]);

        return (
          <>
            <PageHeader
              title="Dictionary"
              description="A searchable reference for the words, ideas, and scientific concepts used throughout Ted's Lab."
            />

            <section className="mt-6 bio-panel p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Search className="size-4" />
                  <span>{filtered.length} definition{filtered.length === 1 ? "" : "s"}</span>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Field</span>
                  <select
                    value={field}
                    onChange={(event) => setField(event.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  >
                    {fields.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>
            </section>

            {filtered.length === 0 ? (
              <div className="mt-6 bio-panel p-8 text-center">
                <BookOpen className="mx-auto size-8 text-muted-foreground" />
                <h2 className="mt-3 font-semibold">No definitions found</h2>
                <p className="mt-1 text-sm text-muted-foreground">Try another word or clear the field filter.</p>
              </div>
            ) : (
              <dl className="mt-6 grid gap-3 md:grid-cols-2">
                {filtered.map((entry) => (
                  <div key={entry.term} className="bio-panel p-5 transition-colors hover:border-primary/40">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-lg font-semibold text-primary">{entry.term}</dt>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        {entry.field}
                      </span>
                    </div>
                    <dd className="mt-3 text-sm leading-6 text-muted-foreground">{entry.definition}</dd>
                    <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowUpRight className="size-3.5" />
                      <span>Dictionary entry</span>
                    </div>
                  </div>
                ))}
              </dl>
            )}
          </>
        );
      }}
    </AppShell>
  );
}
