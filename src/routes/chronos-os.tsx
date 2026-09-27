import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, LockKeyhole, Wifi } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import wallpaper from "@/assets/tech-computing.jpg";

export const Route = createFileRoute("/chronos-os")({
  head: () => ({
    meta: [
      { title: "ChronosOS Login — Ted's Lab" },
      { name: "description", content: "Sign in to ChronosOS." },
    ],
  }),
  component: ChronosOSLogin,
});

function ChronosOSLogin() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main
      className="relative flex min-h-dvh flex-col overflow-hidden bg-background"
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(8 14 18 / 82%), rgb(8 14 18 / 56%)), url(${wallpaper})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <header className="relative z-10 flex h-14 items-center justify-between border-b border-white/10 bg-black/20 px-5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.08em] text-white">
          <span className="grid size-7 place-items-center rounded-md border border-white/20 bg-white/10 font-display text-xs">
            C
          </span>
          CHRONOSOS
          <span className="hidden text-xs font-normal tracking-normal text-white/55 sm:inline">
            SESSION GATE
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/75">
          <Wifi className="size-3.5" />
          <span>SECURE CONNECTION</span>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-5 py-12 md:grid-cols-[1fr_420px] md:px-10">
        <section className="text-white">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/65">
            {now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <p className="mt-4 font-display text-6xl font-semibold tabular-nums sm:text-8xl">
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <h1 className="mt-7 max-w-xl font-display text-3xl font-semibold sm:text-4xl">
            Your workspace, in its own time.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Sign in to continue. ChronosOS keeps this experience focused on secure account access.
          </p>
        </section>

        <section className="w-full rounded-xl border border-white/15 bg-background/90 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <LockKeyhole className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Sign in to ChronosOS
              </h2>
              <p className="text-xs text-muted-foreground">Use your Ted's Lab account</p>
            </div>
          </div>
          <AuthForm mode="signin" showSignupLink={false} redirectAfterSignIn={false} />
        </section>
      </div>

      <footer className="relative z-10 flex flex-col gap-3 border-t border-white/10 bg-black/20 px-5 py-4 text-xs text-white/65 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" /> Ted's Lab account services
        </span>
        <Link to="/download" className="inline-flex items-center gap-1.5 hover:text-white">
          Get ChronosOS for Mac <ArrowUpRight className="size-3.5" />
        </Link>
      </footer>
    </main>
  );
}
