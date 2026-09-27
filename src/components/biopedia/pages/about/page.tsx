import { Link } from "@tanstack/react-router";
import { AboutLayout } from "./layout";
import { AboutBreadcrumb } from "./ui/breadcrumb";
import { AboutBox } from "./ui/box";
import { ContactButton } from "./ui/contact-button";
import { AboutTable } from "./ui/table";

export default function AboutPage() {
  return (
    <AboutLayout>
      <AboutBreadcrumb items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">About</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Ted's Lab</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          An independent learning encyclopedia for exploring science, mathematics, history,
          language, and technology.
        </p>
      </header>
      <AboutBox>
        <h2 className="font-display text-xl font-semibold text-foreground">
          How the library is organized
        </h2>
        <div className="mt-4">
          <AboutTable
            columns={["Area", "Purpose"]}
            rows={[
              ["Articles", "Build a clear understanding of individual ideas."],
              ["Topics", "Connect articles to larger subjects and systems."],
              ["Study tools", "Practice recall, organize notes, and review progress."],
            ]}
          />
        </div>
      </AboutBox>
      <div className="flex flex-wrap items-center gap-4">
        <ContactButton />
        <Link to="/articles" className="text-sm font-medium text-primary hover:underline">
          Browse articles
        </Link>
      </div>
    </AboutLayout>
  );
}
