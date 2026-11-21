import React, { useState } from 'react';
import { ChevronDown, Sigma } from 'lucide-react';
import Formula from '@/components/math/Formula';
import { cn } from '@/lib/utils';

export default function EquationBlock({ equation, compact = false }) {
  const [open, setOpen] = useState(!compact);

  return (
    <div className="qp-panel-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-[#102b4b]/40"
      >
        <span className="flex items-center gap-2">
          <Sigma className="h-3.5 w-3.5 shrink-0 text-[var(--qp-accent)]" />
          <span className="text-[12px] font-medium text-[#eaf4ff]">{equation.name}</span>
          <span className="mono hidden text-[9px] text-[#5f7893] sm:inline">{equation.year}</span>
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 text-[#7088a5] transition-transform', open && 'rotate-180')} />
      </button>

      <div className="border-t border-[var(--qp-accent)]/10 px-3.5 py-3">
        <div className="overflow-x-auto qp-scroll rounded-md bg-[#071729]/70 px-3 py-3">
          <Formula tex={equation.tex} display />
        </div>

        {open && (
          <div className="mt-3 space-y-3">
            <dl className="grid gap-1.5 sm:grid-cols-2">
              {equation.symbols.map((s) => (
                <div key={s.symbol} className="flex items-start gap-2">
                  <span className="mono min-w-[54px] text-[11px] text-[#9fd8ff]">
                    <Formula tex={s.symbol} />
                  </span>
                  <span className="text-[11px] leading-relaxed text-[#8fa8c2]">{s.meaning}</span>
                </div>
              ))}
            </dl>
            <div className="rounded-md border-l-2 border-[var(--qp-accent)]/40 bg-[#0b203b]/40 px-3 py-2">
              <p className="qp-label mb-1">Physical interpretation</p>
              <p className="text-[11.5px] leading-relaxed text-[#b6c8dc]">{equation.interpretation}</p>
            </div>
            {equation.assumptions?.length > 0 && (
              <div>
                <p className="qp-label mb-1">Conditions and limitations</p>
                <ul className="space-y-1">
                  {equation.assumptions.map((a) => (
                    <li key={a} className="flex gap-2 text-[11px] text-[#8fa8c2]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--qp-accent)]" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-[10.5px] leading-relaxed text-[#6f88a3]">
              <span className="text-[var(--qp-accent)]">Origin · </span>
              {equation.origin}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}