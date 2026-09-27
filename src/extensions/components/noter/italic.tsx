import { Italic } from "lucide-react";
import { NoterButton } from "./button";

export function ItalicButton({ onFormat }: { onFormat: (format: "italic") => void }) {
  return (
    <NoterButton
      icon={<Italic className="size-4" />}
      label="Italic"
      onClick={() => onFormat("italic")}
    />
  );
}
