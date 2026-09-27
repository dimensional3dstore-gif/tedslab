import { TaxonomyValue } from "./_taxonomy-value";

export function OrderField({ value }: { value: string | null | undefined }) {
  return <TaxonomyValue label="Order" value={value} />;
}
