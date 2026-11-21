import React, { useId } from 'react';

const CYAN = 'var(--qp-accent)';
const BLUE = 'var(--qp-accent)';
const VIOLET = 'var(--qp-accent)';
const PURPLE = 'var(--qp-accent)';

const line = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

const wavePath = (fn, x0 = 0, x1 = 800, step = 4, yBase = 150) => {
  const pts = [];
  for (let x = x0; x <= x1; x += step) pts.push([x, yBase + fn(x)]);
  return line(pts);
};

/** Deterministic pseudo-random so every render is stable. */
const rand = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export default function QuantumVisual({ variant = 'wavefunction', className = '', animate = true, tint = CYAN }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, '');
  const gid = (n) => `${n}-${uid}`;

  const grid = Array.from({ length: 13 }, (_, i) => (
    <line key={`gv${i}`} x1={i * 66} y1="0" x2={i * 66} y2="300" stroke={CYAN} strokeOpacity="0.05" strokeWidth="1" />
  )).concat(
    Array.from({ length: 6 }, (_, i) => (
      <line key={`gh${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} stroke={CYAN} strokeOpacity="0.045" strokeWidth="1" />
    ))
  );

  const bodies = {
    entanglement: (
      <g>
        {[0, 1, 2].map((k) => {
          const pts = [];
          for (let x = 250; x <= 550; x += 4) {
            const t = (x - 250) / 300;
            pts.push([x, 150 + Math.sin(t * Math.PI * 2 + k * 1.05) * (46 - k * 11)]);
          }
          return (
            <path
              key={k}
              d={line(pts)}
              fill="none"
              stroke={k === 1 ? VIOLET : CYAN}
              strokeWidth={1.6 - k * 0.25}
              strokeOpacity={0.75 - k * 0.16}
              strokeDasharray={k === 2 ? '5 9' : undefined}
              className={animate ? 'qp-dash' : undefined}
            />
          );
        })}
        {[
          [250, CYAN],
          [550, VIOLET],
        ].map(([x, c], i) => (
          <g key={i}>
            <circle cx={x} cy="150" r="46" fill={`url(#${gid('halo')})`} opacity="0.5" />
            <circle cx={x} cy="150" r="17" fill={c} opacity="0.9" />
            <circle cx={x} cy="150" r="17" fill="none" stroke="#fff" strokeOpacity="0.35" />
          </g>
        ))}
        <text x="250" y="215" textAnchor="middle" fill={CYAN} fontSize="10" fontFamily="IBM Plex Mono, monospace" opacity="0.8">A</text>
        <text x="550" y="215" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="IBM Plex Mono, monospace" opacity="0.8">B</text>
      </g>
    ),
    superposition: (
      <g>
        {[0, 1, 2, 3].map((k) => {
          const cx = 230 + k * 110;
          const pts = [];
          for (let x = 40; x <= 760; x += 3) {
            const g = Math.exp(-Math.pow((x - cx) / 62, 2));
            pts.push([x, 170 - g * (86 - k * 12)]);
          }
          return (
            <g key={k}>
              <path d={line(pts)} fill="none" stroke={k % 2 ? VIOLET : CYAN} strokeOpacity="0.55" strokeWidth="1.4" />
              <path d={`${line(pts)} L760,210 L40,210 Z`} fill={k % 2 ? VIOLET : CYAN} opacity="0.055" />
            </g>
          );
        })}
        <line x1="30" y1="210" x2="770" y2="210" stroke={CYAN} strokeOpacity="0.3" />
        <text x="40" y="232" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">position</text>
        <text x="700" y="232" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">|ψ|²</text>
      </g>
    ),
    tunnelling: (
      <g>
        <rect x="352" y="52" width="34" height="196" fill={VIOLET} opacity="0.14" />
        <rect x="352" y="52" width="34" height="196" fill="none" stroke={VIOLET} strokeOpacity="0.6" strokeDasharray="4 5" />
        <path
          d={wavePath(
            (x) =>
              (x < 352 ? Math.sin((x / 800) * Math.PI * 12) * 44 : x < 386 ? Math.sin((x / 800) * Math.PI * 12) * 44 * Math.exp(-(x - 352) / 11) : Math.sin((x / 800) * Math.PI * 12) * 17),
            20,
            780,
            3
          )}
          fill="none"
          stroke={CYAN}
          strokeWidth="1.8"
        />
        <path
          d={wavePath((x) => (x < 352 ? 0 : x < 386 ? 0 : 0), 20, 780, 3, 150)}
          stroke="none"
        />
        <text x="369" y="272" textAnchor="middle" fill={VIOLET} fontSize="9" fontFamily="IBM Plex Mono, monospace">V₀</text>
        <text x="120" y="112" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">incident</text>
        <text x="640" y="112" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">transmitted</text>
      </g>
    ),
    wavefunction: (
      <g>
        <line x1="20" y1="150" x2="780" y2="150" stroke={CYAN} strokeOpacity="0.25" />
        <path
          d={wavePath((x) => Math.sin((x / 800) * Math.PI * 9) * Math.exp(-Math.pow((x - 400) / 300, 2)) * 62, 20, 780, 3)}
          fill="none"
          stroke={CYAN}
          strokeWidth="1.8"
        />
        <path
          d={wavePath((x) => Math.cos((x / 800) * Math.PI * 9) * Math.exp(-Math.pow((x - 400) / 300, 2)) * 62, 20, 780, 3)}
          fill="none"
          stroke={VIOLET}
          strokeWidth="1.4"
          strokeDasharray="6 5"
        />
        {(() => {
          const pts = [];
          for (let x = 20; x <= 780; x += 3) {
            const e = Math.exp(-Math.pow((x - 400) / 300, 2));
            pts.push([x, 210 - Math.pow(Math.sin((x / 800) * Math.PI * 9) * e, 2) * 92 - Math.pow(Math.cos((x / 800) * Math.PI * 9) * e, 2) * 92]);
          }
          return (
            <>
              <path d={`${line(pts)} L780,212 L20,212 Z`} fill={`url(#${gid('fill')})`} opacity="0.4" />
              <path d={line(pts)} fill="none" stroke={PURPLE} strokeWidth="1.2" strokeOpacity="0.8" />
            </>
          );
        })()}
        <text x="26" y="264" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">|ψ(x)|²</text>
      </g>
    ),
    interference: (
      <g>
        {[0, 1].map((s) => {
          const cx = 330 + s * 140;
          return Array.from({ length: 9 }, (_, i) => (
            <circle key={`${s}-${i}`} cx={cx} cy="250" r={22 + i * 22} fill="none" stroke={s ? VIOLET : CYAN} strokeOpacity={0.34 - i * 0.03} strokeWidth="1" />
          ));
        })}
        <rect x="120" y="30" width="560" height="26" fill="#0b203b" stroke={CYAN} strokeOpacity="0.35" rx="4" />
        {Array.from({ length: 40 }, (_, i) => {
          const x = 126 + i * 13.8;
          const d = Math.abs(x - 400) / 264;
          const a = Math.pow(Math.cos(d * Math.PI * 7), 2) * (1 - d * 0.55);
          return <rect key={i} x={x} y={32} width="7" height="22" fill={CYAN} opacity={0.08 + a * 0.9} />;
        })}
        <line x1="330" y1="250" x2="300" y2="72" stroke={CYAN} strokeOpacity="0.22" strokeDasharray="3 4" />
        <line x1="470" y1="250" x2="500" y2="72" stroke={VIOLET} strokeOpacity="0.22" strokeDasharray="3 4" />
        <text x="140" y="76" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">detection screen</text>
      </g>
    ),
    circuit: (
      <g fontFamily="IBM Plex Mono, monospace">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1="60" y1={80 + i * 70} x2="740" y2={80 + i * 70} stroke={CYAN} strokeOpacity="0.35" />
            <text x="30" y={84 + i * 70} fill="#a8bcd3" fontSize="11">q{i}</text>
          </g>
        ))}
        {[
          { x: 190, gate: 'H', row: 0 },
          { x: 300, gate: 'X', row: 1 },
          { x: 400, gate: 'H', row: 2 },
          { x: 500, gate: 'Z', row: 1 },
        ].map((g, i) => (
          <g key={i}>
            <rect x={g.x} y={80 + g.row * 70 - 16} width="34" height="32" rx="5" fill="#102b4b" stroke={CYAN} strokeOpacity="0.55" />
            <text x={g.x + 17} y={80 + g.row * 70 + 5} textAnchor="middle" fill={CYAN} fontSize="12">{g.gate}</text>
          </g>
        ))}
        <line x1="610" y1="80" x2="610" y2="220" stroke={VIOLET} strokeOpacity="0.7" />
        {[0, 2].map((r) => (
          <circle key={r} cx="610" cy={80 + r * 70} r="6" fill={VIOLET} />
        ))}
        {[0, 1, 2].map((r) => (
          <g key={`m${r}`}>
            <path d={`M690 ${80 + r * 70} a14 14 0 0 1 0 0`} />
            <rect x="676" y={62 + r * 70} width="30" height="30" rx="4" fill="#091b32" stroke={VIOLET} strokeOpacity="0.5" />
            <text x="691" y={82 + r * 70} textAnchor="middle" fill={VIOLET} fontSize="10">M</text>
          </g>
        ))}
      </g>
    ),
    orbital: (
      <g>
        {[0, 25, -25, 60, -60, 90].map((r, i) => (
          <ellipse
            key={i}
            cx="400"
            cy="150"
            rx="150"
            ry="46"
            fill="none"
            stroke={i % 2 ? VIOLET : CYAN}
            strokeOpacity={0.45 - i * 0.03}
            transform={`rotate(${r} 400 150)`}
          />
        ))}
        <circle cx="400" cy="150" r="46" fill={`url(#${gid('halo')})`} />
        <circle cx="400" cy="150" r="9" fill={CYAN} />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={400 + Math.cos(i * 1.6) * 150} cy={150 + Math.sin(i * 1.6) * 46} r="3.4" fill={VIOLET} opacity="0.9" />
        ))}
      </g>
    ),
    field: (
      <g>
        {Array.from({ length: 9 }, (_, i) =>
          Array.from({ length: 5 }, (_, j) => {
            const x = 120 + i * 70;
            const y = 60 + j * 45;
            return <circle key={`${i}-${j}`} cx={x} cy={y} r="2.2" fill={CYAN} opacity="0.35" />;
          })
        )}
        {[0, 1, 2].map((k) => (
          <path
            key={k}
            d={`M400 150 C ${360 - k * 30} ${90 - k * 26}, ${470 + k * 34} ${96 + k * 6}, ${400 + 120 + k * 40} ${60 + k * 30}`}
            fill="none"
            stroke={k === 1 ? VIOLET : CYAN}
            strokeOpacity="0.6"
            strokeWidth="1.3"
          />
        ))}
        <circle cx="400" cy="150" r="20" fill={VIOLET} opacity="0.25" />
        <circle cx="400" cy="150" r="7" fill={VIOLET} />
        <circle cx="560" cy="150" r="4" fill={CYAN} className={animate ? 'qp-pulse-soft' : undefined} />
      </g>
    ),
    sphere: (
      <g>
        <circle cx="400" cy="150" r="110" fill="none" stroke={CYAN} strokeOpacity="0.35" />
        <ellipse cx="400" cy="150" rx="110" ry="34" fill="none" stroke={CYAN} strokeOpacity="0.2" />
        <ellipse cx="400" cy="150" rx="34" ry="110" fill="none" stroke={CYAN} strokeOpacity="0.2" />
        <line x1="290" y1="150" x2="510" y2="150" stroke="#7088a5" strokeOpacity="0.5" strokeDasharray="3 4" />
        <line x1="400" y1="40" x2="400" y2="260" stroke="#7088a5" strokeOpacity="0.5" strokeDasharray="3 4" />
        <line x1="400" y1="150" x2="470" y2="66" stroke={VIOLET} strokeWidth="2" />
        <circle cx="470" cy="66" r="5" fill={VIOLET} />
        <text x="514" y="150" fill="#7088a5" fontSize="10" fontFamily="IBM Plex Mono, monospace">x</text>
        <text x="400" y="34" fill="#7088a5" fontSize="10" fontFamily="IBM Plex Mono, monospace">z</text>
        <text x="418" y="184" fill="#7088a5" fontSize="10" fontFamily="IBM Plex Mono, monospace">y</text>
      </g>
    ),
    processor: (
      <g>
        <rect x="250" y="40" width="300" height="220" rx="14" fill="#0b203b" stroke={CYAN} strokeOpacity="0.35" />
        <rect x="286" y="76" width="228" height="148" rx="8" fill="#091b32" stroke={CYAN} strokeOpacity="0.2" />
        {Array.from({ length: 4 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => (
            <circle key={`${i}-${j}`} cx={310 + j * 64} cy={100 + i * 36} r="4" fill={(i + j) % 3 === 0 ? VIOLET : CYAN} opacity="0.85" />
          ))
        )}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={i} x1="310" y1={100 + i * 36} x2="502" y2={100 + i * 36} stroke={CYAN} strokeOpacity="0.16" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <g key={`p${i}`}>
            <line x1={250 + i * 30} y1="40" x2={250 + i * 30} y2="18" stroke={CYAN} strokeOpacity="0.3" />
            <line x1={250 + i * 30} y1="260" x2={250 + i * 30} y2="282" stroke={CYAN} strokeOpacity="0.3" />
          </g>
        ))}
        <circle cx="400" cy="150" r="74" fill={`url(#${gid('halo')})`} opacity="0.35" />
      </g>
    ),
    photon: (
      <g>
        <path d={wavePath((x) => Math.sin((x / 800) * Math.PI * 10) * 52, 30, 770, 3)} fill="none" stroke={CYAN} strokeWidth="1.9" />
        <path d={wavePath((x) => Math.sin((x / 800) * Math.PI * 10 + 1.2) * 30, 30, 770, 3, 220)} fill="none" stroke={VIOLET} strokeWidth="1.3" strokeOpacity="0.7" />
        <line x1="30" y1="150" x2="770" y2="150" stroke="#7088a5" strokeOpacity="0.3" strokeDasharray="2 5" />
        <path d="M690 138 L714 150 L690 162 Z" fill={CYAN} opacity="0.85" />
        <text x="40" y="96" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">E</text>
        <text x="40" y="252" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">B</text>
      </g>
    ),
    gravity: (
      <g>
        {Array.from({ length: 11 }, (_, i) => {
          const y0 = 26 + i * 26;
          const pts = [];
          for (let x = 0; x <= 800; x += 6) {
            const dip = Math.exp(-Math.pow((x - 400) / 130, 2)) * 62;
            pts.push([x, y0 + dip]);
          }
          return <path key={i} d={line(pts)} fill="none" stroke={CYAN} strokeOpacity={0.16 + i * 0.02} strokeWidth="1" />;
        })}
        <circle cx="400" cy="150" r="72" fill={`url(#${gid('halo')})`} />
        <circle cx="400" cy="150" r="15" fill={VIOLET} opacity="0.85" />
      </g>
    ),
    molecule: (
      <g>
        {[
          [300, 150, 6],
          [500, 150, 6],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={CYAN} />
            <ellipse cx={x - 40} cy={y} rx="66" ry="26" fill={VIOLET} opacity="0.16" />
            <circle cx={x} cy={y} r="70" fill={`url(#${gid('halo')})`} opacity="0.3" />
          </g>
        ))}
        <line x1="308" y1="150" x2="492" y2="150" stroke={CYAN} strokeOpacity="0.5" />
        {[[350, 116], [430, 184], [400, 118], [460, 122]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={PURPLE} opacity="0.8" />
        ))}
      </g>
    ),
    thermo: (
      <g>
        {Array.from({ length: 26 }, (_, i) => (
          <circle
            key={i}
            cx={120 + rand(i + 1) * 560}
            cy={70 + rand(i + 7) * 160}
            r={2 + rand(i + 13) * 3}
            fill={i % 3 === 0 ? VIOLET : CYAN}
            opacity={0.35 + rand(i + 21) * 0.5}
            className={animate && i % 4 === 0 ? 'qp-pulse-soft' : undefined}
          />
        ))}
        <rect x="120" y="248" width="560" height="6" rx="3" fill={`url(#${gid('bar')})`} />
        <text x="120" y="276" fill="#7088a5" fontSize="9" fontFamily="IBM Plex Mono, monospace">ordered → disordered</text>
      </g>
    ),
    bio: (
      <g>
        {[0, 1].map((s) => {
          const pts = [];
          for (let y = 30; y <= 270; y += 4) {
            const x = 400 + Math.sin((y / 240) * Math.PI * 5 + s * Math.PI) * 86;
            pts.push([x, y]);
          }
          return <path key={s} d={line(pts)} fill="none" stroke={s ? VIOLET : CYAN} strokeWidth="2" strokeOpacity="0.75" />;
        })}
        {Array.from({ length: 11 }, (_, i) => {
          const y = 44 + i * 21;
          const x1 = 400 + Math.sin((y / 240) * Math.PI * 5) * 86;
          const x2 = 400 + Math.sin((y / 240) * Math.PI * 5 + Math.PI) * 86;
          return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={CYAN} strokeOpacity="0.18" />;
        })}
      </g>
    ),
    matrix: (
      <g fontFamily="IBM Plex Mono, monospace">
        <path d="M270 70 L256 70 L256 230 L270 230" fill="none" stroke={CYAN} strokeOpacity="0.7" strokeWidth="1.6" />
        <path d="M530 70 L544 70 L544 230 L530 230" fill="none" stroke={CYAN} strokeOpacity="0.7" strokeWidth="1.6" />
        {['a', 'b', 'c', 'd'].map((ch, i) => (
          <text
            key={ch}
            x={340 + (i % 2) * 130}
            y={118 + Math.floor(i / 2) * 84}
            textAnchor="middle"
            fill={i % 3 === 0 ? VIOLET : CYAN}
            fontSize="26"
          >
            {ch}
          </text>
        ))}
      </g>
    ),
    default: (
      <g>
        {[46, 82, 118, 154].map((r, i) => (
          <circle key={r} cx="400" cy="150" r={r} fill="none" stroke={i % 2 ? VIOLET : CYAN} strokeOpacity={0.34 - i * 0.05} />
        ))}
        <circle cx="400" cy="150" r="70" fill={`url(#${gid('halo')})`} opacity="0.5" />
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 800 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Scientific visualisation: ${variant}`}
    >
      <defs>
        <linearGradient id={gid('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1e36" />
          <stop offset="52%" stopColor="#081829" />
          <stop offset="100%" stopColor="#061225" />
        </linearGradient>
        <radialGradient id={gid('halo')}>
          <stop offset="0%" stopColor={tint} stopOpacity="0.55" />
          <stop offset="60%" stopColor={VIOLET} stopOpacity="0.18" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gid('fill')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.5" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={gid('bar')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={CYAN} />
          <stop offset="100%" stopColor={VIOLET} />
        </linearGradient>
      </defs>
      <rect width="800" height="300" fill={`url(#${gid('bg')})`} />
      <g>{grid}</g>
      {bodies[variant] || bodies.default}
      <rect width="800" height="300" fill="none" stroke={CYAN} strokeOpacity="0.08" />
    </svg>
  );
}