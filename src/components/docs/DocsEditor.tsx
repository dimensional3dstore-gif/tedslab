import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  FileText,
  Minus,
  Plus,
  Redo2,
  Strikethrough,
  Table2,
  Underline as UnderlineIcon,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/biopedia/AppShell";

const STORAGE_KEY = "biopedia:docs:v1";
const FONTS = [
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
  "Yanone Kaffeesatz",
].map((font) => font.trim());

const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) =>
              attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {},
          },
        },
      },
    ];
  },
});

const STORAGE_CONTENT =
  "<h1>Untitled document</h1><p>Start writing. Your work is saved in this browser as you type.</p>";

type SavedDocument = { title: string; content: string };

function loadDocument(): SavedDocument {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? { ...(JSON.parse(stored) as SavedDocument) }
      : { title: "Untitled document", content: STORAGE_CONTENT };
  } catch {
    return { title: "Untitled document", content: STORAGE_CONTENT };
  }
}

function ToolButton({
  label,
  Icon,
  active,
  onClick,
  disabled,
}: {
  label: string;
  Icon: LucideIcon;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`grid size-9 shrink-0 place-items-center rounded-md transition-colors disabled:opacity-40 ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function DocsEditor() {
  const initial = useMemo(loadDocument, []);
  const [title, setTitle] = useState(initial.title);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("11pt");
  const [paragraphStyle, setParagraphStyle] = useState("paragraph");
  const [saved, setSaved] = useState(true);
  const imageInput = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Color,
      Image.configure({ allowBase64: true, inline: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initial.content,
    onSelectionUpdate: ({ editor: currentEditor }) => {
      const headingLevel = ([1, 2, 3] as const).find((level) => currentEditor.isActive("heading", { level }));
      setParagraphStyle(headingLevel ? String(headingLevel) : "paragraph");
    },
    onUpdate: ({ editor: updatedEditor }) => {
      setSaved(false);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ title, content: updatedEditor.getHTML() }),
        );
        setSaved(true);
      } catch {
        setSaved(false);
      }
    },
  });

  useEffect(() => {
    try {
      const current = editor?.getHTML() ?? initial.content;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, content: current }));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [title, editor, initial.content]);

  if (!editor) return <div className="p-8 text-sm text-muted-foreground">Opening document…</div>;

  const setFont = (value: string) => {
    setFontFamily(value);
    editor.chain().focus().setFontFamily(value).run();
  };
  const setSize = (value: string) => {
    setFontSize(value);
    editor.chain().focus().setMark("textStyle", { fontSize: value }).run();
  };
  const addImage = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string")
        editor.chain().focus().setImage({ src: reader.result, alt: file.name }).run();
    };
    reader.readAsDataURL(file);
  };
  const addLink = () => {
    const current = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter a link URL", current ?? "https://");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url.trim() }).run();
  };

  return (
    <AppShell>
    <div className="flex min-h-[calc(100vh-9rem)] flex-col gap-4 text-foreground">
      <header className="bio-panel flex flex-wrap items-center gap-3 px-4 py-3">
        <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
          <FileText className="size-5" />
        </div>
        <div className="min-w-44 flex-1">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Document title"
            className="w-full border-0 bg-transparent text-lg font-medium text-foreground outline-none"
          />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`size-1.5 rounded-full ${saved ? "bg-primary" : "bg-bio-amber"}`} />
            {saved ? "Saved in this browser" : "Saving…"}
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
        >
          Print / PDF
        </button>
      </header>

      <div className="bio-panel sticky top-16 z-10 px-3 py-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-1">
          <Select
            value={paragraphStyle}
            onValueChange={(value) => {
              setParagraphStyle(value);
              if (value === "paragraph") editor.chain().focus().setParagraph().run();
              else
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: Number(value) as 1 | 2 | 3 })
                  .run();
            }}
          >
            <SelectTrigger aria-label="Paragraph style" className="w-36 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Normal text</SelectItem>
              <SelectItem value="1">Title</SelectItem>
              <SelectItem value="2">Heading 1</SelectItem>
              <SelectItem value="3">Heading 2</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={fontFamily}
            onValueChange={setFont}
          >
            <SelectTrigger aria-label="Font family" className="w-40 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
            {FONTS.map((font, index) => (
              <SelectItem key={`${font}-${index}`} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
          <div className="flex h-9 items-center rounded-md border border-input bg-background">
            <button
              type="button"
              aria-label="Decrease font size"
              onClick={() => setSize(`${Math.max(8, Number.parseInt(fontSize, 10) - 1)}pt`)}
              className="grid size-8 place-items-center text-muted-foreground hover:bg-secondary"
            >
              <Minus className="size-3.5" />
            </button>
            <input
              aria-label="Font size"
              value={fontSize.replace("pt", "")}
              onChange={(event) => setSize(`${event.target.value}pt`)}
              className="w-10 border-x border-input bg-transparent text-center text-sm text-foreground outline-none"
            />
            <button
              type="button"
              aria-label="Increase font size"
              onClick={() => setSize(`${Math.min(96, Number.parseInt(fontSize, 10) + 1)}pt`)}
              className="grid size-8 place-items-center text-muted-foreground hover:bg-secondary"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <span className="mx-1 hidden h-6 border-l border-[#dadce0] sm:block" />
          <ToolButton
            label="Bold"
            Icon={Bold}
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolButton
            label="Italic"
            Icon={Italic}
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolButton
            label="Underline"
            Icon={UnderlineIcon}
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
          <ToolButton
            label="Strikethrough"
            Icon={Strikethrough}
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />
          <ToolButton
            label="Highlight"
            Icon={Highlighter}
            active={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          />
          <label
            title="Text color"
            className="relative grid size-9 cursor-pointer place-items-center rounded-md text-sm font-bold text-foreground hover:bg-secondary"
          >
            A
            <input
              aria-label="Text color"
              type="color"
              onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <span className="absolute bottom-1 left-2 right-2 h-1 rounded-full bg-primary" />
          </label>
          <span className="mx-1 hidden h-6 border-l border-[#dadce0] sm:block" />
          <ToolButton
            label="Align left"
            Icon={AlignLeft}
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <ToolButton
            label="Align center"
            Icon={AlignCenter}
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <ToolButton
            label="Align right"
            Icon={AlignRight}
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
          <ToolButton
            label="Bulleted list"
            Icon={List}
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolButton
            label="Numbered list"
            Icon={ListOrdered}
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolButton
            label="Insert link"
            Icon={Link2}
            active={editor.isActive("link")}
            onClick={addLink}
          />
          <ToolButton
            label="Insert image"
            Icon={ImagePlus}
            onClick={() => imageInput.current?.click()}
          />
          <input
            ref={imageInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => addImage(event.target.files?.[0])}
          />
          <ToolButton
            label="Insert 3 by 3 table"
            Icon={Table2}
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          />
          <div className="ml-auto flex items-center gap-1">
            <ToolButton
              label="Undo"
              Icon={Undo2}
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            />
            <ToolButton
              label="Redo"
              Icon={Redo2}
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-border pt-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
            className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40"
          >
            Add row
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
            className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40"
          >
            Add column
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
            className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40"
          >
            Delete row
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
            className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40"
          >
            Delete column
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.can().deleteTable()}
            className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-40"
          >
            Delete table
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-auto rounded-xl border border-border bg-secondary/30 px-3 py-4 sm:px-8">
        <div className="bio-panel mx-auto min-h-[720px] w-full max-w-5xl p-6 sm:p-10">
          <EditorContent editor={editor} className="docs-content min-h-[640px] outline-none" />
        </div>
      </main>
    </div>
    </AppShell>
  );
}
