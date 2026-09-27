import { createFileRoute } from "@tanstack/react-router";
import { useArticles } from "@/lib/content";
import { Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";

export const Route = createFileRoute("/articles-debug")({
  component: ArticleDebugPage,
});

function ArticleDebugPage() {
  const { data: articles = [], isLoading, error } = useArticles();
  const published = articles.filter(a => a.published);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="bio-panel p-6">
          <h1 className="text-2xl font-bold mb-4">Article System Diagnostic</h1>
          
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h2 className="font-semibold mb-2">Database Status</h2>
              <div className="space-y-2 text-sm">
                <p>Total articles: <strong>{articles.length}</strong></p>
                <p>Published articles: <strong>{published.length}</strong></p>
                <p>Loading: <strong>{isLoading ? 'Yes' : 'No'}</strong></p>
                {error && <p className="text-red-500">Error: {String(error)}</p>}
              </div>
            </div>

            {published.length === 0 ? (
              <div className="border border-amber-500/30 rounded-lg p-4 bg-amber-50/10">
                <h2 className="font-semibold text-amber-600 mb-2">⚠️ No Articles Found</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  You need to generate articles first. Choose one of these methods:
                </p>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>
                    <strong>Admin Panel (Easiest):</strong>
                    <div className="ml-5 mt-1">
                      Go to <Link to="/admin/articles" className="text-primary hover:underline">/admin/articles</Link> and click "Generate Articles" button
                    </div>
                  </li>
                  <li>
                    <strong>SQL Script:</strong>
                    <div className="ml-5 mt-1">
                      Run the SQL in <code className="bg-secondary px-2 py-1 rounded text-xs">entitles/seed-articles-comprehensive.sql</code>
                    </div>
                  </li>
                  <li>
                    <strong>Node Script:</strong>
                    <div className="ml-5 mt-1">
                      <code className="bg-secondary px-2 py-1 rounded text-xs">node scripts/seed-and-verify-articles.mjs</code>
                    </div>
                  </li>
                </ol>
              </div>
            ) : (
              <div className="border border-green-500/30 rounded-lg p-4 bg-green-50/10">
                <h2 className="font-semibold text-green-600 mb-4">✅ Articles Found!</h2>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-sm mb-2">Sample Articles (First 5):</h3>
                    <div className="space-y-2">
                      {published.slice(0, 5).map(article => (
                        <div key={article.id} className="border border-border rounded p-3 bg-secondary/20">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{article.title}</p>
                              <p className="text-xs text-muted-foreground font-mono">{article.slug}</p>
                            </div>
                            <Link
                              to={`/articles/${article.slug}`}
                              className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
                            >
                              Open →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm mb-2">All Articles by Subject:</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        published.reduce((acc, a) => {
                          const subject = a.subject_slug || 'unknown';
                          acc[subject] = (acc[subject] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).sort(([, a], [, b]) => b - a).map(([subject, count]) => (
                        <div key={subject} className="flex justify-between text-sm p-2 bg-secondary/30 rounded">
                          <span className="font-medium">{subject}</span>
                          <span className="text-muted-foreground">{count} articles</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bio-panel p-6">
          <h2 className="font-semibold mb-4">Testing</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Click the "Open →" button above to test article opening.
            </p>
            <p className="text-sm text-muted-foreground">
              If articles don't open, check:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>Browser console (F12) for errors</li>
              <li>Article slug format is correct</li>
              <li>Route /articles/$slug exists</li>
            </ul>
          </div>
        </div>

        <div className="bio-panel p-6">
          <Link
            to="/articles"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
          >
            Back to All Articles
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
