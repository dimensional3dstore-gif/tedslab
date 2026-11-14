import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { UserRound } from "lucide-react";

export const Route = createFileRoute("/people")({
  head: () => ({ meta: [{ title: "People — Ted's Lab" }] }),
  component: PeoplePage,
});

function PeoplePage() {
  const { user, loading } = useAuth();
  const people = useQuery({
    queryKey: ["people"],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id,display_name,email,created_at").order("display_name");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader title="People" description="Discover people with profiles on Ted's Lab." />
        {!user && !loading ? (
          <div className="bio-panel p-6 text-sm text-muted-foreground">
            <p>Sign in to view People.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(people.data ?? []).map((person) => (
              <article key={person.id} className="bio-panel p-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary"><UserRound className="size-5" /></div>
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-foreground">{person.display_name || "Ted's Lab member"}</h2>
                    <p className="truncate text-xs text-muted-foreground">{person.email}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}