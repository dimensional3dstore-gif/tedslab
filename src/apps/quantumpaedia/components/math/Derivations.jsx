import React from 'react';
import { Panel } from '@/components/common/Kit';
import Formula from '@/components/math/Formula';

const DERIVATIONS = [
  {
    title: 'From the commutator to the uncertainty relation',
    intro: 'For any two Hermitian observables the product of their standard deviations is bounded by the expectation of their commutator.',
    steps: [
      { text: 'Define the spread operators by shifting each observable by its mean value.', tex: '\\delta\\hat A = \\hat A - \\langle A\\rangle,\\quad \\delta\\hat B = \\hat B - \\langle B\\rangle' },
      { text: 'Then the variances are the norms of the shifted states.', tex: '(\\Delta A)^2 = \\langle\\psi|\\delta\\hat A^2|\\psi\\rangle' },
      { text: 'Apply the Cauchy–Schwarz inequality to the two shifted vectors.', tex: '(\\Delta A)^2(\\Delta B)^2 \\ge |\\langle\\delta\\hat A\\,\\delta\\hat B\\rangle|^2' },
      { text: 'Split the product into symmetric and antisymmetric parts; the commutator is the antisymmetric piece.', tex: '\\delta\\hat A\\,\\delta\\hat B = \\tfrac12\\{\\delta\\hat A,\\delta\\hat B\\} + \\tfrac12[\\delta\\hat A,\\delta\\hat B]' },
      { text: 'Discarding the positive symmetric contribution leaves the commutator bound.', tex: '\\Delta A\\,\\Delta B \\ge \\tfrac12\\left|\\langle[\\hat A,\\hat B]\\rangle\\right|' },
      { text: 'Insert the canonical commutator [x̂, p̂] = iħ to recover the familiar relation.', tex: '\\Delta x\\,\\Delta p \\ge \\frac{\\hbar}{2}' }
    ]
  },
  {
    title: 'Rectangular barrier transmission',
    intro: 'Matching wavefunctions at both edges of a finite barrier gives the exact transmission probability.',
    steps: [
      { text: 'Write the solution in the three regions: incident plus reflected, growing plus decaying, and transmitted.', tex: '\\psi_L = e^{ikx} + r e^{-ikx},\\;\\psi_M = A e^{\\kappa x} + B e^{-\\kappa x},\\;\\psi_R = t e^{ikx}' },
      { text: 'Inside the barrier, κ is fixed by the energy deficit.', tex: '\\kappa = \\sqrt{2m(V_0-E)}/\\hbar,\\quad k = \\sqrt{2mE}/\\hbar' },
      { text: 'Impose continuity of ψ and ψ′ at both interfaces.', tex: '\\psi_L(0)=\\psi_M(0),\\;\\psi_L\'(0)=\\psi_M\'(0),\\;\\psi_M(a)=\\psi_R(a),\\;\\psi_M\'(a)=\\psi_R\'(a)' },
      { text: 'Eliminate the internal amplitudes A and B to obtain the transmission amplitude.', tex: 't = \\frac{e^{-ika}}{\\cosh\\kappa a + \\tfrac{i}{2}\\left(\\tfrac{\\kappa}{k}-\\tfrac{k}{\\kappa}\\right)\\sinh\\kappa a}' },
      { text: 'Take the squared modulus and simplify using cosh² − sinh² = 1.', tex: 'T = |t|^2 = \\left[1+\\frac{V_0^2\\sinh^2\\kappa a}{4E(V_0-E)}\\right]^{-1}' },
      { text: 'For a wide or high barrier κa ≫ 1, so the transmission is exponentially suppressed.', tex: 'T \\approx \\frac{16E(V_0-E)}{V_0^2}\\,e^{-2\\kappa a}' }
    ]
  },
  {
    title: 'Two-level state to the Bloch sphere',
    intro: 'Removing the global phase from a normalised qubit state leaves exactly two real parameters — a point on a sphere.',
    steps: [
      { text: 'Start with a normalised superposition of the two basis states.', tex: '|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle,\\quad |\\alpha|^2+|\\beta|^2=1' },
      { text: 'Factor out the phase of α; this phase is unobservable and can be dropped.', tex: '|\\psi\\rangle \\sim \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\tfrac{\\theta}{2}|1\\rangle' },
      { text: 'The two remaining angles are the polar and azimuthal coordinates of a unit vector.', tex: '\\hat n = (\\sin\\theta\\cos\\phi,\\; \\sin\\theta\\sin\\phi,\\; \\cos\\theta)' },
      { text: 'The measurement probabilities follow from the projection onto the z-axis.', tex: 'P(0)=\\cos^2\\tfrac{\\theta}{2},\\qquad P(1)=\\sin^2\\tfrac{\\theta}{2}' },
      { text: 'Orthogonal states are antipodal, which is why a full 2π rotation returns the vector but −1 to the state.', tex: '\\theta \\to \\theta+2\\pi \\Rightarrow |\\psi\\rangle \\to -|\\psi\\rangle' }
    ]
  }
];

export default function Derivations() {
  return (
    <div className="space-y-4">
      {DERIVATIONS.map((d) => (
        <Panel key={d.title} className="p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-[#f0f6ff]">{d.title}</h3>
          <p className="mt-1 text-[11.5px] leading-relaxed text-[#8fa8c2]">{d.intro}</p>
          <ol className="mt-3 space-y-2.5">
            {d.steps.map((s, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mono mt-0.5 text-[9.5px] text-[var(--qp-accent)]/70">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] leading-relaxed text-[#b6c8dc]">{s.text}</p>
                  <div className="mt-1.5 overflow-x-auto qp-scroll rounded-md bg-[#071729]/70 px-2.5 py-2">
                    <Formula tex={s.tex} display />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      ))}
    </div>
  );
}