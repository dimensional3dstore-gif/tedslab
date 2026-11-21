export const deepeningD = {
  'wave-function': {
    sections: [
      {
        id: 'boundary-conditions',
        title: 'Boundary conditions, bound states and scattering',
        group: 'mathematics',
        paragraphs: [
          'The wavefunction is determined as much by its boundary conditions as by the equation it satisfies. Requiring normalisability confines the allowed energies to a discrete spectrum, requiring continuity and continuity of the logarithmic derivative ties the amplitudes together across a potential step, and requiring periodicity quantises momentum on a ring. Change the boundary and the physics changes: a particle in a box has discrete levels, the same particle on a line has a continuum.',
          'Scattering theory reorganises the problem around asymptotic states. Far from the scatterer, a solution is an incident plane wave plus outgoing waves in each channel, and the S-matrix collects the amplitudes connecting them. Its poles in the complex energy plane locate bound states and resonances, which is why a single object describes both a stable bound configuration and a decaying excited one.',
          'Resonances are especially important in practice. A quasi-bound state leaks slowly, producing a sharp peak in the transmission or cross-section whose width is inversely proportional to the lifetime. Lasers, nuclear reactions, hadron spectroscopy and optical cavities are all organised around this relation, and it makes the abstract spectral theory of the Hamiltonian into a measurable statement about line widths.',
          'Numerically, boundary conditions decide the method. Shooting methods integrate from both ends and match; finite-difference methods discretise the operator and hand the problem to an eigensolver; variational methods expand in a basis and minimise the energy. The accuracy of each depends on how well the basis reproduces the behaviour near the boundaries, which is where the wavefunction usually varies fastest.'
        ]
      },
      {
        id: 'measurement-probability',
        title: 'Probability currents, nodes and interference patterns',
        group: 'theory',
        paragraphs: [
          'The continuity equation ∂ρ/∂t + ∇·j = 0 with ρ = |ψ|² and j = (ħ/m) Im(ψ*∇ψ) says that probability is locally conserved. A stationary state has ∂ρ/∂t = 0, so its current is divergence-free, and in one dimension it must be constant — which is why a beam in a stationary scattering state carries a uniform flux even where the density varies.',
          'Nodes are where the density vanishes and the phase jumps by π. Two degenerate states with a relative phase produce a standing wave whose nodes are fixed, while a superposition of different energies produces nodes that move, and the pattern of motion depends on the phase difference rather than the amplitudes. This distinction between fixed and moving interference is what separates a stationary state from a wavepacket.',
          'Interference in a superposition of two wavepackets shows up as a density modulation with fringes spaced by 2πħ/Δp, where Δp is the momentum difference. Those fringes are the direct footprint of coherence, and their visibility decays as the two components become entangled with an environment — the same relation between distinguishability and contrast that governs the double-slit experiment.',
          'The Bohmian reading gives these features a literal interpretation: particles follow trajectories guided by the phase of the wavefunction, distributions relax to |ψ|², and the nodes are where the guidance equation is singular. The predictions agree exactly with orthodox quantum mechanics, which makes the picture useful for intuition even for those who do not adopt its ontology.'
        ]
      },
      {
        id: 'wavefunction-tomography',
        title: 'Measuring a wavefunction: tomography and reconstruction',
        group: 'experiments',
        paragraphs: [
          'A single copy of a state cannot be measured, but many identically prepared copies can be used to reconstruct it. Quantum state tomography measures a complete set of observables whose expectation values determine the density matrix; for a single qubit this means three orthogonal spin components, and for a photon it means projection onto a set of polarisation bases.',
          'For continuous variables the task is harder because the state lives in an infinite-dimensional space. Homodyne detection measures one field quadrature at a time, and repeating the measurement with a local oscillator at different phases yields the marginal distributions from which the Wigner function can be recovered by an inverse Radon transform. Quantum homodyne tomography is now standard for characterising squeezed and cat states.',
          'A different approach exploits prior knowledge. If a state is known to be a pure state belonging to a low-dimensional family, compressed sensing reduces the number of measurements from quadratic to nearly linear in the dimension, and maximum-likelihood or Bayesian reconstruction produces the most probable density matrix consistent with the data while respecting positivity.',
          'Direct reconstruction of the wavefunction of a single particle is also possible in special cases: weak measurements followed by strong post-selection give the wavefunction at each position, and this protocol has been carried out for photons and for atoms. The results confirm that the wavefunction has a measurable operational content even if its ontological status remains debated.'
        ]
      }
    ],
    glossary: [
      { term: 'S-matrix', definition: 'The collection of amplitudes connecting asymptotic incoming and outgoing scattering states.' },
      { term: 'Probability current', definition: 'The vector field j describing the flow of probability density, conserved with ρ by the continuity equation.' },
      { term: 'Tomography', definition: 'Reconstruction of a quantum state from measurements on many identically prepared copies.' }
    ]
  },

  'quantum-tunnelling': {
    sections: [
      {
        id: 'instantons',
        title: 'Instantons and tunnelling in the semiclassical picture',
        group: 'theory',
        paragraphs: [
          'In the path integral, tunnelling corresponds to trajectories that evolve in imaginary time. Continuing t → −iτ turns the oscillatory weight e^(iS/ħ) into a decaying one, and the dominant contribution comes from finite-action solutions of the imaginary-time equations of motion that connect one classical vacuum to another — instantons. The tunnelling amplitude is then approximately e^(−S_inst/ħ).',
          'This language is indispensable when tunnelling involves many degrees of freedom. Macroscopic quantum tunnelling of magnetisation, tunnelling between vacua in field theory and the decay of a metastable state (bounce solutions) are all computed this way, and the instanton action supplies the exponential suppression while the prefactor comes from fluctuations around it.',
          'Semiclassical methods also reveal when tunnelling is not the whole story. At finite temperature, thermal activation competes with tunnelling, and the crossover appears as a change in the dominant imaginary-time solution. Below a crossover temperature quantum processes dominate; above it the system hops over the barrier. Experiments on Josephson junctions and molecular magnets map this crossover directly.',
          'The picture is approximate but remarkably robust. In systems with dissipation the instanton action acquires a contribution from the environment, suppressing tunnelling as friction grows — the Caldeira–Leggett prediction, confirmed in tunnel junctions and in the motion of flux vortices. That interplay between coherence and environment is a recurring theme across mesoscopic physics.'
        ]
      },
      {
        id: 'tunnelling-time', title: 'How long does tunnelling take?', group: 'theory', paragraphs: [
          'The question of tunnelling time is surprisingly subtle. A particle does not traverse a barrier on a classical schedule, and naive timing arguments can suggest speeds greater than light. The resolution is that the relevant quantities are phase and amplitude, not trajectories: the phase of the transmitted wave shifts with barrier parameters, and that shift defines a group delay.',
          'Several genuinely distinct times exist and they differ. The phase time can become very small for thin barriers, giving the appearance of superluminal transit; the dwell time measures how long probability density is actually present inside the barrier and is always positive and reasonable; the Büttiker–Landauer time follows from modulating the barrier and watching the response; and the Larmor-clock time uses spin precession to measure the interaction duration.',
          'Experiments with attosecond-strength fields and with spin-tagged tunnelling ions have resolved parts of this picture and confirmed that the dwell time is the physically meaningful duration inside the barrier. Claims of superluminal signalling always turn out to involve reshaping of a pulse rather than propagation of its front, which is why no information can be transferred faster than light.',
          'The practical upshot is that tunnelling is best described as a scattering phase problem. What matters for devices is the transmission amplitude and its dependence on energy, bias and barrier shape, and those are measurable — whereas the intermediate-time picture depends on which operational question is being asked.'
        ]
      },
      {
        id: 'tunnelling-chemistry',
        title: 'Tunnelling in chemistry and biology',
        group: 'applications',
        paragraphs: [
          'Hydrogen transfer is the archetype of chemical tunnelling. Because the tunnelling probability depends exponentially on mass, replacing hydrogen with deuterium changes reaction rates by large factors — kinetic isotope effects of ten or more at room temperature are hard to explain any other way, and they are a standard diagnostic for a tunnelling contribution.',
          'In enzymes the effect can be even more pronounced. Some hydride and proton transfers show isotope effects far beyond the semiclassical maximum, and their temperature dependence flattens at low temperature, exactly as expected when the reaction proceeds by tunnelling from the lowest vibrational level. Enzymes appear to have evolved to tune donor–acceptor distances to make such paths accessible.',
          'Astonishing cases exist. Methylamine dehydrogenase and soybean lipoxygenase display isotope effects exceeding 80, implying extremely narrow effective barriers. Theoretical treatments combining instanton theory with molecular dynamics reproduce these values, though the attribution of such large effects to protein motion rather than to local geometry remains debated.',
          'Tunnelling also matters in electron-transfer chemistry, in photosynthesis and respiration where electrons hop between redox centres, and in astrochemistry where reactions such as hydrogen addition to interstellar grains proceed at rates only explicable by quantum tunnelling at a few kelvin. In each case the exponential sensitivity of the rate to barrier shape is what makes the effect detectable.'
        ]
      }
    ],
    glossary: [
      { term: 'Instanton', definition: 'A finite-action solution of the imaginary-time equations of motion that dominates a tunnelling amplitude.' },
      { term: 'Dwell time', definition: 'The average time probability density spends inside a barrier region during tunnelling.' },
      { term: 'Kinetic isotope effect', definition: 'The ratio of reaction rates for hydrogen and deuterium, a diagnostic for tunnelling contributions.' }
    ]
  },

  'schrodinger-equation': {
    sections: [
      {
        id: 'variational',
        title: 'Variational principles and approximation schemes',
        group: 'mathematics',
        paragraphs: [
          'The time-independent equation has a variational character: the energy functional E[ψ] = ⟨ψ|H|ψ⟩/⟨ψ|ψ⟩ is stationary at every eigenstate and has its global minimum at the ground state. Any normalised trial function therefore gives an upper bound on the ground-state energy, and minimising over a parameterised family of trial functions is the basis of the variational method.',
          'Perturbation theory complements it. Splitting H = H₀ + λV and expanding in λ gives the familiar corrections, valid when the perturbation is weak relative to level spacings. Degenerate perturbation theory requires diagonalising V within the degenerate subspace, and the breakdown of the expansion signals either strong coupling or a near-degeneracy, both of which need non-perturbative treatment.',
          'For strong fields the alternatives include WKB, the variational method, exact diagonalisation in a truncated basis, and numerical propagation. Each trades generality for accuracy in a specific regime; the art of the subject is recognising which regime a problem occupies, usually by comparing a level spacing with a coupling strength or a potential length scale with a de Broglie wavelength.',
          'Basis-set choices carry much of the practical weight. Localised Gaussian functions suit molecules, plane waves suit periodic solids, and finite elements suit irregular geometries. Convergence checks against basis size are mandatory, since a well-converged calculation and a plausible-looking one are often indistinguishable without them.'
        ]
      },
      {
        id: 'relativistic',
        title: 'Relativity, spin and where the equation breaks down',
        group: 'theory',
        paragraphs: [
          'The Schrödinger equation is non-relativistic: it treats time and space asymmetrically and has no upper bound on propagation speed. The first repair, the Klein–Gordon equation, is second order in time and describes spinless particles; the Dirac equation is first order and, by requiring a consistent square root of the energy–momentum relation, forces the appearance of spin and antimatter.',
          'These equations reveal that spin is not an add-on. A relativistic wave equation for a charged particle must transform covariantly under Lorentz transformations, and the minimal representation that does so for a fermion automatically contains two components that behave as spin-½ and two that correspond to the antiparticle. Antimatter is thus a consequence of combining quantum theory with relativity, not an extra postulate.',
          'The single-particle picture nonetheless fails at high energy, because particle number is not conserved once E = mc² is available. Pairs can be created, and a wave equation for one particle cannot describe that. The correct framework is quantum field theory, where the fields are operators and particles are excitations; the Dirac equation survives there as the equation of motion for the electron field.',
          'Non-relativistic quantum mechanics therefore sits inside a wider structure, valid when typical energies are small compared with rest masses. That is why the Schrödinger equation remains the working tool for chemistry and condensed matter: the corrections are calculable and small, and the conceptual difficulties of field theory are safely quarantined.'
        ]
      },
      {
        id: 'open-systems',
        title: 'Open systems and effective descriptions',
        group: 'applications',
        paragraphs: [
          'No system is truly isolated. A realistic description couples the system of interest to an environment with many degrees of freedom and then traces it out, replacing the Schrödinger equation for a pure state with an equation for the reduced density matrix. The Lindblad form adds terms that generate decoherence and relaxation while preserving positivity and trace, and it is the workhorse of quantum optics and quantum information.',
          'Non-Hermitian effective Hamiltonians offer a complementary view. Adding complex energies to model decay gives eigenvalues whose imaginary parts are lifetimes, and engineering the gain and loss of an optical or acoustic system can produce degeneracies where eigenvalues and eigenvectors coalesce — exceptional points. Around them, the response to small perturbations is anomalously large, which is why they are used in sensors.',
          'The master-equation approach also quantifies when quantum effects survive. Because decoherence rates scale with the number of environmental channels coupled, mesoscopic systems decohere quickly unless engineered for isolation, and that tension shapes the design of every qubit, atom interferometer and optomechanical device: strong coupling to a controlled channel for readout, weak coupling to everything else.',
          'Effective descriptions emerge at every level. Nuclear structure is modelled with nucleons interacting through effective forces derived from QCD; superconductivity with a pairing Hamiltonian; polaritons with a two-level model. The Schrödinger equation is exact as a framework, but what it is applied to is always a model, chosen by the energy scale of interest.'
        ]
      }
    ],
    glossary: [
      { term: 'Variational method', definition: 'Minimising the energy functional over trial wavefunctions to bound the ground-state energy from above.' },
      { term: 'Dirac equation', definition: 'A first-order relativistic wave equation whose solutions automatically carry spin and antiparticles.' },
      { term: 'Lindblad equation', definition: 'The general Markovian master equation for a reduced density matrix, including decoherence and relaxation.' }
    ]
  }
};