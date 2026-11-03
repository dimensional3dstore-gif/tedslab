import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as getSupabaseAuthClient, r as supabaseAuthConfigured } from "./auth-CLCnuokL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-Ct_UUEWR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SIGNED_OUT = {
	session: null,
	user: null,
	loading: false
};
function useAuth() {
	const [state, setState] = (0, import_react.useState)(() => ({
		session: null,
		user: null,
		loading: supabaseAuthConfigured
	}));
	(0, import_react.useEffect)(() => {
		if (!supabaseAuthConfigured) {
			setState(SIGNED_OUT);
			return;
		}
		let active = true;
		const auth = getSupabaseAuthClient().auth;
		auth.getSession().then(({ data }) => {
			if (active) setState({
				session: data.session,
				user: data.session?.user ?? null,
				loading: false
			});
		}).catch(() => {
			if (active) setState(SIGNED_OUT);
		});
		const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
			if (active) setState({
				session,
				user: session?.user ?? null,
				loading: false
			});
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
	const updateProfile = async (displayName) => {
		if (!supabaseAuthConfigured) throw new Error("Account authentication is not configured.");
		const { error } = await getSupabaseAuthClient().auth.updateUser({ data: {
			full_name: displayName.trim(),
			display_name: displayName.trim()
		} });
		if (error) throw error;
	};
	return {
		...state,
		isAdmin: false,
		signOut,
		updateProfile
	};
}
//#endregion
export { useAuth as t };
