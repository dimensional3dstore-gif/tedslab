import React, { useMemo, useState } from 'react';
import { Panel } from '@/components/common/Kit';

const LABELS = ['|0⟩', '|1⟩', '|2⟩'];

export default function ProbabilityCalculator() {
  const [amps, setAmps] = useState([
    { re: 0.707, im: 0 },
    { re: 0.5, im: 0.5 },
    { re: 0, im: 0 }
  ]);

  const { probs, normSq, normFactor, entropy } = useMemo(() => {
    const squares = amps.map((a) => a.re * a.re + a.im * a.im);
    const total = squares.reduce((s, v) => s + v, 0);
    const p = total > 0 ? squares.map((v) => v / total) : squares;
    const ent = -p.reduce((s, v) => (v > 0 ? s + v * Math.log2(v) : s), 0);
    return { probs: p, normSq: total, normFactor: total > 0 ? 1 / Math.sqrt(total) : 0, entropy: ent };
  }, [amps]);

  const set = (i, key, value) => setAmps((prev) => prev.map((a, idx) => (idx === i ? { ...a, [key]: value } : a)));

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
      <Panel className="p-4">
        <p className="qp-label mb-3">State amplitudes</p>
        <div className="space-y-3">
          {amps.map((a, i) => (
            <div key={i} className="grid grid-cols-[46px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3">
              <span className="mono text-[12px] text-[#9fd8ff]">{LABELS[i]}</span>
              <div>
                <p className="mb-0.5 text-[9px] text-[#7088a5]">real part</p>
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.01}
                  value={a.re}
                  onChange={(e) => set(i, 're', Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[#102b4b]"
                  style={{ accentColor: 'var(--qp-accent)' }}
                />
              </div>
              <div>
                <p className="mb-0.5 text-[9px] text-[#7088a5]">imaginary part</p>
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.01}
                  value={a.im}
                  onChange={(e) => set(i, 'im', Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[#102b4b]"
                  style={{ accentColor: 'var(--qp-accent)' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {probs.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="mono w-10 text-[10px] text-[#7088a5]">{LABELS[i]}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#102b4b]">
                <div className="h-full bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)] transition-all duration-300" style={{ width: `${p * 100}%` }} />
              </div>
              <span className="mono w-14 text-right text-[10px] text-[#d6e9f8]">{(p * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ['Σ|α|²', normSq.toFixed(3)],
            ['normalisation', normFactor.toFixed(3)],
            ['von Neumann S', `${entropy.toFixed(3)} bits`],
            ['pure?', normSq > 0 ? 'yes (renormalised)' : '—']
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[var(--qp-accent)]/12 bg-[#071729]/60 p-2">
              <p className="qp-label text-[9px]">{label}</p>
              <p className="mono mt-1 text-[11px] text-[#d6e9f8]">{value}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-2">Born rule</p>
        <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
          Probabilities are pᵢ = |αᵢ|² / Σ|αⱼ|². The panel normalises whatever amplitudes you enter, so you can explore how
          changing a single amplitude redistributes probability across the basis.
        </p>
        <div className="qp-hairline my-3" />
        <p className="qp-label mb-1.5">Entropy</p>
        <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
          An equal superposition of three states carries log₂3 ≈ 1.585 bits of uncertainty. A definite state carries zero.
        </p>
        <div className="qp-hairline my-3" />
        <p className="qp-label mb-1.5">Normalisation</p>
        <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
          Entering an unnormalised set of amplitudes is allowed: the panel divides by √Σ|αᵢ|² so that total probability is
          always one.
        </p>
      </Panel>
    </div>
  );
}