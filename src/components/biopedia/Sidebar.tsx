/* eslint-disable react-refresh/only-export-components */
import * as LucideIcons from "lucide-react";
import {
  Sprout,
  NotebookPen,
  Layers,
  Bookmark,
  Plus,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  BrainCircuit,
  Download,
  Microscope,
  FilePenLine,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  useSubjects,
  useSections,
  useTopics,
  useArticles,
  useNavLinks,
  useSettings,
} from "@/lib/content";
import { getChronosOSDownloadUrl } from "@/lib/chronos-os-download";
import { Skeleton } from "@/components/ui/skeleton";
import { AiAssistPanel } from "../atlas/AiAssist";
import { useAuth } from "@/hooks/use-auth";

export const studyTools = [
  { label: "AI Tutor", icon: BrainCircuit, to: "/ai" },
  { label: "Nexium", icon: LucideIcons.Brackets, to: "/llm" },
  { label: "Notebook", icon: NotebookPen, to: "/notebook" },
  { label: "Docs", icon: FilePenLine, to: "/docs" },
  { label: "Flashcards", icon: Layers, to: "/flashcards" },
  { label: "Saved Content", icon: Bookmark, to: "/saved" },
  { label: "Create Custom List", icon: Plus, to: "/custom-lists" },
  { label: "Translate", icon: LucideIcons.SpeakerIcon, to: "/translate" },
  { label: "Apps", icon: LucideIcons.Layers3, to: "/apps" },
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
  const { data: topics } = useTopics();
  const { data: articles } = useArticles();
  const { data: navLinks } = useNavLinks();
  const { data: settings } = useSettings();
  const { isAdmin } = useAuth();
  const chronosDownloadUrl = getChronosOSDownloadUrl();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const collapsed = false;

  const brandName = settings?.["site_name"] ?? "Ted's Lab";
  const brandTagline =
    settings?.["site_tagline"] ?? "The Learning Encyclopedia";

  const toolLinks = navLinks?.filter((n) => n.group_name === "tools") ?? [];
  const resolvedStudyTools = [
    { label: "AI Tutor", icon: BrainCircuit, to: "/ai" },
    ...toolLinks.map((n) => ({
      label: n.label,
      icon: resolveIcon(n.icon),
      to: n.href,
    })),
    ...studyTools
      .filter((t) => t.to !== "/ai")
      .map((t) => ({ label: t.label, icon: t.icon, to: t.to })),
  ].filter((tool, index, array) => {
    return (
      array.findIndex(
        (item) => item.to === tool.to && item.label === tool.label,
      ) === index
    );
  });
  const topicsBySubject = new Map<string, typeof topics>();
  for (const subject of subjects ?? []) {
    topicsBySubject.set(
      subject.id,
      (topics ?? [])
        .filter((topic) => topic.subject_id === subject.id)
        .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0) || a.title.localeCompare(b.title)),
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
                <p className="mt-1 text-xs text-muted-foreground">
                  {brandTagline}
                </p>
              </div>
            )}
          </Link>

        </div>

        <nav
          className={`flex-1 overflow-y-auto py-3 ${collapsed ? "px-2" : "px-3"}`}
        >

          <ul className="space-y-0.5">
            <li><NavLink label="Home" Icon={LucideIcons.Home} to="/" exact collapsed={collapsed} /></li>
            <li><NavLink label="Study Lab" Icon={LucideIcons.GraduationCap} to="/study" collapsed={collapsed} /></li>
            <li><NavLink label="Ted's Lab Pro" Icon={LucideIcons.Crown} to="/premium" collapsed={collapsed} featured /></li>
          </ul>

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              KNOWLEDGE
            </p>
          )}
          <ul className="space-y-0.5">
            <li><NavLink label="QuantumPedia" Icon={LucideIcons.Atom} to="/quantumpedia" collapsed={collapsed} featured /></li>
            <li><NavLink label="Dictionary" Icon={LucideIcons.BookMarked} to="/dictionary" collapsed={collapsed} /></li>
            <li><NavLink label="Knowledge Atlas" Icon={LucideIcons.Network} to="/knowledge-atlas" collapsed={collapsed} /></li>
            <li><NavLink label="Change Encyclopaedia" Icon={LucideIcons.Globe2} to="/change-encyclopaedia" collapsed={collapsed} featured /></li>
            <li><NavLink label="ChronosOS Deepmind" Icon={BrainCircuit} to="/chronosos-deepmind" collapsed={collapsed} featured /></li>
            <li><NavLink label="Micro-Atlas" Icon={Microscope} to="/microatlas" collapsed={collapsed} /></li>
            <li><NavLink label="Lost Atlas" Icon={LucideIcons.EarthIcon} to="/lost-atlas" collapsed={collapsed} /></li>
          </ul>

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              SUBJECTS
            </p>
          )}
          <ul className="space-y-1">
            {subjectsLoading ? (
              <li className="space-y-1 px-3 py-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full rounded-lg" />)}</li>
            ) : (subjects ?? []).map((subject) => {
              const subjectTopics = (topicsBySubject.get(subject.id) ?? []);
              const subjectKey = "subject:" + subject.slug;
              const subjectOpen = expanded.has(subjectKey);
              return (
                <li key={subject.id}>
                  <div className="flex items-center gap-1">
                    <div className="min-w-0 flex-1">
                      <NavLink label={subject.title} Icon={resolveIcon(subject.icon)} to={"/" + subject.slug} collapsed={collapsed} />
                    </div>
                    {!collapsed && subjectTopics.length > 0 && (
                      <button
                        type="button"
                        aria-label={subjectOpen ? "Collapse " + subject.title + " topics" : "Expand " + subject.title + " topics"}
                        aria-expanded={subjectOpen}
                        onClick={() => toggle(subjectKey)}
                        className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        {subjectOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                      </button>
                    )}
                  </div>
                  {!collapsed && subjectOpen && subjectTopics.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-2">
                      {subjectTopics.map((topic) => {
                        const topicKey = "topic:" + subject.slug + ":" + topic.slug;
                        const topicOpen = expanded.has(topicKey);
                        const topicArticles = (articles ?? [])
                          .filter((article) => article.published === true && article.topic_slug === topic.slug && article.subject_slug === subject.slug)
                          .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0) || a.title.localeCompare(b.title));
                        return (
                          <li key={topic.id}>
                            <div className="flex items-center gap-1">
                              <Link
                                to={"/" + subject.slug + "/" + topic.slug}
                                title={topic.title}
                                className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-2 text-xs text-sidebar-foreground transition-colors hover:bg-secondary hover:text-primary"
                              >
                                <Layers className="size-3.5 shrink-0 text-muted-foreground" />
                                <span className="truncate">{topic.title}</span>
                                <span className="ml-auto text-[10px] text-muted-foreground">{topicArticles.length}</span>
                              </Link>
                              <button
                                type="button"
                                aria-label={topicOpen ? "Collapse " + topic.title + " articles" : "Expand " + topic.title + " articles"}
                                aria-expanded={topicOpen}
                                onClick={() => toggle(topicKey)}
                                className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                              >
                                {topicOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                              </button>
                            </div>
                            {topicOpen && (
                              <ul className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-2">
                                {topicArticles.length ? topicArticles.map((article) => (
                                  <li key={article.id}>
                                    <Link
                                      to={"/articles/" + article.slug}
                                      title={article.title}
                                      className="flex items-start gap-2 rounded-md px-2 py-1.5 text-[11px] leading-snug text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                                    >
                                      <BookOpen className="mt-0.5 size-3 shrink-0" />
                                      <span className="line-clamp-2">{article.title}</span>
                                    </Link>
                                  </li>
                                )) : (
                                  <li className="px-2 py-1.5 text-[10px] text-muted-foreground">No published articles yet</li>
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              LIBRARY
            </p>
          )}
          <ul className="space-y-0.5 pb-4">
            <li>
              <NavLink label="Study Enlist" Icon={LucideIcons.GraduationCap} to="/study" collapsed={collapsed} />
            </li>
            <li>
              <NavLink label="Study Archive" Icon={LucideIcons.Archive} to="/study/archive" collapsed={collapsed} />
            </li>
            <li>
              <NavLink
                label="All Pages"
                Icon={FileText}
                to="/pages"
                collapsed={collapsed}
              />
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

          {isAdmin && (
            <>
              {!collapsed && (
                <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
                  ADMIN STUDIO
                </p>
              )}
              <ul className="space-y-0.5 pb-4">
                <li><NavLink label="Admin dashboard" Icon={LucideIcons.LayoutDashboard} to="/admin" collapsed={collapsed} /></li>
                <li><NavLink label="App Studio" Icon={LucideIcons.Layers3} to="/studio" collapsed={collapsed} /></li>
                <li><NavLink label="Edit articles" Icon={FilePenLine} to="/admin/articles" collapsed={collapsed} /></li>
                <li><NavLink label="Article submissions" Icon={FilePenLine} to="/admin/article-submissions" collapsed={collapsed} /></li>
                <li><NavLink label="Add article" Icon={Plus} to="/admin/articles/new" collapsed={collapsed} /></li>
                <li><NavLink label="Manage subjects" Icon={LucideIcons.BookOpen} to="/admin/subjects" collapsed={collapsed} /></li>
                <li><NavLink label="Transfer Atlas articles" Icon={LucideIcons.Network} to="/admin/atlas-import" collapsed={collapsed} /></li>
                <li><NavLink label="Add topic" Icon={LucideIcons.Tag} to="/admin/topics" collapsed={collapsed} /></li>
                <li><NavLink label="Add section" Icon={LucideIcons.Folders} to="/admin/sections" collapsed={collapsed} /></li>
                <li><NavLink label="Add video" Icon={LucideIcons.Video} to="/admin/videos/new" collapsed={collapsed} /></li>
                <li><NavLink label="Add quiz" Icon={LucideIcons.ListChecks} to="/admin/quizzes/new" collapsed={collapsed} /></li>
                <li><NavLink label="Add flashcard" Icon={Layers} to="/admin/flashcards/new" collapsed={collapsed} /></li>
                <li><NavLink label="Annotations" Icon={LucideIcons.Highlighter} to="/admin/articles" collapsed={collapsed} /></li>
              </ul>
            </>
          )}

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              TED'S LAB APPS
            </p>
          )}
          <ul className="space-y-0.5 pb-3">
            <li><a href="https://unit-converter-kiwuppmp5-dimensional3dstore-gif.vercel.app" className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary"><LucideIcons.Calculator className="size-4 text-muted-foreground group-hover:text-primary" /><span>Unit Converter</span></a></li>
            <li><a href="https://json-formatter-e064u7zcv-dimensional3dstore-gif.vercel.app" className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary"><LucideIcons.Braces className="size-4 text-muted-foreground group-hover:text-primary" /><span>JSON Formatter</span></a></li>
            <li><a href="https://regex-tester-dx11bkgon-dimensional3dstore-gif.vercel.app" className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary"><LucideIcons.Regex className="size-4 text-muted-foreground group-hover:text-primary" /><span>Regex Tester</span></a></li>
            <li><a href="https://markdown-previewer-1gzu17f42-dimensional3dstore-gif.vercel.app" className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary"><FileText className="size-4 text-muted-foreground group-hover:text-primary" /><span>Markdown Previewer</span></a></li>
          </ul>

          {!collapsed && (
            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80">
              STUDY TOOLS
            </p>
          )}
          <ul className="space-y-0.5 pb-4">
            {resolvedStudyTools.map((item) => (
              <li key={`${item.label}-${item.to}`}>
                <NavLink
                  label={item.label}
                  Icon={item.icon}
                  to={item.to}
                  collapsed={collapsed}
                />
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
                  href={chronosDownloadUrl}
                  download="Chronos.dmg"
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary"
                >
                  <Download className="size-4 text-muted-foreground group-hover:text-primary" />
                  <span className="truncate">Download ChronosOS</span>
                </a>
              )}
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
      {(!collapsed || featured) && (
        <span className="truncate">{collapsed ? "Atlas" : label}</span>
      )}
    </Link>
  );
}
