import { TaxonomyValue } from "./_taxonomy-value";

export function SpeciesField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Species" value={value} />;
}
