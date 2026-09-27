import { FontOptions, type NoteFont } from "./font-options";

export function FontBar({
  value,
  onChange,
}: {
  value: NoteFont;
  onChange: (font: NoteFont) => void;
}) {
  return (
    <div className="flex items-center border-y border-border py-2">
      <FontOptions value={value} onChange={onChange} />
    </div>
  );
}
