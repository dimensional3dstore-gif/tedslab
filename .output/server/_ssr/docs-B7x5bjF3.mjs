import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Et as FileText, Gt as ChevronUp, I as Redo2, Jt as ChevronDown, S as Table2, X as Minus, Yt as Check, _ as TextAlignStart, bt as Highlighter, ct as List, d as Underline, gt as ImagePlus, ht as Italic, lt as ListOrdered, rn as Bold, u as Undo2, ut as Link2, v as TextAlignEnd, w as Strikethrough, y as TextAlignCenter, z as Plus } from "../_libs/lucide-react.mjs";
import { t as cn } from "./auth-CLCnuokL.mjs";
import { t as AppShell } from "./AppShell-8wnhzt2S.mjs";
import { r as Extension } from "../_libs/@tiptap/core+[...].mjs";
import { n as useEditor, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { n as src_default } from "../_libs/@tiptap/extension-link+[...].mjs";
import { n as src_default$1 } from "../_libs/tiptap__extension-underline.mjs";
import { t as src_default$2 } from "../_libs/tiptap__starter-kit.mjs";
import { r as TextStyle, t as src_default$3 } from "../_libs/@tiptap/extension-color+[...].mjs";
import { t as src_default$4 } from "../_libs/tiptap__extension-font-family.mjs";
import { t as src_default$5 } from "../_libs/tiptap__extension-text-align.mjs";
import { t as src_default$6 } from "../_libs/tiptap__extension-highlight.mjs";
import { t as src_default$7 } from "../_libs/tiptap__extension-image.mjs";
import { i as TableRow, n as TableCell, r as TableHeader, t as Table } from "../_libs/@tiptap/extension-table+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/docs-B7x5bjF3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var STORAGE_KEY = "biopedia:docs:v1";
var FONTS = [
	"Arial",
	"Arial Black",
	"Arial Rounded MT Bold",
	"Aptos",
	"Aptos Display",
	"Avenir",
	"Baskerville",
	"Bookman Old Style",
	"Calibri",
	"Cambria",
	"Candara",
	"Century Gothic",
	"Consolas",
	"Constantia",
	"Corbel",
	"Courier New",
	"Didot",
	"Franklin Gothic Medium",
	"Futura",
	"Garamond",
	"Geneva",
	"Georgia",
	"Gill Sans",
	"Helvetica",
	"Helvetica Neue",
	"Impact",
	"Lucida Bright",
	"Lucida Console",
	"Lucida Grande",
	"Lucida Sans",
	"Lucida Sans Typewriter",
	"Marker Felt",
	"Menlo",
	"Microsoft Sans Serif",
	"Monaco",
	"Optima",
	"Palatino",
	"Palatino Linotype",
	"Papyrus",
	"Rockwell",
	"Segoe UI",
	"Tahoma",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana",
	"Andale Mono",
	"Bodoni 72",
	"Bradley Hand",
	"Chalkboard",
	"Charter",
	"Cochin",
	"Copperplate",
	" fantasy",
	"Hoefler Text",
	"Luminari",
	"New York",
	"Noteworthy",
	"PT Mono",
	"PT Sans",
	"PT Serif",
	"Roboto",
	"Open Sans",
	"Lato",
	"Montserrat",
	"Poppins",
	"Merriweather",
	"Playfair Display",
	"Source Sans 3",
	"Source Serif 4",
	"Nunito",
	"Nunito Sans",
	"Oswald",
	"Raleway",
	"Rubik",
	"Ubuntu",
	"Work Sans",
	"DM Sans",
	"Space Grotesk",
	"Inter",
	"Manrope",
	"Fira Sans",
	"Fira Code",
	"IBM Plex Sans",
	"IBM Plex Mono",
	"IBM Plex Serif",
	"Libre Baskerville",
	"Libre Franklin",
	"Cormorant Garamond",
	"EB Garamond",
	"Crimson Text",
	"Lora",
	"Bitter",
	"Cabin",
	"Karla",
	"Barlow",
	"Barlow Condensed",
	"Archivo",
	"Archivo Black",
	"Public Sans",
	"Red Hat Display",
	"Red Hat Text",
	"Mulish",
	"Quicksand",
	"Josefin Sans",
	"Comfortaa",
	"Inconsolata",
	"JetBrains Mono",
	"Source Code Pro",
	"Space Mono",
	"Roboto Slab",
	"Zilla Slab",
	"Arvo",
	"Alfa Slab One",
	"Anton",
	"Bebas Neue",
	"Dosis",
	"Exo 2",
	"M PLUS 1p",
	"Noto Sans",
	"Noto Serif",
	"Ubuntu Mono",
	"Vollkorn",
	"Yanone Kaffeesatz"
].map((font) => font.trim());
var FontSize = Extension.create({
	name: "fontSize",
	addGlobalAttributes() {
		return [{
			types: ["textStyle"],
			attributes: { fontSize: {
				default: null,
				parseHTML: (element) => element.style.fontSize || null,
				renderHTML: (attributes) => attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {}
			} }
		}];
	}
});
var STORAGE_CONTENT = "<h1>Untitled document</h1><p>Start writing. Your work is saved in this browser as you type.</p>";
function loadDocument() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? { ...JSON.parse(stored) } : {
			title: "Untitled document",
			content: STORAGE_CONTENT
		};
	} catch {
		return {
			title: "Untitled document",
			content: STORAGE_CONTENT
		};
	}
}
function ToolButton({ label, Icon, active, onClick, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		title: label,
		"aria-label": label,
		"aria-pressed": active,
		disabled,
		onClick,
		className: `grid size-9 shrink-0 place-items-center rounded-md transition-colors disabled:opacity-40 ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
	});
}
function DocsEditor() {
	const initial = (0, import_react.useMemo)(loadDocument, []);
	const [title, setTitle] = (0, import_react.useState)(initial.title);
	const [fontFamily, setFontFamily] = (0, import_react.useState)("Arial");
	const [fontSize, setFontSize] = (0, import_react.useState)("11pt");
	const [paragraphStyle, setParagraphStyle] = (0, import_react.useState)("paragraph");
	const [saved, setSaved] = (0, import_react.useState)(true);
	const imageInput = (0, import_react.useRef)(null);
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			src_default$2,
			src_default$1,
			TextStyle,
			src_default$4,
			FontSize,
			src_default$5.configure({ types: ["heading", "paragraph"] }),
			src_default$6.configure({ multicolor: true }),
			src_default$3,
			src_default$7.configure({
				allowBase64: true,
				inline: false
			}),
			src_default.configure({
				openOnClick: false,
				autolink: true
			}),
			Table.configure({ resizable: true }),
			TableRow,
			TableHeader,
			TableCell
		],
		content: initial.content,
		onSelectionUpdate: ({ editor: currentEditor }) => {
			const headingLevel = [
				1,
				2,
				3
			].find((level) => currentEditor.isActive("heading", { level }));
			setParagraphStyle(headingLevel ? String(headingLevel) : "paragraph");
		},
		onUpdate: ({ editor: updatedEditor }) => {
			setSaved(false);
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify({
					title,
					content: updatedEditor.getHTML()
				}));
				setSaved(true);
			} catch {
				setSaved(false);
			}
		}
	});
	(0, import_react.useEffect)(() => {
		try {
			const current = editor?.getHTML() ?? initial.content;
			localStorage.setItem(STORAGE_KEY, JSON.stringify({
				title,
				content: current
			}));
			setSaved(true);
		} catch {
			setSaved(false);
		}
	}, [
		title,
		editor,
		initial.content
	]);
	if (!editor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-sm text-muted-foreground",
		children: "Opening document…"
	});
	const setFont = (value) => {
		setFontFamily(value);
		editor.chain().focus().setFontFamily(value).run();
	};
	const setSize = (value) => {
		setFontSize(value);
		editor.chain().focus().setMark("textStyle", { fontSize: value }).run();
	};
	const addImage = (file) => {
		if (!file || !file.type.startsWith("image/")) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") editor.chain().focus().setImage({
				src: reader.result,
				alt: file.name
			}).run();
		};
		reader.readAsDataURL(file);
	};
	const addLink = () => {
		const current = editor.getAttributes("link").href;
		const url = window.prompt("Enter a link URL", current ?? "https://");
		if (url === null) return;
		if (!url.trim()) editor.chain().focus().unsetLink().run();
		else editor.chain().focus().setLink({ href: url.trim() }).run();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100vh-9rem)] flex-col gap-4 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "bio-panel flex flex-wrap items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-md bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-44 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (event) => setTitle(event.target.value),
							"aria-label": "Document title",
							className: "w-full border-0 bg-transparent text-lg font-medium text-foreground outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${saved ? "bg-primary" : "bg-bio-amber"}` }), saved ? "Saved in this browser" : "Saving…"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => window.print(),
						className: "rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
						children: "Print / PDF"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bio-panel sticky top-16 z-10 px-3 py-2 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: paragraphStyle,
							onValueChange: (value) => {
								setParagraphStyle(value);
								if (value === "paragraph") editor.chain().focus().setParagraph().run();
								else editor.chain().focus().toggleHeading({ level: Number(value) }).run();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Paragraph style",
								className: "w-36 bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "paragraph",
									children: "Normal text"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "1",
									children: "Title"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "2",
									children: "Heading 1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "3",
									children: "Heading 2"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: fontFamily,
							onValueChange: setFont,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Font family",
								className: "w-40 bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "max-h-80",
								children: FONTS.map((font, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: font,
									style: { fontFamily: font },
									children: font
								}, `${font}-${index}`))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-9 items-center rounded-md border border-input bg-background",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Decrease font size",
									onClick: () => setSize(`${Math.max(8, Number.parseInt(fontSize, 10) - 1)}pt`),
									className: "grid size-8 place-items-center text-muted-foreground hover:bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Font size",
									value: fontSize.replace("pt", ""),
									onChange: (event) => setSize(`${event.target.value}pt`),
									className: "w-10 border-x border-input bg-transparent text-center text-sm text-foreground outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Increase font size",
									onClick: () => setSize(`${Math.min(96, Number.parseInt(fontSize, 10) + 1)}pt`),
									className: "grid size-8 place-items-center text-muted-foreground hover:bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 hidden h-6 border-l border-[#dadce0] sm:block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Bold",
							Icon: Bold,
							active: editor.isActive("bold"),
							onClick: () => editor.chain().focus().toggleBold().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Italic",
							Icon: Italic,
							active: editor.isActive("italic"),
							onClick: () => editor.chain().focus().toggleItalic().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Underline",
							Icon: Underline,
							active: editor.isActive("underline"),
							onClick: () => editor.chain().focus().toggleUnderline().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Strikethrough",
							Icon: Strikethrough,
							active: editor.isActive("strike"),
							onClick: () => editor.chain().focus().toggleStrike().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Highlight",
							Icon: Highlighter,
							active: editor.isActive("highlight"),
							onClick: () => editor.chain().focus().toggleHighlight().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							title: "Text color",
							className: "relative grid size-9 cursor-pointer place-items-center rounded-md text-sm font-bold text-foreground hover:bg-secondary",
							children: [
								"A",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Text color",
									type: "color",
									onChange: (event) => editor.chain().focus().setColor(event.target.value).run(),
									className: "absolute inset-0 cursor-pointer opacity-0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-1 left-2 right-2 h-1 rounded-full bg-primary" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 hidden h-6 border-l border-[#dadce0] sm:block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Align left",
							Icon: TextAlignStart,
							active: editor.isActive({ textAlign: "left" }),
							onClick: () => editor.chain().focus().setTextAlign("left").run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Align center",
							Icon: TextAlignCenter,
							active: editor.isActive({ textAlign: "center" }),
							onClick: () => editor.chain().focus().setTextAlign("center").run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Align right",
							Icon: TextAlignEnd,
							active: editor.isActive({ textAlign: "right" }),
							onClick: () => editor.chain().focus().setTextAlign("right").run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Bulleted list",
							Icon: List,
							active: editor.isActive("bulletList"),
							onClick: () => editor.chain().focus().toggleBulletList().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Numbered list",
							Icon: ListOrdered,
							active: editor.isActive("orderedList"),
							onClick: () => editor.chain().focus().toggleOrderedList().run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Insert link",
							Icon: Link2,
							active: editor.isActive("link"),
							onClick: addLink
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Insert image",
							Icon: ImagePlus,
							onClick: () => imageInput.current?.click()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: imageInput,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (event) => addImage(event.target.files?.[0])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
							label: "Insert 3 by 3 table",
							Icon: Table2,
							onClick: () => editor.chain().focus().insertTable({
								rows: 3,
								cols: 3,
								withHeaderRow: true
							}).run()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
								label: "Undo",
								Icon: Undo2,
								disabled: !editor.can().undo(),
								onClick: () => editor.chain().focus().undo().run()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
								label: "Redo",
								Icon: Redo2,
								disabled: !editor.can().redo(),
								onClick: () => editor.chain().focus().redo().run()
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-1 border-t border-border pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => editor.chain().focus().addRowAfter().run(),
							disabled: !editor.can().addRowAfter(),
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40",
							children: "Add row"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => editor.chain().focus().addColumnAfter().run(),
							disabled: !editor.can().addColumnAfter(),
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40",
							children: "Add column"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => editor.chain().focus().deleteRow().run(),
							disabled: !editor.can().deleteRow(),
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40",
							children: "Delete row"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => editor.chain().focus().deleteColumn().run(),
							disabled: !editor.can().deleteColumn(),
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40",
							children: "Delete column"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => editor.chain().focus().deleteTable().run(),
							disabled: !editor.can().deleteTable(),
							className: "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40",
							children: "Delete table"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-auto rounded-xl border border-border bg-secondary/30 px-3 py-4 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bio-panel mx-auto min-h-[720px] w-full max-w-5xl p-6 sm:p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, {
						editor,
						className: "docs-content min-h-[640px] outline-none"
					})
				})
			})
		]
	}) });
}
var SplitComponent = DocsEditor;
//#endregion
export { SplitComponent as component };
