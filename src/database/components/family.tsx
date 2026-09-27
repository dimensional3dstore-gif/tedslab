import { TaxonomyValue } from "./_taxonomy-value";

export function FamilyField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Family" value={value} />;
}
