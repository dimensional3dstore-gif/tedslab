import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/biopedia/AppShell";

const links = [
  ["Overview", "/admin"],
  ["Articles", "/admin/articles"],
  ["Atlas transfer", "/admin/atlas-import"],
  ["Subjects", "/admin/subjects"],
  ["Pages", "/admin/pages"],
  ["Sections", "/admin/sections"],
  ["Topics", "/admin/topics"],
  ["Videos", "/admin/videos/new"],
  ["Quizzes", "/admin/quizzes/new"],
  ["Flashcards", "/admin/flashcards/new"],
] as const;

export function AdminPage({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <div className="space-y-6">
    <div className="flex flex-wrap gap-2 border-b border-border pb-3">
      {links.map(([label, href]) => <Link key={href} to={href} activeOptions={{ exact: href === "/admin" }} className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:border-primary/40 data-[status=active]:bg-primary/10 data-[status=active]:text-primary">{label}</Link>)}
    </div>
    <PageHeader title={title} description={description} />
    {children}
  </div>;
}
