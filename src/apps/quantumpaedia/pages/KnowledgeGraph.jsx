import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ZoomIn, ZoomOut, Maximize2, Network, ArrowUpRight } from 'lucide-react';
import { PageHeader, Panel, Chip } from '@/components/common/Kit';
import { graphEdges, graphNodes, graphGroups, groupColor } from '@/data/graph';

const W = 900;
const H = 640;

function computeLayout(nodes, edges) {
  const positions = nodes.map((n, i) => {
    const a = i * 2.399963;
    const r = Math.sqrt(i / nodes.length) * 280;
    return { x: W / 2 + Math.cos(a) * r, y: H / 2 + Math.sin(a) * r, vx: 0, vy: 0 };
  });
  const index = Object.fromEntries(nodes.map((n, i) => [n.id, i]));
  const links = edges
    .map(([a, b]) => [index[a], index[b]])
    .filter(([a, b]) => a !== undefined && b !== undefined);

  const ideal = 86;
  for (let iter = 0; iter < 220; iter += 1) {
    for (let i = 0; i < positions.length; i += 1) {
      for (let j = i + 1; j < positions.length; j += 1) {
        let dx = positions[i].x - positions[j].x;
        let dy = positions[i].y - positions[j].y;
        let d2 = dx * dx + dy * dy || 0.01;
        const dist = Math.sqrt(d2);
        const force = 2600 / d2;
        dx /= dist;
        dy /= dist;
        positions[i].vx += dx * force;
        positions[i].vy += dy * force;
        positions[j].vx -= dx * force;
        positions[j].vy -= dy * force;
      }
    }
    links.forEach(([a, b]) => {
      const dx = positions[b].x - positions[a].x;
      const dy = positions[b].y - positions[a].y;
      const dist = Math.hypot(dx, dy) || 0.01;
      const force = (dist - ideal) * 0.014;
      positions[a].vx += (dx / dist) * force;
      positions[a].vy += (dy / dist) * force;
      positions[b].vx -= (dx / dist) * force;
      positions[b].vy -= (dy / dist) * force;
    });
    positions.forEach((p) => {
      p.vx += (W / 2 - p.x) * 0.0016;
      p.vy += (H / 2 - p.y) * 0.0016;
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x = Math.max(40, Math.min(W - 40, p.x + p.vx));
      p.y = Math.max(40, Math.min(H - 40, p.y + p.vy));
    });
  }
  return positions;
}

export default function KnowledgeGraph() {
  const [selected, setSelected] = useState(null);
  const [group, setGroup] = useState('All');
  const [query, setQuery] = useState('');
  const [view, setView] = useState({ zoom: 0.78, x: 0, y: 0 });
  const dragRef = useRef(null);

  const positions = useMemo(() => computeLayout(graphNodes, graphEdges), []);
  const index = useMemo(() => Object.fromEntries(graphNodes.map((n, i) => [n.id, i])), []);

  const links = useMemo(
    () =>
      graphEdges
        .map(([a, b]) => ({ a, b, ia: index[a], ib: index[b] }))
        .filter((l) => l.ia !== undefined && l.ib !== undefined),
    [index]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return new Set();
    return new Set(graphNodes.filter((n) => n.label.toLowerCase().includes(q)).map((n) => n.id));
  }, [query]);

  const node = graphNodes.find((n) => n.id === selected);
  const neighbours = node
    ? links
        .filter((l) => l.a === node.id || l.b === node.id)
        .map((l) => graphNodes[index[l.a === node.id ? l.b : l.a]])
        .filter(Boolean)
    : [];

  const onWheel = (e) => {
    e.preventDefault();
    setView((v) => ({ ...v, zoom: Math.max(0.35, Math.min(2.4, v.zoom * (e.deltaY > 0 ? 0.92 : 1.08))) }));
  };

  const onPointerDown = (e) => {
    if (e.target.closest('[data-node]')) return;
    dragRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    setView((v) => ({ ...v, x: dragRef.current.vx + (e.clientX - dragRef.current.x), y: dragRef.current.vy + (e.clientY - dragRef.current.y) }));
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Knowledge graph"
        title="Quantum Knowledge Network"
        description="Concepts, theories and experiments as an interconnected network. Select a node to inspect its relationships, or filter by discipline to isolate a research cluster."
        meta={<><Chip as="span">{graphNodes.length} nodes</Chip><Chip as="span">{links.length} relations</Chip></>}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3 py-2 sm:max-w-xs">
          <Search className="h-3.5 w-3.5 text-[#7088a5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the graph…"
            className="w-full bg-transparent text-[12px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={group === 'All'} onClick={() => setGroup('All')}>All</Chip>
          {graphGroups.slice(0, 6).map((g) => (
            <Chip key={g} active={group === g} onClick={() => setGroup(g)}>{g.replace('Quantum ', '')}</Chip>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={() => setView((v) => ({ ...v, zoom: Math.min(2.4, v.zoom * 1.18) }))} className="rounded-md border border-[var(--qp-accent)]/20 p-1.5 text-[#a8bcd3] hover:border-[var(--qp-accent)]/50" aria-label="Zoom in">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => setView((v) => ({ ...v, zoom: Math.max(0.35, v.zoom * 0.85) }))} className="rounded-md border border-[var(--qp-accent)]/20 p-1.5 text-[#a8bcd3] hover:border-[var(--qp-accent)]/50" aria-label="Zoom out">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => setView({ zoom: 0.78, x: 0, y: 0 })} className="rounded-md border border-[var(--qp-accent)]/20 p-1.5 text-[#a8bcd3] hover:border-[var(--qp-accent)]/50" aria-label="Reset view">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Panel className="overflow-hidden p-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-[520px] w-full cursor-grab touch-none active:cursor-grabbing"
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            role="img"
            aria-label="Interactive knowledge graph"
          >
            <rect width={W} height={H} fill="#04121f" />
            <g transform={`translate(${view.x} ${view.y}) scale(${view.zoom})`}>
              {links.map((l) => {
                const p1 = positions[l.ia];
                const p2 = positions[l.ib];
                const dim = group !== 'All' && graphNodes[l.ia].group !== group && graphNodes[l.ib].group !== group;
                const active = node && (l.a === node.id || l.b === node.id);
                return (
                  <line
                    key={`${l.a}-${l.b}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={active ? 'var(--qp-accent)' : '#3d6b8f'}
                    strokeOpacity={active ? 0.75 : dim ? 0.06 : 0.2}
                    strokeWidth={active ? 1.2 : 0.7}
                  />
                );
              })}
              {graphNodes.map((n, i) => {
                const p = positions[i];
                const color = groupColor[n.group] || 'var(--qp-accent)';
                const isDim = (group !== 'All' && n.group !== group) || (matches.size > 0 && !matches.has(n.id));
                const isSelected = selected === n.id;
                const size = 4 + (n.weight || 1) * 1.7;
                return (
                  <g
                    key={n.id}
                    data-node="true"
                    transform={`translate(${p.x} ${p.y})`}
                    onClick={() => setSelected(n.id)}
                    className="cursor-pointer"
                    opacity={isDim ? 0.22 : 1}
                  >
                    <circle r={size + 6} fill={color} opacity={isSelected ? 0.22 : 0.06} />
                    <circle r={size} fill={color} fillOpacity={isSelected ? 1 : 0.7} stroke={isSelected ? '#fff' : 'none'} strokeWidth="1" />
                    <text
                      x={0}
                      y={size + 10}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#a8bcd3'}
                      fontSize="8"
                      fontFamily="IBM Plex Mono, monospace"
                      opacity={isDim ? 0.4 : 0.9}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--qp-accent)]/10 px-3 py-2">
            <p className="text-[9.5px] text-[#5f7893]">Scroll to zoom · drag to pan · click a node</p>
            <div className="flex flex-wrap items-center gap-2">
              {graphGroups.slice(0, 5).map((g) => (
                <span key={g} className="flex items-center gap-1 text-[8.5px] text-[#7088a5]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: groupColor[g] }} /> {g.replace('Quantum ', '')}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <aside className="space-y-3.5">
          {node ? (
            <>
              <Panel className="p-3.5">
                <p className="qp-label">Selected node</p>
                <h3 className="mt-1 text-[14px] font-semibold text-[#f0f6ff]">{node.label}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#8fa8c2]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: groupColor[node.group] }} /> {node.group}
                </p>
                {node.article ? (
                  <Link to={`/articles/${node.article}`} className="mt-2.5 inline-flex items-center gap-1 text-[10.5px] text-[var(--qp-accent)] hover:underline">
                    Open article <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <p className="mt-2 text-[10px] leading-relaxed text-[#5f7893]">
                    This node is a concept link; its detailed treatment appears inside the connected articles.
                  </p>
                )}
                <div className="qp-hairline my-2.5" />
                <p className="qp-label mb-1.5">Connections ({neighbours.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {neighbours.map((nb) => (
                    <button
                      key={nb.id}
                      type="button"
                      onClick={() => setSelected(nb.id)}
                      className="rounded-full border border-[var(--qp-accent)]/15 px-2 py-0.5 text-[9.5px] text-[#a8bcd3] hover:border-[var(--qp-accent)]/45 hover:text-[#f0f6ff]"
                    >
                      {nb.label}
                    </button>
                  ))}
                </div>
              </Panel>
              <Panel className="p-3.5">
                <p className="qp-label mb-2">Disciplines in this view</p>
                <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
                  {node.group} nodes connect to {neighbours.length} related concepts across{' '}
                  {Array.from(new Set(neighbours.map((n) => n.group))).length} other disciplines.
                </p>
              </Panel>
            </>
          ) : (
            <Panel className="p-3.5">
              <Network className="h-4 w-4 text-[var(--qp-accent)]/60" />
              <p className="mt-2 text-[11.5px] font-medium text-[#eaf4ff]">No node selected</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-[#8fa8c2]">
                Select any node to inspect its discipline, its article and its direct neighbours. Filtering by discipline
                dims unrelated clusters while keeping the global structure visible.
              </p>
            </Panel>
          )}

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Jump to a hub</p>
            <div className="space-y-1">
              {graphNodes.filter((n) => n.weight).map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelected(n.id)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1 text-[11px] text-[#c3d6e8] hover:bg-[#102b4b]/60"
                >
                  {n.label}
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: groupColor[n.group] }} />
                </button>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}