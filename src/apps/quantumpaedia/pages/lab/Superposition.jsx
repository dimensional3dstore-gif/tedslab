import React, { useMemo, useState } from 'react';
import LabShell, { ControlSlider, Readout, LabButtons } from '@/components/lab/LabShell';
import { Panel } from '@/components/common/Kit';
import Formula from '@/components/math/Formula';
import { GATES, applySingle, cabs2, carg } from '@/lib/quantum';

const ORDER = ['H', 'X', 'Y', 'Z', 'S', 'T'];

export default function Superposition() {
  const [state, setState] = useState([{ re: 1, im: 0 }, { re: 0, im: 0 }]);
  const [history, setHistory] = useState([]);
  const [last, setLast] = useState(null);

  const probs = useMemo(() => state.map(cabs2), [state]);
  const phases = useMemo(() => state.map((a) => (carg(a) * 180) / Math.PI), [state]);
  const relativePhase = useMemo(() => ((phases[1] - phases[0] + 540) % 360) - 180, [phases]);

  const apply = (gate) => {
    setState((prev) => applySingle(prev, GATES[gate], 0, 1));
    setLast(null);
  };

  const measure = () => {
    const r = Math.random();
    const outcome = r < probs[0] ? 0 : 1;
    setState(outcome === 0 ? [{ re: 1, im: 0 }, { re: 0, im: 0 }] : [{ re: 0, im: 0 }, { re: 1, im: 0 }]);
    setLast(outcome);
    setHistory((h) => [{ outcome, p0: probs[0], p1: probs[1], id: Date.now() }, ...h].slice(0, 12));
  };

  const reset = () => {
    setState([{ re: 1, im: 0 }, { re: 0, im: 0 }]);
    setHistory([]);
    setLast(null);
  };

  const bars = [
    { label: '|0⟩', p: probs[0], amp: state[0], phase: phases[0] },
    { label: '|1⟩', p: probs[1], amp: state[1], phase: phases[1] }
  ];

  return (
    <LabShell
      title="Superposition Simulator"
      subtitle="A single qubit, its complex amplitudes, and what happens when you measure it."
      visual="superposition"
      note="The simulator applies exact 2×2 unitary matrices to a statevector. Measurement samples from the Born-rule distribution and collapses the state to the observed basis state."
      readouts={
        <>
          <Readout label="P(0)" value={`${(probs[0] * 100).toFixed(1)}%`} />
          <Readout label="P(1)" value={`${(probs[1] * 100).toFixed(1)}%`} />
          <Readout label="Relative phase" value={`${relativePhase.toFixed(0)}°`} />
          <Readout label="Last outcome" value={last === null ? '—' : `|${last}⟩`} accent="text-[var(--qp-accent)]" />
        </>
      }
      controls={
        <>
          <div>
            <p className="qp-label mb-2">Gate library</p>
            <div className="grid grid-cols-3 gap-1.5">
              {ORDER.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => apply(g)}
                  className="rounded-md border border-[var(--qp-accent)]/20 bg-[#0b203b]/70 py-1.5 text-[12px] font-medium text-[#cfeaff] transition-colors hover:border-[var(--qp-accent)]/60 hover:text-white"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <LabButtons onRun={measure} onReset={reset} runLabel="Measure qubit" resetLabel="Reset" />
          <div className="rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/70 p-2.5">
            <p className="qp-label mb-1.5">State notation</p>
            <Formula tex={`|\\psi\\rangle = ${state[0].re.toFixed(3)}|0\\rangle ${state[1].re < 0 ? '-' : '+'} ${Math.abs(state[1].re).toFixed(3)}|1\\rangle`} display />
            <p className="mono mt-1 text-[9px] text-[#5f7893]">
              real components shown; imaginary parts tracked in the amplitudes
            </p>
          </div>
          <div>
            <p className="qp-label mb-1.5">Measurement history</p>
            {history.length === 0 ? (
              <p className="text-[10.5px] text-[#5f7893]">No measurements yet.</p>
            ) : (
              <div className="space-y-1">
                {history.map((h) => (
                  <div key={h.id} className="mono flex items-center justify-between rounded border border-[var(--qp-accent)]/8 px-2 py-1 text-[10px]">
                    <span className="text-[#d6e9f8]">|{h.outcome}⟩</span>
                    <span className="text-[#5f7893]">p={(h.outcome === 0 ? h.p0 : h.p1).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      }
    >
      <div className="p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {bars.map((b) => (
            <div key={b.label} className="rounded-xl border border-[var(--qp-accent)]/12 bg-[#071729]/60 p-3.5">
              <div className="flex items-baseline justify-between">
                <span className="mono text-[13px] text-[#9fd8ff]">{b.label}</span>
                <span className="mono text-[11px] text-[#d6e9f8]">{(b.p * 100).toFixed(1)}%</span>
              </div>
              <div className="mt-2.5 h-20 w-full rounded-lg bg-[#04121f] p-2">
                <div className="flex h-full items-end gap-1.5">
                  <div className="relative flex h-full w-4 items-end overflow-hidden rounded-sm bg-[#102b4b]">
                    <div
                      className="w-full rounded-sm bg-gradient-to-t from-[var(--qp-accent)] to-[var(--qp-accent)] transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.abs(b.amp.re) * 100)}%` }}
                    />
                  </div>
                  <div className="relative flex h-full w-4 items-end overflow-hidden rounded-sm bg-[#102b4b]">
                    <div
                      className="w-full rounded-sm bg-gradient-to-t from-[#7c4dff] to-[var(--qp-accent)] transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.abs(b.amp.im) * 100)}%` }}
                    />
                  </div>
                  <div className="flex-1 text-[9px] leading-tight text-[#5f7893]">
                    <p>Re {b.amp.re.toFixed(3)}</p>
                    <p>Im {b.amp.im.toFixed(3)}</p>
                    <p className="mt-1 text-[#7088a5]">phase {b.phase.toFixed(0)}°</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="qp-label mb-2">Probability distribution</p>
          <div className="flex h-3 overflow-hidden rounded-full bg-[#04121f]">
            <div className="bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)] transition-all duration-500" style={{ width: `${probs[0] * 100}%` }} />
            <div className="bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)] transition-all duration-500" style={{ width: `${probs[1] * 100}%` }} />
          </div>
          <div className="mono mt-1 flex justify-between text-[9.5px] text-[#7088a5]">
            <span>|0⟩ {(probs[0] * 100).toFixed(1)}%</span>
            <span>|1⟩ {(probs[1] * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            { t: 'H on |0⟩', d: 'Creates (|0⟩+|1⟩)/√2 — equal probabilities, definite relative phase.' },
            { t: 'Z then H', d: 'Phase flip becomes an amplitude sign change: the state turns into (|0⟩−|1⟩)/√2.' },
            { t: 'Measure', d: 'One outcome is realised and the state collapses. Repeat to build the distribution.' }
          ].map((x) => (
            <div key={x.t} className="qp-panel-soft p-2.5">
              <p className="mono text-[10.5px] text-[#9fd8ff]">{x.t}</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-[#8fa8c2]">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </LabShell>
  );
}