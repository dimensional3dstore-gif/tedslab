import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — Ted's Lab" }] }),
	component: () => (
		<AppShell>
			<div className="space-y-6">
				<PageHeader title="Sign in" description="Pick up where you left off in the learning encyclopedia." />
				<AuthForm mode="signin" />
			</div>
		</AppShell>
	),
});
