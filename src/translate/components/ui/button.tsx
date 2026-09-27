import type { ButtonHTMLAttributes } from "react";

export function TranslateButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={`inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}
