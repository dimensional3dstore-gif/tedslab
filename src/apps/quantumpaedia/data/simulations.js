export const simulations = [
  {
    slug: 'superposition',
    title: 'Superposition Simulator',
    subtitle: 'Qubit state, amplitudes and measurement',
    description: 'Prepare a single qubit on the Bloch sphere, apply gates, and observe how measurement collapses the state and how statistics build up.',
    category: 'Fundamentals',
    visual: 'superposition',
    minutes: 8,
    difficulty: 'Foundational',
    to: '/laboratory/superposition'
  },
  {
    slug: 'entanglement',
    title: 'Entanglement Simulator',
    subtitle: 'Two correlated qubits',
    description: 'Prepare a Bell pair, choose a measurement basis, and watch correlated outcomes accumulate with the predicted probabilities.',
    category: 'Fundamentals',
    visual: 'entanglement',
    minutes: 10,
    difficulty: 'Intermediate',
    to: '/laboratory/entanglement'
  },
  {
    slug: 'double-slit',
    title: 'Double-Slit Experiment',
    subtitle: 'Wave and particle models',
    description: 'Adjust wavelength, slit separation and slit width to see how the interference pattern forms, then accumulate single-particle detections.',
    category: 'Optics',
    visual: 'interference',
    minutes: 7,
    difficulty: 'Foundational',
    to: '/laboratory/double-slit'
  },
  {
    slug: 'tunnelling',
    title: 'Quantum Tunnelling',
    subtitle: 'Barrier penetration',
    description: 'Send a wavepacket at a potential barrier and compute the exact transmission and reflection probabilities for any barrier height and width.',
    category: 'Scattering',
    visual: 'tunnelling',
    minutes: 9,
    difficulty: 'Intermediate',
    to: '/laboratory/tunnelling'
  },
  {
    slug: 'wavefunction',
    title: 'Wavefunction Visualiser',
    subtitle: 'Real, imaginary and probability density',
    description: 'Explore a free Gaussian wavepacket: adjust momentum and width, advance time, and compare the real part, imaginary part and |ψ|².',
    category: 'Dynamics',
    visual: 'wavefunction',
    minutes: 8,
    difficulty: 'Intermediate',
    to: '/laboratory/wavefunction'
  },
  {
    slug: 'bloch-sphere',
    title: 'Bloch Sphere',
    subtitle: 'Three-dimensional state visualisation',
    description: 'Rotate a three-dimensional Bloch sphere, set polar and azimuthal angles, and read the state notation and outcome probabilities.',
    category: 'Qubits',
    visual: 'sphere',
    minutes: 6,
    difficulty: 'Foundational',
    to: '/laboratory/bloch-sphere'
  },
  {
    slug: 'circuit-builder',
    title: 'Quantum Circuit Builder',
    subtitle: 'Gates, statevector and probabilities',
    description: 'Assemble a circuit from a gate library, execute it on a local statevector simulator, and inspect the resulting amplitudes and measurement distribution.',
    category: 'Computing',
    visual: 'circuit',
    minutes: 15,
    difficulty: 'Intermediate',
    to: '/laboratory/circuit-builder'
  }
];

export const simulationCategories = Array.from(new Set(simulations.map((s) => s.category)));