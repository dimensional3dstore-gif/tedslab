export function Categories({ values }: { values: string[] }) {
  const categories = [...new Set(values.map((value) => value.trim()).filter(Boolean))];
  if (categories.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Categories">
      {categories.map((category) => (
        <li
          key={category}
          className="rounded border border-border bg-secondary px-2 py-1 text-xs text-muted-foreground"
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
