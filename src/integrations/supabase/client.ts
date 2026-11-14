import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAuthClient } from "./auth";

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const client = getSupabaseAuthClient();
    const value = Reflect.get(client, property, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
