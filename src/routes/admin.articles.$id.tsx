import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { ArticleCreator } from "@/components/admin/ArticleCreator";
import { useArticles } from "@/lib/content";

export const Route = createFileRoute("/admin/articles/$id")({
  head: () => ({ meta: [{ title: "Edit Article — Ted's Lab" }] }),
  component: EditAdminArticlePage,
});

function EditAdminArticlePage() {
  const { id } = Route.useParams();
  const { data: articles = [], isLoading } = useArticles();
  const article = articles.find((item) => item.id === id);

  return (
    <AdminPage title="Edit article" description="Update the article, save a draft, or publish the latest revision.">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading article…</p>
      ) : article ? (
        <ArticleCreator key={article.id} existing={article} />
      ) : (
        <div className="bio-panel space-y-3 p-5">
          <p className="text-sm">This article could not be found. It may have been deleted or you may not have permission to access it.</p>
          <a href="/admin/articles" className="text-sm font-medium text-primary underline">Return to articles</a>
        </div>
      )}
    </AdminPage>
  );
}
