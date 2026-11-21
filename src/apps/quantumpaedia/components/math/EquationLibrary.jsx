import React, { useMemo, useState } from 'react';
import { Search, Sigma } from 'lucide-react';
import { Panel, Chip, EmptyState } from '@/components/common/Kit';
import EquationBlock from '@/components/article/EquationBlock';
import SaveButton from '@/components/common/SaveButton';
import { equations } from '@/data/equations';

export default function EquationLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(equations.map((e) => e.category)))], []);
  const filtered = equations.filter((e) => {
    const matchesCategory = category === 'All' || e.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.interpretation.toLowerCase().includes(q) || e.origin.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-[#7088a5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search equations…"
            className="w-full bg-transparent text-[12px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.slice(0, 6).map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Sigma} title="No equations found" description="Try another category or a broader search term." />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {filtered.map((eq) => (
            <Panel key={eq.id} soft className="p-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <EquationBlock equation={eq} compact />
                </div>
                <SaveButton item={{ id: `equation:${eq.id}`, type: 'Equation', title: eq.name, subtitle: eq.category, to: `/mathematics?tab=equations&eq=${eq.id}` }} />
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}