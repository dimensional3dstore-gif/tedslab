import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Create account — Ted's Lab" }] }),
	component: () => (
		<AppShell>
			<div className="space-y-6">
				<PageHeader title="Create account" description="Keep your notes, saved articles, and study tools together." />
				<AuthForm mode="signup" />
			</div>
		</AppShell>
	),
});
