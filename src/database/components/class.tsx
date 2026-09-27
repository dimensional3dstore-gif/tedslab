import { TaxonomyValue } from "./_taxonomy-value";

export function ClassField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Class" value={value} />;
}
