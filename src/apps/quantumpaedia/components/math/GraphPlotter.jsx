import React, { useMemo, useState } from 'react';
import { Panel, Chip } from '@/components/common/Kit';
import { ControlSlider } from '@/components/lab/LabShell';
import { sampleFunction } from '@/lib/expression';

const W = 620;
const H = 300;
const PRESETS = ['sin(x)', 'exp(-x^2/2)', 'cos(x)*exp(-x^2/8)', '1/(1+x^2)', 'x^2/4', 'sin(x)/x'];

export default function GraphPlotter() {
  const [expr, setExpr] = useState('sin(x)*exp(-x^2/10)');
  const [xMin, setXMin] = useState(-8);
  const [xMax, setXMax] = useState(8);

  const { points, yMin, yMax, error } = useMemo(() => {
    let sampled;
    try {
      sampled = sampleFunction(expr, xMin, xMax, 420);
    } catch (e) {
      return { points: [], yMin: -1, yMax: 1, error: e.message };
    }
    const ys = sampled.map((p) => p.y).filter((y) => y !== null && Number.isFinite(y));
    if (ys.length === 0) return { points: sampled, yMin: -1, yMax: 1, error: 'The function has no finite values in this range.' };
    const lo = Math.min(...ys);
    const hi = Math.max(...ys);
    const pad = (hi - lo || 1) * 0.12;
    return { points: sampled, yMin: lo - pad, yMax: hi + pad, error: null };
  }, [expr, xMin, xMax]);

  const px = (x) => ((x - xMin) / (xMax - xMin)) * (W - 40) + 30;
  const py = (y) => H - 24 - ((y - yMin) / (yMax - yMin || 1)) * (H - 48);

  let path = '';
  let started = false;
  points.forEach((p) => {
    if (p.y === null) {
      started = false;
      return;
    }
    path += `${started ? 'L' : 'M'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)} `;
    started = true;
  });

  const zeroY = yMin <= 0 && yMax >= 0 ? py(0) : H - 24;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
      <Panel className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            spellCheck={false}
            className="mono flex-1 rounded-md border border-[var(--qp-accent)]/20 bg-[#071729] px-3 py-1.5 text-[12px] text-[#e6f2ff] focus:border-[var(--qp-accent)]/60 focus:outline-none"
          />
          <span className="mono text-[10px] text-[#5f7893]">y = f(x)</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {PRESETS.map((p) => (
            <button key={p} type="button" onClick={() => setExpr(p)} className="mono text-[9.5px] text-[#7088a5] hover:text-[var(--qp-accent)]">
              {p}
            </button>
          ))}
        </div>

        {error && <p className="mt-2 text-[10.5px] text-[#ff9db0]">{error}</p>}

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label="Function plot">
          <rect width={W} height={H} fill="#04121f" rx="8" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={30 + (i * (W - 40)) / 8} y1="12" x2={30 + (i * (W - 40)) / 8} y2={H - 20} stroke="var(--qp-accent)" strokeOpacity="0.07" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1="30" y1={12 + (i * (H - 40)) / 6} x2={W - 10} y2={12 + (i * (H - 40)) / 6} stroke="var(--qp-accent)" strokeOpacity="0.07" />
          ))}
          <line x1="30" y1={zeroY} x2={W - 10} y2={zeroY} stroke="var(--qp-accent)" strokeOpacity="0.3" />
          <line x1={px(0) >= 30 && px(0) <= W - 10 ? px(0) : 30} y1="12" x2={px(0) >= 30 && px(0) <= W - 10 ? px(0) : 30} y2={H - 20} stroke="var(--qp-accent)" strokeOpacity="0.18" />
          <path d={path} fill="none" stroke="var(--qp-accent)" strokeWidth="1.8" />
          <text x="34" y={H - 6} fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">{xMin}</text>
          <text x={W - 46} y={H - 6} fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">{xMax}</text>
          <text x="4" y={py(yMax) + 10} fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">{yMax.toFixed(1)}</text>
          <text x="4" y={py(yMin) - 2} fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">{yMin.toFixed(1)}</text>
        </svg>
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-3">Domain</p>
        <div className="space-y-3">
          <ControlSlider label="x minimum" value={xMin} min={-20} max={-1} step={1} onChange={(v) => setXMin(Math.min(v, xMax - 1))} />
          <ControlSlider label="x maximum" value={xMax} min={1} max={20} step={1} onChange={(v) => setXMax(Math.max(v, xMin + 1))} />
        </div>
        <div className="qp-hairline my-3" />
        <p className="qp-label mb-1.5">Supported syntax</p>
        <p className="mono text-[9.5px] leading-relaxed text-[#8fa8c2]">
          + − * / ^ ( ) · functions sin cos tan exp ln sqrt abs · constants pi, e · variable x
        </p>
        <p className="mt-2 text-[10px] leading-relaxed text-[#7088a5]">
          The plot is sampled numerically at 420 points. Vertical gaps indicate poles or undefined regions rather than a
          plotting error.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['Gaussian', 'Oscillation', 'Decay'].map((t) => (
            <Chip key={t} as="span" className="text-[9px]">{t}</Chip>
          ))}
        </div>
      </Panel>
    </div>
  );
}