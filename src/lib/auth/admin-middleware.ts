import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getSessionUser, UnauthorizedError } from "./verify.server";

export const adminMiddleware = createMiddleware({ type: "function" })
  .server(async ({ next }) => {
    const request = getRequest();
    if (!request) throw new UnauthorizedError();

    const user = await getSessionUser();
    if (!user) throw new UnauthorizedError();

    let roleIsAdmin = false;
    try {
      const { getSql } = await import("../db");
      const sql = await getSql();
      const rows = await sql.query<{ ok: number }>(
        "select 1 as ok from user_roles where user_id::text = $1 and role = 'admin' limit 1",
        [user.id],
      );
      roleIsAdmin = rows.length > 0;
    } catch {
      // Fall back to the explicit admin email allowlist when the deployment
      // does not expose the legacy user_roles table.
    }

    const configuredEmails = (process.env.TEDSLAB_ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!roleIsAdmin && !configuredEmails.includes((user.email || "").toLowerCase())) {
      throw new Error("Admin access required.");
    }

    return next({ context: { userId: user.id, adminEmail: user.email } });
  });
