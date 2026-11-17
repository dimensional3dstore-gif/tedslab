import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { Atom, FlaskConical, Microscope, Orbit, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({ component: AboutPage });

const team = [
  { name: "Ted Han", role: "CEO", icon: Sparkles, bio: "Leads Ted's Lab and its mission to make scientific knowledge accessible, useful and engaging." },
  { name: "Harrington Dam", role: "ExoLab Curator", icon: Orbit, bio: "Curates exoplanet, astronomy and frontier-space knowledge across the Lab." },
  { name: "Charles Rob", role: "Core Scientist", icon: Microscope, bio: "Develops and reviews the scientific foundations behind Ted's Lab's knowledge systems." },
  { name: "Dr. Maya Chen", role: "Quantum Research Lead", icon: Atom, bio: "Leads quantum science, quantum computing and quantum-mechanics research content." },
  { name: "Dr. Elias Ward", role: "Knowledge Architect", icon: FlaskConical, bio: "Designs the structures that connect subjects, topics, articles and interactive learning tools." },
  { name: "Dr. Sofia Reyes", role: "Learning Science Director", icon: Sparkles, bio: "Shapes explanations, study pathways and learning experiences for students." },
  { name: "Dr. Noah Vale", role: "Systems Scientist", icon: ShieldCheck, bio: "Works on scientific computing, data systems and reliability across the Lab." },
];

function AboutPage() {
  return (
    <AppShell>
      <main className="min-h-[calc(100vh-4rem)] bg-[#03101f] text-[#f0f6ff]">
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: "#39d98a" }}>About Ted's Lab</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">A laboratory for knowledge.</h1>
            <p className="mt-5 text-[15px] leading-8 text-[#9db1c8]">Ted's Lab brings scientific knowledge, articles, study tools and interactive environments together in one learning system.</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(({ name, role, icon: Icon, bio }) => (
              <article key={name} className="rounded-2xl border bg-[#061225]/80 p-5" style={{ borderColor: "#39d98a22" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ borderColor: "#39d98a33", backgroundColor: "#39d98a0d" }}>
                  <Icon className="h-5 w-5" style={{ color: "#39d98a" }} />
                </div>
                <p className="mt-5 text-lg font-semibold">{name}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#39d98a" }}>{role}</p>
                <p className="mt-3 text-[12px] leading-6 text-[#8fa8c2]">{bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border p-6" style={{ borderColor: "#39d98a22", backgroundColor: "#39d98a08" }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#39d98a" }}>Our organisation</p>
            <p className="mt-2 text-sm leading-7 text-[#a8bcd3]">Ted's Lab is an educational technology and scientific knowledge organisation building tools for discovery, study and scientific exploration.</p>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
