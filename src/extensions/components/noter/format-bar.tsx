import { Underline } from "lucide-react";
import { BoldButton } from "./bold";
import { ItalicButton } from "./italic";
import { StrikethroughButton } from "./strikethrough";
import { NoterButton } from "./button";

type Format = "bold" | "italic" | "strike" | "underline";

export function FormatBar({ onFormat }: { onFormat: (format: Format) => void }) {
  return (
    <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap gap-1">
      <BoldButton onFormat={onFormat} />
      <ItalicButton onFormat={onFormat} />
      <StrikethroughButton onFormat={onFormat} />
      <NoterButton
        icon={<Underline className="size-4" />}
        label="Underline"
        onClick={() => onFormat("underline")}
      />
    </div>
  );
}
