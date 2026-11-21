import React from 'react';
import { Link } from 'react-router-dom';
import { graphEdges, graphNodes, groupColor } from '@/data/graph';

export default function MiniGraph({ width = 320, height = 190, center = 'qm', count = 11, className = '' }) {
  const ids = new Set();
  const ring = graphNodes.filter((n) => n.id !== center).slice(0, count);
  ring.forEach((n) => ids.add(n.id));
  ids.add(center);

  const centerNode = graphNodes.find((n) => n.id === center) || graphNodes[0];
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - 34;
  const ry = height / 2 - 24;

  const positions = { [center]: [cx, cy] };
  ring.forEach((n, i) => {
    const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
    positions[n.id] = [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
  });

  const links = graphEdges.filter(([a, b]) => ids.has(a) && ids.has(b));

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Knowledge connections preview">
        {links.map(([a, b], i) => {
          const [x1, y1] = positions[a];
          const [x2, y2] = positions[b];
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--qp-accent)" strokeOpacity="0.26" strokeWidth="0.9" />;
        })}
        {ring.map((n) => {
          const [x, y] = positions[n.id];
          return (
            <g key={n.id}>
              <circle cx={x} cy={y} r="8" fill={groupColor[n.group] || 'var(--qp-accent)'} fillOpacity="0.18" />
              <circle cx={x} cy={y} r="3.1" fill={groupColor[n.group] || 'var(--qp-accent)'} />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="22" fill="var(--qp-accent)" fillOpacity="0.08" />
        <circle cx={cx} cy={cy} r="12" fill="none" stroke="var(--qp-accent)" strokeOpacity="0.5" />
        <circle cx={cx} cy={cy} r="4.5" fill="#9fdcff" />
        <text x={cx} y={cy + 32} textAnchor="middle" fill="#8fb8d4" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">
          {centerNode.label}
        </text>
      </svg>
      <Link to="/graph" className="absolute inset-0" aria-label="Open the knowledge graph" />
    </div>
  );
}