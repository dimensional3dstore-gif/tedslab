export const equations = [
  {
    id: 'planck-relation',
    name: 'Planck–Einstein relation',
    category: 'Quanta',
    year: 1900,
    tex: String.raw`E = h\nu = \hbar\omega`,
    origin: 'Planck’s 1900 radiation law; interpreted by Einstein in 1905 as the energy of a light quantum.',
    symbols: [
      { symbol: String.raw`E`, meaning: 'energy of a single quantum' },
      { symbol: String.raw`h`, meaning: 'Planck constant, 6.62607015×10⁻³⁴ J·s' },
      { symbol: String.raw`\nu`, meaning: 'frequency in hertz' },
      { symbol: String.raw`\hbar`, meaning: 'reduced Planck constant, h/2π' },
      { symbol: String.raw`\omega`, meaning: 'angular frequency' }
    ],
    interpretation: 'Energy exchange between radiation and matter occurs in discrete packets proportional to frequency.',
    assumptions: ['Single-mode or single-quantum exchange', 'Non-relativistic field quantisation'],
    applications: ['Photoelectric effect', 'Atomic spectra', 'Photonic quantum technologies']
  },
  {
    id: 'de-broglie',
    name: 'de Broglie relation',
    category: 'Matter waves',
    year: 1924,
    tex: String.raw`\lambda = \frac{h}{p} = \frac{h}{mv}`,
    origin: 'Louis de Broglie’s doctoral thesis, confirmed by electron diffraction in 1927.',
    symbols: [
      { symbol: String.raw`\lambda`, meaning: 'de Broglie wavelength' },
      { symbol: String.raw`p`, meaning: 'momentum' },
      { symbol: String.raw`m`, meaning: 'mass' },
      { symbol: String.raw`v`, meaning: 'velocity' }
    ],
    interpretation: 'Every material particle has an associated wavelength inversely proportional to its momentum.',
    assumptions: ['Non-relativistic momentum', 'Free particle or weakly varying potential'],
    applications: ['Electron microscopy', 'Neutron diffraction', 'Matter-wave interferometry']
  },
  {
    id: 'tdse',
    name: 'Time-dependent Schrödinger equation',
    category: 'Dynamics',
    year: 1926,
    tex: String.raw`i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)`,
    origin: 'Schrödinger, 1926, following de Broglie’s matter-wave hypothesis.',
    symbols: [
      { symbol: String.raw`\Psi`, meaning: 'state vector as a wavefunction' },
      { symbol: String.raw`\hat{H}`, meaning: 'Hamiltonian operator, total energy' },
      { symbol: String.raw`i`, meaning: 'imaginary unit' },
      { symbol: String.raw`\hbar`, meaning: 'reduced Planck constant' }
    ],
    interpretation: 'The state evolves unitarily in time with a generator given by the Hamiltonian; probability is conserved.',
    assumptions: ['Non-relativistic energies', 'Fixed particle number', 'External potential approximation'],
    applications: ['Wavepacket dynamics', 'Quantum control', 'Simulation of driven systems']
  },
  {
    id: 'tise',
    name: 'Time-independent Schrödinger equation',
    category: 'Dynamics',
    year: 1926,
    tex: String.raw`\hat{H}\psi_n = E_n\psi_n,\qquad \hat{H} = -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r})`,
    origin: 'Separation of variables for stationary states of the Schrödinger equation.',
    symbols: [
      { symbol: String.raw`\psi_n`, meaning: 'energy eigenfunction' },
      { symbol: String.raw`E_n`, meaning: 'energy eigenvalue' },
      { symbol: String.raw`V`, meaning: 'potential energy' },
      { symbol: String.raw`\nabla^2`, meaning: 'Laplacian operator' }
    ],
    interpretation: 'Bound states correspond to a discrete eigenvalue spectrum; scattering states form a continuum.',
    assumptions: ['Time-independent Hamiltonian', 'Boundary conditions at infinity or walls'],
    applications: ['Atomic spectra', 'Band structure', 'Quantum well design']
  },
  {
    id: 'born-rule',
    name: 'Born rule',
    category: 'Measurement',
    year: 1926,
    tex: String.raw`P(a_n) = |\langle a_n|\psi\rangle|^2`,
    origin: 'Max Born’s 1926 statistical interpretation of the wavefunction.',
    symbols: [
      { symbol: String.raw`P(a_n)`, meaning: 'probability of outcome aₙ' },
      { symbol: String.raw`|a_n\rangle`, meaning: 'eigenstate of the measured observable' },
      { symbol: String.raw`|\psi\rangle`, meaning: 'pre-measurement state' }
    ],
    interpretation: 'The probability of an outcome is the squared modulus of the amplitude for that outcome.',
    assumptions: ['Ideal projective measurement', 'Normalised state vector'],
    applications: ['All quantum predictions', 'Quantum state tomography', 'Circuit simulation']
  },
  {
    id: 'uncertainty',
    name: 'Heisenberg uncertainty relation',
    category: 'Measurement',
    year: 1927,
    tex: String.raw`\Delta x\,\Delta p \ge \frac{\hbar}{2}`,
    origin: 'Heisenberg, 1927; rigorously derived by Kennard and Weyl from the commutation relation.',
    symbols: [
      { symbol: String.raw`\Delta x`, meaning: 'standard deviation of position' },
      { symbol: String.raw`\Delta p`, meaning: 'standard deviation of momentum' }
    ],
    interpretation: 'No state can simultaneously have arbitrarily small spreads in position and momentum; the bound is a property of the state, not of the apparatus alone.',
    assumptions: ['Canonical pair of observables', 'Standard deviations computed in the same state'],
    applications: ['Squeezed light', 'Quantum metrology limits', 'Ground-state energy estimates']
  },
  {
    id: 'commutator',
    name: 'Canonical commutation relation',
    category: 'Algebra',
    year: 1925,
    tex: String.raw`[\hat{x},\hat{p}] = i\hbar,\qquad [\hat{A},\hat{B}] = \hat{A}\hat{B}-\hat{B}\hat{A}`,
    origin: 'Born and Jordan, 1925, in the matrix formulation of quantum mechanics.',
    symbols: [
      { symbol: String.raw`\hat{x}`, meaning: 'position operator' },
      { symbol: String.raw`\hat{p}`, meaning: 'momentum operator' },
      { symbol: String.raw`[\cdot,\cdot]`, meaning: 'commutator of two operators' }
    ],
    interpretation: 'Non-commuting observables cannot share a complete set of eigenstates, which is the algebraic origin of the uncertainty relation.',
    assumptions: ['Canonical quantisation', 'Operators acting on a common dense domain'],
    applications: ['Uncertainty relations', 'Angular momentum algebra', 'Field quantisation']
  },
  {
    id: 'expectation',
    name: 'Expectation value',
    category: 'Measurement',
    year: 1926,
    tex: String.raw`\langle A\rangle = \langle\psi|\hat{A}|\psi\rangle = \sum_n a_n\,|\langle a_n|\psi\rangle|^2`,
    origin: 'Dirac’s transformation theory, 1926–27.',
    symbols: [
      { symbol: String.raw`\langle A\rangle`, meaning: 'mean value of observable A' },
      { symbol: String.raw`a_n`, meaning: 'eigenvalue of the observable' }
    ],
    interpretation: 'The expected measurement average is the state-weighted sum of eigenvalues.',
    assumptions: ['Normalised state', 'Hermitian observable'],
    applications: ['Energy estimates', 'Variational methods', 'Observable averaging']
  },
  {
    id: 'bloch-state',
    name: 'Bloch state parameterisation',
    category: 'Qubits',
    year: 1946,
    tex: String.raw`|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle`,
    origin: 'Felix Bloch’s geometric representation of two-level systems.',
    symbols: [
      { symbol: String.raw`\theta`, meaning: 'polar angle, 0 to π' },
      { symbol: String.raw`\phi`, meaning: 'azimuthal phase, 0 to 2π' },
      { symbol: String.raw`|0\rangle,|1\rangle`, meaning: 'computational basis states' }
    ],
    interpretation: 'Every pure qubit state corresponds to a point on the unit sphere; orthogonal states are antipodal.',
    assumptions: ['Pure state', 'Global phase discarded'],
    applications: ['Qubit visualisation', 'Gate design', 'State tomography']
  },
  {
    id: 'bell-state',
    name: 'Bell state (maximally entangled pair)',
    category: 'Entanglement',
    year: 1964,
    tex: String.raw`|\Phi^{+}\rangle = \frac{1}{\sqrt{2}}\big(|00\rangle + |11\rangle\big)`,
    origin: 'Canonical maximally entangled two-qubit state central to Bell’s analysis.',
    symbols: [
      { symbol: String.raw`|\Phi^{+}\rangle`, meaning: 'Bell state with correlated outcomes' },
      { symbol: String.raw`|00\rangle,|11\rangle`, meaning: 'joint computational basis states' }
    ],
    interpretation: 'Measurement outcomes on the two qubits are perfectly correlated in the Z basis and anti-correlated in the X basis.',
    assumptions: ['Ideal two-qubit state', 'Perfect state preparation'],
    applications: ['Teleportation', 'Superdense coding', 'Bell tests']
  },
  {
    id: 'density-matrix',
    name: 'Density operator',
    category: 'Mixed states',
    year: 1927,
    tex: String.raw`\hat{\rho} = \sum_i p_i\,|\psi_i\rangle\langle\psi_i|,\qquad \mathrm{Tr}\,\hat{\rho}=1`,
    origin: 'von Neumann and Landau, developed for statistical quantum ensembles.',
    symbols: [
      { symbol: String.raw`p_i`, meaning: 'classical probability of state i' },
      { symbol: String.raw`\hat{\rho}`, meaning: 'density operator' }
    ],
    interpretation: 'Encodes both quantum superposition and classical ignorance; reduced density matrices describe subsystems of entangled states.',
    assumptions: ['Positive semi-definite operator', 'Unit trace'],
    applications: ['Decoherence modelling', 'Quantum channels', 'Entropy calculations']
  },
  {
    id: 'von-neumann-entropy',
    name: 'von Neumann entropy',
    category: 'Information',
    year: 1927,
    tex: String.raw`S(\hat\rho) = -\mathrm{Tr}\big(\hat\rho\log_2\hat\rho\big) = -\sum_i \lambda_i\log_2\lambda_i`,
    origin: 'von Neumann’s extension of entropy to quantum states.',
    symbols: [
      { symbol: String.raw`\lambda_i`, meaning: 'eigenvalues of the density operator' },
      { symbol: String.raw`S`, meaning: 'entropy in bits' }
    ],
    interpretation: 'Measures the uncertainty in a quantum state and quantifies entanglement when applied to a reduced state.',
    assumptions: ['Finite-dimensional Hilbert space', 'Base-2 logarithm for bits'],
    applications: ['Entanglement measures', 'Channel capacity', 'Thermodynamic analysis']
  },
  {
    id: 'tunnelling-transmission',
    name: 'Rectangular barrier transmission',
    category: 'Scattering',
    year: 1928,
    tex: String.raw`T = \left[1+\frac{V_0^2\sinh^2(\kappa a)}{4E(V_0-E)}\right]^{-1},\quad \kappa=\frac{\sqrt{2m(V_0-E)}}{\hbar}`,
    origin: 'Exact solution of the Schrödinger equation for a rectangular potential barrier.',
    symbols: [
      { symbol: String.raw`T`, meaning: 'transmission probability' },
      { symbol: String.raw`V_0`, meaning: 'barrier height' },
      { symbol: String.raw`a`, meaning: 'barrier width' },
      { symbol: String.raw`E`, meaning: 'incident particle energy' }
    ],
    interpretation: 'For E < V₀ the transmission is non-zero and decays approximately exponentially with barrier width.',
    assumptions: ['One-dimensional rectangular barrier', 'Single non-relativistic particle', 'E < V₀ regime shown'],
    applications: ['Scanning tunnelling microscopy', 'Alpha decay estimates', 'Tunnel diodes']
  },
  {
    id: 'dirac-equation',
    name: 'Dirac equation',
    category: 'Relativistic',
    year: 1928,
    tex: String.raw`\big(i\hbar\gamma^{\mu}\partial_{\mu} - mc\big)\psi = 0`,
    origin: 'Dirac’s relativistic wave equation for the electron.',
    symbols: [
      { symbol: String.raw`\gamma^{\mu}`, meaning: 'Dirac gamma matrices' },
      { symbol: String.raw`\partial_{\mu}`, meaning: 'four-gradient' },
      { symbol: String.raw`\psi`, meaning: 'four-component spinor' }
    ],
    interpretation: 'Relativistic covariance plus a first-order equation forces spin-½ and predicts antimatter.',
    assumptions: ['Flat Minkowski spacetime', 'Free particle or external field'],
    applications: ['Antimatter prediction', 'Fine structure of hydrogen', 'Relativistic quantum chemistry']
  },
  {
    id: 'fine-structure',
    name: 'Fine-structure constant',
    category: 'Constants',
    year: 1916,
    tex: String.raw`\alpha = \frac{e^2}{4\pi\varepsilon_0\hbar c} \approx \frac{1}{137.036}`,
    origin: 'Sommerfeld’s fine-structure analysis, later reinterpreted as the QED coupling strength.',
    symbols: [
      { symbol: String.raw`e`, meaning: 'elementary charge' },
      { symbol: String.raw`\varepsilon_0`, meaning: 'vacuum permittivity' },
      { symbol: String.raw`c`, meaning: 'speed of light' }
    ],
    interpretation: 'Dimensionless coupling setting the strength of electromagnetic interactions and the scale of atomic fine structure.',
    assumptions: ['Low-energy (Thomson limit) definition unless stated otherwise'],
    applications: ['Precision QED tests', 'Atomic spectroscopy', 'Fundamental-constant drifts']
  }
];

export const equationById = (id) => equations.find((e) => e.id === id);