import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";
import { AtlasArticleImporter } from "@/components/admin/AtlasArticleImporter";

export const Route = createFileRoute("/admin/atlas-import")({
  head: () => ({ meta: [{ title: "Import Knowledge Atlas — Ted's Lab" }] }),
  component: AtlasImportPage,
});

function AtlasImportPage() {
  return (
    <AdminPage
      title="Knowledge Atlas transfer"
      description="Convert the Knowledge Atlas graph library into structured Ted's Lab articles."
    >
      <AtlasArticleImporter />
    </AdminPage>
  );
}
