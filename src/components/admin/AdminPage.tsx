import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AdminGate } from "@/components/admin/AdminGate";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";

const links = [
  ["Overview", "/admin"],
  ["Articles", "/admin/articles"],
  ["Pages", "/admin/pages"],
  ["Sections", "/admin/sections"],
  ["Topics", "/admin/topics"],
] as const;

export function AdminPage({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <AppShell>
      <AdminGate>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-border pb-3">
            {links.map(([label, href]) => <Link key={href} to={href} className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">{label}</Link>)}
          </div>
          <PageHeader title={title} description={description} />
          {children}
        </div>
      </AdminGate>
    </AppShell>
  );
}
