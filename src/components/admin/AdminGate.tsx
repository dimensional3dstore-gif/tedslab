import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getSupabaseAuthClient,
  supabaseAuthConfigured,
} from "@/integrations/supabase/auth";
import { useAuth } from "@/hooks/use-auth";

export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error: signInError } =
        await getSupabaseAuthClient().auth.signInWithPassword({
          email: email.trim(),
          password,
        });
      if (signInError) {
        setError("Unable to sign in with those credentials.");
        return;
      }
      const { data: authData } = await getSupabaseAuthClient().auth.getUser();
      const currentUser = authData.user;
      if (!currentUser)
        throw new Error("Unable to verify the signed-in account.");
      const { data: role, error: roleError } = await getSupabaseAuthClient()
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "admin")
        .maybeSingle();
      if (roleError) throw roleError;
      if (!role) {
        await signOut();
        setError("This account does not have admin access.");
      }
    } catch {
      setError("Could not verify admin access. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div role="status" className="p-6 text-sm text-muted-foreground">
        Checking account access…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <form
          className="bio-panel w-full max-w-sm space-y-4 p-6"
          onSubmit={submit}
        >
          <h1 className="font-display text-2xl font-bold">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with an account assigned the admin role.
          </p>
          {!supabaseAuthConfigured && (
            <p role="alert" className="text-sm text-destructive">
              Supabase authentication is not configured.
            </p>
          )}
          {user && (
            <p role="status" className="text-sm text-muted-foreground">
              Signed in as {user.email ?? "your account"}, but this account has
              no admin role.
            </p>
          )}
          <div className="space-y-1">
            <label
              htmlFor="admin-email"
              className="text-xs text-muted-foreground"
            >
              Email
            </label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="admin-password"
              className="text-xs text-muted-foreground"
            >
              Password
            </label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={busy || !supabaseAuthConfigured}
          >
            {busy ? "Checking access…" : "Sign in"}
          </Button>
          {user && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => void signOut()}
            >
              Sign out
            </Button>
          )}
          <p className="text-center text-xs text-muted-foreground">
            <Link to="/auth" className="underline underline-offset-4">
              Account sign in
            </Link>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Signed in as {user?.email}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void signOut()}
        >
          Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}
