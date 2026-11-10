import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as quizBank } from "./router-Do9_DjQ6.mjs";
import { _ as description$4 } from "./router-Do9_DjQ62.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quizzes-hZpIoyQ-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizzesPage() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const item = quizBank[index];
	const next = () => {
		if (index + 1 >= quizBank.length) {
			setDone(true);
			return;
		}
		setIndex(index + 1);
		setPicked(null);
		setChecked(false);
	};
	const restart = () => {
		setIndex(0);
		setPicked(null);
		setChecked(false);
		setScore(0);
		setDone(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Quizzes",
		description: description$4
	}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 bio-panel p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "font-display text-2xl font-bold",
			children: [
				"You scored ",
				score,
				" / ",
				quizBank.length
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: restart,
			className: "mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
			children: "Try again"
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 bio-panel p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Question ",
					index + 1,
					" of ",
					quizBank.length,
					" · Score ",
					score
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-lg font-semibold",
				children: item.question
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: item.options.map((o) => {
					const isPicked = picked === o.key;
					const isCorrect = checked && o.key === item.answer;
					const isWrong = checked && isPicked && o.key !== item.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: checked,
						onClick: () => setPicked(o.key),
						className: `flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${isCorrect ? "border-primary bg-primary/15 text-primary" : isWrong ? "border-destructive bg-destructive/15 text-destructive" : isPicked ? "border-primary/60 bg-secondary" : "border-border hover:bg-secondary"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-6 items-center justify-center rounded-full border border-border text-xs",
							children: o.key
						}), o.label]
					}, o.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !picked || checked,
					onClick: () => {
						setChecked(true);
						if (picked === item.answer) setScore((s) => s + 1);
					},
					className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50",
					children: "Check answer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !checked,
					onClick: next,
					className: "rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium disabled:opacity-50",
					children: index + 1 === quizBank.length ? "Finish" : "Next question"
				})]
			})
		]
	})] });
}
//#endregion
export { QuizzesPage as component };
