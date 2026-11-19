import { Link } from "@tanstack/react-router";
import { Crown, Lock } from "lucide-react";
import { usePremiumAccess } from "@/lib/premium";

export function PremiumGate({ children }: { children: React.ReactNode }) {
  const { active, isLoading } = usePremiumAccess();
  if (isLoading) return <div className="mx-auto max-w-5xl p-8"><div className="h-32 animate-pulse rounded-2xl bg-muted" /></div>;
  if (active) return <>{children}</>;
  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-10">
      <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-background to-secondary/30 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><Crown className="size-7" /></div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ted's Lab Pro</p>
        <h1 className="mt-2 text-3xl font-bold">Your complete learning engine</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Premium unlocks the AI study coach, adaptive learning, research workspaces, course generation, exams, simulations, knowledge graph tools and more.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          {["AI Tutor","Adaptive learning","Deep research","Course builder","AI exams","What-if science","Knowledge XP"].map(item => <span key={item} className="rounded-full border border-border bg-background/70 px-3 py-1.5">{item}</span>)}
        </div>
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link to="/help-center" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Learn about plans</Link>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="size-3.5"/> Premium access required</span>
        </div>
      </div>
    </div>
  );
}
