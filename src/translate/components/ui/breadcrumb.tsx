export function TranslateBreadcrumb({ steps }: { steps: string[] }) {
  return (
    <nav
      aria-label="Translation steps"
      className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
    >
      {steps.map((step, index) => (
        <span key={`${step}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          <span aria-current={index === steps.length - 1 ? "step" : undefined}>{step}</span>
        </span>
      ))}
    </nav>
  );
}
