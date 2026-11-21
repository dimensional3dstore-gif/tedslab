export const scientists = [
  {
    slug: 'max-planck',
    name: 'Max Planck',
    years: '1858–1947',
    field: 'Theoretical physics',
    period: 'Old quantum theory',
    nationality: 'German',
    summary: 'Introduced the quantum of action while deriving the blackbody spectrum, opening the quantum era.',
    biography: [
      'Max Karl Ernst Ludwig Planck studied in Munich and Berlin, where he was influenced by Helmholtz and Kirchhoff. He held the chair of theoretical physics in Berlin from 1889 and worked for decades on the thermodynamics of radiation.',
      'In 1900, to reproduce the observed blackbody spectrum, he assumed that the energy of an oscillator is exchanged in discrete multiples of hν. He regarded the hypothesis as a formal device for many years, but it became the foundation of quantum theory.'
    ],
    contributions: [
      'Planck radiation law for blackbody spectral density',
      'Introduction of the Planck constant h',
      'Derivation of the Wien displacement and Stefan–Boltzmann relations from statistical arguments'
    ],
    theories: ['Quantum hypothesis of energy exchange', 'Thermodynamics of radiation'],
    publications: [
      { title: 'Über das Gesetz der Energieverteilung im Normalspectrum', year: 1901, journal: 'Annalen der Physik' },
      { title: 'Theorie der Wärmestrahlung', year: 1906, journal: 'Monograph' }
    ],
    awards: ['Nobel Prize in Physics, 1918'],
    related: ['albert-einstein', 'niels-bohr']
  },
  {
    slug: 'albert-einstein',
    name: 'Albert Einstein',
    years: '1879–1955',
    field: 'Theoretical physics',
    period: 'Old quantum theory',
    nationality: 'German / Swiss / American',
    summary: 'Proposed the light quantum, explained the photoelectric effect, and later challenged quantum completeness with EPR.',
    biography: [
      'Einstein’s 1905 papers introduced the light quantum, special relativity and Brownian motion theory. His 1905 photoelectric proposal was cited by the Nobel committee in 1922, and his later work on general relativity reshaped gravitational physics.',
      'He contributed decisively to quantum theory through the specific-heat model, the stimulated-emission concept and the Bose–Einstein statistics, while remaining sceptical of the theory’s probabilistic completeness — a position crystallised in the 1935 EPR paper.'
    ],
    contributions: [
      'Light-quantum hypothesis and photoelectric law',
      'Bose–Einstein statistics',
      'Einstein–Podolsky–Rosen argument on completeness',
      'A and B coefficients for radiative transitions'
    ],
    theories: ['Special and general relativity', 'Light quantum hypothesis', 'EPR criterion of reality'],
    publications: [
      { title: 'Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt', year: 1905, journal: 'Annalen der Physik' },
      { title: 'Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?', year: 1935, journal: 'Physical Review' }
    ],
    awards: ['Nobel Prize in Physics, 1921 (awarded 1922)'],
    related: ['max-planck', 'niels-bohr', 'erwin-schrodinger']
  },
  {
    slug: 'niels-bohr',
    name: 'Niels Bohr',
    years: '1885–1962',
    field: 'Atomic physics',
    period: 'Old quantum theory',
    nationality: 'Danish',
    summary: 'Built the first quantum model of the atom and shaped the Copenhagen interpretation.',
    biography: [
      'Bohr worked in Rutherford’s Manchester laboratory, where in 1913 he proposed quantised electron orbits to explain atomic spectra. He founded the Institute for Theoretical Physics in Copenhagen in 1921, which became the centre of quantum theory’s development.',
      'His complementarity principle and his insistence on classical concepts in the description of measurement defined the Copenhagen interpretation, and his 1935 reply to EPR framed the debate that Bell’s theorem later made experimental.'
    ],
    contributions: [
      'Bohr model of the hydrogen atom',
      'Correspondence principle',
      'Complementarity and the Copenhagen interpretation',
      'Compound-nucleus model of nuclear reactions'
    ],
    theories: ['Quantised atomic orbits', 'Complementarity'],
    publications: [
      { title: 'On the Constitution of Atoms and Molecules', year: 1913, journal: 'Philosophical Magazine' },
      { title: 'Can Quantum-Mechanical Description of Physical Reality be Considered Complete?', year: 1935, journal: 'Physical Review' }
    ],
    awards: ['Nobel Prize in Physics, 1922'],
    related: ['max-planck', 'werner-heisenberg', 'albert-einstein']
  },
  {
    slug: 'louis-de-broglie',
    name: 'Louis de Broglie',
    years: '1892–1987',
    field: 'Theoretical physics',
    period: 'Quantum revolution',
    nationality: 'French',
    summary: 'Proposed that matter possesses wave properties, predicting electron diffraction.',
    biography: [
      'In his 1924 doctoral thesis de Broglie assigned a wavelength λ = h/p to any particle with momentum p, extending wave–particle duality from light to matter. Einstein endorsed the idea, and Schrödinger used it to motivate his wave equation.',
      'The hypothesis was confirmed by Davisson and Germer’s electron diffraction experiments in 1927. De Broglie later worked on the causal interpretation of quantum mechanics and on the foundations of wave mechanics.'
    ],
    contributions: ['Matter-wave hypothesis', 'Pilot-wave interpretation', 'Foundational work on wave mechanics'],
    theories: ['Wave–particle duality for matter', 'Double-solution interpretation'],
    publications: [{ title: 'Recherches sur la théorie des quanta', year: 1924, journal: 'Doctoral thesis, Paris' }],
    awards: ['Nobel Prize in Physics, 1929'],
    related: ['erwin-schrodinger', 'max-planck', 'clinton-davisson']
  },
  {
    slug: 'erwin-schrodinger',
    name: 'Erwin Schrödinger',
    years: '1887–1961',
    field: 'Theoretical physics',
    period: 'Quantum revolution',
    nationality: 'Austrian',
    summary: 'Formulated wave mechanics and the equation governing quantum state evolution.',
    biography: [
      'Schrödinger derived his wave equation in late 1925 while working in Zurich, and in 1926 showed that it reproduces the hydrogen spectrum. The equation provided a continuous, differential formulation of quantum theory complementary to Heisenberg’s matrix mechanics.',
      'He also introduced the thought experiment now called Schrödinger’s cat to expose the measurement problem, and wrote influentially on the interpretation of quantum theory, biology and thermodynamics.'
    ],
    contributions: ['Schrödinger equation', 'Wave mechanics', 'Schrödinger’s cat thought experiment', 'Proof of equivalence with matrix mechanics'],
    theories: ['Wave mechanics', 'Entanglement as the defining feature of quantum theory'],
    publications: [
      { title: 'Quantisierung als Eigenwertproblem', year: 1926, journal: 'Annalen der Physik' },
      { title: 'An Undulatory Theory of the Mechanics of Atoms and Molecules', year: 1926, journal: 'Physical Review' }
    ],
    awards: ['Nobel Prize in Physics, 1933'],
    related: ['werner-heisenberg', 'louis-de-broglie', 'max-born']
  },
  {
    slug: 'werner-heisenberg',
    name: 'Werner Heisenberg',
    years: '1901–1976',
    field: 'Theoretical physics',
    period: 'Quantum revolution',
    nationality: 'German',
    summary: 'Created matrix mechanics and derived the uncertainty principle.',
    biography: [
      'Heisenberg’s 1925 paper on the Helgoland calculations introduced a quantum algebra of observables, the first complete formulation of quantum mechanics. The following year he derived the uncertainty relation Δx Δp ≥ ħ/2 from the formalism of the theory.',
      'He later contributed to nuclear physics through the isospin concept and to quantum field theory through the S-matrix programme, and led the German nuclear research effort during the Second World War.'
    ],
    contributions: ['Matrix mechanics', 'Uncertainty principle', 'Isospin', 'S-matrix theory'],
    theories: ['Matrix formulation of quantum mechanics', 'Uncertainty relations'],
    publications: [
      { title: 'Über quantentheoretische Umdeutung kinematischer und mechanischer Beziehungen', year: 1925, journal: 'Zeitschrift für Physik' },
      { title: 'Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik', year: 1927, journal: 'Zeitschrift für Physik' }
    ],
    awards: ['Nobel Prize in Physics, 1932 (awarded 1933)'],
    related: ['max-born', 'niels-bohr', 'erwin-schrodinger']
  },
  {
    slug: 'max-born',
    name: 'Max Born',
    years: '1882–1970',
    field: 'Theoretical physics',
    period: 'Quantum revolution',
    nationality: 'German / British',
    summary: 'Established the probabilistic interpretation of the quantum wavefunction.',
    biography: [
      'Born worked on lattice dynamics and relativity before turning to the new quantum theory. In 1926 he showed that the square modulus of Schrödinger’s wavefunction gives the probability density for finding a particle at a given position.',
      'Born built the Göttingen school of theoretical physics, where Heisenberg, Jordan and Fermi trained. He also made lasting contributions to the quantum theory of solids and to the statistical mechanics of liquids.'
    ],
    contributions: ['Born rule for probabilities', 'Matrix mechanics collaboration with Heisenberg and Jordan', 'Quantum theory of crystals'],
    theories: ['Statistical interpretation of the wavefunction'],
    publications: [
      { title: 'Zur Quantenmechanik der Stoßvorgänge', year: 1926, journal: 'Zeitschrift für Physik' },
      { title: 'Zur Quantenmechanik', year: 1925, journal: 'Zeitschrift für Physik' }
    ],
    awards: ['Nobel Prize in Physics, 1954'],
    related: ['werner-heisenberg', 'erwin-schrodinger', 'pascual-jordan']
  },
  {
    slug: 'paul-dirac',
    name: 'Paul Dirac',
    years: '1902–1984',
    field: 'Theoretical physics',
    period: 'Quantum revolution',
    nationality: 'British',
    summary: 'Unified quantum mechanics and special relativity, and founded quantum electrodynamics.',
    biography: [
      'Dirac’s 1928 relativistic wave equation for the electron predicted antimatter and explained the electron’s spin and magnetic moment. His 1930 treatise The Principles of Quantum Mechanics set the standard formal language of the subject.',
      'He developed transformation theory, quantised the electromagnetic field, and formulated the bra–ket notation now universal in quantum theory. His work on magnetic monopoles and constrained Hamiltonian dynamics influenced theoretical physics for decades.'
    ],
    contributions: ['Dirac equation', 'Bra–ket notation and transformation theory', 'Quantisation of the electromagnetic field', 'Fermi–Dirac statistics'],
    theories: ['Relativistic quantum mechanics', 'Dirac hole theory', 'Constrained Hamiltonian dynamics'],
    publications: [
      { title: 'The quantum theory of the electron', year: 1928, journal: 'Proceedings of the Royal Society A' },
      { title: 'The Principles of Quantum Mechanics', year: 1930, journal: 'Monograph, Oxford' }
    ],
    awards: ['Nobel Prize in Physics, 1933'],
    related: ['erwin-schrodinger', 'richard-feynman', 'werner-heisenberg']
  },
  {
    slug: 'pascual-jordan',
    name: 'Pascual Jordan',
    years: '1902–1980',
    field: 'Theoretical physics',
    period: 'Quantum revolution',
    nationality: 'German',
    summary: 'Co-developed matrix mechanics and introduced the quantisation of fields.',
    biography: [
      'Jordan collaborated with Born and Heisenberg on the three-man paper that established matrix mechanics, and with Born he gave the statistical transformation theory of the new mechanics. His 1925 work introduced anticommutation relations later understood as the basis of fermionic statistics.',
      'In 1928 he and Eugene Wigner showed how to quantise a field, a step that opened the route to quantum field theory. Jordan later worked on geophysics and cosmology.'
    ],
    contributions: ['Co-formulation of matrix mechanics', 'Fermionic commutation relations', 'Field quantisation with Wigner'],
    theories: ['Quantisation of wave fields'],
    publications: [{ title: 'Zur Quantenmechanik II', year: 1926, journal: 'Zeitschrift für Physik' }],
    awards: [],
    related: ['max-born', 'werner-heisenberg', 'paul-dirac']
  },
  {
    slug: 'richard-feynman',
    name: 'Richard Feynman',
    years: '1918–1988',
    field: 'Quantum field theory',
    period: 'Quantum electrodynamics',
    nationality: 'American',
    summary: 'Reformulated quantum electrodynamics with diagrams and path integrals, and pioneered quantum computation.',
    biography: [
      'Feynman developed the path-integral formulation of quantum mechanics in his 1942 thesis and, in the late 1940s, a covariant calculational scheme for quantum electrodynamics with diagrammatic rules that made perturbative calculations systematic.',
      'His 1959 lecture on nanoscale technology and his 1981 discussion of simulating physics with computers established research agendas that remain active. The Feynman Lectures on Physics became a standard reference for the subject.'
    ],
    contributions: ['Path-integral formulation', 'Feynman diagrams and QED renormalisation', 'Parton model of strong interactions', 'Proposal for quantum simulation'],
    theories: ['Sum over histories', 'Quantum electrodynamics calculation rules'],
    publications: [
      { title: 'Space-Time Approach to Quantum Electrodynamics', year: 1949, journal: 'Physical Review' },
      { title: 'Simulating Physics with Computers', year: 1982, journal: 'International Journal of Theoretical Physics' }
    ],
    awards: ['Nobel Prize in Physics, 1965'],
    related: ['paul-dirac', 'john-bell', 'julian-schwinger']
  },
  {
    slug: 'john-bell',
    name: 'John Stewart Bell',
    years: '1928–1990',
    field: 'Foundations of quantum theory',
    period: 'Modern quantum theory',
    nationality: 'Northern Irish',
    summary: 'Proved that local hidden-variable theories impose measurable constraints on correlations.',
    biography: [
      'Bell worked at CERN on accelerator physics while pursuing the foundations of quantum theory in his own time. In 1964 he derived an inequality that any local hidden-variable theory must satisfy, but which quantum mechanics violates for entangled states.',
      'Bell’s theorem converted a philosophical dispute into an experimental question, motivating the Clauser–Horne–Shimony–Holt proposals and the Aspect experiments. He also contributed to the theory of the strong interaction and to accelerator design.'
    ],
    contributions: ['Bell’s theorem and Bell inequalities', 'Work on the Adler–Bell–Jackiw anomaly', 'Foundational analysis of measurement'],
    theories: ['Non-locality of quantum correlations'],
    publications: [{ title: 'On the Einstein Podolsky Rosen paradox', year: 1964, journal: 'Physics' }],
    awards: ['Fellow of the Royal Society'],
    related: ['alain-aspect', 'john-clauser', 'richard-feynman']
  },
  {
    slug: 'alain-aspect',
    name: 'Alain Aspect',
    years: '1947–',
    field: 'Quantum optics',
    period: 'Modern quantum theory',
    nationality: 'French',
    summary: 'Performed the decisive early Bell tests with entangled photons.',
    biography: [
      'Aspect’s experiments at Orsay in the early 1980s measured polarisation correlations of photon pairs from atomic cascades, confirming the violation of Bell inequalities to high statistical significance and testing the locality assumption with fast switching analysers.',
      'He continued to work on atom optics, Bose–Einstein condensates and quantum technologies. Aspect shared the 2022 Nobel Prize for experiments with entangled photons and pioneering quantum information science.'
    ],
    contributions: ['Bell test measurements with time-varying analysers', 'Atom interferometry and cavity QED', 'Pioneering quantum information experiments'],
    theories: [],
    publications: [
      { title: 'Experimental Realization of Einstein-Podolsky-Rosen-Bohm Gedankenexperiment', year: 1982, journal: 'Physical Review Letters' },
      { title: 'Experimental Test of Bell’s Inequalities Using Time-Varying Analyzers', year: 1982, journal: 'Physical Review Letters' }
    ],
    awards: ['Nobel Prize in Physics, 2022'],
    related: ['john-bell', 'john-clauser', 'anton-zeilinger']
  },
  {
    slug: 'john-clauser',
    name: 'John Clauser',
    years: '1942–',
    field: 'Quantum foundations',
    period: 'Modern quantum theory',
    nationality: 'American',
    summary: 'Reported the first experimental Bell test and formulated the CHSH inequality.',
    biography: [
      'Clauser, together with Horne, Shimony and Holt, derived the CHSH form of Bell’s inequality, which is convenient for experiments with imperfect analysers. In 1972 he and Stuart Freedman carried out the first experimental test using photon pairs.',
      'He shared the 2022 Nobel Prize in Physics for these foundational experiments, which opened the empirical study of quantum non-locality.'
    ],
    contributions: ['CHSH inequality', 'First experimental Bell test with Freedman'],
    theories: [],
    publications: [{ title: 'Proposed Experiment to Test Local Hidden-Variable Theories', year: 1969, journal: 'Physical Review Letters' }],
    awards: ['Nobel Prize in Physics, 2022'],
    related: ['john-bell', 'alain-aspect', 'anton-zeilinger']
  },
  {
    slug: 'anton-zeilinger',
    name: 'Anton Zeilinger',
    years: '1945–',
    field: 'Quantum optics',
    period: 'Modern quantum theory',
    nationality: 'Austrian',
    summary: 'Demonstrated quantum teleportation and extended entanglement experiments to complex molecules.',
    biography: [
      'Zeilinger’s group achieved the first experimental realisation of quantum teleportation in 1997 and later demonstrated entanglement swapping, long-distance free-space entanglement distribution and interference with large molecules.',
      'These experiments established entanglement as a manipulable resource, underpinning quantum communication and the foundations of quantum information science. He shared the 2022 Nobel Prize in Physics.'
    ],
    contributions: ['Experimental quantum teleportation', 'Entanglement swapping', 'Wave–particle duality with macromolecules'],
    theories: [],
    publications: [
      { title: 'Experimental quantum teleportation', year: 1997, journal: 'Nature' },
      { title: 'Wave–particle duality of C60 molecules', year: 1999, journal: 'Nature' }
    ],
    awards: ['Nobel Prize in Physics, 2022'],
    related: ['alain-aspect', 'john-bell', 'john-clauser']
  }
];

export const scientistBySlug = (slug) => scientists.find((s) => s.slug === slug);