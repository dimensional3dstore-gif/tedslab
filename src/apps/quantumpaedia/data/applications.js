export const applications = [
  {
    slug: 'quantum-computing-hardware',
    title: 'Quantum Computing',
    category: 'Computation',
    maturity: 'Experimental',
    visual: 'processor',
    summary: 'Gate-based processors whose qubits exploit superposition and entanglement for algorithmic speedups.',
    principle: 'Unitary gate sequences acting on entangled qubit registers create interference patterns that concentrate measurement probability on the solution of a computational problem.',
    howItWorks: 'Physical qubits — superconducting transmons, trapped ions, neutral atoms or photons — are initialised, manipulated with calibrated control pulses, and read out dispersively. A classical controller compiles the circuit into native gates and processes the measurement statistics.',
    capabilities: [
      'Small quantum simulations of molecular and spin systems',
      'Sampling demonstrations beyond practical classical simulation',
      'Early error-corrected logical qubits with below-threshold error rates'
    ],
    limitations: [
      'Gate error rates still limit circuit depth before error correction',
      'Connectivity constraints require expensive routing and swapping',
      'No demonstrated advantage for general optimisation or machine learning'
    ],
    outlook: 'Fault-tolerant machines require roughly a thousandfold reduction in logical error rates. Progress is measured by logical qubit lifetime, code distance scaling and two-qubit fidelity rather than raw qubit count.'
  },
  {
    slug: 'quantum-key-distribution',
    title: 'Quantum Cryptography',
    category: 'Security',
    maturity: 'Commercially deployed',
    visual: 'entanglement',
    summary: 'Key distribution whose security rests on the impossibility of copying unknown quantum states.',
    principle: 'Encoding key bits in non-orthogonal quantum states means any interception perturbs the states, producing detectable error rates. Security follows from the no-cloning theorem and the indistinguishability of non-orthogonal states.',
    howItWorks: 'In BB84 a sender transmits single photons in randomly chosen bases; the receiver measures in independently chosen bases. Basis agreement is announced publicly, a subset of bits is compared to bound the error rate, and privacy amplification distils a secret key.',
    capabilities: [
      'Metropolitan fibre links operating commercially',
      'Satellite-to-ground key distribution demonstrated over thousands of kilometres',
      'Information-theoretic security against computationally unbounded adversaries, given device assumptions'
    ],
    limitations: [
      'Requires authenticated classical channel and trusted hardware',
      'Distance limited by loss and detector noise without repeaters',
      'Point-to-point links need trusted nodes to form networks'
    ],
    outlook: 'Measurement-device-independent and twin-field protocols extend range; quantum repeaters remain the main research target for global networks.'
  },
  {
    slug: 'quantum-communication',
    title: 'Quantum Communication',
    category: 'Networks',
    maturity: 'Experimental',
    visual: 'photon',
    summary: 'Distribution of quantum states and entanglement between distant nodes to enable teleportation and networked computing.',
    principle: 'Entanglement distributed between nodes is a consumable resource: it can teleport states, swap entanglement and certify correlations without trusting the hardware.',
    howItWorks: 'Photonic channels carry entangled pairs or encoded qubits. Quantum memories based on atoms, ions or rare-earth crystals store states; Bell-state measurement performs swapping and teleportation; repeaters chain segments to beat exponential loss.',
    capabilities: [
      'Entanglement distribution over metropolitan fibre and free space',
      'Entanglement swapping across multi-node testbeds',
      'Device-independent protocols in laboratory demonstrations'
    ],
    limitations: ['Memory coherence times remain short', 'Repeater rates are far below telecom requirements', 'Heterogeneous hardware complicates interfacing'],
    outlook: 'The medium-term goal is a repeater chain with deterministic entanglement swapping; the long-term vision is a quantum internet connecting processors and sensors.'
  },
  {
    slug: 'quantum-sensing',
    title: 'Quantum Sensing',
    category: 'Measurement',
    maturity: 'Commercially deployed',
    visual: 'field',
    summary: 'Sensors that exploit quantum coherence to measure magnetic fields, acceleration, time and temperature with extreme sensitivity.',
    principle: 'Quantum two-level systems respond to external fields with phase shifts that accumulate coherently; interferometric readout converts those phases into measurable signals with noise below classical limits.',
    howItWorks: 'Nitrogen-vacancy centres in diamond, cold atoms, superconducting SQUIDs and optomechanical resonators act as transducers. Ramsey or spin-echo sequences amplify the signal while suppressing low-frequency noise.',
    capabilities: [
      'Diamond magnetometers with nanoscale spatial resolution',
      'Atomic gravimeters and inertial navigation demonstrators',
      'SQUID magnetometers in clinical and geophysical use'
    ],
    limitations: ['Dynamic range often narrow', 'Sensitivity to environmental noise and drift', 'Calibration and shielding requirements'],
    outlook: 'Miniaturised atomic sensors and integrated photonic readout are moving laboratory instruments into field deployment for navigation, medicine and geology.'
  },
  {
    slug: 'quantum-metrology',
    title: 'Quantum Metrology',
    category: 'Measurement',
    maturity: 'Experimental',
    visual: 'wavefunction',
    summary: 'Precision measurement using entangled or squeezed probes to approach the Heisenberg limit.',
    principle: 'Phase estimation with N independent probes improves as 1/√N (shot noise). Entangled probes can reach 1/N, the Heisenberg limit, because the phase is encoded in a collective observable.',
    howItWorks: 'Optical interferometers are injected with squeezed vacuum or NOON states; atomic clocks use entangled ensembles; readout combines homodyne detection with stabilised references.',
    capabilities: [
      'Squeezed light improving gravitational-wave detector sensitivity',
      'Optical lattice clocks with fractional uncertainty near 10⁻¹⁸',
      'Proof-of-principle sub-shot-noise interferometry'
    ],
    limitations: ['Entangled states are fragile to loss', 'Realistic noise reduces quantum advantage', 'Calibration dominates systematic error budgets'],
    outlook: 'Practical gains concentrate on squeezed-light interferometry and clock comparisons; loss-tolerant metrological schemes are an active theoretical target.'
  },
  {
    slug: 'quantum-simulation',
    title: 'Quantum Simulation',
    category: 'Simulation',
    maturity: 'Experimental',
    visual: 'orbital',
    summary: 'Using controlled quantum systems to model other quantum systems that are intractable classically.',
    principle: 'A simulator whose Hamiltonian can be engineered to match a target model reproduces its dynamics directly, avoiding the exponential cost of classical state representation.',
    howItWorks: 'Analog simulators use cold atoms in optical lattices, trapped ions or Rydberg arrays with tunable interactions. Digital simulators Trotterise the target Hamiltonian into gate sequences on a universal processor.',
    capabilities: [
      'Quantum phase transitions observed in optical lattices',
      'Fermionic and spin-model dynamics on tens of qubits',
      'Variational ground-state estimates for small molecules'
    ],
    limitations: ['State preparation and readout fidelity bound accuracy', 'Analog devices are model-specific', 'Verification is difficult without classical reference results'],
    outlook: 'Quantum simulation of strongly correlated fermions is widely regarded as the most likely first scientifically useful application of quantum hardware.'
  },
  {
    slug: 'quantum-chemistry-applications',
    title: 'Quantum Chemistry',
    category: 'Chemistry',
    maturity: 'Commercially deployed',
    visual: 'molecule',
    summary: 'First-principles computation of molecular electronic structure for drug design, catalysis and materials.',
    principle: 'Solving the electronic Schrödinger equation yields energies, geometries and spectra; approximations trade accuracy for computational cost.',
    howItWorks: 'Density functional theory and wavefunction methods compute potential energy surfaces on classical hardware. Quantum processors are being explored for strongly correlated systems where classical approximations fail.',
    capabilities: [
      'Routine geometry optimisation and reaction-barrier estimation',
      'Spectroscopic prediction matching experiment to within a few percent',
      'High-throughput screening in pharmaceutical discovery'
    ],
    limitations: ['Strong correlation remains expensive', 'Functional choice introduces systematic error', 'Solvent and temperature effects require additional modelling'],
    outlook: 'Hybrid quantum-classical workflows target transition-metal catalysis and photochemistry, where classical methods struggle most.'
  },
  {
    slug: 'quantum-materials-applications',
    title: 'Quantum Materials',
    category: 'Materials',
    maturity: 'Experimental',
    visual: 'matrix',
    summary: 'Materials engineered for collective quantum behaviour, from superconductors to topological insulators.',
    principle: 'Strong interactions, spin–orbit coupling and band topology produce phases with properties unavailable in ordinary metals and semiconductors.',
    howItWorks: 'Epitaxial growth, exfoliation and moiré stacking create designer band structures. Spectroscopy and transport measurements map the resulting phases; theory guides the search for topological and superconducting behaviour.',
    capabilities: [
      'Superconducting films for qubit and detector fabrication',
      'Topological insulators with protected surface conduction',
      'Twisted bilayer graphene hosting correlated insulating and superconducting phases'
    ],
    limitations: ['Materials quality and reproducibility vary', 'Many phases require millikelvin temperatures', 'Device integration is difficult'],
    outlook: 'Topological superconductors hosting Majorana modes are a leading route to intrinsically protected qubits, though unambiguous evidence remains outstanding.'
  },
  {
    slug: 'quantum-imaging',
    title: 'Quantum Imaging',
    category: 'Imaging',
    maturity: 'Experimental',
    visual: 'interference',
    summary: 'Imaging techniques that use non-classical light to exceed classical resolution or noise limits.',
    principle: 'Correlated photon pairs and squeezed states carry position and phase information in their correlations, allowing image formation from photons that never illuminate the object.',
    howItWorks: 'Ghost imaging correlates a bucket detector behind the object with a spatially resolving detector on the partner beam. Squeezed illumination reduces noise below the shot-noise limit; quantum illumination improves target detection in bright backgrounds.',
    capabilities: [
      'Sub-shot-noise phase imaging in microscopy',
      'Ghost imaging with single-photon-sensitive cameras',
      'Enhanced target detection at low photon flux'
    ],
    limitations: ['Long acquisition times', 'Source brightness and efficiency limits', 'Advantage disappears under realistic loss'],
    outlook: 'Applications are most promising in low-light biological imaging and in wavelength regimes where detectors are poor, using visible-wavelength detection of infrared illumination.'
  }
];

export const applicationBySlug = (slug) => applications.find((a) => a.slug === slug);