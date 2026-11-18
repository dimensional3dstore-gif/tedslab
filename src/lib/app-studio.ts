import Anthropic from "@anthropic-ai/sdk";
import { createServerFn } from "@tanstack/react-start";
import { adminMiddleware } from "@/lib/auth/admin-middleware";
import { getSql } from "@/lib/db";

export type AppProject = {
  id: string; user_id: string; name: string; slug: string; prompt: string;
  html: string; css: string; js: string; status: string;
  deployment_url: string | null; custom_domain: string | null;
  vercel_project_id: string | null; vercel_deployment_id: string | null;
  created_at: string; updated_at: string;
};

const TEAM_ID = process.env.VERCEL_TEAM_ID || "team_n1Ahg19MaVMKeE6YxDZ2e8Ea";
const APP_DOMAIN = (process.env.TEDSLAB_APP_DOMAIN || "tedslab.app").replace(/^https?:\/\//, "").replace(/\/$/, "");

function slugify(value: string) {
  const slug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  return slug || "tedslab-app";
}

async function ensureTable() {
  const sql = await getSql();
  await sql`
    create table if not exists tedslab_app_projects (
      id uuid primary key default gen_random_uuid(),
      user_id text not null,
      name text not null,
      slug text not null unique,
      prompt text not null default '',
      html text not null default '',
      css text not null default '',
      js text not null default '',
      status text not null default 'draft',
      deployment_url text,
      custom_domain text,
      vercel_project_id text,
      vercel_deployment_id text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;
  return sql;
}

async function generateFiles(prompt: string, name: string) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Ted's Lab app generation is not configured yet. Add ANTHROPIC_API_KEY to production.");
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: process.env.TEDSLAB_APP_MODEL || "claude-3-5-sonnet-20241022",
    max_tokens: 12000,
    system: "You are Ted's Lab App Builder. Generate a polished self-contained web app from a natural-language request. Return ONLY valid JSON with exactly these string fields: html, css, js. HTML is the complete page body, CSS is complete responsive CSS, and JS is vanilla browser JavaScript. Do not use npm packages, imports, external scripts, secrets, API keys, tracking code, or credential collection. Make it accessible, responsive, and production-quality. App name: \"" + name + "\"",
    messages: [{ role: "user", content: prompt }],
  });
  const block = response.content.find((part) => part.type === "text");
  if (!block || block.type !== "text") throw new Error("The app generator returned no code.");
  const raw = block.text.trim().replace(/^\`\`\`json\s*/i, "").replace(/\s*\`\`\`$/i, "");
  const parsed = JSON.parse(raw);
  if (!parsed.html || !parsed.css || typeof parsed.js !== "string") throw new Error("The generated project is incomplete.");
  return parsed as { html: string; css: string; js: string };
}

async function vercelRequest(path: string, init: RequestInit = {}) {
  if (!process.env.VERCEL_TOKEN) {
    throw new Error("Vercel deployment is not configured yet. Add VERCEL_TOKEN to production.");
  }
  const response = await fetch("https://api.vercel.com" + path, {
    ...init,
    headers: { Authorization: "Bearer " + process.env.VERCEL_TOKEN, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await response.text();
  let body: any = {};
  try { body = JSON.parse(text); } catch {}
  if (!response.ok) throw new Error(body?.error?.message || body?.message || "Vercel request failed (" + response.status + ").");
  return body;
}

async function bindTedslabDomain(projectId: string, hostname: string) {
  try {
    return await vercelRequest("/v10/projects/" + encodeURIComponent(projectId) + "/domains?teamId=" + encodeURIComponent(TEAM_ID), {
      method: "POST",
      body: JSON.stringify({ name: hostname }),
    });
  } catch (error) {
    if (/already exists|domain.*already/i.test(error instanceof Error ? error.message : "")) return null;
    throw error;
  }
}

async function deployStaticProject(slug: string, files: { html: string; css: string; js: string }) {
  const hostname = slug + "." + APP_DOMAIN;
  if (!hostname.endsWith("." + APP_DOMAIN)) throw new Error("Apps may only be deployed under " + APP_DOMAIN + ".");

  const project = await vercelRequest("/v11/projects?teamId=" + encodeURIComponent(TEAM_ID), {
    method: "POST",
    body: JSON.stringify({ name: slug, framework: null, buildCommand: null, outputDirectory: null, installCommand: null, devCommand: null }),
  }).catch(async (error) => {
    if (/already exists|already in use/i.test(error.message)) {
      return vercelRequest("/v9/projects/" + encodeURIComponent(slug) + "?teamId=" + encodeURIComponent(TEAM_ID));
    }
    throw error;
  });

  const projectId = project.id || slug;
  // Bind the Ted's Lab hostname before publishing. If the domain cannot be
  // attached to this project, no production deployment is created.
  await bindTedslabDomain(projectId, hostname);

  const deployment = await vercelRequest("/v13/deployments?teamId=" + encodeURIComponent(TEAM_ID), {
    method: "POST",
    body: JSON.stringify({
      name: slug,
      project: projectId,
      target: "production",
      files: [
        {
          file: "index.html",
          data:
            "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"robots\" content=\"index,follow,max-image-preview:large\"><meta name=\"description\" content=\"" +
            files.html.replace(/<[^>]*>/g, " ").replace(/\\s+/g, " ").trim().slice(0, 300).replace(/&/g, "&amp;").replace(/"/g, "&quot;") +
            "\"><link rel=\"canonical\" href=\"https://" + hostname + "/\"><title>" +
            slug.replace(/-/g, " ") +
            " — Ted's Lab</title></head><body>" +
            files.html +
            "<link rel=\"stylesheet\" href=\"/styles.css\"><script src=\"/app.js\"></script></body></html>",
        },
        { file: "styles.css", data: files.css },
        { file: "app.js", data: files.js },
        { file: "robots.txt", data: "User-agent: *\\nAllow: /\\nSitemap: https://" + hostname + "/sitemap.xml\\n" },
        { file: "sitemap.xml", data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"><url><loc>https://" + hostname + "/</loc></url></urlset>" },
      ],
    }),
  });

  return {
    projectId: project.id || null,
    deploymentId: deployment.id || null,
    url: "https://" + hostname,
    vercelUrl: deployment.url ? "https://" + deployment.url : null,
  };
}

export const createAppProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .handler(async ({ data, context }) => {
    const input = data as { name: string; prompt: string };
    if (!input?.name?.trim() || !input?.prompt?.trim()) throw new Error("App name and prompt are required.");
    const sql = await ensureTable();
    const slug = slugify(input.name);
    const files = await generateFiles(input.prompt, input.name.trim());
    const [row] = await sql`
      insert into tedslab_app_projects (user_id, name, slug, prompt, html, css, js, status)
      values (${context.userId}, ${input.name.trim()}, ${slug}, ${input.prompt.trim()}, ${files.html}, ${files.css}, ${files.js}, 'generated')
      on conflict (slug) do update set user_id=excluded.user_id, name=excluded.name, prompt=excluded.prompt,
        html=excluded.html, css=excluded.css, js=excluded.js, status='generated', updated_at=now()
      returning *
    `;
    return row as AppProject;
  });

export const deployAppProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .handler(async ({ data, context }) => {
    const { id } = data as { id: string };
    const sql = await ensureTable();
    const [project] = await sql`select * from tedslab_app_projects where id=${id} limit 1`;
    if (!project) throw new Error("App project not found.");
    const deployment = await deployStaticProject(project.slug, { html: project.html, css: project.css, js: project.js });
    const customDomain = project.slug + "." + APP_DOMAIN;
    await sql`
      update tedslab_app_projects set status='deployed', deployment_url=${deployment.url},
        custom_domain=${customDomain}, vercel_project_id=${deployment.projectId},
        vercel_deployment_id=${deployment.deploymentId}, updated_at=now()
      where id=${id}
    `;
    return { ...deployment, customDomain };
  });

export const listPublishedApps = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await ensureTable();
    return await sql`
      select id,name,slug,prompt,status,custom_domain,deployment_url,updated_at
      from tedslab_app_projects
      where status = 'deployed' and custom_domain is not null
      order by name asc
    ` as Array<Pick<AppProject, "id" | "name" | "slug" | "prompt" | "status" | "custom_domain" | "deployment_url" | "updated_at">>;
  });

export const listAppProjects = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await ensureTable();
    return await sql`
      select id,user_id,name,slug,prompt,status,deployment_url,custom_domain,vercel_project_id,vercel_deployment_id,created_at,updated_at
      from tedslab_app_projects order by updated_at desc
    ` as AppProject[];
  });

export const getAppProject = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ data }) => {
    const sql = await ensureTable();
    const [row] = await sql`select * from tedslab_app_projects where id=${(data as { id: string }).id} limit 1`;
    if (!row) throw new Error("App project not found.");
    return row as AppProject;
  });
