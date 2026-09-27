import { TaxonomyValue } from "./_taxonomy-value";

export function PhylumField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Phylum" value={value} />;
}
