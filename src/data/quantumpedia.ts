import type { ArticleRow, Subject, TopicRow } from "@/lib/content";

export const QUANTUM_SUBJECT: Subject = {
  id: "sub-quantum",
  slug: "quantum",
  title: "Quantum",
  description:
    "Quantum science, physics, mechanics, computing, biology and the theories that describe quantum systems.",
  icon: "Atom",
  image_key: "sci-physics",
  image_url: null,
  sort: 9,
};

export const QUANTUM_TOPICS: TopicRow[] = [
  {
    id: "broad-topic-quantum-science-and-theory",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-science-and-theory",
    title: "Quantum Science & Theory",
    blurb: "The broad scientific and theoretical foundations of quantum phenomena, information and technology.",
    body: "The broad scientific and theoretical foundations of quantum phenomena, information and technology.",
    image_url: null,
    sort: 1,
  },
  {
    id: "broad-topic-quantum-physics",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-physics",
    title: "Quantum Physics",
    blurb: "Physical phenomena governed by quantisation, superposition, uncertainty, measurement and quantum fields.",
    body: "Physical phenomena governed by quantisation, superposition, uncertainty, measurement and quantum fields.",
    image_url: null,
    sort: 2,
  },
  {
    id: "broad-topic-quantum-computing",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-computing",
    title: "Quantum Computing",
    blurb: "Qubits, quantum circuits, algorithms, hardware, benchmarking and applications of quantum information processing.",
    body: "Qubits, quantum circuits, algorithms, hardware, benchmarking and applications of quantum information processing.",
    image_url: null,
    sort: 3,
  },
  {
    id: "broad-topic-quantum-mechanics",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-mechanics",
    title: "Quantum Mechanics",
    blurb: "The mathematical framework used to describe states, observables, dynamics, measurement and microscopic systems.",
    body: "The mathematical framework used to describe states, observables, dynamics, measurement and microscopic systems.",
    image_url: null,
    sort: 4,
  },
  {
    id: "broad-topic-quantum-biology",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-biology",
    title: "Quantum Biology",
    blurb: "Research into quantum effects and mechanisms in biological systems, including photosynthesis, sensing and molecular processes.",
    body: "Research into quantum effects and mechanisms in biological systems, including photosynthesis, sensing and molecular processes.",
    image_url: null,
    sort: 5,
  },
];

type QSection = {
  heading: string;
  paragraphs: string[];
  cards?: { title: string; text: string }[];
};

const article = (
  id: string,
  title: string,
  excerpt: string,
  topic: string,
  minutes: number,
  sections: QSection[],
  sourceUrl: string,
): ArticleRow => ({
  id: `quantumpedia-${id}`,
  slug: `quantumpedia-${id}`,
  title,
  excerpt,
  body: JSON.stringify({
    version: 2,
    tags: ["QuantumPedia", "Quantum", "Ted's Lab"],
    facts: [
      { label: "Subject", value: "Quantum" },
      { label: "Topic", value: QUANTUM_TOPICS.find((t) => t.slug === topic)?.title ?? topic },
      { label: "Source", value: "QuantumPedia" },
      { label: "Format", value: "Expanded source-context edition" },
    ],
    overview: [excerpt, "This Ted's Lab article preserves the major context, structure and learning points of the corresponding QuantumPedia article while presenting them in Ted's Lab's own study format."],
    sections: sections.map((s) => ({
      heading: s.heading,
      paragraphs: s.paragraphs,
      cards: s.cards,
    })),
    references: [`QuantumPedia — ${title} — ${sourceUrl}`],
  }),
  minutes,
  tone: "scientific",
  subject_slug: "quantum",
  section_slug: null,
  topic_slug: topic,
  image_key: "sci-physics",
  image_url: null,
  video_url: null,
  published: true,
  status: "published",
  sort: 200,
});

export const QUANTUMPEDIA_ARTICLES: ArticleRow[] = [
  article(
    "qpu-benchmarking",
    "Quantum Process Unit (QPU) Benchmarking: A Comparative Analysis",
    "A detailed survey of how quantum processors are measured and compared, from Quantum Volume and randomized benchmarking to application-oriented and hardware-specific benchmark suites.",
    "quantum-computing",
    11,
    [
      {
        heading: "Why quantum computers need benchmarking",
        paragraphs: [
          "Quantum computing is developing through many different hardware approaches, so the number of qubits alone does not provide a complete picture of processor capability. Benchmarking runs defined circuits or workloads and measures how reliably and effectively a quantum system performs them.",
          "The QuantumPedia article places benchmarking in the context of a rapidly developing field where processors differ in qubit quality, connectivity, gate and measurement errors, crosstalk, compiler efficiency and the kinds of circuits they can execute. A useful benchmark therefore needs to expose more than one dimension of performance.",
        ],
        cards: [
          { title: "Quantum Volume", text: "A single-number metric combining factors such as qubit count, gate and measurement errors, connectivity and compiler performance. Higher Quantum Volume indicates a more capable system under that benchmark." },
          { title: "Randomized Benchmarking", text: "Random quantum-gate sequences followed by their inverses can be used to estimate average gate error without requiring full state or measurement tomography." },
          { title: "Application-oriented tests", text: "Benchmarks can be designed around useful workloads so that a processor is evaluated against tasks closer to real applications rather than only abstract circuit performance." },
        ],
      },
      {
        heading: "Benchmarking approaches highlighted by QuantumPedia",
        paragraphs: [
          "The source surveys several approaches. Sandia National Laboratories' mirror-circuit technique turns quantum programs into predictable mirror circuits, allowing processor behaviour to be examined across different circuit structures.",
          "Atos's Q-score focuses on practical combinatorial optimisation problems such as the Travelling Salesman Problem and Max-Cut. QED-C's application-oriented suite evaluates quantum computers against application-driven workloads, while the SupermarQ ecosystem and MQT Bench provide additional ways to assess diverse quantum tasks and architectures.",
          "The article also discusses the BACQ initiative, which aims to combine technical measurements with user-oriented multi-criteria benchmarks and application domains including quantum simulation, linear systems, optimisation and factorisation.",
        ],
      },
      {
        heading: "What benchmarking tells us",
        paragraphs: [
          "No single benchmark completely describes a quantum computer. A processor can perform strongly on one circuit family and poorly on another because connectivity, noise, compilation and the structure of the workload interact.",
          "The central lesson is that benchmarking is not merely a leaderboard exercise. It helps researchers identify weaknesses, compare technologies fairly, guide hardware development and judge whether a quantum system is becoming useful for real problems.",
        ],
        cards: [
          { title: "Study question", text: "Why can two processors with similar qubit counts have very different practical performance?" },
          { title: "Key distinction", text: "A benchmark measures a defined workload; it does not prove that a processor is universally faster than classical computers." },
          { title: "Research connection", text: "Benchmarking links hardware engineering, quantum algorithms, compilers and real-world applications." },
        ],
      },
      {
        heading: "References and source context",
        paragraphs: [
          "The QuantumPedia source points readers to research on measuring quantum-computer capabilities, application-oriented performance benchmarks, quantum-computer benchmarking, MQT Bench and QASMBench.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-process-unit-qpu-benchmarking-a-comparative-analysis-89a6e7b1b447",
  ),
  article(
    "quantum-warfare",
    "Will Quantum Technology Transform the Nature of Warfare?",
    "A broad review of potential military uses of quantum computing, sensing, navigation, communications and electronic warfare, together with security, ethical and policy questions.",
    "quantum-science-and-theory",
    15,
    [
      {
        heading: "Quantum technology as a dual-use field",
        paragraphs: [
          "Quantum technology is presented as a dual-use field: the same scientific advances can have civilian and defence applications. The QuantumPedia article frames this as a reason for governments, researchers and security organisations to examine both technical capability and wider consequences.",
          "Rather than treating quantum warfare as a single technology, the source maps several areas in which quantum systems could influence military operations, including computing, sensing, communications, navigation, intelligence and electronic warfare.",
        ],
        cards: [
          { title: "Quantum computing", text: "Potential applications include cryptography, optimisation and analysis of complex problems, although useful large-scale advantage depends on hardware and algorithmic progress." },
          { title: "Quantum sensing", text: "Quantum magnetometers and related sensors can offer very high sensitivity for detecting magnetic or other physical signals." },
          { title: "Quantum navigation", text: "Quantum accelerometers, gyroscopes and magnetometers could support positioning and navigation when GPS or other external signals are unavailable." },
        ],
      },
      {
        heading: "Sensing, mapping and navigation",
        paragraphs: [
          "Quantum magnetometry is discussed as a possible tool for detecting subtle magnetic signatures. The article gives military examples such as submarine detection, landmine and unexploded-ordnance detection, and identification of concealed infrastructure or vehicles.",
          "Quantum underground and underwater mapping can combine quantum gravimeters and magnetometers to detect small gravitational or magnetic anomalies associated with tunnels, facilities or other structures.",
          "Quantum navigation is described as especially relevant to GPS-denied environments. Highly sensitive quantum instruments could provide measurements of motion, rotation and magnetic fields that help vehicles and vessels maintain positioning without depending entirely on satellite signals.",
        ],
      },
      {
        heading: "Communications and electronic warfare",
        paragraphs: [
          "Quantum communications and Quantum Key Distribution are presented as possible ways of strengthening the security of sensitive communications. The source also discusses quantum electronic warfare, where quantum techniques could influence how electromagnetic information is detected, protected or manipulated.",
          "These possibilities do not automatically translate into deployable military systems. The article emphasises technology-development timelines, technical challenges and the need for security assessment, ethical frameworks and policy discussion.",
        ],
      },
      {
        heading: "Strategic and ethical implications",
        paragraphs: [
          "The concept of quantum warfare raises questions beyond engineering: how should states respond to new sensing and cryptographic capabilities, how should dual-use research be governed, and how can international security be maintained while technologies mature?",
          "Quantum technology may change military capabilities incrementally rather than through one sudden transformation. Understanding the distinction between demonstrated capability, emerging research and long-term possibility is therefore essential when evaluating claims about quantum warfare.",
        ],
      },
    ],
    "https://quantumpedia.uk/will-quantum-technology-transform-the-nature-of-warfare-e1d835e5d182",
  ),
  article(
    "brief-history-quantum-computing",
    "A Brief History of Quantum Computing",
    "A historical journey from the foundations of quantum theory through the emergence of quantum information, major algorithms and the race to build practical quantum computers.",
    "quantum-computing",
    14,
    [
      {
        heading: "The theoretical foundations: 1900–1980",
        paragraphs: [
          "Quantum computing grew out of developments in quantum mechanics rather than appearing as an isolated computer-science invention. The QuantumPedia history begins with Max Planck's 1900 quantum hypothesis, Einstein's work on the photoelectric effect, Bohr's quantised atomic model and Heisenberg's uncertainty principle.",
          "The source also highlights the EPR paradox, Bell inequalities and John von Neumann's mathematical framework for quantum mechanics. Together these developments established the physical and mathematical language later used to reason about quantum information.",
        ],
      },
      {
        heading: "The emergence of quantum computing: 1980–1994",
        paragraphs: [
          "By the early 1980s, physicists and computer scientists were explicitly asking how quantum mechanics could be used for computation. The source identifies the 1980 PhysComp conference as an important interdisciplinary milestone.",
          "Richard Feynman's work on simulating quantum systems and David Deutsch's formulation of a universal quantum computer helped establish the idea that quantum mechanics could be treated as a computational resource rather than only as a physical theory.",
        ],
      },
      {
        heading: "The algorithmic revolution: 1994–2000",
        paragraphs: [
          "The development of quantum algorithms changed the field dramatically. Shor's 1994 factoring algorithm demonstrated a potential quantum advantage for a problem central to public-key cryptography, while Grover's search algorithm later showed a quadratic advantage for unstructured search.",
          "These algorithms made the promise of quantum computing concrete: quantum computers were not simply unusual physical simulators, but could in principle perform computational tasks with different complexity characteristics from classical machines.",
        ],
      },
      {
        heading: "From prototypes to modern processors",
        paragraphs: [
          "The following decades brought multiple hardware approaches, including superconducting circuits, trapped ions and other physical implementations. D-Wave's quantum-annealing systems, the development of programmable gate-model processors and increasingly sophisticated control and error-mitigation techniques all became part of the broader race to build useful machines.",
          "The QuantumPedia timeline also discusses Google's 2019 Sycamore experiment, which demonstrated a computational task that was designed to be difficult for classical simulation. The article presents this as an important milestone while noting that major challenges remained.",
        ],
      },
      {
        heading: "The continuing challenge",
        paragraphs: [
          "The modern field still faces problems including short qubit coherence times, noise, scaling, fault-tolerant architectures and practical quantum error correction. Companies, universities and research organisations continue to develop hardware, algorithms and software ecosystems.",
          "The history therefore does not end with one demonstration of quantum advantage. The continuing question is how to turn controlled quantum effects into reliable, scalable machines that solve useful problems.",
        ],
      },
    ],
    "https://quantumpedia.uk/a-brief-history-of-quantum-computing-e0bbd05893d0",
  ),
  article(
    "bernstein-vazirani",
    "Quantum Algorithm (6): Bernstein-Vazirani Algorithm",
    "The Bernstein-Vazirani algorithm identifies a hidden bit string with a single oracle query, illustrating superposition and phase kickback.",
    "quantum-computing",
    7,
    [
      {
        heading: "The hidden-string problem",
        paragraphs: [
          "The Bernstein-Vazirani problem asks a quantum computer to discover a hidden binary string encoded in a black-box function. The algorithm was proposed by Ethan Bernstein and Umesh Vazirani in 1992.",
          "The important feature is the query complexity: the quantum algorithm can identify the hidden string with one query to the oracle, whereas a classical deterministic approach must learn the bits individually and therefore requires multiple queries.",
        ],
      },
      {
        heading: "Superposition and phase kickback",
        paragraphs: [
          "The algorithm prepares the input qubits in a superposition of all possible bit strings. The oracle then encodes information about the hidden string into phases rather than simply changing the visible computational-basis values.",
          "Phase kickback is central to the construction. The oracle's interaction with an auxiliary qubit causes the hidden string to appear as a pattern of relative phases on the input register. Hadamard gates then convert that phase information into measurable computational-basis information.",
        ],
        cards: [
          { title: "Superposition", text: "Many possible input strings are represented simultaneously in the quantum state." },
          { title: "Oracle", text: "The black-box function encodes the hidden string into the phase of the state." },
          { title: "Measurement", text: "Interference converts the phase pattern into the hidden string that can be read from the output." },
        ],
      },
      {
        heading: "Why the algorithm matters",
        paragraphs: [
          "Bernstein-Vazirani is not primarily important because hidden strings are a common practical task. Its value is pedagogical and theoretical: it provides a compact demonstration of how quantum phase information, superposition and interference can change the query complexity of a problem.",
          "It also provides a bridge to more advanced quantum algorithms in which phase kickback and oracle constructions play important roles.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-6-bernstein-vazirani-algorithm-f371ea83256e",
  ),
  article(
    "hhl-linear-systems",
    "Quantum Algorithm (4): HHL Algorithm for Linear Systems of Equations",
    "The HHL algorithm encodes a linear system into quantum states and uses quantum operations to estimate information about its solution.",
    "quantum-computing",
    8,
    [
      {
        heading: "The linear-system problem",
        paragraphs: [
          "Many scientific and engineering problems can be written as a system of linear equations Ax=b. Classical numerical methods are widely used, but large systems can become expensive to solve or manipulate.",
          "The HHL algorithm, named after Harrow, Hassidim and Lloyd, approaches the problem through quantum state preparation, phase estimation, controlled operations and measurement. Its goal is not necessarily to output every component of the classical solution vector, but to encode useful information about the solution in a quantum state.",
        ],
      },
      {
        heading: "How HHL approaches the problem",
        paragraphs: [
          "The input vector b is encoded as a quantum state. Quantum phase estimation is used to learn information about the eigenvalues of the matrix A, after which controlled operations apply factors related to the inverse eigenvalues. The resulting state contains information proportional to A⁻¹b.",
          "The source illustrates the method with a small matrix and vector and discusses obtaining a quantum state representing the solution. This is an important distinction: the algorithm's speedup claims depend on how the input is loaded, what output is required and the mathematical properties of the matrix.",
        ],
        cards: [
          { title: "Input", text: "A matrix A and vector b define the linear system Ax=b." },
          { title: "Quantum state", text: "The vector b is encoded into a quantum state and the matrix's spectral information is accessed through quantum operations." },
          { title: "Output", text: "Measurement extracts information about the encoded solution rather than automatically printing every classical component." },
        ],
      },
      {
        heading: "Speedup and limitations",
        paragraphs: [
          "Quantum complexity can provide dramatic theoretical advantages for certain classes of sparse, well-conditioned systems, but those advantages do not mean every linear equation is automatically solved faster on a quantum computer.",
          "Input preparation, conditioning, sparsity, precision and the cost of extracting the desired result are all important. HHL is therefore best understood as a landmark quantum algorithm and a framework for quantum linear algebra, not a universal replacement for classical numerical methods.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-4-hhl-algorithm-for-linear-systems-of-equations-40619daec41d",
  ),
  article(
    "vqe-quantum-chemistry",
    "Quantum Algorithm (7): Variational Quantum Eigensolver Algorithm for Quantum Chemistry",
    "VQE is a hybrid quantum-classical method for estimating molecular ground-state energies and exploring quantum chemistry on noisy quantum devices.",
    "quantum-computing",
    9,
    [
      {
        heading: "Why quantum chemistry matters",
        paragraphs: [
          "Quantum chemistry requires understanding the electronic structure of molecules and materials. The Schrödinger equation provides the underlying description, but solving it exactly becomes difficult as molecular systems grow.",
          "Classical approaches such as Hartree-Fock and density functional theory are powerful approximations, yet strongly correlated systems can remain challenging. VQE was developed as a way to combine a quantum processor's ability to represent quantum states with a classical optimiser's ability to search parameter space.",
        ],
      },
      {
        heading: "The VQE feedback loop",
        paragraphs: [
          "VQE begins by choosing a parameterised quantum circuit, or ansatz, that represents a trial state. The quantum processor prepares the state and measures expectation values of terms in the molecular Hamiltonian.",
          "A classical computer combines those expectation values to estimate the energy. A classical optimisation routine then changes the circuit parameters to reduce the estimated energy. The updated parameters are sent back to the quantum processor and the process repeats until the energy converges.",
        ],
        cards: [
          { title: "1 — Prepare", text: "The QPU prepares a parameterised trial state using the chosen ansatz." },
          { title: "2 — Measure", text: "Expectation values of Hamiltonian terms are estimated from quantum measurements." },
          { title: "3 — Optimise", text: "A classical optimiser updates parameters to lower the estimated energy." },
          { title: "4 — Converge", text: "The loop continues until the energy estimate reaches the desired accuracy." },
        ],
      },
      {
        heading: "Hydrogen and practical implementation",
        paragraphs: [
          "The QuantumPedia article discusses a hydrogen-molecule example and Qiskit Nature implementations. It reports a ground-state energy near -1.8677 Hartrees for the illustrated configuration and explains the role of estimator primitives in evaluating expectation values.",
          "The article also discusses advantages such as hybrid resource use and adaptability, while noting limitations including ansatz choice, optimiser behaviour, noise, finite qubit counts and limited coherence times.",
        ],
      },
      {
        heading: "Where VQE fits",
        paragraphs: [
          "VQE is particularly associated with near-term quantum devices because it does not require the same depth as some fully fault-tolerant algorithms. Its importance lies in the architecture of the hybrid loop: quantum hardware evaluates a quantum state while classical computation performs the optimisation.",
          "Future progress depends on better ansatz design, optimisation, error mitigation, error correction and hardware. The broader goal is to use this approach for molecular simulation, materials science, drug discovery and related scientific problems.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-7-variational-quantum-eigensolver-algorithm-for-quantum-chemistry-23a4f9aa73b3",
  ),
  article(
    "quantum-annealing",
    "Quantum Algorithm (5): Quantum Optimization Algorithm — Quantum Annealing",
    "Quantum annealing maps optimisation problems onto physical energy landscapes and seeks low-energy configurations using quantum dynamics.",
    "quantum-computing",
    8,
    [
      {
        heading: "Optimisation as an energy problem",
        paragraphs: [
          "Quantum annealing is designed around optimisation problems. The central idea is to map the possible solutions of a problem onto states of a physical system, then guide that system toward a low-energy state corresponding to a good or optimal solution.",
          "The QuantumPedia article uses a simple analogy of interacting magnets. Different orientations have different energies, and the configuration with the lowest energy represents the desired solution.",
        ],
      },
      {
        heading: "From qubits to a Hamiltonian",
        paragraphs: [
          "In a quantum annealer, the physical variables are represented by qubits. The optimisation objective is encoded in a Hamiltonian, a mathematical description of the system's energy structure.",
          "By changing the Hamiltonian gradually, the system is intended to evolve toward a low-energy state. The practical challenge is maintaining the desired quantum behaviour while controlling noise, temperature, connectivity and other hardware constraints.",
        ],
        cards: [
          { title: "QUBO", text: "Quadratic Unconstrained Binary Optimisation expresses an objective using binary variables that take values 0 or 1." },
          { title: "Ising model", text: "A model of interacting spins that can be related to optimisation by mapping spin configurations to candidate solutions." },
          { title: "Ground state", text: "The lowest-energy configuration of the encoded system represents an optimisation solution." },
        ],
      },
      {
        heading: "D-Wave and quantum annealing hardware",
        paragraphs: [
          "The source discusses D-Wave quantum annealers, which use superconducting qubits and are designed for optimisation problems. The machines operate at extremely low temperatures to control noise and maintain the relevant quantum behaviour.",
          "The article also contrasts quantum annealing with Fujitsu's Digital Annealer. A Digital Annealer is quantum-inspired rather than a quantum computer: it uses a classical architecture specialised for certain optimisation problems.",
        ],
      },
      {
        heading: "Where annealing fits in quantum computing",
        paragraphs: [
          "Quantum annealing is different from the gate-model approach used by algorithms such as Shor, Grover and VQE. Rather than executing a general sequence of quantum gates to implement an arbitrary algorithm, annealing hardware is specialised around energy-based optimisation.",
          "The key learning point is that 'quantum computer' does not describe one architecture. Gate-model processors and quantum annealers use quantum effects in different computational models and are suited to different classes of problems.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-5-quantum-optimization-algorithm-quantum-annealing-279b64ae3ac9",
  ),
  article(
    "deutsch-jozsa",
    "Quantum Algorithm (3): Deutsch-Jozsa Algorithm",
    "The Deutsch-Jozsa algorithm determines whether a black-box Boolean function is constant or balanced using a single oracle query in the ideal quantum model.",
    "quantum-computing",
    9,
    [
      {
        heading: "The Deutsch-Jozsa problem",
        paragraphs: [
          "The Deutsch-Jozsa problem considers a Boolean function that is promised to be either constant, meaning it gives the same output for every input, or balanced, meaning it gives each output value equally often.",
          "A classical deterministic algorithm may need many oracle queries to establish which case applies. The quantum algorithm uses superposition and interference to determine the answer with one oracle query in the idealised model.",
        ],
      },
      {
        heading: "Superposition, oracle and interference",
        paragraphs: [
          "The circuit begins by placing the input register into a superposition. The oracle acts on that superposition and encodes information about the function into the phases of the amplitudes.",
          "Hadamard transformations then cause amplitudes associated with different possibilities to interfere. The measurement result reveals whether the function was constant or balanced.",
        ],
        cards: [
          { title: "Constant", text: "Every input produces the same output." },
          { title: "Balanced", text: "Half of the possible inputs produce one output and half produce the other." },
          { title: "Quantum advantage", text: "One oracle query is sufficient in the ideal model, illustrating how interference can reduce query complexity." },
        ],
      },
      {
        heading: "From theory to hardware",
        paragraphs: [
          "The QuantumPedia article includes a Qiskit implementation and discusses results from an IBM quantum computer. The ideal algorithm produces a clean answer, while a real noisy device can show additional states in the measurement histogram.",
          "This difference is important for students: an algorithm can be mathematically correct while a physical implementation still produces errors because real qubits and gates are imperfect.",
        ],
      },
      {
        heading: "Why Deutsch-Jozsa matters",
        paragraphs: [
          "Deutsch-Jozsa is often taught because its circuit is compact but contains several central ideas of quantum computing: superposition, oracle access, phase kickback, interference and measurement.",
          "It is also a stepping stone toward more advanced quantum algorithms, where the same ideas are combined with more sophisticated problem structures.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-3-deutsch-jozsa-algorithm-f242d3d859bc",
  ),
  article(
    "grover-search",
    "Quantum Algorithm (2): Grover's Algorithm for Unstructured Search",
    "Grover's algorithm uses amplitude amplification to search an unstructured space in approximately square-root time, providing a quadratic query advantage.",
    "quantum-computing",
    8,
    [
      {
        heading: "The search problem",
        paragraphs: [
          "Suppose one item is marked inside an unsorted database of N possibilities. A classical linear search may require O(N) queries in the worst case. Grover's algorithm reduces the query complexity to approximately O(√N).",
          "Lov Grover proposed the algorithm in 1996 while working at Bell Labs. The result became a foundational example of a quantum algorithm that offers a provable speedup over classical unstructured search.",
        ],
      },
      {
        heading: "How amplitude amplification works",
        paragraphs: [
          "The algorithm first prepares a uniform superposition of candidate states. An oracle identifies the desired state by changing its phase, while leaving the other candidates unchanged.",
          "A diffusion operation then reflects the amplitudes about their average. Repeating the oracle and diffuser increases the amplitude of the marked state and decreases the relative amplitudes of the others. After a suitable number of iterations, measurement is likely to return the desired item.",
        ],
        cards: [
          { title: "Oracle", text: "Marks the solution state by applying a phase change." },
          { title: "Diffuser", text: "Amplifies the marked state's amplitude through inversion about the mean." },
          { title: "Iteration", text: "Repeated oracle–diffuser rounds concentrate probability on the solution." },
        ],
      },
      {
        heading: "The mathematics of the Grover operator",
        paragraphs: [
          "The source introduces the Grover operator as G = 2|s><s| − I, where |s⟩ is the uniform superposition and I is the identity operator. This reflection-based description explains why the amplitudes rotate toward the marked state.",
          "The number of iterations matters. Too few iterations leave the solution amplitude too small, while too many can rotate the state past the optimal measurement point.",
        ],
      },
      {
        heading: "Applications and limits",
        paragraphs: [
          "Grover's algorithm has been discussed for data retrieval, cryptography and as a building block for other quantum techniques. Its quadratic advantage is meaningful, but it is not an exponential speedup and does not make every search problem instant.",
          "The algorithm also assumes an oracle that can be implemented efficiently. Designing that oracle for a real problem can be the hardest part of translating the abstract algorithm into a useful quantum program.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-2-grovers-algorithm-for-unstructured-search-bd91a7040371",
  ),
  article(
    "shor-part-2",
    "Quantum Algorithm (1): Shor's Algorithm for Factorization — Part 2",
    "A deeper look at Shor's period-finding approach, the quantum Fourier transform and the circuit techniques used to factor integers.",
    "quantum-computing",
    8,
    [
      {
        heading: "Why factorisation matters",
        paragraphs: [
          "Shor's algorithm, proposed by Peter Shor in 1994, is one of the most important quantum algorithms because efficient integer factorisation would threaten public-key cryptographic systems based on the difficulty of factoring large numbers.",
          "The key insight is that factoring can be reduced to finding the period of a modular arithmetic function. Quantum computation provides an efficient way to estimate that period using the quantum Fourier transform.",
        ],
      },
      {
        heading: "Period finding",
        paragraphs: [
          "For a chosen integer a that is coprime to N, Shor's algorithm considers f(x)=a^x mod N. The period r is the smallest positive integer for which a^r mod N = 1.",
          "A quantum circuit creates a superposition of inputs, applies modular exponentiation and then uses the QFT to reveal frequency information related to the period. Measurement produces an estimate that is processed classically to recover r.",
        ],
      },
      {
        heading: "The quantum Fourier transform",
        paragraphs: [
          "The QFT is a reversible transformation between computational-basis information and frequency-domain information. In Shor's algorithm it is used to make the hidden periodic structure observable through interference and measurement.",
          "The source discusses the inverse QFT and controlled modular multiplication as important pieces of a practical circuit. A small demonstration can factor 15, but scaling the same approach to cryptographically relevant numbers requires fault-tolerant quantum hardware far beyond small demonstrations.",
        ],
      },
      {
        heading: "From period to factors",
        paragraphs: [
          "Once a suitable even period r is obtained, classical number theory can be used to compute quantities such as gcd(a^(r/2) − 1, N) and gcd(a^(r/2) + 1, N). These values can reveal non-trivial factors of N.",
          "The power of Shor's algorithm therefore comes from a hybrid structure: quantum computation finds the periodic information efficiently, while classical arithmetic completes the factorisation step.",
        ],
      },
      {
        heading: "Why the algorithm is historically important",
        paragraphs: [
          "Shor's algorithm changed expectations about quantum computers by connecting quantum speedup to a concrete problem with major practical consequences. It also helped motivate research into quantum error correction and large-scale fault-tolerant architectures.",
          "The lesson is not that current quantum computers can immediately break modern encryption. The important point is that sufficiently large, error-corrected quantum computers could change the security assumptions behind some widely used cryptographic systems.",
        ],
      },
    ],
    "https://quantumpedia.uk/quantum-algorithm-1-shors-algorithm-for-factorization-part-2-a4f1090d633a",
  ),
  article(
    "quantum-superposition",
    "Quantum Superposition: States, Amplitudes and Interference",
    "An introduction to superposition, probability amplitudes and interference, and why these ideas are central to quantum mechanics and quantum computing.",
    "quantum-mechanics",
    9,
    [
      {
        heading: "What superposition means",
        paragraphs: [
          "A quantum system can be described by a state that is a linear combination of possible basis states. For a qubit, a general pure state can be written as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes.",
          "Superposition does not mean that a measurement simply reveals two classical values at once. Instead, the amplitudes determine the probabilities and phases that govern what happens when the system is measured or allowed to interfere."
        ],
        cards: [
          { title: "Amplitude", text: "A complex number whose magnitude and phase contribute to measurement probabilities and interference." },
          { title: "Probability", text: "For a computational-basis measurement, the probability of an outcome is the squared magnitude of its amplitude." },
          { title: "Interference", text: "Amplitudes can reinforce or cancel one another, changing the probabilities of measurement outcomes." }
        ]
      },
      {
        heading: "Superposition in a qubit",
        paragraphs: [
          "Applying a Hadamard gate to |0⟩ produces the equal superposition (|0⟩ + |1⟩)/√2. Applying another Hadamard returns the state to |0⟩ because the two paths interfere constructively for |0⟩ and destructively for |1⟩.",
          "This simple experiment captures a central principle of quantum computing: useful algorithms manipulate amplitudes so that desired outcomes are amplified while unwanted outcomes cancel."
        ]
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Superposition is one of the mathematical resources used by quantum algorithms, but it should not be described as a simple claim that a quantum computer evaluates every possible answer independently and then reads them all out. Measurement still produces a single outcome for each run.",
          "The computational advantage of a quantum algorithm comes from the full sequence of state preparation, controlled operations, interference and measurement."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-superposition"
  ),
  article(
    "quantum-entanglement",
    "Quantum Entanglement: Correlations Beyond Classical Models",
    "A guide to entangled quantum states, measurement correlations and Bell's theorem, with attention to what entanglement does and does not imply.",
    "quantum-physics",
    10,
    [
      {
        heading: "What is entanglement?",
        paragraphs: [
          "Two or more quantum systems are entangled when their joint state cannot be represented as independent states for each subsystem. A standard example is the Bell state (|00⟩ + |11⟩)/√2.",
          "Measuring one part of an entangled system produces correlations with measurements of the other part. These correlations are stronger than those allowed by broad classes of classical local hidden-variable models."
        ],
        cards: [
          { title: "Joint state", text: "The complete description belongs to the combined system rather than being reducible to separate states." },
          { title: "Correlation", text: "Measurement results can exhibit statistically structured relationships that cannot be reproduced by classical local models." },
          { title: "No faster-than-light messaging", text: "Entanglement correlations do not provide a controllable channel for sending classical information instantaneously." }
        ]
      },
      {
        heading: "Bell's theorem",
        paragraphs: [
          "John Bell showed that certain statistical inequalities must hold for local hidden-variable theories. Quantum mechanics predicts violations of these Bell inequalities for appropriately chosen measurements.",
          "Experiments have repeatedly observed the predicted quantum correlations, making Bell tests a major experimental distinction between quantum theory and local hidden-variable explanations."
        ]
      },
      {
        heading: "Applications",
        paragraphs: [
          "Entanglement is an important resource in quantum teleportation, quantum communication, distributed quantum information and some sensing protocols. Its practical usefulness depends on creating, controlling and preserving entanglement in noisy physical systems."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-entanglement"
  ),
  article(
    "uncertainty-principle",
    "Heisenberg's Uncertainty Principle",
    "An explanation of why certain pairs of quantum observables have intrinsic limits on the precision with which their values can be jointly prepared or predicted.",
    "quantum-mechanics",
    8,
    [
      {
        heading: "The core idea",
        paragraphs: [
          "For position x and momentum p, the uncertainty relation is Δx Δp ≥ ħ/2 for a suitable quantum state. The relation is not simply a statement about poor experimental instruments; it follows from the mathematical structure of quantum observables.",
          "More generally, non-commuting observables obey uncertainty relations connected to their commutator. The principle therefore describes a property of quantum states and measurements."
        ]
      },
      {
        heading: "Why non-commutation matters",
        paragraphs: [
          "Position and momentum are represented by operators that do not commute. This means the order and compatibility of measurements matter, and it leads directly to limits on the spreads of their probability distributions.",
          "The uncertainty principle should be distinguished from the idea that a particle secretly possesses exact classical values that are merely hidden from us. Quantum theory assigns a state and predicts probability distributions for measurements."
        ],
        cards: [
          { title: "Δx", text: "The statistical spread of position outcomes for the chosen quantum state." },
          { title: "Δp", text: "The statistical spread of momentum outcomes for the same state." },
          { title: "ħ", text: "The reduced Planck constant, which sets the scale of quantum effects." }
        ]
      },
      {
        heading: "Physical consequences",
        paragraphs: [
          "Uncertainty relations appear throughout quantum physics, including zero-point motion, confinement, spectroscopy and quantum sensing. They are part of the mathematical framework rather than an optional correction added to classical physics."
        ]
      }
    ],
    "https://quantumpedia.uk/heisenberg-uncertainty-principle"
  ),
  article(
    "quantum-measurement",
    "Quantum Measurement: From State to Outcome",
    "A structured introduction to quantum measurement, observables, probability amplitudes, collapse and the difference between a quantum state and a measurement result.",
    "quantum-mechanics",
    9,
    [
      {
        heading: "State versus outcome",
        paragraphs: [
          "A quantum state contains the information needed to predict probabilities for possible measurements. A measurement produces a particular classical outcome according to those probabilities.",
          "For a qubit in α|0⟩ + β|1⟩, measurement in the computational basis returns 0 with probability |α|² and 1 with probability |β|²."
        ]
      },
      {
        heading: "Observables and bases",
        paragraphs: [
          "Different measurements correspond to different observables and therefore different bases. A state that is definite in one basis can appear as a superposition in another.",
          "This basis dependence is essential to quantum algorithms. Gates change the state before measurement so that interference encodes useful information into the basis in which the final measurement is performed."
        ],
        cards: [
          { title: "Observable", text: "A quantum-mechanical quantity represented by an operator whose possible measurement values are associated with its eigenvalues." },
          { title: "Born rule", text: "The rule connecting quantum amplitudes to probabilities of measurement outcomes." },
          { title: "Post-measurement state", text: "After an ideal projective measurement, the state is described by the outcome's corresponding eigenspace." }
        ]
      },
      {
        heading: "The measurement problem",
        paragraphs: [
          "The relationship between continuous quantum evolution and definite measurement outcomes is one of the foundational interpretive questions in quantum theory. Different interpretations describe this transition differently while agreeing on the standard experimental predictions.",
          "For practical quantum computing, the key engineering concern is controlling when and how measurements occur, because measurement can destroy the coherence needed for subsequent quantum operations."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-measurement"
  ),
  article(
    "quantum-tunnelling",
    "Quantum Tunnelling: Crossing a Classically Forbidden Barrier",
    "An explanation of quantum tunnelling and how wavefunction amplitudes allow particles to appear across barriers that classical mechanics would forbid.",
    "quantum-physics",
    8,
    [
      {
        heading: "The barrier problem",
        paragraphs: [
          "In classical mechanics, a particle with energy lower than a potential barrier cannot cross that barrier. Quantum mechanics describes the particle with a wavefunction, and the wavefunction can extend into and through a finite barrier.",
          "When the barrier is sufficiently thin, a non-zero probability of finding the particle on the other side remains. This phenomenon is quantum tunnelling."
        ]
      },
      {
        heading: "Wavefunction behaviour",
        paragraphs: [
          "Inside a classically forbidden region, the wavefunction generally decreases exponentially rather than becoming exactly zero. The transmitted probability therefore depends strongly on the barrier width and height.",
          "Tunnelling is not a particle accelerating through a barrier in the classical sense. It is a consequence of the quantum state and the boundary conditions imposed by the potential."
        ],
        cards: [
          { title: "Alpha decay", text: "Alpha particles can tunnel through the nuclear potential barrier, providing a classic example of tunnelling in nature." },
          { title: "Scanning tunnelling microscopy", text: "A tunnelling current between a sharp tip and a surface can be used to image matter at very small scales." },
          { title: "Semiconductors", text: "Tunnel junctions and other electronic devices exploit quantum tunnelling in controlled ways." }
        ]
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Tunnelling demonstrates that quantum mechanics changes the meaning of a physically allowed process. It also underpins technologies ranging from tunnel diodes to scanning tunnelling microscopes and contributes to phenomena in nuclear and condensed-matter physics."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-tunnelling"
  ),
  article(
    "quantum-decoherence",
    "Quantum Decoherence: Why Quantum States Lose Their Coherence",
    "A guide to decoherence, environmental interaction and the practical challenge of preserving quantum information in real devices.",
    "quantum-mechanics",
    9,
    [
      {
        heading: "What decoherence means",
        paragraphs: [
          "Quantum coherence refers to stable phase relationships between components of a quantum state. When a quantum system interacts with its environment, information about those phases can become correlated with environmental degrees of freedom.",
          "The reduced state of the system can then lose the interference terms that distinguish a coherent superposition from a classical statistical mixture. This process is called decoherence."
        ]
      },
      {
        heading: "Why environments matter",
        paragraphs: [
          "Real qubits are never perfectly isolated. Thermal fluctuations, electromagnetic noise, material defects, control errors and unwanted coupling to nearby systems can all disturb quantum states.",
          "Decoherence is therefore a central engineering problem. Quantum processors must perform gates and measurements quickly and accurately enough, while maintaining coherence for the duration of the computation."
        ],
        cards: [
          { title: "T1", text: "A commonly used timescale associated with energy relaxation of a qubit." },
          { title: "T2", text: "A commonly used coherence timescale associated with loss of phase coherence." },
          { title: "Isolation", text: "Reducing unwanted coupling to the environment helps preserve quantum information." }
        ]
      },
      {
        heading: "Decoherence and error correction",
        paragraphs: [
          "Quantum error correction does not make physical noise disappear. Instead, information is encoded redundantly across multiple physical qubits so that certain errors can be detected and corrected without directly measuring the logical quantum information.",
          "The long-term goal is fault-tolerant quantum computation, where logical error rates can be reduced sufficiently for large computations to run reliably."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-decoherence"
  ),
  article(
    "quantum-error-correction",
    "Quantum Error Correction: Protecting Fragile Quantum Information",
    "An introduction to logical qubits, stabilizer codes, error syndromes and the role of fault tolerance in scalable quantum computing.",
    "quantum-computing",
    11,
    [
      {
        heading: "Why quantum errors are different",
        paragraphs: [
          "Classical computers can often copy bits directly and use redundancy to recover from errors. Unknown quantum states cannot be copied arbitrarily because of the no-cloning theorem, so quantum error correction requires a different strategy.",
          "A logical qubit is encoded into multiple physical qubits. Carefully chosen measurements reveal an error syndrome without revealing the logical state itself."
        ]
      },
      {
        heading: "Syndromes and correction",
        paragraphs: [
          "Stabilizer-based codes define sets of measurements whose expected values identify classes of errors. The syndrome can then be processed to infer a likely error and apply a correction or update the interpretation of the logical state.",
          "The surface code is a prominent architecture because it uses local interactions on a two-dimensional layout and can, under suitable noise assumptions, support fault-tolerant logical operations."
        ],
        cards: [
          { title: "Physical qubit", text: "A hardware-level quantum system that is directly controlled and measured." },
          { title: "Logical qubit", text: "Quantum information encoded across multiple physical qubits to protect it from errors." },
          { title: "Syndrome", text: "Measurement information that indicates which error pattern may have occurred without directly measuring the encoded state." }
        ]
      },
      {
        heading: "Fault tolerance",
        paragraphs: [
          "Fault tolerance is the broader engineering framework for performing reliable quantum computation even though the underlying components are imperfect. A key threshold idea is that if physical error rates are sufficiently low and the code and architecture are suitable, logical error rates can be reduced through increasing code size.",
          "This is one reason useful large-scale quantum computers are expected to require many physical qubits for each high-quality logical qubit."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-error-correction"
  ),
  article(
    "quantum-fourier-transform",
    "Quantum Fourier Transform: The Frequency Tool Behind Major Algorithms",
    "An introduction to the quantum Fourier transform, its circuit structure and its role in phase estimation and Shor's algorithm.",
    "quantum-computing",
    10,
    [
      {
        heading: "What the QFT does",
        paragraphs: [
          "The quantum Fourier transform maps amplitudes in the computational basis into a Fourier-transformed representation. It is the quantum analogue of a discrete Fourier transform, implemented as a unitary operation.",
          "The transformation can expose periodic structure in a quantum state. This makes it a key component of phase estimation and several quantum algorithms."
        ]
      },
      {
        heading: "Circuit construction",
        paragraphs: [
          "A standard QFT circuit uses Hadamard gates followed by controlled phase rotations, with the order arranged so that information from different qubits contributes to the final phase structure. A final sequence of swaps reverses the qubit order when required.",
          "The exact circuit can be implemented with O(n²) elementary gates for n input qubits, while approximate QFT circuits can omit very small rotations to reduce gate counts."
        ],
        cards: [
          { title: "Hadamard", text: "Creates and recombines superpositions, forming the basic interference structure of the QFT circuit." },
          { title: "Controlled rotation", text: "Adds a phase conditioned on another qubit, allowing relative phase information to be accumulated." },
          { title: "Phase information", text: "The QFT converts periodic phase structure into amplitudes that can be sampled by measurement." }
        ]
      },
      {
        heading: "Why Shor needs it",
        paragraphs: [
          "Shor's algorithm uses the QFT after modular exponentiation to extract information about the period of a function. Classical post-processing then turns the measured information into candidate periods and, ultimately, factors.",
          "The QFT is therefore not an isolated trick: it is part of a larger pattern in quantum algorithms where interference is used to reveal structure that is difficult to access directly."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-fourier-transform"
  ),
  article(
    "quantum-teleportation",
    "Quantum Teleportation: Moving a Quantum State Without Moving the Particle",
    "A step-by-step explanation of quantum teleportation, entanglement, Bell measurements and the classical communication required to reconstruct a quantum state.",
    "quantum-physics",
    10,
    [
      {
        heading: "What is actually teleported?",
        paragraphs: [
          "Quantum teleportation transfers an unknown quantum state from one location to another using a shared entangled pair, a joint measurement and two classical bits of communication. The original state is not physically transported from sender to receiver.",
          "The protocol transfers the state information while the original state is destroyed by the sender's measurement. It therefore does not violate the no-cloning theorem."
        ]
      },
      {
        heading: "The three-part protocol",
        paragraphs: [
          "First, the sender and receiver share an entangled Bell pair. The sender then performs a Bell-basis measurement on the unknown input state and their half of the entangled pair.",
          "The sender communicates the two-bit measurement result classically. The receiver uses that information to apply one of four possible correction operations, recovering the original quantum state up to the fidelity allowed by the physical implementation."
        ],
        cards: [
          { title: "Entanglement", text: "Provides the shared quantum resource needed for the protocol." },
          { title: "Bell measurement", text: "Produces one of four classical outcomes that determine the receiver's correction." },
          { title: "Classical channel", text: "Two classical bits are required, so teleportation cannot send usable information faster than light." }
        ]
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Quantum teleportation is a foundational protocol for quantum networking and distributed quantum information. In a future quantum internet, teleportation-like procedures could help move logical quantum states between network nodes without directly transmitting fragile physical qubits over the entire distance."
        ]
      }
    ],
    "https://quantumpedia.uk/quantum-teleportation"
  ),
  article(
    "bell-theorem",
    "Bell's Theorem and the Limits of Local Hidden Variables",
    "A guide to Bell inequalities, entangled correlations and why experiments can distinguish quantum predictions from local hidden-variable models.",
    "quantum-physics",
    10,
    [
      {
        heading: "The classical question",
        paragraphs: [
          "Before Bell's work, one could ask whether quantum probabilities reflected an incomplete description of underlying classical variables. A local hidden-variable model attempts to explain correlations using pre-existing properties while preserving locality.",
          "Bell's theorem showed that this class of explanations imposes mathematical constraints on observable correlations."
        ]
      },
      {
        heading: "Bell inequalities",
        paragraphs: [
          "A Bell inequality is a bound that must be satisfied by correlations generated by a broad class of local hidden-variable theories. Quantum mechanics predicts violations for particular entangled states and measurement settings.",
          "Experiments choose measurement settings randomly or according to carefully designed protocols and compare the observed correlations with the classical bound. Modern loophole-aware Bell tests have provided strong evidence for the quantum predictions."
        ]
      },
      {
        heading: "What Bell does not prove",
        paragraphs: [
          "Bell's theorem does not establish a simple statement that quantum mechanics permits faster-than-light communication. Standard quantum theory preserves the no-signalling principle: the local statistics available to one observer cannot be controlled to transmit a classical message instantaneously.",
          "The theorem instead constrains the kinds of classical local hidden-variable explanations that can reproduce quantum correlations."
        ],
        cards: [
          { title: "Locality", text: "The assumption that physical influences do not propagate outside the causal structure allowed by relativity." },
          { title: "Hidden variable", text: "An additional variable proposed to complete or explain quantum probabilities in a more classical framework." },
          { title: "Bell violation", text: "An experimentally observed correlation exceeding the bound predicted by local hidden-variable models." }
        ]
      }
    ],
    "https://quantumpedia.uk/bells-theorem"
  ),

];
