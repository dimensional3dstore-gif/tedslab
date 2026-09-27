import { Link } from "@tanstack/react-router";

export function ArticleLink({ slug, title }: { slug: string; title: string }) {
  if (!slug.trim() || !title.trim()) return null;
  return (
    <Link
      to="/articles/$slug"
      params={{ slug }}
      className="font-medium text-primary hover:underline"
    >
      {title}
    </Link>
  );
}
