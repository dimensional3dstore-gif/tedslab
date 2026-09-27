import { useState, type ReactNode } from "react";
import { isAdminLoggedIn, loginAdmin, logoutAdmin, ADMIN_USERNAME } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => isAdminLoggedIn());
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  if (!authed) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <form
          className="bio-panel w-full max-w-sm space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (loginAdmin(user, pass)) {
              setAuthed(true);
              setError("");
            } else {
              setError("Wrong username or password.");
            }
          }}
        >
          <h1 className="font-display text-2xl font-bold">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">Ted's Lab editorial desk.</p>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Username</label>
            <Input value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Password</label>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p className="text-[11px] text-muted-foreground">Hint: user is {ADMIN_USERNAME}.</p>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Signed in as {ADMIN_USERNAME}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            logoutAdmin();
            setAuthed(false);
          }}
        >
          Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}
