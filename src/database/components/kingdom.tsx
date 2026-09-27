import { TaxonomyValue } from "./_taxonomy-value";

export function KingdomField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Kingdom" value={value} />;
}
