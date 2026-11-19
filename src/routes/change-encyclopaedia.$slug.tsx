import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useArticles } from "@/lib/content";
import { CHANGE_TOPICS } from "@/data/change-encyclopaedia";

export const Route = createFileRoute("/change-encyclopaedia/$slug")({
  head: ({ params }) => ({ meta: [{ title: "Change Topic — Ted's Lab" }] }),
  component: ChangeTopicPage,
});

function ChangeTopicPage() {
  const { slug } = Route.useParams();
  const topic = CHANGE_TOPICS.find(item => item.slug === slug);
  const { data: articles = [], isLoading } = useArticles();
  if (!topic) return <AppShell><main className="p-6 text-sm text-muted-foreground">Change topic not found.</main></AppShell>;
  const topicArticles = articles.filter(article => article.subject_slug === "change-encyclopaedia" && article.topic_slug === slug && article.published);
  return <AppShell><div className="space-y-6">
    <PageHeader title={topic.title} description={topic.blurb ?? "Explore articles about this form of planetary change."} />
    <div className="flex flex-wrap gap-2"><Link to="/change-encyclopaedia" className="text-sm font-medium text-primary">← Change Encyclopaedia</Link><Link to="/change-encyclopaedia/new" className="text-sm font-medium text-primary">Add an article →</Link></div>
    {isLoading ? <p className="text-sm text-muted-foreground">Loading articles…</p> : topicArticles.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{topicArticles.map(article => <Link key={article.id} to="/change-encyclopaedia/article/$slug" params={{slug: article.slug}} className="bio-panel block p-5 hover:border-primary/50"><h2 className="font-semibold">{article.title}</h2><p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p><span className="mt-4 block text-xs font-semibold text-primary">Read article →</span></Link>)}</div> : <div className="bio-panel p-6"><p className="text-sm text-muted-foreground">No published articles are assigned to this topic yet.</p></div>}
  </div></AppShell>;
}
