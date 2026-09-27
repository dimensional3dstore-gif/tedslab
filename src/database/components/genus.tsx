import { TaxonomyValue } from "./_taxonomy-value";

export function GenusField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Genus" value={value} />;
}
