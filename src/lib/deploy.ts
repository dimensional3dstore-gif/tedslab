import { createServerFn } from "@tanstack/react-start";
import { adminMiddleware } from "@/lib/auth/admin-middleware";

const TEAM_ID = process.env.VERCEL_TEAM_ID || "team_n1Ahg19MaVMKeE6YxDZ2e8Ea";
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || "dimensional3dstore-gif";
const REPO_NAME = process.env.GITHUB_REPO_NAME || "tedslab";
const PRODUCTION_BRANCH = process.env.GITHUB_PRODUCTION_BRANCH || "main";

async function vercelRequest(path: string, init: RequestInit = {}) {
  if (!process.env.VERCEL_TOKEN) {
    throw new Error("Vercel deployment is not configured. Add VERCEL_TOKEN to production.");
  }

  const response = await fetch("https://api.vercel.com" + path, {
    ...init,
    headers: {
      Authorization: "Bearer " + process.env.VERCEL_TOKEN,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  let body: any = {};
  try {
    body = JSON.parse(text);
  } catch {}

  if (!response.ok) {
    throw new Error(
      body?.error?.message ||
        body?.message ||
        "Vercel request failed (" + response.status + ").",
    );
  }

  return body;
}

export const deployWebsite = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const projectName = process.env.VERCEL_PROJECT_NAME || "tedslab";

    const deployment = await vercelRequest(
      "/v13/deployments?teamId=" + encodeURIComponent(TEAM_ID),
      {
        method: "POST",
        body: JSON.stringify({
          name: projectName,
          project: projectName,
          target: "production",
          gitSource: {
            type: "github",
            org: REPO_OWNER,
            repo: REPO_NAME,
            ref: PRODUCTION_BRANCH,
          },
        }),
      },
    );

    return {
      success: true,
      deploymentId: deployment.id || null,
      status: deployment.status || "INITIALIZING",
      url: deployment.url ? "https://" + deployment.url : null,
      project: projectName,
      repository: REPO_OWNER + "/" + REPO_NAME,
      branch: PRODUCTION_BRANCH,
    };
  });
