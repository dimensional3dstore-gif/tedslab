import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface DeploymentMetrics {
  users: number;
  visits: number;
  downloads: number;
}

async function getDeploymentMetrics(): Promise<DeploymentMetrics> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: userCount } = await (supabase as any)
    .from("user_roles")
    .select("user_id", { count: "exact", head: true })
    .eq("role", "user");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: settings } = await (supabase as any)
    .from("site_settings")
    .select("key, value");

  const metrics = (settings ?? []) as Array<{ key: string; value: string }>;
  const map = Object.fromEntries(metrics.map((item) => [item.key, item.value]));

  return {
    users: userCount ?? 0,
    visits: Number(map.total_visits ?? map.visits ?? 0) || 0,
    downloads: Number(map.total_downloads ?? map.downloads ?? 0) || 0,
  };
}

const db = supabase as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: (table: string) => any;
};

interface ContentStats {
  table: string;
  label: string;
  total: number;
  published: number;
  draft: number;
}

async function getContentStats(): Promise<ContentStats[]> {
  const stats: ContentStats[] = [];

  const tables = [
    { name: "articles", label: "Articles", visibilityColumn: "published" },
    { name: "pages", label: "Pages", visibilityColumn: "published" },
    { name: "sections", label: "Sections" },
    { name: "topics", label: "Topics" },
    { name: "videos", label: "Videos", visibilityColumn: "published" },
    { name: "hero_slides", label: "Hero Slides", visibilityColumn: "active" },
  ];

  for (const table of tables) {
    try {
      const { data: allData, error } = await db
        .from(table.name)
        .select(
          table.visibilityColumn ? `id, ${table.visibilityColumn}` : "id",
        );
      if (error) throw error;

      const rows = (allData ?? []) as Array<{
        id: string;
        published?: boolean | null;
        active?: boolean | null;
      }>;
      const total = rows.length;
      const published = table.visibilityColumn
        ? rows.filter(
            (item) => item[table.visibilityColumn as "published" | "active"],
          ).length
        : total;
      const draft = total - published;

      stats.push({
        table: table.name,
        label: table.label,
        total,
        published,
        draft,
      });
    } catch (error) {
      console.error(`Failed to get stats for ${table.name}:`, error);
    }
  }

  return stats;
}

export function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getContentStats,
    staleTime: 60000, // 1 minute
  });

  const { data: deploymentMetrics } = useQuery({
    queryKey: ["deployment-metrics"],
    queryFn: getDeploymentMetrics,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">Loading statistics...</div>
    );
  }

  const totalContent = stats?.reduce((sum, s) => sum + s.total, 0) ?? 0;
  const totalPublished = stats?.reduce((sum, s) => sum + s.published, 0) ?? 0;
  const totalDraft = stats?.reduce((sum, s) => sum + s.draft, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Content
            </h3>
            <p className="text-3xl font-bold">{totalContent}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Published
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {totalPublished}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Drafts
            </h3>
            <p className="text-3xl font-bold text-amber-600">{totalDraft}</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Content Breakdown</h3>
        <div className="space-y-3">
          {stats?.map((stat) => (
            <div
              key={stat.table}
              className="flex items-center justify-between rounded-md border border-border p-3"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{stat.label}</span>
                <div className="flex gap-3">
                  <span className="text-xs text-muted-foreground">
                    Total: <span className="font-semibold">{stat.total}</span>
                  </span>
                  <span className="text-xs text-green-600">
                    Published:{" "}
                    <span className="font-semibold">{stat.published}</span>
                  </span>
                  <span className="text-xs text-amber-600">
                    Draft: <span className="font-semibold">{stat.draft}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-700">
                  {Math.round((stat.published / Math.max(stat.total, 1)) * 100)}
                  %
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Admin-only deployment platform</p>
            <h3 className="mt-1 text-lg font-semibold">Deploy Ted's Lab apps</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Build and publish isolated apps to the Ted's Lab app network. Every public app address is constrained to <span className="font-mono">*.tedslab.app</span>.
            </p>
          </div>
          <Link to="/studio" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Open Deployment Platform
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-border bg-secondary/40 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Users</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{deploymentMetrics?.users ?? 0}</p>
          </div>
          <div className="rounded-md border border-border bg-secondary/40 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Visits</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{deploymentMetrics?.visits ?? 0}</p>
          </div>
          <div className="rounded-md border border-border bg-secondary/40 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Downloads</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{deploymentMetrics?.downloads ?? 0}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Publishing Studio</h3>
        <p className="mb-4 text-sm text-muted-foreground">Jump directly into the workflows that build Ted's Lab's scientific knowledge base.</p>
        <div className="grid gap-2 md:grid-cols-2">
          <Link to="/admin/articles/new" className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm font-semibold text-primary hover:bg-primary/10">→ Write & Publish Article</Link>
          <Link to="/admin/slides" className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm font-semibold text-primary hover:bg-primary/10">→ Create & Manage Slides</Link>
          <Link to="/blogger/new" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ Create Blog Post</Link>
          <Link to="/blogger/mine" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ My Blogs</Link>
          <Link to="/admin/articles" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ Manage Articles & Annotate</Link>
          <Link to="/admin/sections" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ Create & Manage Sections</Link>
          <Link to="/admin/topics" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ Create & Manage Topics</Link>
          <Link to="/admin/pages" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ Manage Pages</Link>
          <a href="/llm" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ Import local oMLX model</a>
          <a href="/sitemap.xml" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ View Sitemap</a>
          <Link to="/admin/pages-list" className="rounded-md border border-border p-3 text-sm font-medium hover:bg-accent">→ All Pages</Link>
        </div>
      </Card>
    </div>
  );
}
