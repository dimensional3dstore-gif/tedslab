import { Bold } from "lucide-react";
import { NoterButton } from "./button";

export function BoldButton({ onFormat }: { onFormat: (format: "bold") => void }) {
  return (
    <NoterButton icon={<Bold className="size-4" />} label="Bold" onClick={() => onFormat("bold")} />
  );
}
