const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");

const defaultUrl = "https://teds-lab.com/chronos-os";
const appUrl = new URL(process.env.CHRONOS_OS_URL || defaultUrl);

if (!new Set(["https:", "http:"]).has(appUrl.protocol)) {
  throw new Error("CHRONOS_OS_URL must use HTTP or HTTPS.");
}

function requireLocalOmlxUrl(baseUrl) {
  const url = new URL(baseUrl);
  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  if (
    url.protocol !== "http:" ||
    !["127.0.0.1", "localhost", "::1"].includes(hostname) ||
    url.username ||
    url.password
  ) {
    throw new Error("The desktop model server must be an HTTP service on this Mac.");
  }
  return url;
}

async function requestOmlx(baseUrl, pathname, options = {}) {
  const { timeoutMs = 30_000, ...requestOptions } = options;
  const base = requireLocalOmlxUrl(baseUrl);
  const url = new URL(pathname, base);
  if (url.origin !== base.origin) throw new Error("The model request left the local server origin.");

  const response = await fetch(url, {
    ...requestOptions,
    redirect: "error",
    signal: AbortSignal.timeout(timeoutMs),
  });
  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const detail = payload?.detail ?? payload?.error;
    throw new Error(typeof detail === "string" ? detail : `oMLX returned HTTP ${response.status}.`);
  }
  if (payload === null) throw new Error("oMLX returned an invalid response.");
  return payload;
}

function assertTrustedRenderer(event) {
  try {
    if (new URL(event.senderFrame.url).origin !== appUrl.origin) {
      throw new Error("The ChronosOS page is not allowed to use the local model bridge.");
    }
  } catch {
    throw new Error("The ChronosOS page is not allowed to use the local model bridge.");
  }
}

function addOmlxAuthorization(headers, apiKey) {
  if (apiKey === undefined || apiKey === "") return headers;
  if (typeof apiKey !== "string" || apiKey.length > 1_024) {
    throw new Error("The oMLX API key is invalid or too long.");
  }
  return { ...headers, Authorization: `Bearer ${apiKey}` };
}

ipcMain.handle("chronos-omlx:list", async (event, baseUrl, apiKey) => {
  assertTrustedRenderer(event);
  return requestOmlx(baseUrl, "/v1/models", {
    headers: addOmlxAuthorization({ Accept: "application/json" }, apiKey),
  });
});

ipcMain.handle("chronos-omlx:load", async (event, baseUrl, modelId, apiKey) => {
  assertTrustedRenderer(event);
  if (typeof modelId !== "string" || modelId.length < 1 || modelId.length > 300) {
    throw new Error("Choose a valid local model.");
  }
  return requestOmlx(baseUrl, `/v1/models/${encodeURIComponent(modelId)}/load`, {
    method: "POST",
    headers: addOmlxAuthorization({ Accept: "application/json" }, apiKey),
    timeoutMs: 20 * 60 * 1000,
  });
});

ipcMain.handle("chronos-omlx:chat", async (event, baseUrl, modelId, messages, apiKey) => {
  assertTrustedRenderer(event);
  if (
    typeof modelId !== "string" ||
    modelId.length < 1 ||
    modelId.length > 300 ||
    !Array.isArray(messages) ||
    messages.length < 1 ||
    messages.length > 32 ||
    messages.some((message) =>
      !message ||
      !["system", "user", "assistant"].includes(message.role) ||
      typeof message.content !== "string" ||
      message.content.length > 20_000,
    )
  ) {
    throw new Error("The local chat request is invalid or too large.");
  }
  return requestOmlx(baseUrl, "/v1/chat/completions", {
    method: "POST",
    headers: addOmlxAuthorization(
      { "Content-Type": "application/json", Accept: "application/json" },
      apiKey,
    ),
    body: JSON.stringify({ model: modelId, messages, temperature: 0.2, stream: false }),
    timeoutMs: 5 * 60 * 1000,
  });
});

function createWindow() {
  const window = new BrowserWindow({
    width: 1180,
    height: 800,
    minWidth: 760,
    minHeight: 620,
    title: "ChronosOS",
    backgroundColor: "#101820",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (new URL(url).origin !== appUrl.origin) event.preventDefault();
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    const target = new URL(url);
    if (["http:", "https:"].includes(target.protocol) && target.origin !== appUrl.origin) {
      void shell.openExternal(target.href);
    }
    return { action: "deny" };
  });

  void window.loadURL(appUrl.href);
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});