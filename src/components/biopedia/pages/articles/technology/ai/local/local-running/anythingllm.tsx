import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function AnythingLlmArticle() {
  return (
    <LegacyArticlePage
      title="AnythingLLM"
      subject="Local AI"
      summary="AnythingLLM is an application for connecting language models with workspaces, documents, and retrieval-based question answering."
      sections={[
        {
          heading: "Grounding answers in documents",
          body: "Retrieval quality depends on parsing, chunking, embeddings, and access controls. Test citations and permissions with representative documents before using a workspace for sensitive material.",
        },
      ]}
    />
  );
}
