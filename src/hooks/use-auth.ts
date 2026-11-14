import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session, User } from "@supabase/supabase-js";
import {
  getSupabaseAuthClient,
  supabaseAuthConfigured,
} from "@/integrations/supabase/auth";

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
          setState({
            session: data.session,
            user: data.session?.user ?? null,
            loading: false,
          });
      })
      .catch(() => {
        if (active) setState(SIGNED_OUT);
      });
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      if (active)
        setState({ session, user: session?.user ?? null, loading: false });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const roleQuery = useQuery({
    queryKey: ["user-role", state.user?.id ?? null],
    enabled: Boolean(state.user),
    queryFn: async () => {
      if (!state.user) return false;
      const { data, error } = await getSupabaseAuthClient()
        .from("user_roles")
        .select("role")
        .eq("user_id", state.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  const signOut = async () => {
    if (!supabaseAuthConfigured) return;
    const { error } = await getSupabaseAuthClient().auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (displayName: string) => {
    if (!supabaseAuthConfigured || !state.user)
      throw new Error("Sign in before updating your profile.");
    const cleanName = displayName.trim();
    const client = getSupabaseAuthClient();
    const { error: authError } = await client.auth.updateUser({
      data: { full_name: cleanName, display_name: cleanName },
    });
    if (authError) throw authError;
    const { error: profileError } = await client
      .from("profiles")
      .update({ display_name: cleanName, updated_at: new Date().toISOString() })
      .eq("id", state.user.id);
    if (profileError) throw profileError;
  };

  return {
    ...state,
    isAdmin: roleQuery.data === true,
    signOut,
    updateProfile,
  };
}
