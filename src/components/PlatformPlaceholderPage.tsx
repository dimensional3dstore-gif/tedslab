import { ArrowRight, Construction, Package, Terminal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";

export function PlatformPlaceholderPage({
  title,
  description,
  area,
  nextSteps,
}: {
  title: string;
  description: string;
  area: string;
  nextSteps: string[];
}) {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title={title} description={description} />
        <section className="grid gap-4 md:grid-cols-3">
          <div className="bio-panel p-5">
            <Construction className="size-5 text-primary" />
            <h2 className="mt-4 font-semibold text-foreground">Workspace ready</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The page and navigation contract are in place for the {area} build.</p>
          </div>
          <div className="bio-panel p-5">
            <Package className="size-5 text-primary" />
            <h2 className="mt-4 font-semibold text-foreground">Your implementation</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Add the package, installer, service, or downloadable artifact when the platform layer is ready.</p>
          </div>
          <div className="bio-panel p-5">
            <Terminal className="size-5 text-primary" />
            <h2 className="mt-4 font-semibold text-foreground">Integration point</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Keep this surface as the user-facing entry point for status, setup, and actions.</p>
          </div>
        </section>
        <section className="bio-panel p-6">
          <h2 className="text-lg font-semibold text-foreground">Planned work</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {nextSteps.map((step) => <li key={step} className="flex gap-3"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />{step}</li>)}
          </ul>
        </section>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Return to the encyclopedia <ArrowRight className="size-4" /></Link>
      </div>
    </AppShell>
  );
}
