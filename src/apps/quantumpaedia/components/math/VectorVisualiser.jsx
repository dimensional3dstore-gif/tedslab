import React, { useState } from 'react';
import { Panel } from '@/components/common/Kit';
import { ControlSlider } from '@/components/lab/LabShell';

const W = 300;
const H = 240;
const SCALE = 40;

export default function VectorVisualiser() {
  const [v1, setV1] = useState({ x: 1.2, y: 0.8, z: 1 });
  const [v2, setV2] = useState({ x: -0.8, y: 1.1, z: 0.4 });
  const [rot, setRot] = useState(35);

  const rad = (rot * Math.PI) / 180;
  const project = (v) => {
    const x = v.x * Math.cos(rad) - v.y * Math.sin(rad);
    const y = v.x * Math.sin(rad) + v.y * Math.cos(rad);
    return { px: W / 2 + x * SCALE, py: H / 2 - (y * 0.55 + v.z * 0.85) * SCALE };
  };

  const norm = (v) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  const cross = {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x
  };
  const angle = (Math.acos(Math.max(-1, Math.min(1, dot / (norm(v1) * norm(v2) || 1)))) * 180) / Math.PI;

  const origin = project({ x: 0, y: 0, z: 0 });

  const Arrow = ({ v, color, label }) => {
    const p = project(v);
    return (
      <g>
        <line x1={origin.px} y1={origin.py} x2={p.px} y2={p.py} stroke={color} strokeWidth="1.6" />
        <circle cx={p.px} cy={p.py} r="3.2" fill={color} />
        <text x={p.px + 6} y={p.py - 5} fill={color} fontSize="9" fontFamily="IBM Plex Mono, monospace">{label}</text>
      </g>
    );
  };

  const axisEnd = (v, color, label) => {
    const p = project(v);
    return (
      <g>
        <line x1={origin.px} y1={origin.py} x2={p.px} y2={p.py} stroke={color} strokeOpacity="0.28" strokeDasharray="3 3" />
        <text x={p.px} y={p.py - 4} fill={color} fontSize="8" fontFamily="IBM Plex Mono, monospace">{label}</text>
      </g>
    );
  };

  const rows = [
    { key: 'v1', title: 'Vector a', value: v1, set: setV1, color: 'var(--qp-accent)' },
    { key: 'v2', title: 'Vector b', value: v2, set: setV2, color: 'var(--qp-accent)' }
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <Panel className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[360px]" role="img" aria-label="Three-dimensional vector plot">
          <rect width={W} height={H} fill="#04121f" rx="8" />
          {axisEnd({ x: 2.4, y: 0, z: 0 }, '#4f6b88', 'y')}
          {axisEnd({ x: 0, y: 2.4, z: 0 }, '#4f6b88', 'x')}
          {axisEnd({ x: 0, y: 0, z: 2.4 }, '#4f6b88', 'z')}
          <Arrow v={v1} color="var(--qp-accent)" label="a" />
          <Arrow v={v2} color="var(--qp-accent)" label="b" />
          <Arrow v={cross} color="var(--qp-accent)" label="a×b" />
        </svg>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ['|a|', norm(v1).toFixed(3)],
            ['|b|', norm(v2).toFixed(3)],
            ['a·b', dot.toFixed(3)],
            ['angle', `${angle.toFixed(1)}°`]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[var(--qp-accent)]/12 bg-[#071729]/60 p-2">
              <p className="qp-label text-[9px]">{label}</p>
              <p className="mono mt-1 text-[11.5px] text-[#d6e9f8]">{value}</p>
            </div>
          ))}
        </div>
        <p className="mono mt-2 text-[10px] text-[#8fa8c2]">
          a×b = ({cross.x.toFixed(2)}, {cross.y.toFixed(2)}, {cross.z.toFixed(2)})
        </p>
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-3">Components</p>
        <div className="space-y-3.5">
          {rows.map((row) => (
            <div key={row.key}>
              <p className="mb-1 text-[10px]" style={{ color: row.color }}>{row.title}</p>
              <div className="space-y-2">
                <ControlSlider label="x" value={row.value.x} min={-2} max={2} step={0.1} onChange={(v) => row.set({ ...row.value, x: v })} />
                <ControlSlider label="y" value={row.value.y} min={-2} max={2} step={0.1} onChange={(v) => row.set({ ...row.value, y: v })} />
                <ControlSlider label="z" value={row.value.z} min={-2} max={2} step={0.1} onChange={(v) => row.set({ ...row.value, z: v })} />
              </div>
            </div>
          ))}
          <ControlSlider label="Projection angle" value={rot} min={0} max={180} step={1} onChange={setRot} unit="°" />
        </div>
        <div className="qp-hairline my-3" />
        <p className="text-[10px] leading-relaxed text-[#7088a5]">
          Quantum states are unit vectors in a complex vector space; the inner product generalises the dot product and its
          modulus squared gives a transition probability.
        </p>
      </Panel>
    </div>
  );
}