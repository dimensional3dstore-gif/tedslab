import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const publicEnv = import.meta.env as ImportMetaEnv &
  Record<string, string | undefined>;
const supabaseUrl = (
  publicEnv.VITE_SUPABASE_URL ??
  publicEnv.NEXT_PUBLIC_TEDSLAB_DATABASE_SUPABASE_URL
)?.trim();
const supabaseAnonKey = (
  publicEnv.VITE_SUPABASE_ANON_KEY ??
  publicEnv.NEXT_PUBLIC_TEDSLAB_DATABASE_SUPABASE_PUBLISHABLE_KEY ??
  publicEnv.NEXT_PUBLIC_TEDSLAB_DATABASE_SUPABASE_ANON_KEY
)?.trim();

export const supabaseAuthConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabaseEmailRedirectUrl =
  publicEnv.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL?.trim();

let client: SupabaseClient | undefined;

export function getSupabaseAuthClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured for this app environment.");
  }
  client ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}
