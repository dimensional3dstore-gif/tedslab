import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { ShieldCheck, Activity, Network, LockKeyhole, Radar } from "lucide-react";

export const Route = createFileRoute("/sentinel")({ component: SentinelPage });

const systems = [
  { title: "Threat Monitor", description: "Observe system signals, anomalies and security events from a single control surface.", icon: Radar },
  { title: "Advanced Systems", description: "Explore interconnected infrastructure, dependencies and system health.", icon: Network },
  { title: "Integrity Guard", description: "Track changes and surface unusual activity before it becomes a larger problem.", icon: LockKeyhole },
  { title: "Live Operations", description: "A foundation for future monitoring, diagnostics and response tools.", icon: Activity },
];

function SentinelPage() {
  return (
    <AppShell>
      <main className="min-h-[calc(100vh-4rem)] bg-[#03101f] text-[#f0f6ff]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#39d98a33] bg-[#39d98a0d]">
              <ShieldCheck className="h-6 w-6 text-[#39d98a]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#39d98a]">Ted's Lab Extension</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">Sentinel</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#91a8c0]">An advanced systems extension for observing, understanding and protecting the infrastructure around Ted's Lab.</p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {systems.map(({ title, description, icon: Icon }) => (
              <section key={title} className="rounded-2xl border border-[#39d98a1f] bg-[#061225]/80 p-6">
                <Icon className="h-5 w-5 text-[#39d98a]" />
                <h2 className="mt-4 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-xs leading-6 text-[#8fa8c2]">{description}</p>
              </section>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-[#39d98a1f] bg-[#39d98a08] p-5 text-xs leading-6 text-[#8fa8c2]">
            Sentinel is designed as an extensible systems layer. Advanced monitoring, diagnostics, automation and security capabilities can be added here without changing the core Knowledge experience.
          </div>
        </div>
      </main>
    </AppShell>
  );
}
