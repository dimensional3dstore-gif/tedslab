export const deepeningF = {
  'double-slit-experiment': {
    sections: [
      {
        id: 'matter-wave',
        title: 'Matter-wave implementations from electrons to molecules',
        group: 'experiments',
        paragraphs: [
          'Electron biprism experiments replace the physical double slit with an electrostatically deflected filament that splits a coherent beam into two overlapping paths. Möllenstedt’s original version and Tonomura’s later refinements produced clean fringes with single-electron buildup, establishing that the interference belongs to the individual particle rather than to a collective effect of many.',
          'Atoms require care because they scatter off material gratings. The Talbot–Lau geometry uses three gratings: the first prepares spatial coherence, the second imposes a periodic phase modulation, and the third acts as a mask that converts the resulting pattern into an intensity modulation visible downstream. This configuration demonstrated interference for sodium, argon and eventually large molecular beams.',
          'Molecules test the boundary. Interferometry with C₆₀ and then with tailored fluorofullerenes and oligoporphyrins shows fringes for objects of thousands of atomic mass units, whose de Broglie wavelengths are smaller than the nuclear radii of the grating material and whose internal temperatures must be controlled so that emitted photons do not record the path.',
          'Neutron and atom interferometers extend the experiment into precision measurement. Gravity-induced phase shifts, rotation sensing with atom waves and measurements of the Aharonov–Bohm effect all use the same two-path geometry, so the double slit has become less a demonstration than a metrological instrument.'
        ]
      },
      {
        id: 'formalism',
        title: 'A density-matrix account of path information',
        group: 'mathematics',
        paragraphs: [
          'Write the state after the slits as a superposition of the two amplitudes, and let a detector or environment become correlated with them. Tracing out the environment leaves a reduced density matrix whose off-diagonal entries are multiplied by the overlap of the environment states corresponding to the two paths. The interference term in the intensity is exactly that overlap, so loss of contrast has a precise algebraic origin.',
          'If the environment states are orthogonal, the overlap is zero and the pattern is the sum of two single-slit envelopes. If they are nearly identical, interference survives at almost full contrast. Partial distinguishability gives partial visibility, and the duality relation V² + D² ≤ 1 follows from the same inequality that underlies the uncertainty relations.',
          'This formalism also handles imperfect sources. Finite spatial and temporal coherence appear as additional reductions of the off-diagonal terms, so a realistic calculation multiplies the ideal pattern by the Fourier transform of the source distribution. That is why a wide source washes out fringes at large slit separations and why a broad spectrum does the same at large path differences.',
          'The description is basis-independent and makes no reference to observers. Anything — a stray photon, a vibrational mode, a nuclear spin — that becomes correlated with the path contributes the same factor. Decoherence in the double slit is thus just entanglement with something that records which way the particle went.'
        ]
      },
      {
        id: 'modern-variants',
        title: 'Modern variants: electron microscopy and attosecond physics',
        group: 'applications',
        paragraphs: [
          'The double slit survives as a working instrument. Coherent diffractive imaging reconstructs nanoscale structures from the far-field pattern produced by an aperture, and electron holography maps electrostatic and magnetic fields inside materials by comparing the phase of a beam that passes through a specimen with a reference beam that does not.',
          'Attosecond science uses the same two-path logic in time rather than space. A wavepacket is split into two contributions with a controllable delay, and the resulting interference encodes the phase accumulated in the target. Attosecond streaking and RABBIT measurements have resolved electron dynamics inside atoms on timescales comparable to the orbital period.',
          'Matter-wave interferometry with large molecules has become a testbed for decoherence theory. Deliberately heating a molecule, or illuminating it with a laser, provides a controllable which-path record whose strength can be tuned, and the observed loss of fringe contrast agrees with quantitative predictions to within experimental uncertainty.',
          'In each variant the essential element is unchanged: two indistinguishable alternatives and a controllable way to make them distinguishable. That is what makes the double slit the most durable thought experiment in quantum physics — it survives every change of apparatus because its logic is about information, not about slits.'
        ]
      }
    ],
    glossary: [
      { term: 'Talbot–Lau interferometer', definition: 'A three-grating geometry that produces matter-wave interference using gratings that are coarse compared with the de Broglie wavelength.' },
      { term: 'Reduced density matrix', definition: 'The state of a subsystem after tracing out everything it is entangled with.' },
      { term: 'Partial coherence', definition: 'A state whose interference contrast is reduced by finite source size or spectral width.' }
    ]
  },

  'bell-test': {
    sections: [
      {
        id: 'ghz-mermin',
        title: 'GHZ states, Mermin’s inequality and chained tests',
        group: 'mathematics',
        paragraphs: [
          'Three-particle GHZ states give an even sharper conflict with local realism than the two-particle CHSH test. Mermin’s inequality bounds a specific combination of three-party correlation measurements by 2 for local models, while the GHZ state yields 4 — the algebraic maximum — so the contradiction is deterministic rather than statistical, at least in the ideal case.',
          'Chained Bell inequalities interpolate between tests. With n settings per side the bound approaches the algebraic limit and the violation can certify that the observed correlations are close to maximal; the number of settings also controls how strongly the test constrains the locality assumption in the presence of detector inefficiency.',
          'Hardy’s paradox gives an even more striking demonstration: there exist measurement choices for which local realism predicts that a particular outcome pair can never occur, yet quantum mechanics predicts it does, with nonzero probability. A single occurrence suffices to rule out the local model for that run.',
          'Self-testing protocols use these extremal violations in reverse. If players achieve the maximum quantum value of a Bell expression, their devices must implement, up to local isometries, a specific state and measurement set. This turns a statistics check into a certificate about hardware, which is the basis of device-independent verification of quantum computation.'
        ]
      },
      {
        id: 'what-bell-means',
        title: 'What Bell’s theorem does and does not rule out',
        group: 'theory',
        paragraphs: [
          'Bell’s theorem excludes the conjunction of three assumptions: that measurement outcomes are determined by pre-existing properties, that the settings can be chosen independently of those properties, and that no influence propagates faster than light. Each experiment is a test of the conjunction, so a violation points at one of the three without saying which.',
          'Abandoning determinism while keeping locality is the most economical reading: quantum mechanics is complete, and the correlations are genuinely non-local but non-signalling. Abandoning locality gives hidden-variable theories such as Bohmian mechanics, which reproduce the predictions with explicit non-local guidance and, as a consequence, no relativistic extension.',
          'Abandoning setting independence — superdeterminism — is logically possible but scientifically sterile unless it comes with a specific model, because it removes the freedom to choose experimental settings. Retrocausal and relational readings also survive, and none has yet made a discriminating prediction in a regime where the others differ.',
          'The theorem therefore constrains interpretations rather than replacing them. Any account of quantum phenomena must give up something that classical physics took for granted: determinism, locality, realism, or the independence of experimenters. Which sacrifice is acceptable is a question of judgement informed by aesthetics, fecundity and, ideally, further experiment.'
        ]
      },
      {
        id: 'foundations-to-technology',
        title: 'From foundational result to infrastructure',
        group: 'applications',
        paragraphs: [
          'Bell violations are now a measurement primitive. Entanglement verification in quantum networks relies on them, because a violation certifies that two distant nodes share quantum correlations regardless of what their hardware actually is; this is the operational meaning of self-testing, and it scales to multi-node scenarios through network non-locality.',
          'Device-independent randomness expansion is the most mature application. A short random seed drives the measurement settings; a Bell violation certifies that the outputs contain fresh entropy; and protocols can now expand a modest seed into millions of certified random bits, with proofs that tolerate realistic detector inefficiencies.',
          'Device-independent key distribution follows the same logic and removes trust in the hardware vendor entirely. The remaining obstacle is rate: closing detection loopholes at high efficiency and long distance simultaneously is technically demanding, so practical deployments currently use device-dependent protocols and reserve Bell tests for certification.',
          'Foundational work also feeds back into theory. Bell inequalities bound the set of quantum correlations, and characterising that set — deciding membership, computing its boundary — is a problem in convex geometry with direct consequences for quantum advantage proofs, self-testing, and the study of how much non-locality a physical theory can sustain.'
        ]
      }
    ],
    glossary: [
      { term: 'Mermin inequality', definition: 'A three-party Bell inequality whose quantum violation by a GHZ state reaches the algebraic maximum.' },
      { term: 'Self-testing', definition: 'Certifying a quantum state and measurements from the observed violation of a Bell inequality, up to local isometries.' },
      { term: 'Freedom of choice', definition: 'The assumption that measurement settings are chosen independently of any hidden variables.' }
    ]
  },

  'quantum-field-theory': {
    sections: [
      {
        id: 'matter-content',
        title: 'Matter content, mixing and discrete symmetries',
        group: 'theory',
        paragraphs: [
          'The Standard Model organises fermions into three generations of quarks and leptons, each with a definite set of gauge quantum numbers. Left- and right-handed components transform differently under the weak interaction, so mass terms require the Higgs field, and the resulting Yukawa couplings are free parameters — the theory predicts the structure but not the values.',
          'Quark and lepton mass eigenstates differ from their weak-interaction eigenstates, so weak processes mix generations. The quark mixing matrix (CKM) is nearly diagonal, while the neutrino mixing matrix (PMNS) is large-angle, which is why neutrino oscillations are prominent and quark-flavour-changing decays are rare. Both matrices contain a complex phase that violates CP symmetry.',
          'Discrete symmetries shape the phenomenology. The strong interaction conserves CP to extraordinary precision, which the Standard Model does not explain and which motivates the axion; the weak interaction maximally violates parity and violates CP through the mixing phase; and baryon number is conserved perturbatively but violated non-perturbatively by sphaleron processes at high temperature.',
          'These features make the theory testable at many scales, from tabletop electric-dipole-moment experiments to collider measurements of rare decays. The pattern of agreement — precise where the theory is precise, and silent where new physics might hide — defines the current frontier as much as any positive discovery would.'
        ]
      },
      {
        id: 'cosmology',
        title: 'Fields in the early universe',
        group: 'applications',
        paragraphs: [
          'Cosmology is quantum field theory applied to a background that is itself dynamical. Inflation postulates a scalar field whose potential energy drives accelerated expansion; quantum fluctuations in that field are stretched beyond the horizon and become classical density perturbations, which seed structure formation and imprint the temperature anisotropies of the cosmic microwave background.',
          'Symmetry breaking in the early universe proceeds through phase transitions as the temperature falls: the electroweak transition gives masses to the weak bosons, and candidate grand-unified transitions could produce topological defects such as monopoles and cosmic strings. Whatever their details, these transitions set the initial conditions for later evolution.',
          'Baryogenesis needs three ingredients — baryon-number violation, C and CP violation, and departure from thermal equilibrium — and the Standard Model supplies all three only in a form too weak to explain the observed asymmetry. That shortfall is one of the clearest indications that the theory is incomplete, alongside dark matter and the vacuum energy.',
          'Vacuum energy itself is the sharpest mismatch in physics. Summing zero-point energies of Standard Model fields gives a contribution to the cosmological constant that exceeds observation by many dozens of orders of magnitude, and no known mechanism cancels it while leaving the observed value. The problem is a sign that the relationship between quantum fields and gravitation is not yet understood.'
        ]
      },
      {
        id: 'quantum-gravity',
        title: 'QFT in curved spacetime and the road to gravity',
        group: 'theory',
        paragraphs: [
          'Quantum field theory can be formulated on a fixed curved background, and this semiclassical treatment already produces striking results. Hawking radiation follows from mode mixing across a horizon; the Unruh effect gives a thermal bath to an accelerating observer; and particle production in an expanding universe is the mechanism behind reheating after inflation.',
          'The approach fails where the background itself must fluctuate quantum mechanically — near a singularity, or at Planckian curvature. Perturbative quantisation of the metric gives a non-renormalisable theory requiring infinitely many counterterms, which is usually read as evidence that general relativity and quantum theory must be replaced by a common framework rather than merely reconciled.',
          'String theory replaces point particles with extended objects, producing a graviton in the spectrum and finite amplitudes at each order, at the cost of extra dimensions and a vast landscape of vacua. Loop quantum gravity instead quantises geometry directly, with discrete area and volume spectra. Neither has produced a confirmed experimental prediction, and both struggle to recover the smooth spacetime of everyday experience in a controlled limit.',
          'Holography has proved the most productive guide. The AdS/CFT correspondence equates a gravitational theory in a volume with a conformal field theory on its boundary, providing a non-perturbative definition of quantum gravity in that setting and giving precise, computable answers to questions about black holes, entanglement and strongly coupled matter — including the entanglement-island results that clarified how information escapes an evaporating black hole.'
        ]
      },
      {
        id: 'many-body-qft',
        title: 'Condensed matter as applied field theory',
        group: 'applications',
        paragraphs: [
          'Most of the formalism’s practical successes lie in materials. Second-quantised field theory describes electrons in a lattice, and the methods of QFT — perturbation theory, mean-field theory, the renormalisation group, large-N expansions — are the standard tools for correlated systems. Superconductivity, magnetism and the fractional quantum Hall effect were all understood this way.',
          'Topological phases extend the story. States characterised by a topological invariant rather than a local order parameter cannot be connected to a trivial state without a phase transition, and their edge excitations are protected against local perturbation. This robustness is the basis of proposals for topological quantum computation, where information is stored non-locally in the pattern of excitations.',
          'Effective field theories organise the hierarchy. Phonons, magnons, spinons and gauge fields emerge as low-energy descriptions of microscopic Hamiltonians, and the same Lagrangian can appear in systems as different as a magnet, a cold atomic gas and a neutron star. Universality is not an accident but a consequence of the renormalisation group washing out microscopic detail.',
          'The traffic runs both ways. Cold atoms in optical lattices simulate lattice gauge theories and topological models that are hard to realise as materials; quantum computers are being applied to real-time dynamics that defeat Monte Carlo; and ideas from quantum information, such as entanglement entropy and tensor networks, have become central calculation methods in a field that once assumed they were irrelevant.'
        ]
      }
    ],
    glossary: [
      { term: 'Yukawa coupling', definition: 'The interaction strength between the Higgs field and a fermion, setting that fermion’s mass.' },
      { term: 'Sphaleron', definition: 'A field configuration at high temperature that changes baryon and lepton number non-perturbatively.' },
      { term: 'Topological invariant', definition: 'A quantised number characterising a phase of matter that cannot change without closing the gap.' }
    ]
  }
};