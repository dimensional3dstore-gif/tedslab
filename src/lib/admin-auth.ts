const SESSION_KEY = "tedslab-admin-session";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "TedsLab!26";

export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function loginAdmin(username: string, password: string) {
  const ok = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  if (ok) sessionStorage.setItem(SESSION_KEY, "1");
  return ok;
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
