import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Play } from 'lucide-react';
import LabShell, { Readout } from '@/components/lab/LabShell';
import { Chip } from '@/components/common/Kit';
import Formula from '@/components/math/Formula';
import { GATE_INFO, basisLabel, cabs2, carg, runCircuit, sampleIndex } from '@/lib/quantum';

const GATES = ['H', 'X', 'Y', 'Z', 'S', 'T', 'CX'];

const emptyCircuit = (cols) => Array.from({ length: cols }, () => ({}));

export default function CircuitBuilder() {
  const [nQubits, setNQubits] = useState(2);
  const [columns, setColumns] = useState(emptyCircuit(5));
  const [gate, setGate] = useState('H');
  const [counts, setCounts] = useState(null);

  const state = useMemo(() => runCircuit(columns, nQubits), [columns, nQubits]);
  const probs = useMemo(() => state.map(cabs2), [state]);
  const maxProb = Math.max(...probs, 1e-9);

  const place = (col, q) => {
    setCounts(null);
    setColumns((prev) =>
      prev.map((c, i) => {
        if (i !== col) return c;
        const next = { ...c };
        if (next[q] === gate) delete next[q];
        else next[q] = gate;
        return next;
      })
    );
  };

  const addColumn = () => {
    setCounts(null);
    setColumns((prev) => [...prev, {}]);
  };

  const removeColumn = () => {
    setCounts(null);
    setColumns((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const clear = () => {
    setCounts(null);
    setColumns(emptyCircuit(5));
  };

  const measure = () => {
    const tally = {};
    for (let k = 0; k < 512; k += 1) {
      const idx = sampleIndex(state);
      const label = basisLabel(idx, nQubits);
      tally[label] = (tally[label] || 0) + 1;
    }
    setCounts(tally);
  };

  return (
    <LabShell
      title="Quantum Circuit Builder"
      subtitle="Assemble gates, execute the circuit on a local statevector simulator, inspect amplitudes."
      visual="circuit"
      note="The circuit is executed exactly: each gate multiplies a 2ⁿ-dimensional complex statevector. CNOT uses the selected qubit as control and the following qubit as target. Measurement samples 512 shots from the Born distribution."
      readouts={
        <>
          <Readout label="Qubits" value={nQubits} />
          <Readout label="Depth" value={columns.filter((c) => Object.keys(c).length > 0).length} />
          <Readout label="Gates" value={columns.reduce((s, c) => s + Object.keys(c).length, 0)} />
          <Readout label="Outcomes" value={probs.filter((p) => p > 1e-6).length} hint="basis states with p > 0" />
        </>
      }
      controls={
        <>
          <div>
            <p className="qp-label mb-1.5">Register</p>
            <div className="flex gap-1.5">
              {[2, 3].map((n) => (
                <Chip key={n} active={nQubits === n} onClick={() => { setNQubits(n); setColumns(emptyCircuit(5)); setCounts(null); }}>
                  {n} qubits
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="qp-label mb-1.5">Gate library</p>
            <div className="grid grid-cols-4 gap-1.5">
              {GATES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGate(g)}
                  className={`rounded-md border py-1.5 text-[11px] font-medium transition-colors ${
                    gate === g
                      ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]'
                      : 'border-[var(--qp-accent)]/15 text-[#8fa8c2] hover:border-[var(--qp-accent)]/40'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#7088a5]">{GATE_INFO[gate]?.note}</p>
          </div>
          <div className="space-y-1.5">
            <button type="button" onClick={addColumn} className="flex w-full items-center justify-center gap-1.5 rounded-md border border-[var(--qp-accent)]/20 py-1.5 text-[10.5px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/50">
              <Plus className="h-3 w-3" /> Add step
            </button>
            <button type="button" onClick={removeColumn} className="flex w-full items-center justify-center gap-1.5 rounded-md border border-[var(--qp-accent)]/20 py-1.5 text-[10.5px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/50">
              <Trash2 className="h-3 w-3" /> Remove step
            </button>
            <button type="button" onClick={measure} className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--qp-accent)] py-1.5 text-[11px] font-medium text-[#04121f] hover:bg-[#5ad8ff]">
              <Play className="h-3 w-3" /> Measure 512 shots
            </button>
            <button type="button" onClick={clear} className="w-full rounded-md border border-[var(--qp-accent)]/15 py-1.5 text-[10.5px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]">
              Clear circuit
            </button>
          </div>
        </>
      }
    >
      <div className="p-4 sm:p-5">
        <div className="overflow-x-auto qp-scroll">
          <div className="min-w-[420px]">
            <div className="mb-1 flex gap-1.5 pl-12">
              {columns.map((_, i) => (
                <div key={i} className="mono w-14 text-center text-[8.5px] text-[#4f6b88]">s{i + 1}</div>
              ))}
            </div>
            {Array.from({ length: nQubits }, (_, q) => (
              <div key={q} className="mb-1 flex items-center gap-1.5">
                <div className="mono w-10 shrink-0 text-right text-[10px] text-[#9fd8ff]">q{q}</div>
                {columns.map((col, ci) => {
                  const value = col[q];
                  return (
                    <button
                      key={ci}
                      type="button"
                      onClick={() => place(ci, q)}
                      className={`relative flex h-9 w-14 items-center justify-center rounded border text-[11px] transition-colors ${
                        value
                          ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]'
                          : 'border-[var(--qp-accent)]/12 bg-[#071729]/70 text-transparent hover:border-[var(--qp-accent)]/35'
                      }`}
                    >
                      {value || '·'}
                      {value === 'CX' && <span className="absolute -right-1 top-1/2 h-px w-2 -translate-y-1/2 bg-[var(--qp-accent)]" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-2 text-[10px] text-[#5f7893]">
          Click a cell to place the selected gate; click again to remove it. Circuit depth grows to the right.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="qp-label mb-2">Statevector</p>
            <div className="max-h-[228px] space-y-1 overflow-y-auto qp-scroll pr-1">
              {state.map((amp, i) => {
                const p = probs[i];
                const phase = (carg(amp) * 180) / Math.PI;
                return (
                  <div
                    key={i}
                    className={`rounded-md border px-2 py-1 ${
                      p > 1e-4 ? 'border-[var(--qp-accent)]/18 bg-[#0b203b]/60' : 'border-transparent opacity-45'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="mono text-[10px] text-[#9fd8ff]">|{basisLabel(i, nQubits)}⟩</span>
                      <span className="mono text-[9.5px] text-[#8fa8c2]">{(p * 100).toFixed(1)}%</span>
                    </div>
                    <div className="mono mt-0.5 flex items-center justify-between text-[9px] text-[#5f7893]">
                      <span>
                        {amp.re.toFixed(3)} {amp.im < 0 ? '−' : '+'} {Math.abs(amp.im).toFixed(3)}i
                      </span>
                      <span>{Number.isFinite(phase) && p > 1e-4 ? `${phase.toFixed(0)}°` : '—'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="qp-label mb-2">Probability distribution</p>
            <div className="space-y-1.5">
              {state.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="mono w-12 shrink-0 text-[9px] text-[#7088a5]">|{basisLabel(i, nQubits)}⟩</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#102b4b]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)] transition-all duration-300"
                      style={{ width: `${(probs[i] / maxProb) * 100}%` }}
                    />
                  </div>
                  <span className="mono w-10 shrink-0 text-right text-[9px] text-[#8fa8c2]">{(probs[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>

            {counts && (
              <div className="mt-3 rounded-lg border border-[var(--qp-accent)]/20 bg-[var(--qp-accent)]/8 p-2.5">
                <p className="qp-label mb-1.5 text-[#c9b2ff]">512-shot measurement</p>
                <div className="space-y-1">
                  {Object.entries(counts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([k, v]) => (
                      <div key={k} className="mono flex items-center justify-between text-[9.5px] text-[#c3b6dd]">
                        <span>|{k}⟩</span>
                        <span>{v} · {((v / 512) * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/60 p-2.5">
          <p className="qp-label mb-1">Dirac notation of the output state</p>
          <Formula
            tex={state
              .map((amp, i) => (cabs2(amp) > 1e-4 ? `(${amp.re.toFixed(2)}${amp.im >= 0 ? '+' : '-'}${Math.abs(amp.im).toFixed(2)}i)|${basisLabel(i, nQubits)}\\rangle` : null))
              .filter(Boolean)
              .join(' + ')}
            display
          />
        </div>
      </div>
    </LabShell>
  );
}