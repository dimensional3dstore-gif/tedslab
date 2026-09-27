import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseAuthClient, supabaseAuthConfigured } from "@/integrations/supabase/auth";

export function AuthForm({
  mode,
  showSignupLink = true,
  redirectAfterSignIn = true,
}: {
  mode: "signin" | "signup";
  showSignupLink?: boolean;
  redirectAfterSignIn?: boolean;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const isSignup = mode === "signup";

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!supabaseAuthConfigured) {
      setError("Account authentication is not configured for this deployment.");
      return;
    }
    if (isSignup && password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const auth = getSupabaseAuthClient();
      const result = isSignup
        ? await auth.auth.signUp({
            email: email.trim(),
            password,
            options: { data: { full_name: name.trim(), display_name: name.trim() } },
          })
        : await auth.auth.signInWithPassword({ email: email.trim(), password });
      if (result.error) throw result.error;

      if (isSignup && !result.data.session) {
        setNotice("Account created. Check your email for a confirmation link before signing in.");
      } else if (redirectAfterSignIn) {
        await navigate({ to: "/dashboard" });
      } else {
        setNotice("Signed in successfully. Your session is active.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bio-panel mx-auto w-full max-w-md p-6 sm:p-8">
      <div className="mb-6 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
        {isSignup ? <UserRound className="size-5" /> : <LockKeyhole className="size-5" />}
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground">
        {isSignup ? "Create your account" : "Welcome back"}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {isSignup
          ? "Save your learning progress, notes, and study resources."
          : "Sign in to return to your saved learning work."}
      </p>

      {!supabaseAuthConfigured && (
        <div
          role="status"
          className="mt-5 rounded-md border border-bio-amber/30 bg-bio-amber/10 p-3 text-sm text-foreground"
        >
          Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> for this
          deployment to enable real account authentication.
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        {isSignup && (
          <div className="space-y-2">
            <Label htmlFor="account-name">Display name</Label>
            <Input
              id="account-name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="account-email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="account-email"
              className="pl-9"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="account-password">Password</Label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="account-password"
              className="pl-9"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
          </div>
          {isSignup && <p className="text-xs text-muted-foreground">Use at least 8 characters.</p>}
        </div>
        {isSignup && (
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={8}
            />
          </div>
        )}
        {error && (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}
        {notice && (
          <p
            role="status"
            className="rounded-md border border-primary/30 bg-primary/10 p-3 text-sm text-foreground"
          >
            {notice}
          </p>
        )}
        <Button className="w-full" type="submit" disabled={busy || !supabaseAuthConfigured}>
          {busy ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
        </Button>
      </form>
      {showSignupLink && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account? " : "New to Ted's Lab? "}
          <Link
            to={isSignup ? "/auth" : "/signup"}
            className="font-medium text-primary hover:underline"
          >
            {isSignup ? "Sign in" : "Create account"}
          </Link>
        </p>
      )}
    </section>
  );
}
