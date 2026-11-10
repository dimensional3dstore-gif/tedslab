import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Et as FileText, O as Sparkles, Xt as BrainCircuit, an as ArrowUpRight, n as Zap, o as WandSparkles, tt as MessageCircle } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-ZoWaXsIu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var knowledgeSources = [
	{
		name: "Site overview",
		text: `# Site overview

Ted's Lab is a learning encyclopedia for biology, science, maths, English, history, and technology.

The site is designed around three learning habits:

1. Learn the idea from a clear article.
2. Check the connections between topics and sections.
3. Test memory with notes, flashcards, and notebook review.

The AI should answer in a helpful, structured way that supports students rather than just repeating facts.

Use the project structure when answering:
- Articles explain the core concept.
- Topic pages connect the concept to the broader subject.
- Study tools help recall and apply ideas.
- The notebook is for personal revision and writing answers.`
	},
	{
		name: "Study methods",
		text: `# Study methods

Effective study is not just rereading. Students learn best when they:

- define the key idea in one sentence
- connect it to a real example
- explain it without notes
- check what they still misunderstand
- revise in short sessions instead of one long session

A good study answer should be clear, concrete, and actionable.

Use this sequence when responding to questions:
1. start with the core idea
2. explain the mechanism or steps
3. give a simple example
4. mention a common mistake
5. suggest a revision action

For biology questions, prefer concept-first explanations that teach the idea before the detail.`
	},
	{
		name: "Biology foundations",
		text: `# Biology foundations

Biology is the study of life and living systems.

Key foundations:
- Cells are the basic units of life.
- DNA stores genetic information.
- Enzymes speed up chemical reactions.
- Energy flows through ecosystems.
- Evolution explains how populations change over time.
- Homeostasis keeps internal conditions stable.

Useful framing for answers:
- describe the process
- explain why it matters
- connect it to a larger system
- compare it to a related idea

Example: photosynthesis uses light energy to build sugars from carbon dioxide and water; cellular respiration releases stored energy from sugars for cell work.

The AI should simplify complex biology without becoming inaccurate. It should help students understand, not overwhelm them.`
	},
	{
		name: "General learning",
		text: `# General learning framework

The best way to answer almost any question is to:

1. Identify the core concept in one sentence.
2. Explain the main parts or steps.
3. Give a simple example.
4. Mention the most common mistake.
5. Suggest how to review or apply it.

This learning method works for science, maths, writing, history, technology, and everyday problem-solving.

When the question is broad, answer in plain language first and add detail second. Helpful answers are short, structured, and actionable.

A strong explanation should do three things:
- define the idea
- connect it to a real example
- tell the learner what to do next`
	}
];
function normalize(input) {
	return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function extractRelevantSections(question) {
	const tokens = normalize(question).split(" ").filter(Boolean);
	return knowledgeSources.map((source) => {
		const text = source.text.toLowerCase();
		const score = tokens.reduce((total, token) => {
			if (!token) return total;
			return total + (text.match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
		}, 0);
		return {
			...source,
			score
		};
	}).filter((source) => source.score > 0).sort((a, b) => b.score - a.score);
}
function buildGeneralAnswer(question) {
	const q = normalize(question);
	if (q.includes("photosynth") || q.includes("chlorophyll") || q.includes("glucose")) return "Photosynthesis is the process plants use to capture light energy and turn carbon dioxide and water into sugars, which store chemical energy. In simple terms: light powers the reaction, the plant makes food, and that food supports growth and survival.";
	if (q.includes("cell") || q.includes("mitosis") || q.includes("dna") || q.includes("enzyme")) return "A cell is the basic unit of life, and its parts work together to keep the organism alive. The key idea is that structure and function are connected: DNA stores instructions, enzymes speed reactions, and cell processes keep energy, growth, and repair working properly.";
	if (q.includes("energy") || q.includes("respiration") || q.includes("atp")) return "Cells need energy to move, grow, divide, and maintain order. In biology, energy is usually captured in chemical form and then released when the cell needs to do work, such as during cellular respiration where stored fuel is converted into usable energy.";
	if (q.includes("study") || q.includes("revise") || q.includes("learn") || q.includes("exam") || q.includes("revision")) return "The best study method is to start with the core idea in one sentence, explain it without notes, then test yourself with one example and one question. Review the parts that feel fuzzy, keep sessions short, and repeat the process over time so knowledge becomes stable.";
	if (q.includes("solve") || q.includes("equation") || q.includes("math") || q.includes("algebra")) return "To solve a mathematical problem, identify the goal, rewrite the information in simpler form, solve one step at a time, and then check the answer against the original question. This keeps the process clear and reduces careless mistakes.";
	if (q.includes("why")) return "The reason is usually the purpose or mechanism behind the result. Explain the cause, then describe the effect in one sentence, and give a simple example so the logic is easy to follow.";
	if (q.includes("how")) return "The clearest way to answer a how question is to describe the process step by step: what happens first, what changes next, and why that matters. Then finish with one example and one brief summary.";
	if (q.includes("what is") || q.includes("define") || q.includes("meaning")) return "The main idea is the concept itself: define it in plain language, explain the most important parts, and give one example. That makes the answer clear without overwhelming the learner with unnecessary detail.";
	if (q.includes("compare") || q.includes("difference") || q.includes("similar")) return "A comparison answer should name the two ideas, explain what they share, and then highlight the key difference in purpose, structure, or outcome. That gives the learner a clean contrast instead of a vague summary.";
	if (q.includes("who")) return "A who question is usually about the person, process, or system involved. Name the key figure or category, explain their role briefly, and give one sentence on why they matter.";
	return "The strongest answer starts with the main idea in one sentence, explains the important parts in plain language, gives a simple example, and ends with a quick check for understanding. That structure works for science, study advice, and general questions alike.";
}
function readKnowledge() {
	return knowledgeSources;
}
function getOpenRouterApiKey() {
	const maybeMetaKey = typeof import.meta !== "undefined" ? void 0 : void 0;
	if (maybeMetaKey) return maybeMetaKey;
	if (typeof processModule !== "undefined") return processModule.env?.OPENROUTER_API_KEY ?? processModule.env?.VITE_OPENROUTER_API_KEY;
}
async function askOpenRouter(question) {
	const apiKey = getOpenRouterApiKey();
	if (!apiKey) return null;
	try {
		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
				"HTTP-Referer": "https://study-hub.local",
				"X-Title": "Study Hub AI"
			},
			body: JSON.stringify({
				model: "openai/gpt-4o-mini",
				messages: [{
					role: "system",
					content: "You are a helpful study tutor for a biology and learning site. Give clear, concise, educational answers and keep them practical and student-friendly."
				}, {
					role: "user",
					content: question
				}],
				temperature: .7,
				max_tokens: 500
			})
		});
		if (!response.ok) {
			const errorText = await response.text();
			console.error("OpenRouter request failed:", response.status, errorText);
			return null;
		}
		const answer = (await response.json()).choices?.[0]?.message?.content?.trim();
		return answer && answer.length > 0 ? answer : null;
	} catch (error) {
		console.error("OpenRouter request error:", error);
		return null;
	}
}
function buildOfflineAiResponse(question) {
	const trimmed = question.trim();
	if (!trimmed) return "Ask me anything about the site, study methods, or biology concepts and I will answer using the project knowledge files.";
	const relevant = extractRelevantSections(trimmed);
	const primary = relevant[0] ?? knowledgeSources[knowledgeSources.length - 1];
	const supporting = relevant.slice(1, 3);
	const answer = buildGeneralAnswer(trimmed);
	const intro = `I reviewed the project knowledge and focused on ${primary.name}.`;
	if (supporting.length > 0) return `${intro}\n\n${answer}\n\nThis answer also connects with ${supporting.map((item) => item.name).join(", ")} so the guidance fits both the learning goals and the site structure.`;
	return `${intro}\n\n${answer}`;
}
async function buildAiResponse(question) {
	const trimmed = question.trim();
	if (!trimmed) return buildOfflineAiResponse(trimmed);
	return await askOpenRouter(trimmed) ?? buildOfflineAiResponse(trimmed);
}
var starterPrompts = [
	"How should I study biology efficiently?",
	"What is this site designed to help me do?",
	"Explain the basics of cell energy in simple terms.",
	"Give me a 30-minute revision plan for tomorrow."
];
function Pate() {
	const [question, setQuestion] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi! I can help with biology, revision planning, and understanding the study material on this site. Ask me anything."
	}]);
	const [isThinking, setIsThinking] = (0, import_react.useState)(false);
	const [typingIndex, setTypingIndex] = (0, import_react.useState)(0);
	const [fullResponse, setFullResponse] = (0, import_react.useState)("");
	const typingIntervalRef = (0, import_react.useRef)(null);
	const knowledgeFiles = (0, import_react.useMemo)(() => readKnowledge(), []);
	(0, import_react.useEffect)(() => {
		if (!isThinking && fullResponse && typingIndex < fullResponse.length) {
			typingIntervalRef.current = setTimeout(() => {
				setTypingIndex((prev) => prev + 1);
			}, 15);
			return () => {
				if (typingIntervalRef.current) clearTimeout(typingIntervalRef.current);
			};
		}
	}, [
		typingIndex,
		fullResponse,
		isThinking
	]);
	const handleAsk = async () => {
		const trimmed = question.trim();
		if (!trimmed || isThinking) return;
		setMessages((prev) => [...prev, {
			role: "user",
			content: trimmed
		}]);
		setQuestion("");
		setIsThinking(true);
		setTypingIndex(0);
		setFullResponse("");
		const response = await buildAiResponse(trimmed);
		setFullResponse(response);
		setIsThinking(false);
		setTypingIndex(0);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleAsk();
		}
	};
	(0, import_react.useEffect)(() => {
		if (fullResponse && typingIndex === fullResponse.length && !isThinking) {
			setMessages((prev) => {
				if (prev[prev.length - 1].role === "assistant" && !prev[prev.length - 1].content) return prev;
				return [...prev, {
					role: "assistant",
					content: fullResponse
				}];
			});
			setFullResponse("");
			setTypingIndex(0);
		}
	}, [
		typingIndex,
		fullResponse,
		isThinking
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-background to-secondary/40 p-5 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-foreground",
							children: "AI study tutor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Built from your learning knowledge"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), "Live tutor"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex flex-wrap gap-2",
					children: starterPrompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setQuestion(prompt),
						className: "rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground hover:shadow-sm",
						children: prompt
					}, prompt))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }),
									knowledgeFiles.length,
									" sources"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-[11px] font-medium px-2.5 py-1 rounded-full ${isThinking ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : "bg-green-500/10 text-green-600 dark:text-green-400"}`,
								children: isThinking ? "◐ Generating..." : "✓ Ready"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 rounded-2xl border border-border bg-gradient-to-b from-muted/20 to-muted/5 p-5",
							children: [
								messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex-shrink-0 size-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`,
										children: message.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `max-w-sm ${message.role === "user" ? "flex-row-reverse" : ""}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: ["rounded-2xl px-5 py-4 text-sm leading-7 shadow-xs border", message.role === "user" ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary/30 rounded-br-none" : "bg-gradient-to-br from-background/95 to-background/70 text-foreground border-border/40 rounded-bl-none"].join(" "),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "whitespace-pre-wrap break-words",
												children: message.content
											})
										})
									})]
								}, `${message.role}-${index}`)),
								isThinking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-shrink-0 size-8 rounded-full flex items-center justify-center bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-4 animate-pulse" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-w-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl rounded-bl-none px-5 py-4 text-sm text-muted-foreground bg-gradient-to-br from-background/95 to-background/70 border border-border/40 shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 items-center h-6",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-1.5 h-1.5 rounded-full bg-gradient-to-t from-primary to-primary/40 animate-bounce",
															style: {
																animationDelay: "0ms",
																animationDuration: "1.4s"
															}
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-1.5 h-1.5 rounded-full bg-gradient-to-t from-primary to-primary/40 animate-bounce",
															style: {
																animationDelay: "200ms",
																animationDuration: "1.4s"
															}
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-1.5 h-1.5 rounded-full bg-gradient-to-t from-primary to-primary/40 animate-bounce",
															style: {
																animationDelay: "400ms",
																animationDuration: "1.4s"
															}
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs ml-2 font-medium",
													children: "Thinking..."
												})]
											})
										})
									})]
								}),
								fullResponse && !isThinking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-shrink-0 size-8 rounded-full flex items-center justify-center bg-secondary/10 text-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-w-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl rounded-bl-none px-5 py-4 text-sm leading-7 shadow-xs border bg-gradient-to-br from-background/95 to-background/70 text-foreground border-border/40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "whitespace-pre-wrap break-words",
												children: [fullResponse.slice(0, typingIndex), typingIndex < fullResponse.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "animate-pulse text-primary font-semibold",
													children: "|"
												})]
											})
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-foreground uppercase tracking-wide",
									children: "Your question"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: question,
										onChange: (event) => setQuestion(event.target.value),
										onKeyDown: handleKeyDown,
										rows: 3,
										className: "w-full resize-none rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/80 focus:bg-background focus:ring-1 focus:ring-primary/30 transition-all",
										placeholder: "Ask me about biology, study techniques, revision tips..."
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											"Press",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
												className: "px-1.5 py-0.5 rounded text-xs border border-border bg-muted",
												children: "Enter"
											}),
											" ",
											"to send"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void handleAsk(),
										disabled: isThinking || !question.trim(),
										className: "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all shadow-sm hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
										children: isThinking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analyzing..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ask Atom AI" })] })
									})]
								})
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-background/70 p-5 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-2 text-sm font-semibold text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-primary" }), "Quick guide"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7 text-foreground",
				children: "Ask for study advice, explanations of core concepts, revision plans, or a summary of how the site works."
			})]
		})]
	});
}
function AIPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "AI Tutor",
		description: "Ask a question and I will respond using the built-in study and biology knowledge files."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pate, {})
	})] });
}
//#endregion
export { AIPage as component };
