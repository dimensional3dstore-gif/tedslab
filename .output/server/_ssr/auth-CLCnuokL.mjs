import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CLCnuokL.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var supabaseAuthConfigured = Boolean(void 0);
function getSupabaseAuthClient() {
	throw new Error("Authentication is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}
//#endregion
export { getSupabaseAuthClient as n, supabaseAuthConfigured as r, cn as t };
