import React, { useMemo, useState } from 'react';
import { Panel, Chip } from '@/components/common/Kit';
import Formula from '@/components/math/Formula';

const PRESETS = {
  '|0⟩': [
    { re: 1, im: 0 },
    { re: 0, im: 0 }
  ],
  '|1⟩': [
    { re: 0, im: 0 },
    { re: 1, im: 0 }
  ],
  '|+⟩': [
    { re: Math.SQRT1_2, im: 0 },
    { re: Math.SQRT1_2, im: 0 }
  ],
  '|−⟩': [
    { re: Math.SQRT1_2, im: 0 },
    { re: -Math.SQRT1_2, im: 0 }
  ],
  '|+i⟩': [
    { re: Math.SQRT1_2, im: 0 },
    { re: 0, im: Math.SQRT1_2 }
  ],
  '|−i⟩': [
    { re: Math.SQRT1_2, im: 0 },
    { re: 0, im: -Math.SQRT1_2 }
  ]
};

const ket = (amps) => {
  const parts = amps.map((a, i) => {
    if (Math.abs(a.re) < 1e-9 && Math.abs(a.im) < 1e-9) return null;
    const re = a.re.toFixed(2).replace(/\.00$/, '');
    const im = Math.abs(a.im).toFixed(2).replace(/\.00$/, '');
    const piece = Math.abs(a.im) < 1e-9 ? re : `${re}${a.im >= 0 ? '+' : '-'}${im}i`;
    return `${piece}|${i}\\rangle`;
  });
  return parts.filter(Boolean).join(' + ') || '0';
};

export default function DiracExplorer() {
  const [aKey, setAKey] = useState('|+⟩');
  const [bKey, setBKey] = useState('|0⟩');
  const A = PRESETS[aKey];
  const B = PRESETS[bKey];

  const inner = useMemo(() => {
    let re = 0;
    let im = 0;
    for (let i = 0; i < A.length; i += 1) {
      // ⟨a|b⟩ = Σ conj(a_i) b_i
      const cRe = A[i].re;
      const cIm = -A[i].im;
      re += cRe * B[i].re - cIm * B[i].im;
      im += cRe * B[i].im + cIm * B[i].re;
    }
    return { re, im };
  }, [A, B]);

  const modulus = Math.hypot(inner.re, inner.im);
  const prob = modulus * modulus;
  const phase = (Math.atan2(inner.im, inner.re) * 180) / Math.PI;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Panel className="p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: 'State |a⟩', value: aKey, set: setAKey, amps: A },
            { title: 'State |b⟩', value: bKey, set: setBKey, amps: B }
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-[var(--qp-accent)]/12 bg-[#071729]/60 p-3">
              <p className="qp-label mb-2">{s.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(PRESETS).map((k) => (
                  <Chip key={k} active={s.value === k} onClick={() => s.set(k)}>{k}</Chip>
                ))}
              </div>
              <div className="mt-2.5 rounded-md bg-[#04121f] px-2.5 py-2">
                <Formula tex={ket(s.amps)} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[var(--qp-accent)]/20 bg-[var(--qp-accent)]/8 p-3.5">
          <p className="qp-label mb-2 text-[#c9b2ff]">Inner product</p>
          <Formula tex={'\\langle a|b\\rangle = \\sum_i \\overline{\\alpha_i}\\,\\beta_i'} display />
          <div className="mono mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-[#d7caff]">
            <span>
              ⟨a|b⟩ = {inner.re.toFixed(3)} {inner.im < 0 ? '−' : '+'} {Math.abs(inner.im).toFixed(3)}i
            </span>
            <span>|⟨a|b⟩| = {modulus.toFixed(3)}</span>
            <span>P = {prob.toFixed(3)}</span>
            <span>phase = {phase.toFixed(1)}°</span>
          </div>
          <p className="mt-2 text-[10.5px] leading-relaxed text-[#b3a8cf]">
            {prob < 1e-6
              ? 'The states are orthogonal: the transition probability vanishes and a measurement distinguishing them is deterministic.'
              : Math.abs(prob - 1) < 1e-6
              ? 'The states are identical up to global phase.'
              : `The amplitude for finding |b⟩ given |a⟩ has modulus ${modulus.toFixed(3)}; the probability is its square.`}
          </p>
        </div>
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-2">Notation reference</p>
        <div className="space-y-2.5">
          {[
            { tex: '|\\psi\\rangle', text: 'ket — a state vector (column vector)' },
            { tex: '\\langle\\psi|', text: 'bra — the conjugate transpose (row vector)' },
            { tex: '\\langle\\phi|\\psi\\rangle', text: 'inner product — a complex number' },
            { tex: '|\\psi\\rangle\\langle\\phi|', text: 'outer product — an operator' },
            { tex: '\\hat{A}|\\psi\\rangle', text: 'operator acting on a state' }
          ].map((r) => (
            <div key={r.tex} className="rounded-md border border-[var(--qp-accent)]/10 bg-[#071729]/60 px-2.5 py-2">
              <Formula tex={r.tex} />
              <p className="mt-1 text-[10px] leading-relaxed text-[#8fa8c2]">{r.text}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}