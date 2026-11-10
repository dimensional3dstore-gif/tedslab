import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { at as LockKeyhole, it as Mail, l as UserRound, on as ArrowRight, st as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as getSupabaseAuthClient, r as supabaseAuthConfigured } from "./auth-CLCnuokL.mjs";
import { t as Button } from "./button-D0rYmyz_.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
import { t as Label } from "./label-B2t3q3cY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthForm-TnpzXBa_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthForm({ mode, showSignupLink = true, redirectAfterSignIn = true }) {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const isSignup = mode === "signup";
	const submit = async (event) => {
		event.preventDefault();
		setError("");
		setNotice("");
		if (!supabaseAuthConfigured) {
			setError("Account authentication is not configured for this deployment.");
			return;
		}
		if (isSignup && password !== confirmPassword) {
			setError("The passwords do not match.");
			return;
		}
		setBusy(true);
		try {
			const auth = getSupabaseAuthClient();
			const result = isSignup ? await auth.auth.signUp({
				email: email.trim(),
				password,
				options: { data: {
					full_name: name.trim(),
					display_name: name.trim()
				} }
			}) : await auth.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (result.error) throw result.error;
			if (isSignup && !result.data.session) setNotice("Account created. Check your email for a confirmation link before signing in.");
			else if (redirectAfterSignIn) await navigate({ to: "/dashboard" });
			else setNotice("Signed in successfully. Your session is active.");
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Authentication failed. Please try again.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bio-panel mx-auto w-full max-w-md p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary",
				children: isSignup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold text-foreground",
				children: isSignup ? "Create your account" : "Welcome back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: isSignup ? "Save your learning progress, notes, and study resources." : "Sign in to return to your saved learning work."
			}),
			!supabaseAuthConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				className: "mt-5 rounded-md border border-bio-amber/30 bg-bio-amber/10 p-3 text-sm text-foreground",
				children: [
					"Set ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "VITE_SUPABASE_URL" }),
					" and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "VITE_SUPABASE_ANON_KEY" }),
					" for this deployment to enable real account authentication."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-6 space-y-4",
				children: [
					isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "account-name",
							children: "Display name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "account-name",
							autoComplete: "name",
							value: name,
							onChange: (event) => setName(event.target.value),
							required: true,
							maxLength: 80
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "account-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "account-email",
								className: "pl-9",
								type: "email",
								autoComplete: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "account-password",
								children: "Password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "account-password",
									className: "pl-9",
									type: "password",
									autoComplete: isSignup ? "new-password" : "current-password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									required: true,
									minLength: 8
								})]
							}),
							isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Use at least 8 characters."
							})
						]
					}),
					isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm-password",
							children: "Confirm password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm-password",
							type: "password",
							autoComplete: "new-password",
							value: confirmPassword,
							onChange: (event) => setConfirmPassword(event.target.value),
							required: true,
							minLength: 8
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
						children: error
					}),
					notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "rounded-md border border-primary/30 bg-primary/10 p-3 text-sm text-foreground",
						children: notice
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full",
						type: "submit",
						disabled: busy || !supabaseAuthConfigured,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" }), busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"]
					})
				]
			}),
			showSignupLink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: [isSignup ? "Already have an account? " : "New to Ted's Lab? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: isSignup ? "/auth" : "/signup",
					className: "font-medium text-primary hover:underline",
					children: isSignup ? "Sign in" : "Create account"
				})]
			})
		]
	});
}
//#endregion
export { AuthForm as t };
