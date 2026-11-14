import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Ted's Lab" }] }),
  component: () => (
    <AppShell>
      <div className="mx-auto w-full max-w-xl space-y-6">
        <PageHeader title="Sign in" description="Sign in to sync your profile, saved content, notes, and study tools." />
        <AuthForm mode="signin" />
        <p className="text-center text-sm text-muted-foreground">
          New here? <Link to="/signup" className="font-medium text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </AppShell>
  ),
});