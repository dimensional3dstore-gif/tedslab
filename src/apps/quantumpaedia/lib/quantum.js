/* Minimal complex-number statevector toolkit used by the laboratory simulators. */

export const c = (re = 0, im = 0) => ({ re, im });
export const cadd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
export const cmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
export const cscale = (a, s) => ({ re: a.re * s, im: a.im * s });
export const cabs2 = (a) => a.re * a.re + a.im * a.im;
export const cabs = (a) => Math.hypot(a.re, a.im);
export const carg = (a) => Math.atan2(a.im, a.re);
export const cexp = (a) => {
  const m = Math.exp(a.re);
  return { re: m * Math.cos(a.im), im: m * Math.sin(a.im) };
};
export const csqrt = (a) => {
  const m = Math.sqrt(Math.hypot(a.re, a.im));
  const th = Math.atan2(a.im, a.re) / 2;
  return { re: m * Math.cos(th), im: m * Math.sin(th) };
};
export const cdiv = (a, b) => {
  const d = b.re * b.re + b.im * b.im || 1;
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
};

const S2 = 1 / Math.SQRT2;

export const GATES = {
  H: [
    [c(S2), c(S2)],
    [c(S2), c(-S2)]
  ],
  X: [
    [c(0), c(1)],
    [c(1), c(0)]
  ],
  Y: [
    [c(0), c(0, -1)],
    [c(0, 1), c(0)]
  ],
  Z: [
    [c(1), c(0)],
    [c(0), c(-1)]
  ],
  S: [
    [c(1), c(0)],
    [c(0), c(0, 1)]
  ],
  T: [
    [c(1), c(0)],
    [c(0), { re: S2, im: S2 }]
  ]
};

export const GATE_INFO = {
  H: { name: 'Hadamard', note: 'Creates an equal superposition.' },
  X: { name: 'Pauli X', note: 'Bit flip — rotation by π about x.' },
  Y: { name: 'Pauli Y', note: 'Bit and phase flip.' },
  Z: { name: 'Pauli Z', note: 'Phase flip on |1⟩.' },
  S: { name: 'Phase S', note: 'Quarter-turn phase (π/2).' },
  T: { name: 'Phase T', note: 'Eighth-turn phase (π/4).' },
  CX: { name: 'CNOT', note: 'Controlled flip on the adjacent qubit.' }
};

export function zeroState(n) {
  return Array.from({ length: 2 ** n }, (_, i) => (i === 0 ? c(1) : c(0)));
}

/** Applies a 2x2 matrix to qubit q of an n-qubit statevector. */
export function applySingle(state, matrix, q, n) {
  const out = state.map((a) => ({ ...a }));
  const bit = n - 1 - q;
  for (let i = 0; i < state.length; i += 1) {
    if ((i >> bit) & 1) continue;
    const j = i | (1 << bit);
    out[i] = cadd(cmul(matrix[0][0], state[i]), cmul(matrix[0][1], state[j]));
    out[j] = cadd(cmul(matrix[1][0], state[i]), cmul(matrix[1][1], state[j]));
  }
  return out;
}

/** Controlled-X between two qubits. */
export function applyCX(state, control, target, n) {
  if (control === target) return state;
  const cb = n - 1 - control;
  const tb = n - 1 - target;
  const out = state.map((a) => ({ ...a }));
  for (let i = 0; i < state.length; i += 1) {
    if (!((i >> cb) & 1)) continue;
    const j = i ^ (1 << tb);
    out[i] = state[j];
    out[j] = state[i];
  }
  return out;
}

export const probabilities = (state) => state.map((a) => cabs2(a));

export function sampleIndex(state) {
  const p = probabilities(state);
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < p.length; i += 1) {
    acc += p[i];
    if (r <= acc) return i;
  }
  return p.length - 1;
}

/** Collapses the statevector onto a measurement outcome of qubit q. */
export function collapse(state, q, outcome, n) {
  const bit = n - 1 - q;
  const out = state.map((a) => ({ ...a }));
  let norm = 0;
  for (let i = 0; i < out.length; i += 1) {
    if (((i >> bit) & 1) !== outcome) out[i] = c(0);
    else norm += cabs2(out[i]);
  }
  const s = Math.sqrt(norm) || 1;
  return out.map((a) => cscale(a, 1 / s));
}

export function basisLabel(i, n) {
  return i.toString(2).padStart(n, '0');
}

/** Runs a circuit given as columns of { [qubit]: gateKey }. */
export function runCircuit(columns, n) {
  let state = zeroState(n);
  columns.forEach((col) => {
    Object.entries(col).forEach(([qStr, gate]) => {
      const q = Number(qStr);
      if (gate === 'CX') {
        if (q < n - 1) state = applyCX(state, q, q + 1, n);
      } else if (GATES[gate]) {
        state = applySingle(state, GATES[gate], q, n);
      }
    });
  });
  return state;
}

export const fmt = (v) => {
  if (v === 0) return '0';
  if (Math.abs(v) < 1e-4 || Math.abs(v) >= 1e4) return v.toExponential(1).replace('e', 'e');
  return v.toFixed(3).replace(/\.?0+$/, '') || '0';
};

export const signed = (v, digits = 3) => `${v < 0 ? '−' : '+'}${Math.abs(v).toFixed(digits)}`;