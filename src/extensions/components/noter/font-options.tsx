export const FONT_OPTIONS = ["sans", "serif", "mono"] as const;
export type NoteFont = (typeof FONT_OPTIONS)[number];

export function FontOptions({
  value,
  onChange,
}: {
  value: NoteFont;
  onChange: (font: NoteFont) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      Font
      <select
        aria-label="Note font"
        value={value}
        onChange={(event) => onChange(event.target.value as NoteFont)}
        className="rounded-md border border-input bg-background px-2 py-1 text-foreground"
      >
        <option value="sans">Sans</option>
        <option value="serif">Serif</option>
        <option value="mono">Mono</option>
      </select>
    </label>
  );
}
