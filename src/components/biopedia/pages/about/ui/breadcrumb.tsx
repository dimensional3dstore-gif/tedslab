import { Link } from "@tanstack/react-router";

export function AboutBreadcrumb({ items }: { items: { label: string; to?: "/" | "/about" }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-foreground">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
