import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabaseAuthConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | undefined;

export function getSupabaseAuthClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Authentication is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  client ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
  });
  return client;
}
