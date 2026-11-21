import React, { useMemo, useState } from 'react';
import LabShell, { ControlSlider, Readout } from '@/components/lab/LabShell';
import { Chip } from '@/components/common/Kit';

const L = 1.0; // screen distance, metres
const XMAX = 3.2e-3; // half-width of the displayed screen, metres
const BINS = 220;

const sinc = (x) => (Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x);

export default function DoubleSlit() {
  const [lambdaNm, setLambdaNm] = useState(532);
  const [separationMm, setSeparationMm] = useState(0.24);
  const [widthMm, setWidthMm] = useState(0.05);
  const [model, setModel] = useState('wave');
  const [hits, setHits] = useState([]);

  const profile = useMemo(() => {
    const lambda = lambdaNm * 1e-9;
    const d = separationMm * 1e-3;
    const a = widthMm * 1e-3;
    const values = [];
    for (let i = 0; i < BINS; i += 1) {
      const x = -XMAX + (i / (BINS - 1)) * 2 * XMAX;
      const sinTheta = x / Math.sqrt(x * x + L * L);
      const envelope = Math.pow(sinc((Math.PI * a * sinTheta) / lambda), 2);
      const interference = model === 'wave' ? Math.pow(Math.cos((Math.PI * d * sinTheta) / lambda), 2) : 1;
      values.push(envelope * interference);
    }
    const peak = Math.max(...values) || 1;
    return values.map((v) => v / peak);
  }, [lambdaNm, separationMm, widthMm, model]);

  const cdf = useMemo(() => {
    const total = profile.reduce((s, v) => s + v, 0) || 1;
    let acc = 0;
    return profile.map((v) => {
      acc += v / total;
      return acc;
    });
  }, [profile]);

  const detect = (count = 400) => {
    const added = [];
    for (let k = 0; k < count; k += 1) {
      const r = Math.random();
      let bin = cdf.findIndex((v) => r <= v);
      if (bin < 0) bin = BINS - 1;
      added.push({ id: `${Date.now()}-${k}`, bin });
    }
    setHits((prev) => [...prev, ...added].slice(-2600));
  };

  const fringeSpacingMm = ((lambdaNm * 1e-9 * L) / (separationMm * 1e-3)) * 1e3;
  const contrast = model === 'wave' ? 1 : 0;

  return (
    <LabShell
      title="Double-Slit Experiment"
      subtitle="Interference of two coherent paths, with an accumulating single-particle detection record."
      visual="interference"
      note="The intensity profile is the analytic two-slit result I(x) ∝ sinc²(πa sinθ/λ)·cos²(πd sinθ/λ). Detections are sampled from that distribution, which is why the fringes only emerge in the accumulated record."
      readouts={
        <>
          <Readout label="Fringe spacing" value={`${fringeSpacingMm.toFixed(2)} mm`} />
          <Readout label="Visibility" value={contrast.toFixed(2)} />
          <Readout label="Detections" value={hits.length} />
          <Readout label="Model" value={model === 'wave' ? 'coherent' : 'which-path'} />
        </>
      }
      controls={
        <>
          <div>
            <p className="qp-label mb-2">Optical model</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={model === 'wave'} onClick={() => { setModel('wave'); setHits([]); }}>Wave</Chip>
              <Chip active={model === 'particle'} onClick={() => { setModel('particle'); setHits([]); }}>Particle</Chip>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#7088a5]">
              {model === 'wave'
                ? 'Both slits contribute coherently: amplitudes add and fringes appear.'
                : 'Which-path information is available, so intensities add with no interference term.'}
            </p>
          </div>
          <ControlSlider label="Wavelength λ" value={lambdaNm} min={380} max={750} step={1} onChange={(v) => { setLambdaNm(v); }} unit=" nm" />
          <ControlSlider label="Slit separation d" value={separationMm} min={0.08} max={0.6} step={0.01} onChange={(v) => { setSeparationMm(v); }} unit=" mm" />
          <ControlSlider label="Slit width a" value={widthMm} min={0.02} max={0.15} step={0.005} onChange={(v) => { setWidthMm(v); }} unit=" mm" />
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => detect(400)}
              className="w-full rounded-lg bg-[var(--qp-accent)] px-3 py-1.5 text-[11px] font-medium text-[#04121f] hover:bg-[#5ad8ff]"
            >
              Detect 400 particles
            </button>
            <button
              type="button"
              onClick={() => setHits([])}
              className="w-full rounded-lg border border-[var(--qp-accent)]/25 px-3 py-1.5 text-[11px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/60"
            >
              Clear detections
            </button>
          </div>
        </>
      }
    >
      <div className="p-4 sm:p-5">
        <svg viewBox="0 0 760 300" className="w-full" role="img" aria-label="Double-slit intensity profile and detections">
          {/* schematic */}
          <g opacity="0.85">
            <circle cx="60" cy="34" r="4" fill="var(--qp-accent)" />
            <text x="72" y="38" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">source</text>
            <line x1="230" y1="14" x2="230" y2="58" stroke="#8fa8c2" strokeOpacity="0.55" />
            <line x1="230" y1="26" x2="230" y2="34" stroke="#061225" strokeWidth="3" />
            <line x1="230" y1="44" x2="230" y2="52" stroke="#061225" strokeWidth="3" />
            <text x="196" y="72" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">two slits</text>
            <line x1="620" y1="8" x2="620" y2="70" stroke="var(--qp-accent)" strokeOpacity="0.5" />
            <text x="626" y="40" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">screen</text>
            <path d="M70 34 Q 150 34 226 30" fill="none" stroke="var(--qp-accent)" strokeOpacity="0.35" strokeDasharray="3 3" />
            <path d="M70 34 Q 150 34 226 48" fill="none" stroke="var(--qp-accent)" strokeOpacity="0.35" strokeDasharray="3 3" />
            <path d="M236 30 Q 430 82 616 24" fill="none" stroke="var(--qp-accent)" strokeOpacity="0.3" />
            <path d="M236 48 Q 430 96 616 56" fill="none" stroke="var(--qp-accent)" strokeOpacity="0.3" />
          </g>

          {/* intensity histogram */}
          <g transform="translate(20, 92)">
            <line x1="0" y1="150" x2="720" y2="150" stroke="var(--qp-accent)" strokeOpacity="0.2" />
            {profile.map((v, i) => {
              const w = 720 / BINS;
              const h = v * 138;
              return (
                <rect
                  key={i}
                  x={i * w}
                  y={150 - h}
                  width={Math.max(1, w - 0.6)}
                  height={h}
                  fill={model === 'wave' ? 'var(--qp-accent)' : 'var(--qp-accent)'}
                  opacity={0.24 + v * 0.6}
                />
              );
            })}
            <text x="0" y="166" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">
              −{XMAX * 1e3} mm
            </text>
            <text x="690" y="166" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">
              +{XMAX * 1e3} mm
            </text>
          </g>

          {/* detection band */}
          <g transform="translate(20, 246)">
            <rect x="0" y="0" width="720" height="34" rx="4" fill="#04121f" stroke="var(--qp-accent)" strokeOpacity="0.12" />
            {hits.map((h) => {
              const x = (h.bin / (BINS - 1)) * 714 + 3;
              const y = 3 + (Math.abs(Math.sin(h.bin * 12.9898)) * 27);
              return <circle key={h.id} cx={x} cy={y} r="1.15" fill="#9fd8ff" opacity="0.75" />;
            })}
            <text x="4" y="46" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">
              accumulated detections — each event is a single particle
            </text>
          </g>
        </svg>

        <p className="mt-2 text-[10.5px] leading-relaxed text-[#8fa8c2]">
          {model === 'wave'
            ? 'Coherent amplitudes from both slits add before the modulus is taken, so the profile shows fringes inside a single-slit envelope. Increasing the slit separation narrows the fringes; increasing slit width narrows the envelope.'
            : 'With which-path information available the amplitudes no longer add coherently, so the two single-slit intensities simply sum. This is the quantitative content of complementarity.'}
        </p>
      </div>
    </LabShell>
  );
}