import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ARTICLES } from "@/data/articles/compose";
import { NODE_BY_ID } from "@/data/catalog";
import { useArticles } from "@/lib/content";
import { useAtlas } from "@/store/atlas";

/**
 * Knowledge Atlas is the discovery interface; every opened entry is rendered
 * by the same public Ted's Lab ArticleTemplate used by the Articles section.
 */
export function ArticlePane() {
  const navigate = useNavigate();
  const { data: cmsArticles = [] } = useArticles();
  const openArticleId = useAtlas((s) => s.openArticleId);
  const selectedId = useAtlas((s) => s.selectedId);
  const openId = openArticleId ?? selectedId;

  const cmsArticle = openId?.startsWith("cms-article-")
    ? cmsArticles.find((item) => "cms-article-" + item.id === openId)
    : undefined;
  const atlasArticle = openId ? ARTICLES[openId] : undefined;
  const atlasNode = openId ? NODE_BY_ID[openId] : undefined;

  useEffect(() => {
    if (!openId) return;

    if (openId.startsWith("cms-article-")) {
      if (!cmsArticle) return;
      void navigate({
        to: "/articles/$slug",
        params: { slug: cmsArticle.slug },
      });
      return;
    }

    if (atlasNode && atlasArticle) {
      void navigate({
        to: "/articles/$slug",
        params: { slug: `atlas-${atlasNode.id}` },
      });
    }
  }, [openId, cmsArticle, atlasArticle, atlasNode, navigate]);

  return (
    <div className="flex h-full min-h-0 items-center justify-center bg-canvas px-6 text-center">
      <p className="max-w-sm text-[13px] text-fg-muted">
        Opening the standard Ted's Lab article…
      </p>
    </div>
  );
}
