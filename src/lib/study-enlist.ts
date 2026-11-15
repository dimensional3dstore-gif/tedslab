export type GradeLevel = {
  grade: number;
  label: string;
  stage: string;
  focus: string;
  subjects: string[];
  examPathways: string[];
};

const coreSubjects = ["English", "Mathematics", "Science", "Humanities", "Digital Technologies", "Health & Physical Education", "The Arts"];
const seniorSubjects = ["English", "Mathematics", "Biology", "Chemistry", "Physics", "Modern History", "Geography", "Economics", "Digital Technologies", "Research & Study Skills"];

export const GRADE_LEVELS: GradeLevel[] = [
  { grade: 1, label: "Grade 1", stage: "Early primary", focus: "Foundational literacy, numeracy, curiosity and learning habits", subjects: coreSubjects, examPathways: ["ICAS introductory practice"] },
  { grade: 2, label: "Grade 2", stage: "Early primary", focus: "Fluency in reading, writing, number and observation", subjects: coreSubjects, examPathways: ["ICAS introductory practice"] },
  { grade: 3, label: "Grade 3", stage: "Primary", focus: "Building independent comprehension, mathematical reasoning and scientific inquiry", subjects: coreSubjects, examPathways: ["NAPLAN Year 3", "ICAS", "AMC foundations"] },
  { grade: 4, label: "Grade 4", stage: "Primary", focus: "Developing multi-step reasoning, research and clear communication", subjects: coreSubjects, examPathways: ["ICAS", "AMC", "OC entry preparation"] },
  { grade: 5, label: "Grade 5", stage: "Primary", focus: "Consolidating upper-primary knowledge and exam confidence", subjects: coreSubjects, examPathways: ["NAPLAN Year 5", "ICAS", "AMC", "OC entry preparation"] },
  { grade: 6, label: "Grade 6", stage: "Primary transition", focus: "Advanced primary concepts, selective-school reasoning and transition readiness", subjects: coreSubjects, examPathways: ["SHSPT preparation", "ICAS", "AMC"] },
  { grade: 7, label: "Grade 7", stage: "Lower secondary", focus: "Disciplinary thinking, algebra, evidence and structured writing", subjects: coreSubjects, examPathways: ["NAPLAN Year 7", "SHSPT practice", "ICAS", "AMC"] },
  { grade: 8, label: "Grade 8", stage: "Lower secondary", focus: "Applying concepts independently and connecting disciplines", subjects: coreSubjects, examPathways: ["ICAS", "AMC", "AMT enrichment"] },
  { grade: 9, label: "Grade 9", stage: "Lower secondary", focus: "Analytical writing, advanced mathematics and scientific models", subjects: coreSubjects, examPathways: ["NAPLAN Year 9", "ICAS", "AMC", "AMT enrichment"] },
  { grade: 10, label: "Grade 10", stage: "Senior secondary foundation", focus: "Year 10 consolidation, subject selection and senior-course readiness", subjects: coreSubjects, examPathways: ["ICAS", "AMC", "AMT enrichment", "ATAR readiness"] },
  { grade: 11, label: "Grade 11", stage: "Senior secondary", focus: "Preliminary senior syllabuses, depth of knowledge and assessment technique", subjects: seniorSubjects, examPathways: ["ATAR pathway", "HSC-style examinations", "AMT enrichment"] },
  { grade: 12, label: "Grade 12", stage: "Senior secondary", focus: "HSC/ATAR course mastery, timed papers and final examination preparation", subjects: seniorSubjects, examPathways: ["ATAR", "HSC examinations", "AMT enrichment"] },
  { grade: 13, label: "Grade 13 · Advanced", stage: "Post-school extension", focus: "University readiness, advanced scholarship, research and Olympiad-level extension", subjects: ["Advanced Mathematics", "Advanced Sciences", "Academic Writing", "Research Methods", "Computer Science", "Critical Thinking"], examPathways: ["AMT Olympiad pathway", "University admissions preparation", "Advanced research portfolio"] },
];

const unitBanks: Record<string, string[]> = {
  English: ["Reading comprehension and vocabulary", "Sentence structure and grammar", "Narrative and descriptive writing", "Persuasive writing and argument", "Informative and explanatory texts", "Speaking, listening and presentation", "Text analysis and evidence", "Research, referencing and synthesis"],
  Mathematics: ["Number sense and operations", "Fractions, decimals and percentages", "Patterns, algebra and relationships", "Measurement and units", "Geometry and spatial reasoning", "Statistics, data and probability", "Problem solving and mathematical communication", "Multi-step reasoning and modelling"],
  Science: ["Scientific inquiry and fair testing", "Living things and ecosystems", "Matter, materials and change", "Forces, energy and motion", "Earth, space and climate systems", "Cells, heredity and evolution", "Scientific models and data interpretation", "Experimental design and evaluation"],
  Humanities: ["History, chronology and sources", "Geography, place and environment", "Civics, citizenship and institutions", "Economics, resources and decisions", "Culture, identity and perspectives", "Historical argument and evidence", "Sustainability and global connections", "Research and source evaluation"],
  "Digital Technologies": ["Digital systems and safe practice", "Data, information and representation", "Algorithms and computational thinking", "Programming and debugging", "Networks and cybersecurity", "Design, prototyping and evaluation", "Digital ethics and impacts", "Independent technology project"],
  "Health & Physical Education": ["Health literacy and wellbeing", "Movement skills and coordination", "Fitness and training principles", "Nutrition, safety and decision-making", "Teamwork and communication", "Personal development and resilience", "Performance analysis", "Healthy lifestyle project"],
  "The Arts": ["Observation and creative expression", "Elements, techniques and materials", "Making and responding", "Culture and artistic context", "Performance and presentation", "Experimentation and refinement", "Critique and interpretation", "Portfolio development"],
  Biology: ["Cell structure and function", "Organisation and homeostasis", "Genetics and inheritance", "Evolution and biodiversity", "Ecology and ecosystems", "Human physiology", "Experimental methods and data", "Extended response and evaluation"],
  Chemistry: ["Atomic structure and periodicity", "Bonding and molecular structure", "Chemical reactions and equations", "Stoichiometry and quantities", "Energetics and rates", "Equilibrium and acids/bases", "Organic chemistry", "Practical investigation and analysis"],
  Physics: ["Motion and forces", "Energy and momentum", "Waves and sound", "Electricity and circuits", "Fields and electromagnetism", "Thermal and quantum models", "Measurement and uncertainty", "Modelling and extended problems"],
  "Modern History": ["Historical context and chronology", "Power, conflict and change", "Primary and secondary sources", "Historical interpretations", "Cause, consequence and significance", "Evidence-based essays", "Historiography and debate", "Independent historical investigation"],
  Geography: ["Geographical tools and mapping", "Physical environments", "Human populations and settlement", "Urban and regional systems", "Environmental change", "Global connections", "Spatial data and fieldwork", "Geographical inquiry"],
  Economics: ["Scarcity, choice and opportunity cost", "Markets, supply and demand", "Economic performance and indicators", "Government policy and fiscal choices", "Trade and globalisation", "Labour markets and inequality", "Economic data and evaluation", "Policy analysis and extended response"],
  "Research & Study Skills": ["Planning and goal setting", "Active reading and annotation", "Retrieval practice and spaced review", "Note-making and synthesis", "Academic integrity and referencing", "Timed assessment strategy", "Feedback and error analysis", "Independent research project"],
  "Advanced Mathematics": ["Proof and mathematical logic", "Functions and advanced algebra", "Calculus and optimisation", "Probability and statistical inference", "Vectors and matrices", "Differential equations and modelling", "Discrete mathematics", "Olympiad problem solving"],
  "Advanced Sciences": ["Advanced experimental design", "Quantitative analysis and uncertainty", "Mechanistic models", "Interdisciplinary systems", "Research literature evaluation", "Scientific argument and peer review", "Independent investigation", "Research presentation"],
  "Academic Writing": ["Thesis construction and argument", "Critical reading and synthesis", "Academic style and precision", "Evidence and citation", "Literature review", "Counterargument and evaluation", "Long-form research writing", "Oral defence and presentation"],
  "Research Methods": ["Research questions and hypotheses", "Literature search and review", "Qualitative and quantitative methods", "Sampling and measurement", "Ethics and reproducibility", "Data analysis and visualisation", "Limitations and validity", "Capstone research study"],
  "Computer Science": ["Programming foundations", "Data structures and algorithms", "Systems and architecture", "Databases and information", "Networks and security", "Software engineering", "AI and computational ethics", "Independent software project"],
  "Critical Thinking": ["Logic and valid inference", "Claims, evidence and assumptions", "Bias and source credibility", "Causal reasoning", "Argument mapping", "Decision theory", "Ethical reasoning", "Complex problem solving"],
};

export const EXAM_PATHWAYS = [
  { name: "NAPLAN", detail: "Literacy and numeracy practice for Years 3, 5, 7 and 9; reading, writing, language conventions and numeracy." },
  { name: "Opportunity Class (OC)", detail: "Upper-primary reading, mathematical reasoning and thinking skills for NSW OC entry; eligibility and entry timing should be checked against current NSW guidance." },
  { name: "Selective High School Placement Test (SHSPT)", detail: "Reading, mathematical reasoning, thinking skills and writing practice for NSW selective-school entry." },
  { name: "ICAS", detail: "Independent challenge practice across English, Mathematics, Science, Digital Technologies and writing where offered." },
  { name: "Australian Mathematics Competition (AMC)", detail: "Non-routine mathematical problem solving, pattern recognition, reasoning and written working." },
  { name: "AMT extension pathway", detail: "Australian Mathematics Trust enrichment, challenge problem sets and progression towards advanced mathematics competitions." },
  { name: "ATAR / senior assessment", detail: "Year 11–12 syllabus mastery, subject-specific timed practice, HSC-style papers, feedback and examination strategy." },
];

const DAY_TYPES = [
  { name: "Learn", description: "Explicit teaching: define the key idea, build vocabulary and explain the concept step by step." },
  { name: "Understand", description: "Deepen understanding with diagrams, comparisons, examples and checks for misconceptions." },
  { name: "Work through", description: "Study fully worked examples and explain why each step is valid." },
  { name: "Guided practice", description: "Complete scaffolded problems with hints, prompts and immediate self-checking." },
  { name: "Independent practice", description: "Apply the skill to unfamiliar questions without worked solutions." },
  { name: "Review and extend", description: "Retrieve prior learning, correct errors and attempt a stretch task." },
  { name: "Weekly mastery test", description: "Complete a cumulative assessment; target 80% mastery before progressing, otherwise use the remediation plan." },
];

export function getStudyDay(grade: number, day: number) {
  const level = GRADE_LEVELS.find((item) => item.grade === grade) ?? GRADE_LEVELS[0];
  const safeDay = Math.min(365, Math.max(1, day));
  if (safeDay === 365) {
    return { day: safeDay, week: 53, dayInWeek: 1, subject: "Integrated Capstone", topic: "Year-end mastery examination and portfolio", type: "Final examination", description: "Complete a cumulative examination across the year's core strands, submit a portfolio and reflect on next-year readiness.", assessment: "Comprehensive written, applied and oral assessment" };
  }
  const week = Math.ceil(safeDay / 7);
  const dayInWeek = ((safeDay - 1) % 7) + 1;
  const subject = level.subjects[(week - 1) % level.subjects.length];
  const bank = unitBanks[subject] ?? unitBanks["Research & Study Skills"];
  const topic = bank[Math.floor((week - 1) / level.subjects.length) % bank.length];
  const dayType = DAY_TYPES[dayInWeek - 1];
  return {
    day: safeDay, week, dayInWeek, subject, topic,
    type: dayType.name, description: dayType.description,
    assessment: dayInWeek === 7 ? "20–30 question mastery test plus one extended response" : dayInWeek === 6 ? "Mixed retrieval quiz and one challenge task" : "Exit ticket: explain, demonstrate and apply the day's learning",
  };
}

export function getYearStructure(grade: number) {
  const level = GRADE_LEVELS.find((item) => item.grade === grade) ?? GRADE_LEVELS[0];
  return Array.from({ length: 52 }, (_, index) => {
    const day = getStudyDay(grade, index * 7 + 1);
    return { week: index + 1, subject: day.subject, topic: day.topic, assessmentDay: index * 7 + 7 };
  });
}


export type DailyStudyLesson = {
  id: string;
  subject: string;
  topic: string;
  title: string;
  lessonType: string;
  estimatedMinutes: number;
  objectives: string[];
  teachingSequence: { heading: string; task: string }[];
  flashcards: { front: string; back: string }[];
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
  articleUrl: string;
  videoUrl: string;
};

const slugifyStudyTopic = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const articleSubjectSlugs: Record<string, string> = {
  English: "english", Mathematics: "mathematics", Science: "science", Humanities: "humanities",
  "Digital Technologies": "technology", "Health & Physical Education": "health", "The Arts": "arts",
  Biology: "biology", Chemistry: "chemistry", Physics: "physics", "Modern History": "history",
  Geography: "geography", Economics: "economics", "Research & Study Skills": "study-skills",
  "Advanced Mathematics": "mathematics", "Advanced Sciences": "science", "Academic Writing": "english",
  "Research Methods": "research-methods", "Computer Science": "technology", "Critical Thinking": "critical-thinking",
};

function buildStudyLesson(grade: number, day: number, subject: string, topic: string, dayType: string): DailyStudyLesson {
  const encodedTopic = encodeURIComponent(topic);
  const stage = grade <= 2 ? "Use pictures, objects and short spoken explanations" :
    grade <= 6 ? "Use labelled diagrams, worked examples and short written explanations" :
    grade <= 10 ? "Use evidence, multi-step reasoning and independent written responses" :
    "Use disciplinary terminology, independent research and critical evaluation";
  const objectives = [
    `Define the key ideas in ${topic} using accurate ${subject} vocabulary.`,
    `Explain how the main concepts in ${topic} connect, using a worked example or evidence.`,
    `Apply ${topic} to an unfamiliar problem and justify your reasoning.`,
  ];
  const teachingSequence = [
    { heading: "Retrieve and connect", task: `Recall what you already know about ${subject}. Write or say three things you associate with ${topic}.` },
    { heading: "Learn the core idea", task: `Study the central concept of ${topic}. Build a definition, identify its key parts and record unfamiliar vocabulary. ${stage}.` },
    { heading: "Model and investigate", task: `Work through one example related to ${topic}. Annotate each step, explain why it is appropriate and identify one possible misconception.` },
    { heading: "Guided practice", task: `Complete a scaffolded task: describe the concept, organise relevant evidence, and explain the relationship between two important ideas.` },
    { heading: "Independent transfer", task: `Create a new example or solve a novel problem involving ${topic}. Explain your method and evaluate how well it works.` },
  ];
  const flashcards = [
    { front: `What is the central idea of ${topic}?`, back: `Give a precise definition of ${topic}, name its essential features and explain why it matters in ${subject}.` },
    { front: `What evidence helps explain ${topic}?`, back: `Use relevant observations, data, worked examples or reliable sources. Explain how the evidence supports the claim.` },
    { front: `How can you apply ${topic} in a new situation?`, back: `Identify the relevant principle, choose a suitable method, show the steps and justify your conclusion.` },
    { front: `What is a common misconception about ${topic}?`, back: `A misconception is an incomplete or inaccurate explanation. Test claims against definitions, examples and evidence before accepting them.` },
    { front: `How do you evaluate an explanation of ${topic}?`, back: `Check accuracy, evidence quality, assumptions, context and limitations. Revise the explanation when evidence does not support it.` },
  ];
  const quiz = [
    { question: `Which response best demonstrates understanding of ${topic}?`, options: ["Repeat the title without explanation", "Define the concept, explain its key features and apply it to an example", "Guess without checking evidence", "Copy a sentence without interpreting it"], answer: 1, explanation: "A strong response combines accurate knowledge, explanation and application." },
    { question: `When investigating ${topic}, what makes evidence useful?`, options: ["It is the longest source available", "It agrees with an assumption without being checked", "It is relevant, reliable and connected to the question", "It is unrelated but interesting"], answer: 2, explanation: "Evidence must directly support the claim and be evaluated for reliability." },
    { question: `What is the best way to transfer learning about ${topic}?`, options: ["Memorise only the heading", "Avoid unfamiliar examples", "Apply the idea to a new context and justify each step", "Skip the explanation"], answer: 2, explanation: "Transfer means applying knowledge in a new context and explaining why it fits." },
    { question: "What should you do when your first answer is incorrect?", options: ["Hide the result and move on", "Identify the error, revisit the relevant idea and try a fresh problem", "Memorise the incorrect answer", "Stop practising the topic"], answer: 1, explanation: "Error analysis and a fresh attempt turn feedback into learning." },
    { question: "Which study evidence best shows independent mastery?", options: ["A page of copied notes", "An unfinished activity", "A guessed answer", "A correct explanation and a new application completed without copying"], answer: 3, explanation: "Independent mastery requires accurate explanation and transfer without copying." },
  ];
  return {
    id: `g${grade}-d${day}-${slugifyStudyTopic(subject)}`,
    subject,
    topic,
    title: `${topic}: ${subject} lesson`,
    lessonType: dayType,
    estimatedMinutes: grade <= 2 ? 25 : grade <= 6 ? 35 : 45,
    objectives,
    teachingSequence,
    flashcards,
    quiz,
    articleUrl: `/articles?search=${encodedTopic}&subject=${encodeURIComponent(articleSubjectSlugs[subject] ?? slugifyStudyTopic(subject))}`,
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${topic} ${subject} educational lesson`)}`,
  };
}

export function getDailyLessons(grade: number, day: number): DailyStudyLesson[] {
  const level = GRADE_LEVELS.find((item) => item.grade === grade) ?? GRADE_LEVELS[0];
  const safeDay = Math.min(365, Math.max(1, day));
  const subjects = level.subjects;
  const start = ((safeDay - 1) * 5) % subjects.length;
  const dayType = safeDay === 365 ? "Final examination preparation" : DAY_TYPES[((safeDay - 1) % 7)].name;
  return Array.from({ length: 5 }, (_, index) => {
    const subject = subjects[(start + index) % subjects.length];
    const bank = unitBanks[subject] ?? unitBanks["Research & Study Skills"];
    const rotation = Math.floor(((safeDay - 1) * 5 + index) / subjects.length);
    const topic = bank[rotation % bank.length];
    return buildStudyLesson(grade, safeDay, subject, topic, dayType);
  });
}
