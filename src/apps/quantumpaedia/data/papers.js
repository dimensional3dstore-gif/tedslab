export const papers = [
  {
    id: 'planck-1901',
    title: 'Über das Gesetz der Energieverteilung im Normalspectrum',
    authors: ['Max Planck'],
    journal: 'Annalen der Physik',
    year: 1901,
    doi: '10.1002/andp.19013090310',
    keywords: ['blackbody radiation', 'quantum hypothesis', 'thermodynamics'],
    abstract:
      'Planck derives the spectral energy distribution of blackbody radiation by assuming that the energy of an oscillator is exchanged in discrete elements proportional to frequency, obtaining the law that matches observation across the measured spectrum.',
    topic: 'Old quantum theory'
  },
  {
    id: 'einstein-1905',
    title: 'Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt',
    authors: ['Albert Einstein'],
    journal: 'Annalen der Physik',
    year: 1905,
    doi: '10.1002/andp.19053220607',
    keywords: ['photoelectric effect', 'light quanta', 'photons'],
    abstract:
      'Einstein proposes that light consists of energy quanta of magnitude hν, explaining the photoelectric threshold, the independence of electron energy from intensity, and the entropy of radiation in the Wien regime.',
    topic: 'Light quanta'
  },
  {
    id: 'schrodinger-1926',
    title: 'An Undulatory Theory of the Mechanics of Atoms and Molecules',
    authors: ['Erwin Schrödinger'],
    journal: 'Physical Review',
    year: 1926,
    doi: '10.1103/PhysRev.28.1049',
    keywords: ['wave mechanics', 'eigenvalue problem', 'hydrogen spectrum'],
    abstract:
      'Schrödinger presents the wave equation for material particles, solves it for the hydrogen atom and harmonic oscillator, and shows that the discrete eigenvalues reproduce observed atomic spectra.',
    topic: 'Wave mechanics'
  },
  {
    id: 'born-1926',
    title: 'Zur Quantenmechanik der Stoßvorgänge',
    authors: ['Max Born'],
    journal: 'Zeitschrift für Physik',
    year: 1926,
    doi: '10.1007/BF01397477',
    keywords: ['probability interpretation', 'scattering', 'measurement'],
    abstract:
      'Born interprets the squared modulus of the wavefunction as a probability density for measurement outcomes, establishing the statistical reading of quantum mechanics.',
    topic: 'Foundations'
  },
  {
    id: 'heisenberg-1927',
    title: 'Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik',
    authors: ['Werner Heisenberg'],
    journal: 'Zeitschrift für Physik',
    year: 1927,
    doi: '10.1007/BF01397280',
    keywords: ['uncertainty principle', 'measurement', 'gamma-ray microscope'],
    abstract:
      'Heisenberg argues that any measurement of position necessarily disturbs momentum, deriving an order-of-magnitude uncertainty relation and discussing its consequences for the interpretation of quantum theory.',
    topic: 'Foundations'
  },
  {
    id: 'dirac-1928',
    title: 'The quantum theory of the electron',
    authors: ['Paul A. M. Dirac'],
    journal: 'Proceedings of the Royal Society A',
    year: 1928,
    doi: '10.1098/rspa.1928.0023',
    keywords: ['relativistic wave equation', 'spin', 'antimatter'],
    abstract:
      'Dirac formulates a first-order relativistic wave equation whose four-component solutions describe spin-½ particles and admit negative-energy states later identified with antimatter.',
    topic: 'Relativistic quantum mechanics'
  },
  {
    id: 'epr-1935',
    title: 'Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?',
    authors: ['Albert Einstein', 'Boris Podolsky', 'Nathan Rosen'],
    journal: 'Physical Review',
    year: 1935,
    doi: '10.1103/PhysRev.47.777',
    keywords: ['entanglement', 'completeness', 'local realism'],
    abstract:
      'The authors argue that entangled pairs allow certain prediction of one particle’s position or momentum from a measurement on the other, concluding that the quantum description of physical reality is incomplete.',
    topic: 'Foundations'
  },
  {
    id: 'bell-1964',
    title: 'On the Einstein Podolsky Rosen paradox',
    authors: ['John S. Bell'],
    journal: 'Physics',
    year: 1964,
    doi: '10.1103/PhysicsPhysiqueFizika.1.195',
    keywords: ['Bell inequality', 'local hidden variables', 'non-locality'],
    abstract:
      'Bell shows that any theory reproducing quantum predictions through local hidden variables must satisfy an inequality on spin correlations, which quantum mechanics violates for suitable measurement settings.',
    topic: 'Foundations'
  },
  {
    id: 'chsh-1969',
    title: 'Proposed Experiment to Test Local Hidden-Variable Theories',
    authors: ['John F. Clauser', 'Michael A. Horne', 'Abner Shimony', 'Richard A. Holt'],
    journal: 'Physical Review Letters',
    year: 1969,
    doi: '10.1103/PhysRevLett.23.880',
    keywords: ['CHSH inequality', 'experimental proposal', 'polarisation'],
    abstract:
      'The authors derive a Bell-type inequality suitable for realistic experiments with imperfect analysers and propose a photonic test using polarisation correlations.',
    topic: 'Experimental foundations'
  },
  {
    id: 'aspect-1982',
    title: 'Experimental Test of Bell Inequalities Using Time-Varying Analyzers',
    authors: ['Alain Aspect', 'Jean Dalibard', 'Gérard Roger'],
    journal: 'Physical Review Letters',
    year: 1982,
    doi: '10.1103/PhysRevLett.49.1804',
    keywords: ['Bell test', 'entangled photons', 'locality'],
    abstract:
      'Using acousto-optical switches to change analyser orientation during photon flight, the experiment measures a Bell-inequality violation while addressing the locality assumption.',
    topic: 'Experimental foundations'
  },
  {
    id: 'tonomura-1989',
    title: 'Demonstration of single-electron buildup of an interference pattern',
    authors: ['Akira Tonomura', 'J. Endo', 'T. Matsuda', 'T. Kawasaki', 'H. Ezawa'],
    journal: 'American Journal of Physics',
    year: 1989,
    doi: '10.1119/1.16104',
    keywords: ['double slit', 'electron interference', 'single particle'],
    abstract:
      'A field-emission electron microscope with a biprism produces a build-up series in which individual electron detections gradually form a two-slit interference pattern.',
    topic: 'Matter waves'
  },
  {
    id: 'zeilinger-1999',
    title: 'Wave–particle duality of C60 molecules',
    authors: ['Markus Arndt', 'Olaf Nairz', 'Julian Vos-Andreae', 'Claudia Keller', 'Gerbrand van der Zouw', 'Anton Zeilinger'],
    journal: 'Nature',
    year: 1999,
    doi: '10.1038/44348',
    keywords: ['molecular interference', 'de Broglie wavelength', 'decoherence'],
    abstract:
      'A beam of C60 fullerenes passing a grating shows interference fringes consistent with a de Broglie wavelength of about 2.5 picometres, extending quantum interference to large, hot molecules.',
    topic: 'Matter waves'
  },
  {
    id: 'feynman-1982',
    title: 'Simulating Physics with Computers',
    authors: ['Richard P. Feynman'],
    journal: 'International Journal of Theoretical Physics',
    year: 1982,
    doi: '10.1007/BF02650179',
    keywords: ['quantum simulation', 'computational complexity', 'quantum computing'],
    abstract:
      'Feynman argues that classical computers cannot efficiently simulate general quantum systems and proposes that quantum-mechanical hardware be used to simulate physics directly.',
    topic: 'Quantum computing'
  },
  {
    id: 'shor-1997',
    title: 'Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer',
    authors: ['Peter W. Shor'],
    journal: 'SIAM Journal on Computing',
    year: 1997,
    doi: '10.1137/S0097539795293172',
    keywords: ['factoring', 'quantum Fourier transform', 'algorithms'],
    abstract:
      'Shor presents polynomial-time quantum algorithms for factoring integers and computing discrete logarithms, reducing both to period finding via the quantum Fourier transform.',
    topic: 'Quantum computing'
  },
  {
    id: 'arute-2019',
    title: 'Quantum supremacy using a programmable superconducting processor',
    authors: ['Frank Arute et al.'],
    journal: 'Nature',
    year: 2019,
    doi: '10.1038/s41586-019-1666-5',
    keywords: ['superconducting qubits', 'sampling', 'benchmarking'],
    abstract:
      'A 53-qubit superconducting processor executes random circuit sampling with fidelity estimates that the authors argue would require impractical time on classical supercomputers.',
    topic: 'Quantum computing'
  },
  {
    id: 'hensen-2015',
    title: 'Loophole-free Bell inequality violation using electron spins separated by 1.3 kilometres',
    authors: ['Bas Hensen et al.'],
    journal: 'Nature',
    year: 2015,
    doi: '10.1038/nature15759',
    keywords: ['loophole-free', 'nitrogen-vacancy', 'Bell test'],
    abstract:
      'Entangled electron spins in diamond separated by 1.3 km are measured with settings chosen by fast random number generators, closing the locality and detection loopholes simultaneously.',
    topic: 'Experimental foundations'
  },
  {
    id: 'nielsen-chuang',
    title: 'Quantum Computation and Quantum Information',
    authors: ['Michael A. Nielsen', 'Isaac L. Chuang'],
    journal: 'Cambridge University Press',
    year: 2010,
    doi: null,
    keywords: ['textbook', 'quantum information', 'algorithms'],
    abstract:
      'A comprehensive treatment of quantum information science, covering the formalism of quantum states, quantum circuits, algorithms, error correction and entropy measures.',
    topic: 'Reference work'
  }
];

export const paperById = (id) => papers.find((p) => p.id === id);