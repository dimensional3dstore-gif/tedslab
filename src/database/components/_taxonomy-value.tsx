export function TaxonomyValue({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value?.trim()) return null;
  return (
    <span className="inline-flex min-w-0 items-baseline gap-1.5 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="truncate font-medium text-foreground">{value}</span>
    </span>
  );
}
