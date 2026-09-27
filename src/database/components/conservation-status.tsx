import { TaxonomyValue } from "./_taxonomy-value";

const statusTone: Record<string, string> = {
  "Least Concern": "text-primary",
  "Near Threatened": "text-bio-amber",
  Vulnerable: "text-bio-amber",
  Endangered: "text-destructive",
  "Critically Endangered": "text-destructive",
};

export function ConservationStatus({ value }: { value: string | null | undefined }) {
  if (!value?.trim()) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${statusTone[value] ?? "text-muted-foreground"}`}
    >
      <span className="size-2 rounded-full bg-current" />
      <TaxonomyValue label="Conservation" value={value} />
    </span>
  );
}
