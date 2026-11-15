import type { ArticleRow } from "@/lib/content";
import type { AtlasNode, ClusterId } from "@/data/types";

const SUBJECT_CLUSTER: Record<string, ClusterId> = {
  biology: "biology",
  mathematics: "mathematics",
  science: "physics",
  physics: "physics",
  history: "history",
  english: "english",
  technology: "computing",
  computing: "computing",
  philosophy: "philosophy",
  mind: "mind",
  systems: "systems",
};

export function clusterForSubject(subjectSlug: string | null | undefined): ClusterId {
  return SUBJECT_CLUSTER[subjectSlug ?? ""] ?? "biology";
}

export function toCMSGraphNodes(articles: ArticleRow[]): AtlasNode[] {
  return articles
    .filter((article) =>
      article.published &&
      !article.id.startsWith("atlas-") &&
      !article.id.startsWith("art-"),
    )
    .map((article) => {
      const cluster = clusterForSubject(article.subject_slug);
      return {
        id: "cms-article-" + article.id,
        title: article.title,
        cluster,
        kind: "article",
        tags: [article.topic_slug, "article", "cms"],
        summary: article.excerpt ?? "Published Ted's Lab article.",
        related: [cluster],
      };
    });
}
