import type { ButtonHTMLAttributes, ReactNode } from "react";

export function NoterButton({
  icon,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: ReactNode; label: string }) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      title={label}
      aria-label={label}
      className={`inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary disabled:opacity-50 ${props.className ?? ""}`}
    >
      {icon}
    </button>
  );
}
