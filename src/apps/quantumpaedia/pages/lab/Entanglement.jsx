import React, { useMemo, useState } from 'react';
import LabShell, { Readout, LabButtons } from '@/components/lab/LabShell';
import { Panel, Chip } from '@/components/common/Kit';
import Formula from '@/components/math/Formula';
import { applySingle, GATES, collapse, sampleIndex, probabilities, cabs2 } from '@/lib/quantum';

const BELLS = {
  'Φ+': { label: '|Φ⁺⟩', tex: '\\tfrac{1}{\\sqrt2}(|00\\rangle+|11\\rangle)', amps: [1, 0, 0, 1] },
  'Φ−': { label: '|Φ⁻⟩', tex: '\\tfrac{1}{\\sqrt2}(|00\\rangle-|11\\rangle)', amps: [1, 0, 0, -1] },
  'Ψ+': { label: '|Ψ⁺⟩', tex: '\\tfrac{1}{\\sqrt2}(|01\\rangle+|10\\rangle)', amps: [0, 1, 1, 0] },
  'Ψ−': { label: '|Ψ⁻⟩', tex: '\\tfrac{1}{\\sqrt2}(|01\\rangle-|10\\rangle)', amps: [0, 1, -1, 0] }
};

const buildState = (key) =>
  BELLS[key].amps.map((a) => ({ re: a / Math.SQRT2, im: 0 }));

export default function Entanglement() {
  const [bell, setBell] = useState('Φ+');
  const [basisA, setBasisA] = useState('Z');
  const [basisB, setBasisB] = useState('Z');
  const [runs, setRuns] = useState([]);

  const state = useMemo(() => buildState(bell), [bell]);

  const rotated = useMemo(() => {
    let s = state;
    if (basisA === 'X') s = applySingle(s, GATES.H, 0, 2);
    if (basisB === 'X') s = applySingle(s, GATES.H, 1, 2);
    return s;
  }, [state, basisA, basisB]);

  const joint = useMemo(() => probabilities(rotated), [rotated]);
  const correlation = joint[0] + joint[3] - joint[1] - joint[2];

  const measure = (count = 1) => {
    const added = [];
    for (let k = 0; k < count; k += 1) {
      let s = state;
      if (basisA === 'X') s = applySingle(s, GATES.H, 0, 2);
      if (basisB === 'X') s = applySingle(s, GATES.H, 1, 2);
      const aIndex = sampleIndex(s);
      const a = (aIndex >> 1) & 1;
      s = collapse(s, 0, a, 2);
      const b = sampleIndex(s) & 1;
      added.push({ a: (a >> 1) & 1, b, id: `${Date.now()}-${k}-${Math.random().toString(36).slice(2, 6)}`, basisA, basisB });
    }
    setRuns((prev) => [...added, ...prev].slice(0, 40));
  };

  const reset = () => setRuns([]);

  const total = runs.length;
  const agree = runs.filter((r) => r.a === r.b).length;
  const disagree = total - agree;

  const last = runs[0];

  return (
    <LabShell
      title="Entanglement Simulator"
      subtitle="Two correlated qubits prepared in a Bell state, measured in a basis you choose."
      visual="entanglement"
      note="Both qubits are modelled exactly: a 4-amplitude joint state, a basis rotation, then sequential projective measurement with collapse. Outcomes are sampled from the Born-rule distribution — the model reproduces the correlations, but this is not a physical quantum computer."
      readouts={
        <>
          <Readout label="Runs" value={total} />
          <Readout label="Correlated" value={total ? `${((agree / total) * 100).toFixed(0)}%` : '—'} />
          <Readout label="Correlation E" value={correlation.toFixed(3)} accent="text-[#c9b2ff]" />
          <Readout label="Bell state" value={BELLS[bell].label} />
        </>
      }
      controls={
        <>
          <div>
            <p className="qp-label mb-2">Prepared state</p>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.entries(BELLS).map(([key, b]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setBell(key); setRuns([]); }}
                  className={`rounded-md border py-1.5 text-[11px] transition-colors ${
                    bell === key
                      ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]'
                      : 'border-[var(--qp-accent)]/15 text-[#8fa8c2] hover:border-[var(--qp-accent)]/40'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
            <div className="mt-2 rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/70 px-2.5 py-2">
              <Formula tex={`|\\Psi\\rangle = ${BELLS[bell].tex}`} display />
            </div>
          </div>

          <div>
            <p className="qp-label mb-2">Measurement basis</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="mb-1 text-[10px] text-[#7088a5]">Qubit A</p>
                <div className="flex gap-1.5">
                  {['Z', 'X'].map((b) => (
                    <Chip key={b} active={basisA === b} onClick={() => { setBasisA(b); setRuns([]); }}>{b}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] text-[#7088a5]">Qubit B</p>
                <div className="flex gap-1.5">
                  {['Z', 'X'].map((b) => (
                    <Chip key={b} active={basisB === b} onClick={() => { setBasisB(b); setRuns([]); }}>{b}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <LabButtons onRun={() => measure(1)} onReset={reset} runLabel="Measure pair" resetLabel="Clear" />
          <button
            type="button"
            onClick={() => measure(50)}
            className="w-full rounded-lg border border-[var(--qp-accent)]/30 bg-[var(--qp-accent)]/10 px-3 py-1.5 text-[11px] text-[#d9c8ff] transition-colors hover:border-[var(--qp-accent)]/60"
          >
            Run 50 trials
          </button>
        </>
      }
    >
      <div className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: 'Qubit A', basis: basisA, out: last?.a },
            { name: 'Qubit B', basis: basisB, out: last?.b }
          ].map((q, i) => (
            <div key={q.name} className="rounded-xl border border-[var(--qp-accent)]/12 bg-[#071729]/60 p-3.5">
              <div className="flex items-center justify-between">
                <p className="qp-label">{q.name}</p>
                <span className="mono text-[9px] text-[#7088a5]">basis {q.basis}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border text-[20px] font-semibold transition-colors ${
                    q.out === undefined
                      ? 'border-[var(--qp-accent)]/20 bg-[#0b203b] text-[#4f6b88]'
                      : 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/10 text-[#d6f3ff]'
                  }`}
                >
                  {q.out === undefined ? '?' : q.out}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mono text-[10px] text-[#8fa8c2]">
                    {q.out === undefined ? 'awaiting measurement' : `eigenvalue ${q.out === 0 ? '+1' : '−1'}`}
                  </p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#102b4b]">
                    <div
                      className={`h-full ${i === 0 ? 'bg-[var(--qp-accent)]' : 'bg-[var(--qp-accent)]'}`}
                      style={{ width: q.out === undefined ? '0%' : '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="qp-label mb-2">Joint probability distribution</p>
          <div className="grid grid-cols-4 gap-2">
            {['00', '01', '10', '11'].map((label, i) => (
              <div key={label} className="rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/60 p-2">
                <p className="mono text-[10px] text-[#9fd8ff]">|{label}⟩</p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#102b4b]">
                  <div className="h-full bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)]" style={{ width: `${joint[i] * 100}%` }} />
                </div>
                <p className="mono mt-1 text-[9.5px] text-[#8fa8c2]">{(joint[i] * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10.5px] leading-relaxed text-[#7088a5]">
            In the {basisA === basisB ? 'shared' : 'mixed'} basis the state gives a correlation of {correlation.toFixed(3)}.
            A {basisA === basisB ? 'positive' : 'reduced'} value indicates that the outcomes are
            {Math.abs(correlation) > 0.9 ? ' almost perfectly' : ' partially'}
            {correlation > 0 ? ' correlated' : ' anti-correlated'}.
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="qp-label">Measurement history</p>
            <p className="mono text-[9.5px] text-[#5f7893]">{agree} agree · {disagree} differ</p>
          </div>
          {runs.length === 0 ? (
            <p className="mt-2 text-[10.5px] text-[#5f7893]">Run a measurement to populate the history.</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1">
              {runs.slice(0, 32).map((r) => (
                <span
                  key={r.id}
                  className={`mono rounded border px-1.5 py-0.5 text-[9.5px] ${
                    r.a === r.b ? 'border-[var(--qp-accent)]/30 bg-[var(--qp-accent)]/8 text-[#bfe6ff]' : 'border-[var(--qp-accent)]/40 bg-[var(--qp-accent)]/10 text-[#e9cdff]'
                  }`}
                >
                  {r.a}{r.b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </LabShell>
  );
}