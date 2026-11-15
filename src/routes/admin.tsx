import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminGate } from "@/components/admin/AdminGate";
import { AppShell } from "@/components/biopedia/AppShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Studio — Ted's Lab" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  return <AppShell><AdminGate><Outlet /></AdminGate></AppShell>;
}
