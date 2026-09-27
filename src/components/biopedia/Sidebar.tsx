import * as LucideIcons from "lucide-react";
import {
  Home,
  Sprout,
  NotebookPen,
  Layers,
  Bookmark,
  Plus,
  ChevronRight,
  BookOpen,
  FileText,
  BrainCircuit,
  Download,
  Network,
  FilePenLine,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSubjects, useSections, useArticles, useNavLinks, useSettings } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";
import { AiAssistPanel } from "../atlas/AiAssist";

export const studyTools = [
  { label: "AI Tutor", icon: BrainCircuit, to: "/ai" },
  { label: "Chronium AI", icon: LucideIcons.Brackets, to: "/llm" },
  { label: "Notebook", icon: NotebookPen, to: "/notebook" },
  { label: "Docs", icon: FilePenLine, to: "/docs" },
  { label: "Flashcards", icon: Layers, to: "/flashcards" },
  { label: "Saved Content", icon: Bookmark, to: "/saved" },
  { label: "Create Custom List", icon: Plus, to: "/custom-lists" },
  { label: "Translate", icon: LucideIcons.SpeakerIcon, to: "/translate" },
] as const;

function resolveIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Sprout;
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? Sprout;
}

export function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: sections, isLoading: sectionsLoading } = useSections();
  const { data: articles } = useArticles();
  const { data: navLinks } = useNavLinks();
  const { data: settings } = useSettings();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState(false);

  const brandName = settings?.["site_name"] ?? "Ted's Lab";
  const brandTagline = settings?.["site_tagline"] ?? "The Learning Encyclopedia";

  const toolLinks = navLinks?.filter((n) => n.group_name === "tools") ?? [];
  const resolvedStudyTools = [
    { label: "AI Tutor", icon: BrainCircuit, to: "/ai" },
    ...toolLinks.map((n) => ({ label: n.label, icon: resolveIcon(n.icon), to: n.href })),
    ...studyTools
      .filter((t) => t.to !== "/ai")
      .map((t) => ({ label: t.label, icon: t.icon, to: t.to })),
  ].filter((tool, index, array) => {
    return array.findIndex((item) => item.to === tool.to && item.label === tool.label) === index;
  });
  const sectionsBySubject = new Map<string, typeof sections>();
  for (const subject of subjects ?? []) {
    sectionsBySubject.set(
      subject.id,
      (sections ?? [])
        .filter((s) => s.subject_id === subject.id)
        .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)),
    );
  }

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSection = (id: string) => {
    setExpandedSections((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          title="Close navigation menu"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
      <aside
        className={`shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ${mobileOpen ? "fixed inset-y-0 left-0 z-50 flex w-64 shadow-xl lg:static lg:z-auto lg:shadow-none" : `hidden lg:flex ${collapsed ? "w-16" : "w-64"}`}`}
      >
        <div
          className={`flex items-center border-b border-sidebar-border py-3 ${collapsed ? "justify-center px-2" : "justify-between gap-2 px-4"}`}
        >
          <Link
            to="/"
            title={brandName}
            className={`flex min-w-0 items-center ${collapsed ? "justify-center" : "gap-3"}`}
          >
            <img
              src="/logo.png"
              alt={brandName}
              width={40}
              height={40}
              className={`${collapsed ? "size-9" : "size-10"} shrink-0 rounded-xl object-cover`}
            />
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-display text-lg leading-none font-bold text-primary">
                  {brandName}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{brandTagline}</p>
              </div>
            )}
          </Link>
          {!collapsed && (
            <button
              type="button"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
              onClick={() => setCollapsed(true)}
              className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <PanelLeftClose className="size-4" />
            </button>
          )}
        </div>

        <nav className={`flex-1 overflow-y-auto py-3 ${collapsed ? "px-2" : "px-3"}`}>
          {collapsed && (
            <button
              type="button"
              title="Expand sidebar"
              aria-label="Expand sidebar"
              onClick={() => setCollapsed(false)}
              className="mx-auto mb-3 grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <PanelLeftOpen className="size-4" />
            </button>
          )}
          <Link
            to="/knowledge-atlas"
            title="Generate new branch · Open Knowledge Atlas"
            className={`mb-2 flex items-center rounded-lg border border-primary/30 bg-primary/10 font-semibold text-primary transition-colors hover:bg-primary/20 ${collapsed ? "mx-auto size-10 justify-center" : "gap-2 px-3 py-2 text-sm"}`}
          >
            <Sparkles className="size-4 shrink-0" />
            {!collapsed && <span className="truncate">Generate new branch</span>}
          </Link>
          <ul className="space-y-0.5">
            <li>
              <NavLink
                label="Knowledge Atlas"
                Icon={Network}
                to="/knowledge-atlas"
                collapsed={collapsed}
                featured
              />
            </li>
            <li>
              <NavLink label="Home" Icon={Home} to="/" exact collapsed={collapsed} />
            </li>
            <li>
              <NavLink label="Lost Planet" Icon={LucideIcons.EarthIcon} to="/lost-atlas" />
            </li>
            {subjectsLoading || sectionsLoading ? (
              <li className="space-y-1 px-3 py-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-lg" />
                ))}
              </li>
            ) : (
              (subjects ?? []).map((subject) => {
                const subjectSections = sectionsBySubject.get(subject.id) ?? [];
                const isExpanded = expanded.has(subject.id);
                return (
                  <li key={subject.id}>
                    <button
                      type="button"
                      onClick={() => toggle(subject.id)}
                      title={subject.title}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${subject.title}`}
                      className={`group flex w-full items-center rounded-lg py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary ${collapsed ? "justify-center px-0" : "gap-3 px-3"}`}
                    >
                      <span className="shrink-0">
                        {(() => {
                          const Icon = resolveIcon(subject.icon);
                          return <Icon className="size-4 text-muted-foreground" />;
                        })()}
                      </span>
                      {!collapsed && (
                        <span className="flex-1 truncate text-left">{subject.title}</span>
                      )}
                      {!collapsed && (
                        <ChevronRight
                          className={`size-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      )}
                    </button>
                    {isExpanded && subjectSections.length > 0 && (
                      <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-2">
                        {subjectSections.map((section) => {
                          const sectionArticles = (articles ?? []).filter(
                            (article) =>
                              article.published &&
                              article.subject_slug === subject.slug &&
                              article.section_slug === section.slug,
                          );
                          const sectionExpanded = expandedSections.has(section.id);
                          return (
                            <li key={section.id}>
                              <div className="flex items-center">
                                <NavLink
                                  label={section.label}
                                  Icon={resolveIcon(section.icon)}
                                  to={`/${subject.slug}/${section.slug}`}
                                  collapsed={collapsed}
                                />
                                {!collapsed && sectionArticles.length > 0 && (
                                  <button
                                    type="button"
                                    aria-label={`${sectionExpanded ? "Collapse" : "Expand"} ${section.label} articles`}
                                    aria-expanded={sectionExpanded}
                                    onClick={() => toggleSection(section.id)}
                                    className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                  >
                                    <ChevronRight
                                      className={`size-3.5 transition-transform ${sectionExpanded ? "rotate-90" : ""}`}
                                    />
                                  </button>
                                )}
                              </div>
                              {!collapsed && sectionExpanded && sectionArticles.length > 0 && (
                                <ul className="ml-7 space-y-0.5 border-l border-sidebar-border pl-2">
                                  {sectionArticles.map((article) => (
                                    <li key={article.id}>
                                      <Link
                                        to="/articles/$slug"
                                        params={{ slug: article.slug }}
                                        className="block truncate rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        title={article.title}
                                      >
                                        {article.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                        {!collapsed &&
                          (articles ?? []).filter(
                            (article) =>
                              article.published &&
                              article.subject_slug === subject.slug &&
                              !subjectSections.some(
                                (section) => section.slug === article.section_slug,
                              ),
                          ).length > 0 && (
                            <li className="pt-2">
                              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                More articles
                              </p>
                              {(articles ?? [])
                                .filter(
                                  (article) =>
                                    article.published &&
                                    article.subject_slug === subject.slug &&
                                    !subjectSections.some(
                                      (section) => section.slug === article.section_slug,
                                    ),
                                )
                                .map((article) => (
                                  <Link
                                    key={article.id}
                                    to="/articles/$slug"
                                    params={{ slug: article.slug }}
                                    className="block truncate rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    title={article.title}
                                  >
                                    {article.title}
                                  </Link>
                                ))}
                            </li>
                          )}
                      </ul>
                    )}
                  </li>
                );
              })
            )}
          </ul>

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              CONTENT
            </p>
          )}
          <ul className="space-y-0.5 pb-4">
            <li>
              <NavLink label="All Articles" Icon={BookOpen} to="/articles" collapsed={collapsed} />
            </li>
            <li>
              <NavLink label="All Pages" Icon={FileText} to="/pages" collapsed={collapsed} />
            </li>
            <li>
              <NavLink
                label="Help"
                Icon={LucideIcons.FileQuestionIcon}
                to="/help-center"
                collapsed={collapsed}
              />
            </li>
          </ul>

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              STUDY TOOLS
            </p>
          )}
          <ul className="space-y-0.5 pb-4">
            {resolvedStudyTools.map((item) => (
              <li key={`${item.label}-${item.to}`}>
                <NavLink label={item.label} Icon={item.icon} to={item.to} collapsed={collapsed} />
              </li>
            ))}
            <li>
              <NavLink
                label="Video Tutorials"
                Icon={BookOpen}
                to="/tutorials"
                collapsed={collapsed}
              />
            </li>
            <li>
              {!collapsed && (
                <a
                  href="/downloads/ChronosOS.dmg"
                  download="ChronosOS.dmg"
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary"
                >
                  <Download className="size-4 text-muted-foreground group-hover:text-primary" />
                  <span className="truncate">Download ChronosOS</span>
                </a>
              )}
            </li>
          </ul>
          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              Developer Tools
            </p>
          )}
          <ul className="space-y-0.5 pb-4">
            <li>
              <NavLink
                label="Developer Dashboard"
                Icon={BookOpen}
                to="/dev-dashboard"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="ChronosOS Software Download"
                Icon={BookOpen}
                to="/downloadable-software"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink label="Dev Tools" Icon={BookOpen} to="/dev-tools" collapsed={collapsed} />
            </li>
            <li>
              <NavLink
                label="Post Extension Or Tool"
                Icon={BookOpen}
                to="/extension-tools-upload"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Create Ted's Lab Software System"
                Icon={BookOpen}
                to="/ide-system"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Update Software"
                Icon={BookOpen}
                to="/update-soft"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Add software to OS"
                Icon={BookOpen}
                to="/soft-os-addition"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Upload Personal Application To ChronosOS"
                Icon={BookOpen}
                to="/add-app"
                collapsed={collapsed}
              />
            </li>
          </ul>
          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              Software Tools
            </p>
          )}
          <ul className="space-y-0.5 pb-4">
            <li>
              <NavLink label="Maplication" Icon={BookOpen} to="/maps" collapsed={collapsed} />
            </li>
            <li>
              <NavLink
                label="Species Scan"
                Icon={BookOpen}
                to="/species-scan"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Graphication"
                Icon={BookOpen}
                to="/graphication"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink label="Decipher" Icon={BookOpen} to="/decipher" collapsed={collapsed} />
            </li>
            <li>
              <NavLink label="Networker" Icon={BookOpen} to="/network" collapsed={collapsed} />
            </li>
            <li>
              <NavLink
                label="Annotational System"
                Icon={BookOpen}
                to="/annotation-sys"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Contacts And Communication"
                Icon={BookOpen}
                to="/communicational-system"
                collapsed={collapsed}
              />
            </li>
            <li>
              <NavLink
                label="Settings And Preferences"
                Icon={BookOpen}
                to="/settings"
                collapsed={collapsed}
              />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

function NavLink({
  label,
  Icon,
  to,
  exact,
  collapsed = false,
  featured = false,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  to: string;
  exact?: boolean;
  collapsed?: boolean;
  featured?: boolean;
}) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      activeOptions={{ exact: exact ?? false }}
      className={`group flex w-full items-center rounded-lg py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-primary ${collapsed ? (featured ? "flex-col gap-0.5 px-0 text-[9px]" : "justify-center px-0") : "gap-3 px-3"} ${featured ? "border border-primary/25 bg-primary/10 font-semibold text-primary" : ""}`}
    >
      <Icon
        className={`size-4 shrink-0 ${featured ? "text-primary" : "text-muted-foreground group-data-[status=active]:text-primary"}`}
      />
      {(!collapsed || featured) && <span className="truncate">{collapsed ? "Atlas" : label}</span>}
    </Link>
  );
}
