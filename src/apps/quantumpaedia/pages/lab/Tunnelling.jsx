import React, { useMemo, useState } from 'react';
import LabShell, { ControlSlider, Readout } from '@/components/lab/LabShell';
import Formula from '@/components/math/Formula';

const ME = 9.1093837e-31;
const HBAR = 1.054571817e-34;
const QE = 1.602176634e-19;

const eVToJ = (ev) => ev * QE;
const waveNumber = (energyJ) => Math.sqrt(2 * ME * energyJ) / HBAR; // 1/m
const kappa = (energyJ) => Math.sqrt(2 * ME * energyJ) / HBAR;

function transmission(Eev, Vev, widthNm) {
  const E = eVToJ(Eev);
  const V = eVToJ(Vev);
  const a = widthNm * 1e-9;

  if (E < V) {
    const kap = Math.sqrt(2 * ME * (V - E)) / HBAR;
    const ka = kap * a;
    if (ka > 350) return { T: 0, R: 1, regime: 'E < V₀', kap };
    const prefactor = (V * V * Math.pow(Math.sinh(ka), 2)) / (4 * E * (V - E));
    const T = 1 / (1 + prefactor);
    return { T, R: 1 - T, regime: 'E < V₀', kap };
  }
  if (Math.abs(E - V) < 1e-12) {
    return { T: 1 / (1 + (ME * V * a * a) / (2 * HBAR * HBAR)), R: 0, regime: 'E = V₀', kap: 0 };
  }
  const k2 = Math.sqrt(2 * ME * (E - V)) / HBAR;
  const prefactor = (V * V * Math.pow(Math.sin(k2 * a), 2)) / (4 * E * (E - V));
  const T = 1 / (1 + prefactor);
  return { T, R: 1 - T, regime: 'E > V₀', kap: 0 };
}

export default function Tunnelling() {
  const [energyEv, setEnergyEv] = useState(0.6);
  const [barrierEv, setBarrierEv] = useState(1.2);
  const [widthNm, setWidthNm] = useState(0.6);

  const result = useMemo(() => transmission(energyEv, barrierEv, widthNm), [energyEv, barrierEv, widthNm]);

  const geometry = useMemo(() => {
    const a = widthNm;
    const xMin = -Math.max(4, a * 3);
    const xMax = a + Math.max(4, a * 3);
    const k = waveNumber(eVToJ(energyEv)) * 1e-9; // nm^-1
    const kap = result.kap ? result.kap * 1e-9 : 0;

    const points = [];
    const envelope = [];
    const steps = 460;
    for (let i = 0; i < steps; i += 1) {
      const x = xMin + (i / (steps - 1)) * (xMax - xMin);
      let re;
      let amp;
      if (x < 0) {
        re = Math.cos(k * x);
        amp = 1;
      } else if (x <= a) {
        re = Math.cos(0) * Math.exp(-kap * x);
        amp = Math.exp(-kap * x);
      } else {
        re = Math.sqrt(Math.max(result.T, 0)) * Math.cos(k * (x - a));
        amp = Math.sqrt(Math.max(result.T, 0));
      }
      points.push([x, re]);
      envelope.push([x, amp]);
    }
    return { xMin, xMax, points, envelope, a };
  }, [energyEv, widthNm, result]);

  const px = (x) => ((x - geometry.xMin) / (geometry.xMax - geometry.xMin)) * 700 + 24;
  const py = (y) => 140 - y * 96;

  const toPath = (arr) => arr.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(' ');

  const formatProb = (p) => (p < 1e-6 ? p.toExponential(2) : `${(p * 100).toFixed(p < 0.01 ? 4 : 2)}%`);

  return (
    <LabShell
      title="Quantum Tunnelling"
      subtitle="Transmission through a rectangular potential barrier, computed from the exact solution."
      visual="tunnelling"
      note="Uses the closed-form transmission coefficient for a one-dimensional rectangular barrier with electron mass. For E < V₀ the amplitude inside the barrier decays as exp(−κx); beyond it, a reduced travelling wave emerges."
      readouts={
        <>
          <Readout label="Transmission T" value={formatProb(result.T)} accent="text-[var(--qp-accent)]" />
          <Readout label="Reflection R" value={formatProb(result.R)} accent="text-[#c9b2ff]" />
          <Readout label="Regime" value={result.regime} />
          <Readout label="T + R" value={(result.T + result.R).toFixed(6)} hint="probability conservation" />
        </>
      }
      controls={
        <>
          <ControlSlider label="Particle energy E" value={energyEv} min={0.05} max={2.5} step={0.01} onChange={setEnergyEv} unit=" eV" />
          <ControlSlider label="Barrier height V₀" value={barrierEv} min={0.1} max={3} step={0.01} onChange={setBarrierEv} unit=" eV" />
          <ControlSlider label="Barrier width a" value={widthNm} min={0.05} max={2} step={0.01} onChange={setWidthNm} unit=" nm" />
          <div className="rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/70 p-2.5">
            <p className="qp-label mb-1.5">Transmission coefficient</p>
            <Formula
              tex={'T=\\left[1+\\frac{V_0^2\\sinh^2(\\kappa a)}{4E(V_0-E)}\\right]^{-1}'}
              display
            />
            <p className="mono mt-1 text-[9px] text-[#5f7893]">κ = √(2m(V₀−E))/ħ</p>
          </div>
          <div className="space-y-1.5">
            {[
              { label: 'Thin barrier', e: 0.6, v: 1.2, w: 0.3 },
              { label: 'Thick barrier', e: 0.6, v: 1.2, w: 1.2 },
              { label: 'Over the top', e: 1.6, v: 1.2, w: 0.6 }
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => { setEnergyEv(p.e); setBarrierEv(p.v); setWidthNm(p.w); }}
                className="w-full rounded-md border border-[var(--qp-accent)]/15 px-2.5 py-1 text-[10.5px] text-[#a8bcd3] transition-colors hover:border-[var(--qp-accent)]/45 hover:text-[#f0f6ff]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="p-4 sm:p-5">
        <svg viewBox="0 0 760 250" className="w-full" role="img" aria-label="Wavefunction through a potential barrier">
          <line x1="24" y1="140" x2="736" y2="140" stroke="var(--qp-accent)" strokeOpacity="0.2" />
          <rect x={px(0)} y="40" width={Math.max(px(geometry.a) - px(0), 3)} height="200" fill="var(--qp-accent)" opacity="0.12" />
          <rect
            x={px(0)}
            y="40"
            width={Math.max(px(geometry.a) - px(0), 3)}
            height="200"
            fill="none"
            stroke="var(--qp-accent)"
            strokeOpacity="0.55"
            strokeDasharray="4 4"
          />
          <text x={(px(0) + px(geometry.a)) / 2} y="34" textAnchor="middle" fill="#c9b2ff" fontSize="9" fontFamily="IBM Plex Mono, monospace">
            V₀ = {barrierEv.toFixed(2)} eV
          </text>
          <path d={toPath(geometry.envelope)} fill="none" stroke="var(--qp-accent)" strokeOpacity="0.35" strokeDasharray="3 3" />
          <path d={toPath(geometry.envelope.map(([x, y]) => [x, -y]))} fill="none" stroke="var(--qp-accent)" strokeOpacity="0.35" strokeDasharray="3 3" />
          <path d={toPath(geometry.points)} fill="none" stroke="var(--qp-accent)" strokeWidth="1.8" />
          <text x="30" y="238" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">
            x / nm
          </text>
          <text x="620" y="238" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">
            E = {energyEv.toFixed(2)} eV
          </text>
        </svg>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="qp-panel-soft p-3">
            <p className="qp-label mb-1">Inside the barrier</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              {energyEv < barrierEv
                ? `κa = ${((result.kap * widthNm * 1e-9) || 0).toFixed(2)}; the amplitude decays by a factor e^(−${((result.kap * widthNm * 1e-9) || 0).toFixed(2)}) across the barrier.`
                : 'The particle is above the barrier: the solution oscillates, and transmission is reduced only by interference at the two edges.'}
            </p>
          </div>
          <div className="qp-panel-soft p-3">
            <p className="qp-label mb-1">Interpretation</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Tunnelling is not a particle “borrowing” energy. The wavefunction is continuous across both edges of a
              finite barrier, so a non-zero amplitude exists on the far side and the particle can be detected there.
            </p>
          </div>
        </div>
      </div>
    </LabShell>
  );
}