import { Strikethrough } from "lucide-react";
import { NoterButton } from "./button";

export function StrikethroughButton({ onFormat }: { onFormat: (format: "strike") => void }) {
  return (
    <NoterButton
      icon={<Strikethrough className="size-4" />}
      label="Strikethrough"
      onClick={() => onFormat("strike")}
    />
  );
}
