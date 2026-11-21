import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Play, RotateCcw } from 'lucide-react';
import { Panel, Chip } from '@/components/common/Kit';
import QuantumVisual from '@/components/quantum/QuantumVisual';

export function ControlSlider({ label, value, min, max, step = 1, onChange, unit = '', format }) {
  const display = format ? format(value) : `${typeof value === 'number' ? value.toFixed(step < 1 ? 2 : 0) : value}${unit}`;
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[10.5px]">
        <span className="text-[#8fa8c2]">{label}</span>
        <span className="mono text-[#d6e9f8]">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-[#102b4b] outline-none"
        style={{ accentColor: 'var(--qp-accent)' }}
      />
    </label>
  );
}

export function Readout({ label, value, hint, accent }) {
  return (
    <div className="rounded-lg border border-[var(--qp-accent)]/12 bg-[#071729]/70 px-2.5 py-2">
      <p className="qp-label text-[9px]">{label}</p>
      <p className={`mono mt-1 text-[12.5px] ${accent || 'text-[#e6f2ff]'}`}>{value}</p>
      {hint && <p className="mt-0.5 text-[9px] leading-snug text-[#5f7893]">{hint}</p>}
    </div>
  );
}

export default function LabShell({ title, subtitle, kicker = 'Laboratory', visual, note, controls, children, actions, readouts }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to="/laboratory" className="inline-flex items-center gap-1.5 text-[11px] text-[#8fa8c2] hover:text-[var(--qp-accent)]">
          <ArrowLeft className="h-3 w-3" /> Simulation centre
        </Link>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip as="span" className="mono text-[9.5px]">model-based simulation</Chip>
          {actions}
        </div>
      </div>

      <header className="qp-panel relative overflow-hidden px-4 py-4 sm:px-5">
        <div className="pointer-events-none absolute inset-0 qp-grid-bg opacity-50" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="qp-label">{kicker}</p>
            <h1 className="mt-1.5 text-[22px] font-semibold tracking-tight text-[#f0f6ff] sm:text-[26px]">{title}</h1>
            <p className="mt-1 text-[12px] leading-relaxed text-[#a8bcd3]">{subtitle}</p>
          </div>
          {visual && (
            <div className="hidden h-16 w-28 overflow-hidden rounded-lg border border-[var(--qp-accent)]/20 sm:block">
              <QuantumVisual variant={visual} className="h-full w-full" animate={false} />
            </div>
          )}
        </div>
      </header>

      {note && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--qp-accent)]/20 bg-[var(--qp-accent)]/8 px-3 py-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c9b2ff]" />
          <p className="text-[10.5px] leading-relaxed text-[#c3b6dd]">{note}</p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_282px]">
        <div className="space-y-3">
          <Panel className="overflow-hidden p-0">{children}</Panel>
          {readouts && <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{readouts}</div>}
        </div>
        <aside className="lg:sticky lg:top-[72px] lg:self-start">
          <Panel className="p-3.5">
            <p className="qp-label mb-3">Parameters</p>
            <div className="space-y-3.5">{controls}</div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

export function LabButtons({ onRun, onReset, runLabel = 'Run', resetLabel = 'Reset' }) {
  return (
    <div className="mt-3.5 flex gap-2">
      <button
        type="button"
        onClick={onRun}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--qp-accent)] px-3 py-1.5 text-[11px] font-medium text-[#04121f] transition-colors hover:bg-[#5ad8ff]"
      >
        <Play className="h-3 w-3" /> {runLabel}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--qp-accent)]/25 px-3 py-1.5 text-[11px] text-[#c3d6e8] transition-colors hover:border-[var(--qp-accent)]/60 hover:text-[#f0f6ff]"
      >
        <RotateCcw className="h-3 w-3" /> {resetLabel}
      </button>
    </div>
  );
}