import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  getSupabaseAuthClient,
  supabaseAuthConfigured,
} from "@/integrations/supabase/auth";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ meta: [{ title: "Confirming account — Ted's Lab" }] }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const code = new URLSearchParams(window.location.search).get("code");
    if (!supabaseAuthConfigured || !code) {
      setError("This confirmation link is invalid or has expired.");
      return () => {
        active = false;
      };
    }

    void getSupabaseAuthClient()
      .auth.exchangeCodeForSession(code)
      .then(({ error: exchangeError }) => {
        if (!active) return;
        if (exchangeError) {
          setError("This confirmation link is invalid or has expired.");
          return;
        }
        void navigate({ to: "/dashboard" });
      })
      .catch(() => {
        if (active)
          setError("Unable to confirm the account. Please try again.");
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 p-6 text-center">
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : (
        <p role="status" className="text-sm text-muted-foreground">
          Confirming your account…
        </p>
      )}
    </main>
  );
}
