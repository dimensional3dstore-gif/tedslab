export const deepeningG = {
  'quantum-mechanics': {
    sections: [
      {
        id: 'everyday-technology',
        title: 'The framework inside everyday technology',
        group: 'applications',
        paragraphs: [
          'The transistor is a quantum device. Conduction and valence bands, effective masses, tunnelling through thin oxides and the statistics of carrier occupation all come from the band structure of a crystal, which is the spectrum of a periodic Hamiltonian. The Moore’s law progression of shrinking gates is a progression of quantum effects becoming more, not less, important.',
          'The laser depends on stimulated emission and on population inversion in a medium whose energy levels are set by quantum mechanics. Its coherence, linewidth and noise properties are described by the quantum theory of the field, and its applications — from fibre communications to gravitational-wave detection — inherit those quantum limits directly.',
          'Magnetic resonance imaging relies on the spin of the proton, its Larmor precession in a field, and the relaxation times that distinguish tissue types. Flash memory stores charge in a floating gate and erases it by tunnelling. Atomic clocks define the second through a hyperfine transition whose frequency is fixed by quantum electrodynamics.',
          'Even chemistry is applied quantum mechanics: bonding, reactivity, colour and magnetism follow from the electronic structure of molecules. Density functional theory is run millions of times a day for drug discovery and materials design, which makes the Schrödinger equation possibly the most economically consequential equation ever written.'
        ]
      }
    ]
  },

  'quantum-entanglement': {
    sections: [
      {
        id: 'entanglement-in-matter',
        title: 'Entanglement inside materials',
        group: 'experiments',
        paragraphs: [
          'Entanglement is not confined to carefully prepared photon pairs. It is ubiquitous in condensed matter: the ground state of any interacting system is generally entangled, and the amount, measured by entanglement entropy, distinguishes phases. A gapped ground state obeys an area law, while a critical state shows logarithmic corrections that can be extracted from numerical simulations.',
          'Experiments now measure these quantities. Quantum gas microscopes image individual atoms in an optical lattice, allowing entanglement entropy to be reconstructed from correlators in a many-body system; neutron scattering probes spin correlations in quantum magnets; and ultracold molecules are used to prepare and detect entanglement between internal states of thousands of particles at once.',
          'Quantum spin liquids are the most striking case. In these materials strong frustration prevents magnetic order even at zero temperature, and the ground state is a highly entangled superposition with fractionalised excitations that behave like emergent particles carrying spin but not charge. Candidate materials such as herbertsmithite show the predicted signatures in thermodynamic and scattering measurements.',
          'Entanglement also structures chemistry. In strongly correlated molecules, the electronic wavefunction cannot be written as a single configuration, and the resulting multireference character is entanglement between orbitals. Attosecond experiments and quantum-chemical calculations now agree on how this entanglement governs ultrafast charge migration after photoexcitation.'
        ]
      }
    ]
  },

  'quantum-superposition': {
    sections: [
      {
        id: 'superposition-in-nature',
        title: 'Superposition in biological and natural settings',
        group: 'applications',
        paragraphs: [
          'Claims of functional quantum coherence in biology are the most debated corner of the subject. Excitation energy transfer in photosynthetic pigment–protein complexes is fast and efficient, and early two-dimensional spectroscopy reported long-lived oscillations that were interpreted as electronic coherence guiding the transfer. Later work showed that much of the signal is vibrational, and that the protein environment may assist transport classically.',
          'The radical-pair mechanism for magnetoreception is a stronger candidate. Absorption of light in the protein cryptochrome creates a spin-correlated radical pair whose singlet–triplet interconversion depends on the direction of the Earth’s magnetic field. Because the process involves a coherent spin superposition, it can in principle provide a compass, and behavioural experiments on migratory birds support the mechanism.',
          'Quantum effects are uncontroversial elsewhere in biology. Tunnelling underlies enzymatic hydrogen transfer, DNA mutation and electron transport in respiration; the stability of molecular structure depends on zero-point energy; and olfaction may involve inelastic electron tunnelling across receptor sites. None of these requires long-lived macroscopic coherence, which is precisely why they are plausible.',
          'The general lesson is that biology is a warm, wet environment hostile to phase coherence but friendly to processes that need only amplitude, statistics or tunnelling. Distinguishing the two categories requires experiments that can rule out classical explanations, and the standards for that evidence have risen sharply as the field has matured.'
        ]
      }
    ]
  },

  'wave-function': {
    sections: [
      {
        id: 'orbitals-chemistry',
        title: 'From wavefunctions to chemical structure',
        group: 'applications',
        paragraphs: [
          'Atomic orbitals are one-electron wavefunctions, and their shapes — spherical s, dumbbell p, four-lobed d — determine how atoms bond. Combining them into hybrid orbitals (sp, sp², sp³) explains molecular geometry, from the tetrahedral carbon of methane to the planar hexagonal lattice of graphene. The formalism is approximate, but its predictions about shape and reactivity are reliable enough to be taught as structure.',
          'Molecular orbital theory goes further, delocalising electrons over the whole molecule. Bond order, aromaticity, frontier orbitals and spectroscopic selection rules all follow from the symmetry and energies of the solutions. Computational chemistry replaces the pictorial versions with numerical solutions in large basis sets, adding electron correlation to reach quantitative accuracy.',
          'The antisymmetry requirement shapes everything. Because the total wavefunction must change sign when two electrons are exchanged, spatial and spin parts are linked: parallel spins force a spatially antisymmetric distribution that keeps electrons apart, which is the origin of exchange energy and of Hund’s rules. Much of chemistry is a consequence of this single sign change.',
          'Density functional theory reframes the problem by working with the electron density rather than the many-body wavefunction. The Hohenberg–Kohn theorems guarantee that the ground-state density determines everything, and the Kohn–Sham construction recovers orbitals as a computational device. The exchange-correlation functional remains approximate, which is why benchmarks and error estimates are essential to any practical calculation.'
        ]
      }
    ]
  },

  'quantum-tunnelling': {
    sections: [
      {
        id: 'nuclear-tunnelling',
        title: 'Nuclear tunnelling, tunnelling devices and the Gamow factor',
        group: 'applications',
        paragraphs: [
          'Alpha decay is a tunnelling process. An alpha particle inside a heavy nucleus is confined by the Coulomb barrier, and its escape rate is set by the probability of penetrating that barrier — the Gamow factor. Because the exponent depends steeply on the alpha energy, decay lifetimes span more than twenty orders of magnitude across the periodic table, a range reproduced by a formula derived from a simple barrier integral.',
          'The same factor governs stellar fusion. Two protons must approach closely enough for the strong force to act, but their Coulomb repulsion forbids it classically; fusion proceeds by tunnelling, and the temperature dependence of the rate — steep, but far less steep than classical barrier crossing would imply — sets the structure of stars and their lifetimes.',
          'Solid-state devices exploit tunnelling directly. Tunnel diodes show negative differential resistance; flash memory writes and erases by Fowler–Nordheim and direct tunnelling through a thin oxide; tunnel field-effect transistors aim to beat the thermal subthreshold swing by injecting carriers through a barrier rather than over it, promising lower supply voltages.',
          'Scanning probe techniques extend the same physics to imaging and manipulation. In a scanning tunnelling microscope the exponential dependence of current on distance gives sub-angstrom vertical resolution and single-atom sensitivity; in magnetic tunnel junctions the tunnelling current is spin-dependent, which is the read mechanism of the spin-transfer-torque memories now being commercialised.'
        ]
      }
    ]
  },

  'schrodinger-equation': {
    sections: [
      {
        id: 'exact-solutions',
        title: 'The catalogue of exactly solvable problems',
        group: 'mathematics',
        paragraphs: [
          'A short list of potentials yields closed-form solutions, and each one anchors a technique. The free particle and the infinite square well show quantisation from boundary conditions; the finite well and the step introduce evanescent waves and scattering; the delta potential is the simplest model of a localised impurity and of a bound state in one dimension.',
          'The harmonic oscillator is the most important of them. Its ladder operators produce an evenly spaced spectrum, coherent states and the algebraic structure reused in field theory; its solutions approximate any potential near a minimum; and its three-dimensional and many-particle versions describe phonons, photons and molecular vibrations.',
          'The Coulomb problem is the one with the widest reach. Separating in spherical coordinates yields Laguerre polynomials in the radial variable and spherical harmonics in angle, and the resulting orbitals fix the periodic table. Corrections — fine structure, Lamb shift, hyperfine splitting — are then treated as perturbations on that exact solution, which is how atomic physics achieves its extraordinary precision.',
          'Beyond that list, integrable models are rare but valuable. The Morse potential models molecular vibrations; the Pöschl–Teller and Hulthén potentials appear in nuclear and molecular problems; and the Calogero–Sutherland family describes cold atoms in one dimension. Each provides a controlled testing ground for approximate methods that must work where no exact solution exists.'
        ]
      }
    ]
  },

  'heisenberg-uncertainty-principle': {
    sections: [
      {
        id: 'spin-uncertainty',
        title: 'Angular momentum, spin and squeezed spins',
        group: 'mathematics',
        paragraphs: [
          'Angular momentum obeys [Lᵢ, Lⱼ] = iħεᵢⱼₖLₖ, so no state can have sharp values for two components simultaneously. Simultaneous eigenstates exist only for L² and one projection, which is why atomic states are labelled by ℓ and m. The resulting uncertainty is not a limitation of instruments but a feature of the algebra: the components are rotations about different axes and do not commute.',
          'Spin-½ exhibits the extreme case. Along any axis the measurement yields ±ħ/2, and a state with definite spin along z is a maximal superposition along x, so the expectation vanishes while the variance is maximal. This is the resource behind Stern–Gerlach measurement, magnetic resonance and every qubit experiment.',
          'Spin squeezing applies the uncertainty relation to an ensemble of spins. By making the collective spin uncertainty anisotropic — narrowing one transverse component at the expense of the other — an atomic ensemble can measure a phase below the projection-noise limit. The relevant inequality involves the angular-momentum commutator, and generating useful squeezing requires nonlinear interaction such as cavity feedback or one-axis twisting.',
          'Spin squeezing is now a practical metrological tool. Cold-atom clocks, atomic interferometers and magnetometers have all demonstrated sensitivity beyond the standard quantum limit using squeezed spin states, and the same physics underlies proposals for detecting dark matter and for testing the boundaries of quantum mechanics in macroscopic ensembles.'
        ]
      }
    ]
  },

  'photon': {
    sections: [
      {
        id: 'photon-gas',
        title: 'Photon gases, cosmology and radiation pressure',
        group: 'applications',
        paragraphs: [
          'A photon gas is the simplest quantum system in thermal equilibrium, because photons have no rest mass and their number is not conserved. Maximising entropy at fixed energy gives the Planck distribution, and its success in explaining the black-body spectrum was the first evidence for quantisation. Integrating it yields the Stefan–Boltzmann law and the Wien displacement rule.',
          'The cosmic microwave background is a nearly perfect black body at 2.725 K, with anisotropies of one part in a hundred thousand that encode the acoustic oscillations of the primordial plasma. Its spectrum and polarisation are measured to extraordinary precision, providing the tightest constraints on the number of relativistic species, spatial curvature and the epoch of recombination.',
          'Photons exert pressure. Radiation pressure accelerates comet tails, supports massive stars against gravity up to the Eddington limit, and is now used deliberately: solar sails exploit it for propulsion, optical tweezers use focused beams to trap and manipulate single cells and molecules, and laser cooling employs momentum transfer to slow atoms to microkelvin temperatures.',
          'High-energy photons interact differently. Above twice the electron rest energy, pair production in a nuclear field dominates, which is why gamma rays are absorbed in matter and why the extragalactic background attenuates TeV photons from distant sources. This attenuation, together with the absence of a detectable dispersion of arrival times across four orders of magnitude in energy, yields strong bounds on any photon rest mass and on Lorentz-invariance violation.'
        ]
      }
    ]
  },

  'quantum-computing': {
    sections: [
      {
        id: 'quantum-simulation',
        title: 'Quantum simulation: the most credible near-term use',
        group: 'applications',
        paragraphs: [
          'Simulating quantum systems is the application for which quantum hardware has an intrinsic advantage, since the cost of representing a many-body state grows exponentially on a classical machine. A controllable quantum system can be mapped onto the target Hamiltonian and evolved directly — analogue simulation — or evolved through a sequence of gates approximating the dynamics — digital simulation.',
          'Candidate problems include the electronic structure of transition-metal complexes and their excited states, the phase diagram of frustrated magnets, real-time dynamics after a quench, and lattice gauge theories in regimes inaccessible to Monte Carlo because of the sign problem. All of these are scientifically valuable and none requires a cryptographic-scale machine.',
          'Early experiments have already produced results of genuine research interest. Programmable arrays of trapped ions and Rydberg atoms have explored quantum magnets with dozens of spins; superconducting circuits have simulated lattice models in two dimensions; and specialised samplers have tackled small optimisation instances, though without demonstrated advantage over tuned classical heuristics.',
          'The honest assessment is that quantum simulation is where the trajectory is clearest. The hardware requirements scale with the system being studied rather than with a hard cryptographic target, and error mitigation can extend the useful reach of today’s noisy devices. It is the application that best matches the machines that actually exist.'
        ]
      }
    ]
  },

  'double-slit-experiment': {
    sections: [
      {
        id: 'interference-devices',
        title: 'Interferometers built on the same principle',
        group: 'applications',
        paragraphs: [
          'The Michelson and Mach–Zehnder interferometers split a beam, send the arms along different paths and recombine them with a controllable relative phase. Everything built on this geometry measures a path difference by counting fringes: optical testing of surfaces, Fourier-transform spectrometers, fibre-optic gyroscopes and the ring resonators used in photonic circuits.',
          'Gravitational-wave detectors are the most demanding example. LIGO and Virgo are kilometre-scale Michelson interferometers whose arms store light for milliseconds and whose sensitivity must reach a strain of 10⁻²¹. At that level every quantum effect matters: shot noise, radiation-pressure noise, thermal noise in the mirrors and suspension, and seismic noise all compete, and squeezed light is used to shift the quantum noise floor.',
          'Atom interferometers apply the same two-path logic to matter waves, using laser pulses as beam splitters and mirrors. They measure acceleration and rotation with exceptional accuracy, and are the basis of cold-atom gravimeters, inertial navigation proposals and tests of the equivalence principle — including proposals to compare free-falling isotopes in space.',
          'Neutron and electron interferometers complete the range. They have been used to observe the Aharonov–Bohm effect, to measure gravitational phase shifts of a single neutron, and to place bounds on hypothetical forces at short range. The recurrence of one geometry across optics, atomics and nuclear physics is why the two-slit arrangement remains the canonical example of interference.'
        ]
      }
    ]
  },

  'bell-test': {
    sections: [
      {
        id: 'nonlocality-limits',
        title: 'How much non-locality can nature support?',
        group: 'theory',
        paragraphs: [
          'Quantum correlations fall short of the algebraic maximum. For two parties with two settings the maximum is 4 while quantum mechanics reaches 2√2; for more settings and outcomes the gap persists. This raises a natural question: what principle singles out the quantum set from the larger set of correlations that also respect no-signalling?',
          'Candidate principles include information causality, which bounds the accessible information gain by the classical bits communicated; macroscopic locality, which requires that coarse-grained measurements look classical; and the requirement that communication complexity not collapse. Each reproduces several features of quantum correlations but none derives the quantum boundary in full generality, and all have been shown to be weaker than the quantum set in some scenarios.',
          'Post-quantum correlations, such as PR boxes, would make communication complexity trivial while remaining no-signalling. Their absence is therefore a substantive fact about nature rather than a logical necessity, and explaining it is one of the sharpest open problems at the boundary of quantum information and the foundations of physics.',
          'Experimental progress informs this. Device-independent tests of non-locality on networks with independent sources probe genuinely new regimes, and the observed limits keep tightening the constraint on any post-quantum influence. Each improvement narrows the space of theories that could reproduce the data without being quantum mechanics.'
        ]
      }
    ]
  },

  'quantum-field-theory': {
    sections: [
      {
        id: 'analytic-tools',
        title: 'Feynman rules, cross sections and lattice QCD',
        group: 'mathematics',
        paragraphs: [
          'Feynman rules convert a Lagrangian into calculable amplitudes: draw the vertices allowed by the interaction terms, assign propagators and polarisation vectors, integrate over undetermined loop momenta, and sum over diagrams. Cross sections follow by squaring the amplitude, summing over final states and integrating over phase space. The optical theorem connects the total rate to the imaginary part of the forward amplitude.',
          'Next-to-leading-order calculations require handling infrared and ultraviolet divergences simultaneously. Dimensional regularisation makes the divergences explicit, the renormalisation programme absorbs them into running couplings, and the infrared pieces cancel between real and virtual contributions when an inclusive observable is computed — a cancellation that is a theorem, not an accident of bookkeeping.',
          'Not everything can be expanded in a coupling. The strong interaction at low energy is strongly coupled, so perturbation theory fails and lattice QCD takes over. Discretising the path integral on a four-dimensional grid and evaluating it stochastically yields hadron masses, decay constants and form factors from first principles, at the cost of very large computational resources and of systematic errors from finite lattice spacing and volume.',
          'These tools are now shared infrastructure. The same machinery computes the muon anomaly, the running of the strong coupling, the equation of state of quark matter and the properties of the Higgs boson, and the agreement across such different observables is what makes quantum field theory credible as a description rather than merely as a fitting device.'
        ]
      }
    ]
  }
};