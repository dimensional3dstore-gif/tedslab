import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"]?.trim();
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"]?.trim();

let client: SupabaseClient | undefined;

function getClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "ChronosOS download tracking is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }

  client ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (input, init) => fetch(input, { ...init, keepalive: true }),
    },
  });

  return client;
}

export async function trackChronosOSDownload(releaseTag: string) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(releaseTag)) {
    throw new Error("Invalid ChronosOS release tag.");
  }

  const { error } = await getClient()
    .from("chronosos_download_events")
    .insert({ release_tag: releaseTag, platform: "macos-arm64" });

  if (error) {
    throw new Error("Could not record the ChronosOS download.", {
      cause: error,
    });
  }
}
