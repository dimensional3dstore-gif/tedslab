import React, { useMemo, useState } from 'react';
import LabShell, { ControlSlider, Readout } from '@/components/lab/LabShell';
import Formula from '@/components/math/Formula';
import { c, cadd, cmul, cdiv, cexp, csqrt, cabs2, cabs } from '@/lib/quantum';

const N = 320;
const XMIN = -16;
const XMAX = 16;

/** Exact free-particle Gaussian wavepacket (ħ = m = 1). */
function wavepacket(x, t, sigma0, k0) {
  const denom = { re: 1, im: t / (2 * sigma0 * sigma0) };
  const norm = Math.pow(2 * Math.PI * sigma0 * sigma0, -0.25);
  const amp = cdiv(c(norm), csqrt(denom));
  const dx = x - k0 * t;
  const exponent = cdiv(c(-(dx * dx) / (4 * sigma0 * sigma0)), denom);
  const envelope = cexp(exponent);
  const phase = cexp(c(0, k0 * x - (k0 * k0 * t) / 2));
  return cmul(cmul(amp, envelope), phase);
}

export default function Wavefunction() {
  const [sigma0, setSigma0] = useState(1.6);
  const [k0, setK0] = useState(1.1);
  const [t, setT] = useState(0);

  const samples = useMemo(() => {
    const out = [];
    for (let i = 0; i < N; i += 1) {
      const x = XMIN + (i / (N - 1)) * (XMAX - XMIN);
      const psi = wavepacket(x, t, sigma0, k0);
      out.push({ x, re: psi.re, im: psi.im, p: cabs2(psi) });
    }
    return out;
  }, [sigma0, k0, t]);

  const maxRe = Math.max(...samples.map((s) => Math.abs(s.re)), 1e-6);
  const maxP = Math.max(...samples.map((s) => s.p), 1e-6);

  const px = (x) => ((x - XMIN) / (XMAX - XMIN)) * 700 + 24;
  const pyAmp = (v) => 104 - (v / maxRe) * 74;
  const pyProb = (v) => 236 - (v / maxP) * 58;

  const rePath = samples.map((s, i) => `${i === 0 ? 'M' : 'L'}${px(s.x).toFixed(1)},${pyAmp(s.re).toFixed(1)}`).join(' ');
  const imPath = samples.map((s, i) => `${i === 0 ? 'M' : 'L'}${px(s.x).toFixed(1)},${pyAmp(s.im).toFixed(1)}`).join(' ');
  const probPath = samples.map((s, i) => `${i === 0 ? 'M' : 'L'}${px(s.x).toFixed(1)},${pyProb(s.p).toFixed(1)}`).join(' ');

  const dx = sigma0 * Math.sqrt(1 + Math.pow(t / (2 * sigma0 * sigma0), 2));
  const dp = 1 / (2 * sigma0);

  return (
    <LabShell
      title="Wavefunction Visualiser"
      subtitle="A free Gaussian wavepacket: real part, imaginary part and probability density."
      visual="wavefunction"
      note="The displayed curves come from the closed-form free-particle solution with ħ = m = 1, so the packet spreads exactly as quantum mechanics requires while ⟨x⟩ moves at the group velocity k₀."
      readouts={
        <>
          <Readout label="⟨x⟩" value={(k0 * t).toFixed(2)} hint="k₀t" />
          <Readout label="Δx" value={dx.toFixed(2)} />
          <Readout label="Δp" value={dp.toFixed(2)} />
          <Readout label="Δx·Δp" value={(dx * dp).toFixed(3)} accent="text-[var(--qp-accent)]" hint="minimum is 0.5" />
        </>
      }
      controls={
        <>
          <ControlSlider label="Initial width σ₀" value={sigma0} min={0.7} max={3} step={0.05} onChange={setSigma0} />
          <ControlSlider label="Momentum k₀" value={k0} min={0} max={2.4} step={0.02} onChange={setK0} />
          <ControlSlider label="Time t" value={t} min={0} max={5} step={0.05} onChange={setT} />
          <div className="rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/70 p-2.5">
            <p className="qp-label mb-1.5">Initial state</p>
            <Formula tex={'\\psi(x,0) = (2\\pi\\sigma_0^2)^{-1/4}\\,e^{-x^2/4\\sigma_0^2}e^{ik_0x}'} display />
          </div>
          <div className="flex flex-wrap gap-1.5 text-[9.5px]">
            <span className="flex items-center gap-1 text-[var(--qp-accent)]"><span className="h-1.5 w-3 rounded bg-[var(--qp-accent)]" /> Re ψ</span>
            <span className="flex items-center gap-1 text-[#c9b2ff]"><span className="h-1.5 w-3 rounded bg-[var(--qp-accent)]" /> Im ψ</span>
            <span className="flex items-center gap-1 text-[#e0b3ff]"><span className="h-1.5 w-3 rounded bg-[var(--qp-accent)]" /> |ψ|²</span>
          </div>
        </>
      }
    >
      <div className="p-4 sm:p-5">
        <svg viewBox="0 0 760 270" className="w-full" role="img" aria-label="Wavefunction components and probability density">
          <line x1="24" y1="104" x2="724" y2="104" stroke="var(--qp-accent)" strokeOpacity="0.18" />
          <path d={`${probPath} L${px(XMAX)},244 L${px(XMIN)},244 Z`} fill="var(--qp-accent)" opacity="0.16" />
          <path d={probPath} fill="none" stroke="var(--qp-accent)" strokeWidth="1.4" strokeOpacity="0.9" />
          <path d={imPath} fill="none" stroke="var(--qp-accent)" strokeWidth="1.3" strokeDasharray="5 4" strokeOpacity="0.85" />
          <path d={rePath} fill="none" stroke="var(--qp-accent)" strokeWidth="1.7" />
          <text x="30" y="96" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">Re / Im ψ</text>
          <text x="30" y="258" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">|ψ(x,t)|²</text>
          <text x="680" y="258" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">x →</text>
          <line x1={px(k0 * t)} y1="64" x2={px(k0 * t)} y2="252" stroke="var(--qp-accent)" strokeOpacity="0.25" strokeDasharray="3 4" />
        </svg>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="qp-panel-soft p-2.5">
            <p className="qp-label mb-1">Group velocity</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              The envelope centre moves at k₀. Raising k₀ shifts the packet right faster without changing its shape at t = 0.
            </p>
          </div>
          <div className="qp-panel-soft p-2.5">
            <p className="qp-label mb-1">Spreading</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              A narrower packet (small σ₀) spreads faster because it contains a wider momentum range, as Δx·Δp requires.
            </p>
          </div>
          <div className="qp-panel-soft p-2.5">
            <p className="qp-label mb-1">Phase</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Re ψ and Im ψ oscillate under the envelope. Only |ψ|² is directly measurable; the phase appears in interference.
            </p>
          </div>
        </div>
      </div>
    </LabShell>
  );
}