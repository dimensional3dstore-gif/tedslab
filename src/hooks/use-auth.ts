import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseAuthClient, supabaseAuthConfigured } from "@/integrations/supabase/auth";

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

const SIGNED_OUT: AuthState = { session: null, user: null, loading: false };

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => ({
    session: null,
    user: null,
    loading: supabaseAuthConfigured,
  }));

  useEffect(() => {
    if (!supabaseAuthConfigured) {
      setState(SIGNED_OUT);
      return;
    }

    let active = true;
    const auth = getSupabaseAuthClient().auth;
    void auth
      .getSession()
      .then(({ data }) => {
        if (active)
          setState({ session: data.session, user: data.session?.user ?? null, loading: false });
      })
      .catch(() => {
        if (active) setState(SIGNED_OUT);
      });
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      if (active) setState({ session, user: session?.user ?? null, loading: false });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!supabaseAuthConfigured) return;
    const { error } = await getSupabaseAuthClient().auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (displayName: string) => {
    if (!supabaseAuthConfigured) throw new Error("Account authentication is not configured.");
    const { error } = await getSupabaseAuthClient().auth.updateUser({
      data: { full_name: displayName.trim(), display_name: displayName.trim() },
    });
    if (error) throw error;
  };

  return { ...state, isAdmin: false, signOut, updateProfile };
}
