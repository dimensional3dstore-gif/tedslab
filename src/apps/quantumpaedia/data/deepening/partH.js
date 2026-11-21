export const deepeningH = {
  'quantum-entanglement': {
    sections: [
      {
        id: 'entanglement-outlook',
        title: 'Open questions and outlook',
        paragraphs: [
          'Three questions dominate current research. How much entanglement can a given noisy channel distribute, and under what conditions can it be distilled into usable pairs? What is the correct measure of entanglement for a many-body system out of equilibrium, where the usual entropies are dominated by volume-law contributions? And can entanglement be certified at the scale required for a fault-tolerant processor without measuring the entire state?',
          'Each answer changes what is buildable. Distillation thresholds determine repeater spacing; many-body entanglement measures decide whether tensor-network methods can simulate a given experiment; and scalable certification determines whether hardware can be verified without full tomography. Entanglement has moved from a paradox to a metrological quantity, and the remaining work is largely about making that quantity cheap to measure.'
        ]
      }
    ]
  },

  'quantum-superposition': {
    sections: [
      {
        id: 'superposition-outlook',
        title: 'Open problems',
        paragraphs: [
          'The central open question is quantitative: given a physical system, how long can a genuinely macroscopic superposition be maintained, and what sets the limit? Decoherence theory answers this for specific models, but a general predictive framework that spans solid-state, atomic and optomechanical platforms does not exist, and the boundary is measured case by case in the laboratory.',
          'A second question is whether superposition can be made useful at larger scale without error correction. Continuous-variable encodings and bosonic codes suggest it can, by designing the physical encoding so that the dominant error is correctable, but whether that approach scales to useful machines is unresolved. Both questions are now experimental rather than interpretive.'
        ]
      }
    ]
  },

  'wave-function': {
    sections: [
      {
        id: 'wavefunction-outlook',
        title: 'Where the discussion stands',
        paragraphs: [
          'After ninety years the wavefunction remains the object every calculation manipulates and the object whose interpretation is least settled. What has changed is the standard of evidence: protective measurement, weak-value reconstruction and quantum-state tomography have made amplitude and phase experimentally accessible, so statements about the reality of the state are now constrained by data rather than by taste.',
          'Practically, the debate matters less than it sounds. Every interpretation predicts the same measurement records, so engineering proceeds unhindered. Conceptually it matters a great deal, because gravitational and cosmological settings force questions that the pragmatic reading brackets — and there the answer may eventually have to be more than interpretive.'
        ]
      }
    ]
  },

  'quantum-tunnelling': {
    sections: [
      {
        id: 'tunnelling-outlook',
        title: 'Outlook',
        paragraphs: [
          'Tunnelling remains the clearest demonstration that a particle is described by an amplitude rather than a trajectory. Its exponential sensitivity makes it a precision tool: a small change in barrier height, width or mass changes a rate by orders of magnitude, which is why tunnel junctions make such sensitive amplifiers, and why scanning probes resolve individual atoms.',
          'The unresolved questions are mostly quantitative and mostly in complex environments. How does tunnelling proceed when the barrier is formed by a fluctuating protein, a disordered insulator or a many-body state? Instantons, master equations and numerical path-integral methods each give partial answers, and the regimes where they disagree mark where new experiments are needed.'
        ]
      }
    ]
  },

  'schrodinger-equation': {
    sections: [
      {
        id: 'schrodinger-outlook',
        title: 'Status of the equation',
        paragraphs: [
          'The Schrödinger equation is exact within its domain and approximate in its application. Nothing has been found that falsifies it for non-relativistic systems: the discrepancies that appear in precision tests are always traced to neglected relativistic, radiative or nuclear-structure corrections, all of which are calculable within the wider framework.',
          'Its practical limitations are computational rather than conceptual. The dimension of a many-body Hilbert space grows exponentially, so exact solution is impossible beyond a few dozen interacting particles, and the discipline has reorganised itself around approximation schemes with controlled errors. Progress in the field is therefore as much about algorithms and hardware as about physics.'
        ]
      }
    ]
  },

  'heisenberg-uncertainty-principle': {
    sections: [
      {
        id: 'uncertainty-outlook',
        title: 'Open questions',
        paragraphs: [
          'Two threads remain active. The first is foundational: pinning down exactly which physical statement each mathematical inequality captures, and whether error, disturbance and preparation uncertainty can be unified in a single framework that reduces to the known bounds in each limit. Partial results exist; a general account does not.',
          'The second is practical: extending quantum-limited measurement to new observables. Squeezed light and squeezed spins work for quadratures and collective spins, but force sensing with levitated objects, single-photon-level detection in the microwave domain and precision measurement of gravitational effects all push against different noise floors, each requiring its own non-classical resource.'
        ]
      }
    ]
  },

  'photon': {
    sections: [
      {
        id: 'photon-outlook',
        title: 'Outlook',
        paragraphs: [
          'The photon is now better understood as an excitation of a mode than as a small particle, and that shift is what made quantum optics an engineering discipline. The field’s successes — lasers, fibre communications, gravitational-wave detectors, single-photon sources — follow from controlling modes and their statistics rather than from any picture of a corpuscle.',
          'What remains open is integration. Sources, detectors and circuits perform well separately; combining thousands of them on a chip while preserving indistinguishability and efficiency is the outstanding challenge. Progress there determines whether photonic approaches reach the scale required for computation and for long-haul quantum networks.'
        ]
      }
    ]
  },

  'quantum-computing': {
    sections: [
      {
        id: 'computing-outlook',
        title: 'What to expect',
        paragraphs: [
          'The near-term trajectory is set by error correction. Demonstrating a logical qubit whose error rate improves as the code grows establishes the scaling premise; the following milestones are many logical qubits with lattice surgery between them, then a machine capable of running a small instance of a fault-tolerant algorithm.',
          'The intermediate period is likely to be judged by useful simulation results rather than by cryptographic feats. Meanwhile classical algorithms, tensor-network methods and specialised hardware continue to improve, so any claimed advantage is provisional — a statement about a specific task, a specific classical baseline and a specific date, all of which move.',
          'A useful discipline is to state advantage claims as falsifiable predictions: which task, which classical baseline, which problem size and by when. Claims framed that way survive scrutiny and guide hardware development; claims framed as general superiority invite refutation and have repeatedly been refuted, which is why the field increasingly reports verifiable benchmarks rather than headline qubit counts.'
        ]
      }
    ]
  },

  'double-slit-experiment': {
    sections: [
      {
        id: 'double-slit-outlook',
        title: 'What the experiment still teaches',
        paragraphs: [
          'Every year the geometry is repeated with a larger object, a shorter wavelength or a better-controlled environment, and every repetition tests the same assumptions: that amplitudes add, that alternatives interfere when indistinguishable, and that distinguishability suppresses the interference term. No deviation from these rules has been observed.',
          'The value of continuing is that the tests are not redundant. Each extension to larger mass or longer coherence time tightens constraints on collapse models and on any hidden-variable alternative, and each improvement in apparatus makes the boundary between quantum and classical behaviour more sharply defined — which is the empirical content of a question that once seemed purely philosophical.',
          'For teaching, the experiment retains its power precisely because nothing about it can be simplified away. The amplitude rule, the role of distinguishability and the meaning of measurement are all visible in a pattern of light and dark that a first-year student can record, and every conceptual point about quantum measurement has an operational counterpart in the fringe contrast of that same recording.'
        ]
      }
    ]
  },

  'bell-test': {
    sections: [
      {
        id: 'bell-outlook',
        title: 'Where the field is going',
        paragraphs: [
          'Experimentally, the priorities are rate and distance. Device-independent protocols need many millions of high-fidelity events to accumulate statistical significance, so detector efficiency, source brightness and clock synchronisation dominate the engineering agenda. Satellite links and long-fibre deployments are advancing on parallel tracks.',
          'Theoretically, the priorities are classification and certification. Deciding membership in the quantum correlation set is hard in general but tractable in structured cases, and self-testing results are gradually being extended from individual states to whole computational devices. A practical certification standard for quantum hardware could emerge from this work.',
          'Philosophically, the questions have narrowed without resolving. No experiment will decide between the surviving interpretations, because they agree on every prediction; what experiments have decided is that nature is not locally real in Bell’s sense, and that conclusion is now an engineering premise rather than a curiosity.',
          'For the next generation of experiments the interesting frontier is networks: three or more parties with independent sources, where the observed correlations may be nonlocal in ways no two-party test can detect. Such experiments probe whether non-locality is a property of individual links or of the network as a whole, and the answer bears directly on how quantum internet infrastructure has to be verified.'
        ]
      }
    ]
  }
};