import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function BoltArticle() {
  return (
    <LegacyArticlePage
      title="Bolt.new"
      subject="AI development tools"
      summary="Bolt.new is a browser-based AI development environment for generating and running web application prototypes."
      sections={[
        {
          heading: "Prototype responsibly",
          body: "Treat generated code as a starting point. Review dependencies, server-side secrets, authentication rules, and responsive behavior before moving a prototype into production.",
        },
      ]}
    />
  );
}
