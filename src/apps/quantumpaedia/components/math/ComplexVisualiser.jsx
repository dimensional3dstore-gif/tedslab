import React, { useMemo, useState } from 'react';
import { Panel } from '@/components/common/Kit';
import { ControlSlider } from '@/components/lab/LabShell';

const S = 220;
const SCALE = 52;

export default function ComplexVisualiser() {
  const [z1, setZ1] = useState({ re: 1, im: 1 });
  const [z2, setZ2] = useState({ re: -1, im: 1.5 });

  const ops = useMemo(() => {
    const sum = { re: z1.re + z2.re, im: z1.im + z2.im };
    const prod = { re: z1.re * z2.re - z1.im * z2.im, im: z1.re * z2.im + z1.im * z2.re };
    const conj = { re: z1.re, im: -z1.im };
    return { sum, prod, conj };
  }, [z1, z2]);

  const px = (re) => S / 2 + re * SCALE;
  const py = (im) => S / 2 - im * SCALE;

  const mod = (z) => Math.hypot(z.re, z.im);
  const arg = (z) => (Math.atan2(z.im, z.re) * 180) / Math.PI;

  const points = [
    { z: z1, color: 'var(--qp-accent)', label: 'z₁' },
    { z: z2, color: 'var(--qp-accent)', label: 'z₂' },
    { z: ops.prod, color: 'var(--qp-accent)', label: 'z₁·z₂' },
    { z: ops.sum, color: '#5aa9ff', label: 'z₁+z₂' }
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <Panel className="p-4">
        <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[320px]" role="img" aria-label="Complex plane">
          <rect width={S} height={S} fill="#04121f" rx="8" />
          <line x1="0" y1={S / 2} x2={S} y2={S / 2} stroke="var(--qp-accent)" strokeOpacity="0.22" />
          <line x1={S / 2} y1="0" x2={S / 2} y2={S} stroke="var(--qp-accent)" strokeOpacity="0.22" />
          {[-3, -2, -1, 1, 2, 3].map((t) => (
            <g key={t}>
              <line x1={px(t)} y1={S / 2 - 4} x2={px(t)} y2={S / 2 + 4} stroke="var(--qp-accent)" strokeOpacity="0.25" />
              <line x1={S / 2 - 4} y1={py(t)} x2={S / 2 + 4} y2={py(t)} stroke="var(--qp-accent)" strokeOpacity="0.25" />
            </g>
          ))}
          <text x={S - 16} y={S / 2 - 6} fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">Re</text>
          <text x={S / 2 + 6} y="12" fill="#5f7893" fontSize="9" fontFamily="IBM Plex Mono, monospace">Im</text>
          {points.map(({ z, color, label }) => (
            <g key={label}>
              <line x1={S / 2} y1={S / 2} x2={px(z.re)} y2={py(z.im)} stroke={color} strokeWidth="1.4" strokeOpacity="0.8" />
              <circle cx={px(z.re)} cy={py(z.im)} r="3.4" fill={color} />
              <text x={px(z.re) + 6} y={py(z.im) - 5} fill={color} fontSize="9" fontFamily="IBM Plex Mono, monospace">{label}</text>
            </g>
          ))}
        </svg>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {points.map(({ z, color, label }) => (
            <div key={label} className="rounded-lg border border-[var(--qp-accent)]/12 bg-[#071729]/60 p-2">
              <p className="mono text-[10px]" style={{ color }}>{label} = {z.re.toFixed(2)} {z.im < 0 ? '−' : '+'} {Math.abs(z.im).toFixed(2)}i</p>
              <p className="mono mt-1 text-[9.5px] text-[#8fa8c2]">|z| = {mod(z).toFixed(3)} · arg = {arg(z).toFixed(1)}°</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-3">Components</p>
        <div className="space-y-3">
          <ControlSlider label="z₁ real" value={z1.re} min={-3} max={3} step={0.1} onChange={(v) => setZ1({ ...z1, re: v })} />
          <ControlSlider label="z₁ imaginary" value={z1.im} min={-3} max={3} step={0.1} onChange={(v) => setZ1({ ...z1, im: v })} />
          <ControlSlider label="z₂ real" value={z2.re} min={-3} max={3} step={0.1} onChange={(v) => setZ2({ ...z2, re: v })} />
          <ControlSlider label="z₂ imaginary" value={z2.im} min={-3} max={3} step={0.1} onChange={(v) => setZ2({ ...z2, im: v })} />
        </div>
        <div className="qp-hairline my-3" />
        <p className="qp-label mb-1.5">Conjugate of z₁</p>
        <p className="mono text-[11px] text-[#9fd8ff]">{ops.conj.re.toFixed(2)} {ops.conj.im < 0 ? '−' : '+'} {Math.abs(ops.conj.im).toFixed(2)}i</p>
        <p className="mt-2 text-[10px] leading-relaxed text-[#7088a5]">
          Multiplication rotates and scales: the product's argument is the sum of the arguments and its modulus is the
          product of the moduli. Global phase never affects measurement probabilities.
        </p>
      </Panel>
    </div>
  );
}