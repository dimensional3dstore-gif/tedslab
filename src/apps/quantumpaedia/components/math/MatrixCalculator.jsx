import React, { useMemo, useState } from 'react';
import { Panel, Chip } from '@/components/common/Kit';

const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));

function multiply(A, B) {
  const n = A.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => A[i].reduce((s, _, k) => s + A[i][k] * B[k][j], 0))
  );
}

function determinant(A) {
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
  let det = 0;
  for (let j = 0; j < n; j += 1) {
    const minor = A.slice(1).map((row) => row.filter((_, c) => c !== j));
    det += (j % 2 === 0 ? 1 : -1) * A[0][j] * determinant(minor);
  }
  return det;
}

function inverse(A) {
  const n = A.length;
  const M = A.map((row, i) => [...row, ...eye(n)[i]]);
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let r = col + 1; r < n; r += 1) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    if (Math.abs(M[pivot][col]) < 1e-12) return null;
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const p = M[col][col];
    M[col] = M[col].map((v) => v / p);
    for (let r = 0; r < n; r += 1) {
      if (r === col) continue;
      const factor = M[r][col];
      M[r] = M[r].map((v, c) => v - factor * M[col][c]);
    }
  }
  return M.map((row) => row.slice(n));
}

const fmt = (v) => (Math.abs(v) < 1e-10 ? '0' : Number(v.toFixed(4)).toString());

export default function MatrixCalculator() {
  const [size, setSize] = useState(2);
  const [A, setA] = useState([[1, 2], [3, 4]]);
  const [B, setB] = useState([[5, 6], [7, 8]]);
  const [op, setOp] = useState('det');

  const resize = (n) => {
    setSize(n);
    setA(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
    setB(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
  };

  const setCell = (which, i, j, value) => {
    const setter = which === 'A' ? setA : setB;
    const matrix = which === 'A' ? A : B;
    const next = matrix.map((row, ri) => row.map((v, ci) => (ri === i && ci === j ? Number(value) || 0 : v)));
    setter(next);
  };

  const result = useMemo(() => {
    if (op === 'det') return { label: 'det(A)', matrix: null, scalar: determinant(A) };
    if (op === 'inv') {
      const inv = inverse(A);
      return inv ? { label: 'A⁻¹', matrix: inv } : { label: 'A⁻¹', error: 'A is singular — no inverse exists.' };
    }
    if (op === 'add') return { label: 'A + B', matrix: A.map((row, i) => row.map((v, j) => v + B[i][j])) };
    if (op === 'mul') return { label: 'A × B', matrix: multiply(A, B) };
    if (op === 'transpose') return { label: 'Aᵀ', matrix: A[0].map((_, j) => A.map((row) => row[j])) };
    if (op === 'eig') {
      if (size === 2) {
        const tr = A[0][0] + A[1][1];
        const det = determinant(A);
        const disc = tr * tr - 4 * det;
        if (disc < 0) {
          const re = tr / 2;
          const im = Math.sqrt(-disc) / 2;
          return { label: 'Eigenvalues', complex: [`${fmt(re)} + ${fmt(im)}i`, `${fmt(re)} − ${fmt(im)}i`] };
        }
        const r1 = (tr + Math.sqrt(disc)) / 2;
        const r2 = (tr - Math.sqrt(disc)) / 2;
        return { label: 'Eigenvalues', complex: [fmt(r1), fmt(r2)] };
      }
      return {
        label: 'Eigenvalues',
        error: `For a ${size}×${size} matrix the characteristic polynomial is cubic; this panel reports its invariants instead: trace ${fmt(A.reduce((s, row, i) => s + row[i], 0))}, determinant ${fmt(determinant(A))}.`
      };
    }
    return { label: '', matrix: null };
  }, [A, B, op, size]);

  const MatrixInput = ({ which, matrix }) => (
    <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 42px))` }}>
      {matrix.map((row, i) =>
        row.map((value, j) => (
          <input
            key={`${which}-${i}-${j}`}
            value={value}
            onChange={(e) => setCell(which, i, j, e.target.value)}
            className="mono w-full rounded border border-[var(--qp-accent)]/15 bg-[#071729] px-1 py-1 text-center text-[11px] text-[#e6f2ff] focus:border-[var(--qp-accent)]/50 focus:outline-none"
          />
        ))
      )}
    </div>
  );

  const OPS = [
    { key: 'det', label: 'Determinant' },
    { key: 'inv', label: 'Inverse' },
    { key: 'add', label: 'A + B' },
    { key: 'mul', label: 'A × B' },
    { key: 'transpose', label: 'Transpose' },
    { key: 'eig', label: 'Eigenvalues' }
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <Panel className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={size === 2} onClick={() => resize(2)}>2 × 2</Chip>
          <Chip active={size === 3} onClick={() => resize(3)}>3 × 3</Chip>
        </div>

        <div className="mt-4 flex flex-wrap items-start gap-6">
          <div>
            <p className="qp-label mb-2">Matrix A</p>
            <MatrixInput which="A" matrix={A} />
          </div>
          <div>
            <p className="qp-label mb-2">Matrix B</p>
            <MatrixInput which="B" matrix={B} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {OPS.map((o) => (
            <Chip key={o.key} active={op === o.key} onClick={() => setOp(o.key)}>{o.label}</Chip>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-[var(--qp-accent)]/15 bg-[#071729]/70 p-3">
          <p className="qp-label mb-2">{result.label}</p>
          {result.error && <p className="text-[11px] leading-relaxed text-[#c9b2ff]">{result.error}</p>}
          {typeof result.scalar === 'number' && <p className="mono text-[15px] text-[#9fd8ff]">{fmt(result.scalar)}</p>}
          {result.complex && (
            <div className="mono flex flex-wrap gap-2 text-[13px] text-[#9fd8ff]">
              {result.complex.map((c, i) => (
                <span key={i}>λ{i + 1} = {c}</span>
              ))}
            </div>
          )}
          {result.matrix && (
            <div className="mono inline-grid gap-x-4 gap-y-1 text-[12px] text-[#d6e9f8]" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, auto))` }}>
              {result.matrix.map((row, i) => row.map((v, j) => <span key={`${i}-${j}`} className="text-right">{fmt(v)}</span>))}
            </div>
          )}
        </div>
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-2">Why this matters</p>
        <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
          Quantum observables are Hermitian matrices, so their eigenvalues are the possible measurement outcomes and their
          eigenvectors are the corresponding states. Unitary gates are matrices whose inverse is their conjugate transpose —
          which is why every gate is reversible.
        </p>
        <div className="qp-hairline my-3" />
        <p className="qp-label mb-1.5">Hermitian check</p>
        <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
          A matrix is Hermitian when A = A†. For real matrices this reduces to symmetry, A = Aᵀ. Try computing Aᵀ above
          and comparing entries.
        </p>
      </Panel>
    </div>
  );
}