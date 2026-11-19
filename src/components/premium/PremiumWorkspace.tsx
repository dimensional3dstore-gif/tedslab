import { useMemo, useState } from "react";
import {
  BrainCircuit, BookOpen, FlaskConical, GraduationCap, Network, Sparkles,
  Target, NotebookPen, Trophy, Download, Play, RefreshCw, Search, Video,
  Lightbulb, FileText, Zap
} from "lucide-react";
import { useUserCollection } from "@/lib/user-data";
import { premiumAi, type PremiumAiMode } from "@/ai/premium";

type Mastery = { topic: string; score: number; reviews: number; lastReviewed: string };
type Stats = { xp: number; streak: number; lessons: number; exams: number; mastered: number };
type Course = { title: string; outline: string };
type Saved = { title: string; content: string };

const defaultMastery: Mastery[] = [
  { topic: "Biology foundations", score: 72, reviews: 3, lastReviewed: "Today" },
  { topic: "Quantum mechanics", score: 48, reviews: 1, lastReviewed: "3 days ago" },
  { topic: "Scientific reasoning", score: 81, reviews: 5, lastReviewed: "Yesterday" },
];

function Section({ title, icon: Icon, children, description }: { title: string; icon: React.ComponentType<{className?:string}>; children: React.ReactNode; description: string }) {
  return <section className="rounded-2xl border border-border bg-background/80 p-5 shadow-sm">
    <div className="mb-4 flex items-start gap-3">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5"/></div>
      <div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div>
    </div>
    {children}
  </section>;
}

function ActionButton({ children, onClick, disabled=false }: { children: React.ReactNode; onClick?:()=>void; disabled?:boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">{children}</button>;
}

export function PremiumWorkspace() {
  const [tab, setTab] = useState("overview");
  const [busy, setBusy] = useState("");
  const [output, setOutput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [scenario, setScenario] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [transcript, setTranscript] = useState("");
  const [difficulty, setDifficulty] = useState("Advanced");
  const [simValue, setSimValue] = useState(50);

  const { value: mastery, saveAsync: saveMastery } = useUserCollection<Mastery[]>("premium", "mastery", defaultMastery);
  const { value: stats, saveAsync: saveStats } = useUserCollection<Stats>("premium", "stats", { xp: 420, streak: 7, lessons: 18, exams: 3, mastered: 12 });
  const { value: courses, saveAsync: saveCourses } = useUserCollection<Course[]>("premium", "courses", []);
  const { value: saved, saveAsync: saveSaved } = useUserCollection<Saved[]>("premium", "saved", []);

  const tabs = [
    ["overview","Overview",Sparkles],["tutor","AI Tutor",BrainCircuit],["courses","Courses",BookOpen],
    ["research","Research",Search],["adaptive","Adaptive",Target],["exams","Exams",GraduationCap],
    ["atlas","Knowledge Atlas",Network],["whatif","What If?",Lightbulb],["notebook","Smart Notebook",NotebookPen],
    ["video","Video Lab",Video],["simulation","Simulations",FlaskConical],["achievements","XP & Progress",Trophy]
  ] as const;

  const runAi = async (mode: PremiumAiMode, input: string, label: string) => {
    if (!input.trim()) return;
    setBusy(label);
    setOutput("");
    try {
      const result = await premiumAi(mode, input, JSON.stringify({ mastery, stats }));
      setOutput(result);
      await saveStats({ ...stats, xp: stats.xp + 25 });
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "AI request failed.");
    } finally {
      setBusy("");
    }
  };

  const improveMastery = async (item: Mastery) => {
    const next = mastery.map(x => x.topic === item.topic ? { ...x, score: Math.min(100, x.score + 8), reviews: x.reviews + 1, lastReviewed: "Just now" } : x);
    await saveMastery(next);
    await saveStats({ ...stats, xp: stats.xp + 15, mastered: next.filter(x=>x.score>=80).length });
  };

  const downloadPack = () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), mastery, stats, courses, saved }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "teds-lab-pro-study-pack.json"; a.click(); URL.revokeObjectURL(url);
  };

  const simResult = useMemo(() => {
    const temperature = (simValue - 50) * 0.04;
    const biodiversity = Math.max(0, 100 - Math.abs(simValue - 50) * 1.3);
    return { temperature, biodiversity };
  }, [simValue]);

  return <div className="mx-auto max-w-7xl p-4 lg:p-7">
    <div className="mb-5 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/30 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><CrownIcon/> Ted's Lab Pro</div><h1 className="mt-2 text-2xl font-bold">Personal Knowledge Engine</h1><p className="mt-1 max-w-2xl text-sm text-muted-foreground">Learn, practise, research, simulate and master knowledge from one workspace.</p></div>
        <div className="grid grid-cols-3 gap-2 text-center">{[["XP",stats.xp],["Streak",stats.streak+"d"],["Mastered",stats.mastered]].map(([k,v])=><div key={String(k)} className="rounded-xl border border-border bg-background/70 px-4 py-3"><div className="text-lg font-bold">{v}</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div></div>)}</div>
      </div>
    </div>

    <div className="mb-5 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-muted/30 p-1">
      {tabs.map(([id,label,Icon])=><button key={id} type="button" onClick={()=>setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ${tab===id ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Icon className="size-3.5"/>{label}</button>)}
    </div>

    {tab==="overview" && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Section title="AI Study Coach" icon={BrainCircuit} description="A persistent tutor that adapts to your weak topics."><ActionButton onClick={()=>setTab("tutor")}>Open tutor</ActionButton></Section>
      <Section title="Adaptive Learning" icon={Target} description="Turn review history into a mastery path and spaced-repetition queue."><ActionButton onClick={()=>setTab("adaptive")}>Review weak topics</ActionButton></Section>
      <Section title="Deep Research" icon={Search} description="Build structured research briefs and investigation plans."><ActionButton onClick={()=>setTab("research")}>Start research</ActionButton></Section>
      <Section title="AI Course Builder" icon={BookOpen} description="Generate a progressive course with lessons, practice and assessment."><ActionButton onClick={()=>setTab("courses")}>Build a course</ActionButton></Section>
      <Section title="What-If Science" icon={Lightbulb} description="Explore consequences of hypothetical planetary and scientific changes."><ActionButton onClick={()=>setTab("whatif")}>Run a scenario</ActionButton></Section>
      <Section title="Interactive Simulations" icon={FlaskConical} description="Change variables and observe a live model."><ActionButton onClick={()=>setTab("simulation")}>Open simulation</ActionButton></Section>
      <Section title="Offline Study Pack" icon={Download} description="Export your personal learning state for offline study."><ActionButton onClick={downloadPack}><Download className="size-3.5"/>Download pack</ActionButton></Section>
      <Section title="Knowledge XP" icon={Trophy} description="Earn XP for meaningful learning actions rather than just opening pages."><ActionButton onClick={()=>setTab("achievements")}>View progress</ActionButton></Section>
      <Section title="Video → Lesson" icon={Video} description="Turn a transcript or lesson source into an interactive study package."><ActionButton onClick={()=>setTab("video")}>Create lesson</ActionButton></Section>
    </div>}

    {tab==="tutor" && <Section title="AI Study Coach" icon={BrainCircuit} description="Tutor, Socratic questioning, explanations and personalised revision.">
      <div className="space-y-3"><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="Ask a difficult question, request a Socratic explanation, or ask for a study plan…"/>
      <div className="flex flex-wrap gap-2"><ActionButton disabled={busy==="tutor"} onClick={()=>void runAi("tutor",prompt,"tutor")}><Sparkles className="size-3.5"/>Ask Tutor</ActionButton><button type="button" onClick={()=>setPrompt("Teach me this topic using Socratic questions. Do not reveal the final answer until I have attempted it.")} className="rounded-lg border border-border px-3 py-2 text-xs">Socratic mode</button></div></div>
    </Section>}

    {tab==="courses" && <Section title="AI Course Builder" icon={BookOpen} description="Generate a complete learning path from beginner to mastery.">
      <div className="space-y-3"><input value={courseTitle} onChange={e=>setCourseTitle(e.target.value)} className="w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="Course topic, e.g. Quantum Mechanics from Zero to Advanced"/><ActionButton disabled={!courseTitle.trim() || busy==="course"} onClick={async()=>{await runAi("course",courseTitle,"course"); if(courseTitle.trim()) await saveCourses([...courses,{title:courseTitle,outline:"Generated course — see latest result below."}]);}}><Sparkles className="size-3.5"/>Generate course</ActionButton>{courses.length>0 && <div className="grid gap-2 md:grid-cols-2">{courses.map((c,i)=><div key={i} className="rounded-xl border border-border p-3 text-sm"><div className="font-medium">{c.title}</div><div className="mt-1 text-xs text-muted-foreground">{c.outline}</div></div>)}</div>}</div>
    </Section>}

    {tab==="research" && <Section title="Deep Research" icon={Search} description="Turn a question into a structured research programme.">
      <textarea value={researchQuestion} onChange={e=>setResearchQuestion(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="What do you want to investigate?"/><div className="mt-3"><ActionButton disabled={!researchQuestion.trim() || busy==="research"} onClick={()=>void runAi("research",researchQuestion,"research")}><Search className="size-3.5"/>Research</ActionButton></div>
    </Section>}

    {tab==="adaptive" && <Section title="Adaptive Learning Engine" icon={Target} description="Mastery moves from familiar to weak to mastered using your review history.">
      <div className="space-y-3">{mastery.map(item=><div key={item.topic} className="rounded-xl border border-border p-4"><div className="flex items-center justify-between gap-3"><div><div className="font-medium text-sm">{item.topic}</div><div className="text-[11px] text-muted-foreground">{item.reviews} reviews · {item.lastReviewed}</div></div><div className="text-sm font-bold">{item.score}%</div></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:`${item.score}%`}}/></div><div className="mt-3"><ActionButton onClick={()=>void improveMastery(item)}><RefreshCw className="size-3.5"/>Review now</ActionButton></div></div>)}</div>
    </Section>}

    {tab==="exams" && <Section title="AI Exam Generator" icon={GraduationCap} description="Generate university-style practice exams with answer keys and marking guidance.">
      <div className="flex flex-wrap gap-2"><input value={topic} onChange={e=>setTopic(e.target.value)} className="min-w-64 flex-1 rounded-xl border border-border bg-background p-3 text-sm" placeholder="Subject/topic"/><select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="rounded-xl border border-border bg-background px-3 text-sm"><option>Foundation</option><option>Intermediate</option><option>Advanced</option><option>Olympiad</option></select></div><div className="mt-3"><ActionButton disabled={!topic.trim() || busy==="exam"} onClick={()=>void runAi("exam",`Create a 10-question ${difficulty} exam on ${topic}. Include answers and a marking guide.`,"exam")}><GraduationCap className="size-3.5"/>Generate exam</ActionButton></div>
    </Section>}

    {tab==="atlas" && <Section title="Personal Knowledge Atlas" icon={Network} description="Discover prerequisites, relationships and next topics from your learning history.">
      <input value={topic} onChange={e=>setTopic(e.target.value)} className="w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="Topic to map"/><div className="mt-3"><ActionButton disabled={!topic.trim() || busy==="atlas"} onClick={()=>void runAi("atlas",`Map the knowledge graph around: ${topic}. Return concepts, prerequisites, contrasts and next topics.`,"atlas")}><Network className="size-3.5"/>Map knowledge</ActionButton></div>
    </Section>}

    {tab==="whatif" && <Section title="Change Encyclopaedia What-If Engine" icon={Lightbulb} description="Model hypothetical changes to Earth or other systems over multiple timescales.">
      <textarea value={scenario} onChange={e=>setScenario(e.target.value)} rows={4} className="w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="What if Earth's rotation slowed by 20%?"/><div className="mt-3"><ActionButton disabled={!scenario.trim() || busy==="what-if"} onClick={()=>void runAi("what-if",scenario,"what-if")}><Lightbulb className="size-3.5"/>Run scenario</ActionButton></div>
    </Section>}

    {tab==="notebook" && <Section title="Smart Notebook" icon={NotebookPen} description="Improve your notes, find gaps, create review checklists and turn notes into study material.">
      <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={8} className="w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="Paste or write your notes here…"/><div className="mt-3 flex gap-2"><ActionButton disabled={!notes.trim() || busy==="notebook"} onClick={()=>void runAi("notebook",notes,"notebook")}><NotebookPen className="size-3.5"/>Improve notes</ActionButton><button type="button" onClick={async()=>{await saveSaved([...saved,{title:"Smart Notebook",content:notes}]);setOutput("Notes saved to your Ted's Lab Pro library.");}} className="rounded-lg border border-border px-3 py-2 text-xs">Save</button></div>
    </Section>}

    {tab==="video" && <Section title="Video → Interactive Lesson" icon={Video} description="Upload a video for metadata, then supply a transcript or notes to generate the lesson package.">
      <input type="file" accept="video/*" className="block w-full rounded-xl border border-border bg-background p-3 text-xs" onChange={e=>{const f=e.target.files?.[0]; if(f) setPrompt(`Video: ${f.name} (${Math.round(f.size/1024/1024)} MB). Generate a lesson from the transcript below.`);}}/><textarea value={transcript} onChange={e=>setTranscript(e.target.value)} rows={8} className="mt-3 w-full rounded-xl border border-border bg-background p-3 text-sm" placeholder="Paste transcript, captions or lesson notes…"/><div className="mt-3"><ActionButton disabled={!transcript.trim() || busy==="lesson"} onClick={()=>void runAi("lesson",transcript,"lesson")}><Play className="size-3.5"/>Create interactive lesson</ActionButton></div>
    </Section>}

    {tab==="simulation" && <Section title="Interactive Simulation Lab" icon={FlaskConical} description="A starter systems model you can extend with domain-specific simulations.">
      <label className="block text-xs font-semibold">Environmental change: {simValue}%</label><input type="range" min="0" max="100" value={simValue} onChange={e=>setSimValue(Number(e.target.value))} className="mt-3 w-full"/><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Temperature delta</div><div className="mt-1 text-2xl font-bold">{simResult.temperature.toFixed(1)}°</div></div><div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Biodiversity index</div><div className="mt-1 text-2xl font-bold">{simResult.biodiversity.toFixed(0)}</div></div></div><p className="mt-3 text-xs text-muted-foreground">This educational model is illustrative, not a climate prediction. Premium simulations can be expanded into physics, biology, ecosystems and economics models.</p>
    </Section>}

    {tab==="achievements" && <Section title="Knowledge XP & Progress" icon={Trophy} description="Track meaningful learning rather than raw page views.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["XP",stats.xp],["Learning streak",`${stats.streak} days`],["Lessons",stats.lessons],["Exams",stats.exams]].map(([k,v])=><div key={String(k)} className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">{k}</div><div className="mt-1 text-2xl font-bold">{v}</div></div>)}</div><div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm"><div className="font-semibold">Next milestone</div><div className="mt-1 text-muted-foreground">Reach {Math.ceil(stats.xp/500)*500} XP to unlock the next knowledge level.</div></div>
    </Section>}

    {busy && <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-border bg-background px-4 py-3 text-xs font-medium shadow-lg"><Zap className="mr-2 inline size-3.5 animate-pulse text-primary"/>Generating with OpenRouter…</div>}
    {output && <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-5"><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary"><Sparkles className="size-3.5"/>AI result</div><div className="whitespace-pre-wrap text-sm leading-7">{output}</div></div>}
  </div>;
}

function CrownIcon() { return <Trophy className="size-3.5"/>; }
