export const deepeningC = {
  'quantum-mechanics': {
    sections: [
      {
        id: 'measurement-problem',
        title: 'The measurement problem and its proposed resolutions',
        group: 'theory',
        paragraphs: [
          'The formalism contains two different rules for how a state changes. Left alone, a state evolves smoothly and deterministically under the Schrödinger equation; when a measurement occurs, the state is said to collapse onto an eigenstate of the measured observable, with probabilities given by the Born rule. Nothing in the mathematics says when the second rule applies, or what counts as a measurement — and the theory works spectacularly well despite that gap.',
          'Decoherence removes part of the puzzle without resolving it. Once a system interacts with an environment, the reduced density matrix becomes diagonal in a preferred basis and interference between branches becomes locally inaccessible, which explains why apparatus pointers appear definite. But a diagonal density matrix still describes an improper mixture of branches, not a single actual outcome, so decoherence explains the disappearance of interference rather than the selection of one result.',
          'Proposed resolutions divide along a fault line. Everettian many-worlds keeps only unitary evolution and treats all branches as real; de Broglie–Bohm adds definite particle positions guided by the wavefunction; objective-collapse models modify the dynamics with a stochastic term that becomes significant for large masses; QBism and related epistemic views treat the state as an agent’s expectations rather than a description of the world. Each is internally consistent and empirically adequate so far, which is why the debate persists.',
          'Experimental discrimination is the live frontier. Collapse models predict spontaneous radiation and anomalous heating that can be bounded by ultra-cold mechanical oscillators and by underground detectors; gravitational decoherence proposals predict loss of coherence for sufficiently massive superpositions. Any positive signal would be the first evidence that the axioms themselves need revision rather than reinterpretation.'
        ]
      },
      {
        id: 'path-integral',
        title: 'The path integral and the classical limit',
        group: 'mathematics',
        paragraphs: [
          'Feynman’s formulation replaces the state vector with a sum over histories. The amplitude to go from one configuration to another is the integral over all paths of e^(iS/ħ), where S is the classical action evaluated along each path. For a free particle the integral can be done exactly and reproduces the propagator obtained from the Schrödinger equation, which establishes the equivalence of the two pictures.',
          'The classical limit emerges from stationary phase. When the action is large compared with ħ, contributions from neighbouring paths cancel except near the path where S is stationary — precisely Hamilton’s principle. Quantum corrections then come from integrating over Gaussian fluctuations around that classical path, giving a systematic semiclassical expansion whose leading term reproduces Newtonian mechanics and whose next order produces interference corrections such as the Van Vleck determinant.',
          'The path integral is also the natural setting for gauge theories, statistical mechanics and numerical work. Rotating to imaginary time turns e^(iS/ħ) into a real Boltzmann weight, so a quantum partition function becomes a classical statistical sum over field configurations; lattice simulations exploit exactly this correspondence, and the same rotation underlies the connection between quantum mechanics and stochastic processes.',
          'Two subtleties deserve care. The measure over paths is not a genuine Lebesgue measure, so the integral is defined by discretising time and taking a limit, or by analytic continuation; and the sum includes paths that are non-differentiable, which is why the result differs from simply evaluating the action on smooth trajectories. Neither problem prevents the method from being the most widely used computational framework in modern theoretical physics.'
        ]
      },
      {
        id: 'many-body',
        title: 'From one particle to many: emergence and statistics',
        group: 'applications',
        paragraphs: [
          'Most of physics is many-body, and the many-body problem is not a larger version of the one-body problem. Identical particles are described by fully symmetrised or antisymmetrised wavefunctions, so the state space splits into bosonic and fermionic sectors, and the Pauli exclusion principle becomes a structural statement about which configurations are allowed rather than a force. Occupation-number notation, with creation and annihilation operators, is the language in which this is naturally expressed.',
          'The resulting phenomenology is emergent. Metals, insulators, magnets and superconductors are not distinguished by their microscopic constituents, which are electrons and nuclei in every case, but by collective order and by the low-energy excitations that order supports. Quasiparticles — phonons, magnons, holes, Cooper pairs — carry the physics at accessible energies, and their properties can differ radically from those of the underlying particles.',
          'Phase transitions sharpen the point. Near a critical point, correlation lengths diverge and microscopic detail becomes irrelevant, so systems with completely different constituents fall into the same universality class characterised by a handful of exponents. Renormalisation explains why: the flow of couplings under coarse-graining washes out irrelevant operators, leaving a fixed point that governs the behaviour of the whole class.',
          'Numerical methods carry most of the predictive burden. Density functional theory handles ground states of real materials with an approximate exchange-correlation functional; quantum Monte Carlo is exact in principle but suffers a sign problem for fermions; tensor-network methods such as DMRG exploit limited entanglement in one dimension; and dynamical mean-field theory treats strong local correlations. Together they make quantum mechanics a quantitative engineering tool for matter.'
        ]
      }
    ],
    glossary: [
      { term: 'Many-worlds', definition: 'An interpretation in which the Schrödinger equation is exact and all branches of a superposition are physically realised.' },
      { term: 'Action', definition: 'The time integral of the Lagrangian along a path; its stationary points give the classical trajectory.' },
      { term: 'Quasiparticle', definition: 'A collective excitation of a many-body system that behaves as a particle with its own effective mass and charge.' }
    ]
  },

  'quantum-entanglement': {
    sections: [
      {
        id: 'purification',
        title: 'Purification, vacuum entanglement and geometry',
        group: 'theory',
        paragraphs: [
          'Any mixed state of a system can be viewed as the reduction of a pure state of a larger system: for every ρ_A there exists a purifying |Ψ⟩_AB with Tr_B|Ψ⟩⟨Ψ| = ρ_A. This is not a mathematical trick. It is why entanglement entropy appears in thermodynamics, in quantum error correction and in the description of black-hole radiation, and it establishes a precise sense in which ignorance about a subsystem is always entanglement with something the observer does not track.',
          'The vacuum is entangled. Tracing over the fields inside a region leaves the outside entangled with it, so the vacuum restricted to a subregion is a thermal-looking mixed state with an entropy proportional to the area of the boundary rather than the volume. The area law was first inferred from black-hole thermodynamics and is now a defining feature of ground states of local Hamiltonians, which is why tensor networks can represent them efficiently.',
          'In holographic theories the entanglement structure becomes geometric. The Ryu–Takayanagi conjecture identifies the entanglement entropy of a boundary region with the area of a minimal surface in the bulk, extending the Bekenstein–Hawking formula to general regions. Isolated patches of entanglement, known as islands, have since been used to explain how information can escape from an evaporating black hole without violating no-cloning.',
          'These results make entanglement a bridge between disciplines. It constrains which many-body states can arise from local dynamics, it supplies the resource for fault-tolerant codes, and it appears to be the quantity that the geometry of spacetime is built from, so a single concept now connects quantum information, condensed matter and gravitation.'
        ]
      },
      {
        id: 'witnesses',
        title: 'Witnesses, criteria and measures for mixed states',
        group: 'mathematics',
        paragraphs: [
          'Deciding whether a given density matrix is entangled is computationally hard in general, so practical tests rely on sufficient criteria. The positive-partial-transpose criterion says that if a state is separable, transposing one subsystem leaves a positive operator; entanglement is therefore implied whenever a negative eigenvalue appears. For two qubits and for qubit–qutrit pairs the criterion is also necessary, so it decides the question exactly in those dimensions.',
          'An entanglement witness is an observable whose expectation value is non-negative on every separable state but negative for at least one entangled state. Every entangled state possesses such a witness by the separating hyperplane theorem, and because witnesses are measurable, they provide an experimentally practical certification route: measure a few correlation operators, and a negative expectation is proof of entanglement without full tomography.',
          'Quantitative measures include concurrence for two qubits, logarithmic negativity for general bipartite states, and entanglement of formation, the asymptotic cost in Bell pairs to prepare the state. Distillable entanglement instead measures what can be extracted. The two do not coincide for mixed states, and finding families where they differ is one of the sharper open problems in quantum information theory.',
          'Multipartite entanglement is richer still, with several inequivalent classes such as GHZ and W states that cannot be converted into one another even probabilistically under local operations. Genuine multipartite entanglement requires witnesses constructed for the specific class, and the resulting hierarchy of tests is an active area of both theory and experiment.'
        ]
      },
      {
        id: 'entangled-sensing',
        title: 'Entangled sensing and distributed measurement',
        group: 'applications',
        paragraphs: [
          'Entanglement improves measurement by correlating noise as well as signal. Two-mode squeezed states used in interferometry suppress the shot-noise contribution below the vacuum level, and squeezed spin states in atomic ensembles push magnetometer sensitivity past the standard quantum limit. The gain is real but conditional: losses, detector inefficiency and decoherence can erase the advantage, which is why practical demonstrations are usually modest in absolute terms.',
          'Distributed sensing uses entanglement across separated nodes. Given n sensors sharing a GHZ state, the achievable precision in estimating a global parameter scales as 1/n rather than 1/√n, and the same correlations allow a network to measure an average phase while remaining insensitive to local fluctuations. Clock networks, gravitational-wave detector arrays and radio interferometry are all candidate beneficiaries.',
          'Entanglement also aids detection of faint targets. Quantum illumination pairs a signal with an idler and measures the correlation, which improves the discrimination of a weakly reflecting object against bright thermal background even when the initial entanglement is largely degraded — a robustness that comes from the correlation being preserved in a form usable by a joint measurement.',
          'The engineering obstacles are shared with quantum communication: sources must be bright and indistinguishable, links must preserve polarisation or phase, and detection must be efficient. Progress therefore follows the same roadmap as quantum networks, and improvements in one domain transfer directly to the other.'
        ]
      }
    ],
    glossary: [
      { term: 'Purification', definition: 'A pure state of a larger system whose reduction to a subsystem is the given mixed state.' },
      { term: 'Entanglement witness', definition: 'An observable with non-negative expectation on all separable states and a negative one on some entangled state.' },
      { term: 'PPT criterion', definition: 'The test that a separable state remains positive under partial transposition; violation proves entanglement.' }
    ]
  },

  'quantum-superposition': {
    sections: [
      {
        id: 'cat-states',
        title: 'Cat states and bosonic codes',
        group: 'theory',
        paragraphs: [
          'A Schrödinger-cat state superposes two coherent amplitudes that are macroscopically distinct, |α⟩ + |−α⟩. Its Wigner function shows two positive blobs and an interference fringe between them that oscillates in sign, so parts of the distribution are negative — a direct signature that no classical mixture of the two amplitudes can reproduce it. As α grows, the fringe period shrinks while the separation grows, making the state ever more fragile.',
          'That fragility has been turned into an advantage. In a microwave cavity the two amplitudes can be made long-lived while the dominant error — single-photon loss — merely rotates the state within the encoded subspace. This is the idea behind cat codes: encode a logical qubit in the parity of the photon number so that loss is detectable without destroying the information, then correct it with a feedback drive.',
          'Related encodings, including binomial and GKP codes, follow the same logic of embedding a qubit in a larger oscillator space where the errors the hardware actually makes map onto correctable displacements. They represent a shift in strategy: rather than making physical qubits better indefinitely, design the encoding so ordinary imperfections become benign.',
          'Experimentally these states are now routine in circuit QED. A cavity coupled to a transmon is driven into cat states with mean photon numbers of a few, their parity is read out dispersively, and logical lifetimes have exceeded the best physical qubits in the same device — a milestone for bosonic error correction.'
        ]
      },
      {
        id: 'density-matrix',
        title: 'Coherences, the density matrix and dephasing',
        group: 'mathematics',
        paragraphs: [
          'A superposition is not directly visible in a single measurement; it appears in the density matrix as off-diagonal elements. For a two-level system written in the energy basis, the diagonal entries are populations and the off-diagonals are coherences, which oscillate at the transition frequency and whose magnitude sets the amplitude of interference. A pure state has |ρ₁₂|² = ρ₁₁ρ₂₂; any smaller value means the state is mixed.',
          'Dephasing destroys coherences without changing populations, and it is the dominant error in most solid-state qubits. It arises from slowly fluctuating fields that give different qubits different precession frequencies, so that an ensemble average washes out the off-diagonal terms. Echo sequences partially undo the effect by reversing the accumulated phase, which is why spin-echo and Hahn-echo measurements distinguish static inhomogeneity from genuine dynamical noise.',
          'The distinction matters for scaling. Population relaxation sets an energy lifetime T₁, coherence decays on T₂, and in the presence of inhomogeneity the observed free-induction decay is faster, on T₂*. Because a quantum algorithm needs many coherent operations, T₂ is the relevant budget, and improving it usually means engineering the electromagnetic environment rather than the qubit alone.',
          'Ramsey interferometry makes all of this measurable. Two pulses separated by a variable delay map phase accumulation onto population, producing fringes whose contrast decays with delay. Fitting that decay yields the noise spectrum, and the same sequence is the readout primitive of atomic clocks, which is why the mathematical description of coherence and the practical operation of the world’s best timekeepers are the same subject.'
        ]
      },
      {
        id: 'algorithmic-superposition',
        title: 'Superposition inside quantum algorithms',
        group: 'applications',
        paragraphs: [
          'Superposition is where quantum algorithms begin: a layer of Hadamard gates puts n qubits into an equal-weight superposition of all 2ⁿ computational states, which can then be acted on by a circuit that evaluates a function on every input simultaneously. The trick is not the parallelism — a classical machine can also compute in parallel — but the interference that follows, which concentrates amplitude on the answers of interest.',
          'Deutsch–Jozsa shows the mechanism in miniature: one query to a superposition determines whether a function is constant or balanced, where classical evaluation requires exponentially many queries in the worst case. Bernstein–Vazirani extracts a hidden string in one query by arranging the phases so that they interfere constructively only for the correct answer, and Grover amplification iterates a reflection about the mean to boost a marked state by √N.',
          'In each case the art lies in converting the desired answer into a phase pattern and then reading that pattern out through interference. Phase estimation is the general tool: it writes the eigenvalue of a unitary into a register through controlled applications, so factoring reduces to period finding, and simulation of a Hamiltonian reduces to estimating its eigenphases.',
          'The limits are equally instructive. Measuring the superposition collapses it, so only one global property can be extracted per run; a database cannot be read out faster than linearly; and unstructured search cannot beat √N. Quantum advantage comes from structure in the problem, which is why the algorithms that work are those whose solutions are encoded in global symmetries or periodicity rather than in the individual entries of a list.'
        ]
      }
    ],
    glossary: [
      { term: 'Cat state', definition: 'A superposition of two macroscopically distinct coherent states, showing interference fringes and negative Wigner regions.' },
      { term: 'Dephasing', definition: 'Loss of coherence between energy eigenstates without change of their populations.' },
      { term: 'Amplitude amplification', definition: 'Grover’s procedure for concentrating probability on marked states in O(√N) iterations.' }
    ]
  }
};