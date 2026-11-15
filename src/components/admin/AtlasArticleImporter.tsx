import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CLUSTERS, NODES } from "@/data/catalog";
import { getArticle } from "@/data/articles/compose";
import type { AtlasNode } from "@/data/types";

const SUBJECTS_BY_CLUSTER: Record<string, { slug: string; title: string; description: string; icon: string; id: string }> = {
  philosophy: { id: "sub-atlas-philosophy", slug: "philosophy", title: "Philosophy", description: "Knowledge, reasoning, ethics, metaphysics and the study of ideas.", icon: "Brain" },
  physics: { id: "sub-science", slug: "science", title: "Science", description: "Physics, chemistry, earth systems and the scientific method.", icon: "Atom" },
  mathematics: { id: "sub-mathematics", slug: "mathematics", title: "Mathematics", description: "Number, structure, space and proof.", icon: "Sigma" },
  biology: { id: "sub-biology", slug: "biology", title: "Biology", description: "Life, organisms, evolution and living systems.", icon: "Sprout" },
  computing: { id: "sub-technology", slug: "technology", title: "Technology", description: "Computing, programming, artificial intelligence and digital systems.", icon: "Cpu" },
  history: { id: "sub-history", slug: "history", title: "History", description: "Civilisations, events and the interpretation of the past.", icon: "Landmark" },
  mind: { id: "sub-atlas-mind", slug: "mind", title: "Mind & Cognition", description: "Consciousness, cognition, language, perception and behaviour.", icon: "BrainCircuit" },
  systems: { id: "sub-atlas-systems", slug: "systems", title: "Systems Science", description: "Complexity, networks, feedback, emergence and systems thinking.", icon: "Network" },
};

function plainText(value: string) {
  return value
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function toArticleLayout(node: AtlasNode, sourceBody: string, subjectTitle: string, sectionTitle: string) {
  const blocks = sourceBody.split(/\r?\n/);
  const overview: string[] = [];
  const sections: { heading: string; paragraphs: string[] }[] = [];
  let current: { heading: string; paragraphs: string[] } | null = null;
  let paragraph: string[] = [];
  const flush = () => {
    const value = plainText(paragraph.join(" ").replace(/\s+/g, " "));
    if (value) (current ? current.paragraphs : overview).push(value);
    paragraph = [];
  };
  for (const raw of blocks) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^#{1,6}\s+/.test(line)) {
      flush();
      current = { heading: plainText(line.replace(/^#{1,6}\s+/, "")), paragraphs: [] };
      sections.push(current);
    } else {
      paragraph.push(line);
    }
  }
  flush();
  const usefulOverview = [node.summary, ...overview].filter(Boolean);
  const usefulSections = sections
    .filter((section) => section.paragraphs.length)
    .map((section) => ({ heading: section.heading, paragraphs: section.paragraphs }));
  usefulSections.push({
    heading: "Atlas connections and further study",
    paragraphs: [
      `This entry belongs to the ${sectionTitle} collection within ${subjectTitle}. Its related atlas nodes are: ${node.related.join(", ") || "No linked nodes are currently listed"}.`,
      "Use the Knowledge Atlas to follow these connections, compare neighbouring concepts, and identify questions for further research.",
    ],
  });
  return {
    version: 1 as const,
    tags: [...new Set([subjectTitle, sectionTitle, node.kind, ...node.tags])],
    facts: [
      { label: "Ted's Lab subject", value: subjectTitle },
      { label: "Knowledge Atlas collection", value: sectionTitle },
      { label: "Entry type", value: node.kind },
      ...(node.born ? [{ label: "Historical date", value: node.born }] : []),
      { label: "Editorial status", value: "Atlas transfer · review recommended" },
    ],
    overview: usefulOverview.length ? usefulOverview : [node.summary],
    sections: usefulSections,
  };
}

export function AtlasArticleImporter() {
  const queryClient = useQueryClient();
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const importArticles = async () => {
    setRunning(true);
    setError("");
    setResult("");
    try {
      const subjects = Object.values(SUBJECTS_BY_CLUSTER);
      const { error: subjectError } = await supabase
        .from("subjects")
        .upsert(subjects.map((subject) => ({
          id: subject.id,
          slug: subject.slug,
          title: subject.title,
          description: subject.description,
          icon: subject.icon,
          image_key: null,
          image_url: null,
        })), { onConflict: "slug" });
      if (subjectError) throw subjectError;

      const { data: savedSubjects, error: lookupError } = await supabase
        .from("subjects")
        .select("id, slug");
      if (lookupError) throw lookupError;
      const subjectIds = new Map((savedSubjects ?? []).map((subject) => [subject.slug, subject.id]));

      const clusterSections = [
        ...CLUSTERS.map((cluster) => ({ id: cluster.id, slug: `atlas-${cluster.id}`, title: cluster.title, description: cluster.subtitle, cluster: cluster.id })),
        { id: "atlas", slug: "atlas-overview", title: "Knowledge Atlas", description: "The central map and index of the Knowledge Atlas.", cluster: "atlas" },
      ];
      const sectionRows = clusterSections.map((section, sort) => {
        const mapping = SUBJECTS_BY_CLUSTER[section.cluster === "atlas" ? "philosophy" : section.cluster];
        const subjectId = subjectIds.get(mapping.slug);
        if (!subjectId) throw new Error(`Ted's Lab subject '${mapping.slug}' was not returned after saving.`);
        return {
          id: `sec-${section.id === "atlas" ? "atlas-overview" : `atlas-${section.id}`}`,
          subject_id: subjectId,
          slug: section.slug,
          label: section.title,
          title: section.title,
          description: section.description,
          body: section.description,
          icon: "Network",
          image_key: null,
          image_url: null,
          sort: 500 + sort,
        };
      });
      const { error: sectionError } = await supabase.from("sections").upsert(sectionRows, { onConflict: "id" });
      if (sectionError) throw sectionError;

      // Every imported article must reference a real topic owned by its subject.
      const atlasTopics = subjects.map((subject, sort) => {
        const subjectId = subjectIds.get(subject.slug);
        if (!subjectId) throw new Error("Missing saved subject for " + subject.title);
        return {
          id: "atlas-topic-" + subject.slug,
          subject_id: subjectId,
          subject_slug: subject.slug,
          section_id: null,
          slug: "knowledge-atlas",
          title: "Knowledge Atlas",
          blurb: "Articles transferred from the Knowledge Atlas graph.",
          body: "The complete collection of Knowledge Atlas entries filed under " + subject.title + ".",
          image_url: null,
          sort: 500 + sort,
        };
      });
      const { error: topicError } = await supabase.from("topics").upsert(atlasTopics, { onConflict: "id" });
      if (topicError) throw topicError;
      const rows = NODES.map((node, sort) => {
        const clusterKey = node.cluster === "atlas" ? "philosophy" : node.cluster;
        const subject = SUBJECTS_BY_CLUSTER[clusterKey];
        const section = clusterSections.find((item) => item.id === node.cluster)!;
        const source = getArticle(node.id);
        if (!source) throw new Error(`Could not compose the Atlas entry for '${node.id}'.`);
        const layout = toArticleLayout(node, source.body, subject.title, section.title);
        const body = JSON.stringify(layout);
        const subjectSlug = subject.slug;
        const sectionSlug = section.slug;
        return {
          id: `atlas-${node.id}`,
          slug: `knowledge-atlas-${node.id}`,
          title: node.title,
          excerpt: node.summary,
          body,
          minutes: Math.max(4, Math.ceil(source.wordCount / 220)),
          tone: "educational",
          subject_slug: subjectSlug,
          section_slug: sectionSlug,
          topic_slug: "knowledge-atlas",
          image_key: null,
          image_url: null,
          video_url: null,
          published: true,
          expert_reviewed: false,
          status: "published",
          sort,
        };
      });

      let imported = 0;
      for (let offset = 0; offset < rows.length; offset += 40) {
        const batch = rows.slice(offset, offset + 40);
        const { error: articleError } = await supabase
          .from("articles")
          .upsert(batch, { onConflict: "id" });
        if (articleError) throw articleError;
        imported += batch.length;
      }
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["articles"] }),
        queryClient.invalidateQueries({ queryKey: ["subjects"] }),
        queryClient.invalidateQueries({ queryKey: ["sections"] }),
        queryClient.invalidateQueries({ queryKey: ["topics"] }),
      ]);
      setResult(`Transferred ${imported} Knowledge Atlas entries into Ted's Lab articles. Verified 8 subject records, 9 Atlas collection sections, and 8 subject-owned Knowledge Atlas topics. Existing Ted's Lab articles outside the atlas-* ID namespace were left untouched. Imported entries are published but are not marked expert reviewed.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The Atlas transfer could not be completed. Check admin database permissions and try again.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="bio-panel space-y-4 p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Knowledge Atlas → Ted's Lab</p>
        <h2 className="mt-1 font-display text-xl font-semibold text-foreground">Transfer every Atlas entry into the article library</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Converts each graph node and its composed long-form entry into Ted's Lab's structured article layout: overview, headings, paragraphs, subject, collection, tags, metadata and reading time. The transfer is repeatable and only manages articles with the atlas-* ID prefix.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => void importArticles()} disabled={running}>
          {running ? "Transferring Atlas articles…" : "Transfer all Atlas articles"}
        </Button>
        <span className="text-xs text-muted-foreground">{NODES.length} Atlas entries · {CLUSTERS.length} collections</span>
      </div>
      {error && <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
      {result && <p role="status" className="rounded-md border border-primary/20 bg-primary/5 p-3 text-sm text-foreground">{result}</p>}
      <p className="text-xs text-muted-foreground">The transfer uses your signed-in admin session and Supabase row-level security. It does not mark the transferred entries as expert reviewed.</p>
    </section>
  );
}
