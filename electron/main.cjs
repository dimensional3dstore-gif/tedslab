const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");

const defaultUrl = "https://tedslab.com";
const appUrl = new URL(process.env.AQUARIUS_URL || defaultUrl);
const rendererPath = path.join(__dirname, "aquarius.html");

if (!["https:", "http:"].includes(appUrl.protocol)) {
  throw new Error("AQUARIUS_URL must use HTTP or HTTPS.");
}

const internalRoutes = {
  "tedslab://": "/",
  "apps://core": "/",
  "apps://knowledge-atlas": "/knowledge-atlas",
  "apps://quantumpedia": "/quantumpedia",
  "apps://dictionary": "/dictionary",
  "apps://study": "/study",
  "apps://study-archive": "/study/archive",
  "apps://docs": "/docs",
  "apps://notebooks": "/notebooks",
  "apps://flashcards": "/flashcards",
  "apps://help": "/help",
  "articles://": "/articles/",
  "tools://": "/search-lab?q=",
  "blog://": "/blogger?q=",
  "posts://": "/blogger?q=",
  "help://": "/search-lab?q=",
  "category://": "/search-lab?q=",
  "admin://": "/admin/",
  "features://": "/features",
  "settings://": "/settings",
  "history://": "/history",
  "ai://": "/ai",
};

function resolveAquariusAddress(address) {
  const value = String(address || "").trim();
  if (!value || value === "tedslab.com" || value === "www.tedslab.com") {
    return appUrl.href;
  }
  if (/^https?:\/\//i.test(value)) return value;

  if (value.startsWith("dict-articles://")) {
    return new URL(
      "/dictionary/" + encodeURIComponent(value.slice("dict-articles://".length)),
      appUrl,
    ).href;
  }

  if (value.startsWith("tedslab://")) {
    const path = value.slice("tedslab://".length).replace(/^\/+/, "");
    return new URL(path ? "/" + path : "/", appUrl).href;
  }

  if (value.startsWith("apps://")) {
    const route =
      internalRoutes[value] ??
      "/" + value.slice("apps://".length).replace(/^\/+/, "");
    return new URL(route, appUrl).href;
  }

  for (const [scheme, route] of Object.entries(internalRoutes)) {
    if (value.startsWith(scheme)) {
      const target = value.slice(scheme.length).replace(/^\/+/, "");
      if (scheme === "articles://") return new URL("/articles/" + encodeURIComponent(target), appUrl).href;
      if (scheme === "tools://") return new URL("/search-lab?q=" + encodeURIComponent(target), appUrl).href;
      if (scheme === "blog://" || scheme === "posts://") return new URL("/blogger/" + encodeURIComponent(target), appUrl).href;
      if (scheme === "help://") return new URL("/help-center?q=" + encodeURIComponent(target), appUrl).href;
      if (scheme === "category://") return new URL("/" + encodeURIComponent(target), appUrl).href;
      if (scheme === "admin://") return new URL(route + target, appUrl).href;
      return new URL(route + target, appUrl).href;
    }
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}\//i.test(value)) {
    return "https://" + value;
  }

  return new URL("/search?q=" + encodeURIComponent(value), appUrl).href;
}

ipcMain.handle("aquarius:navigate", async (event, address) => {
  if (!event.senderFrame.url.startsWith("file://")) {
    throw new Error("Only the Aquarius renderer may navigate the desktop browser.");
  }

  const target = resolveAquariusAddress(address);
  const parsed = new URL(target);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Aquarius only navigates to HTTP(S) content.");
  }

  await event.sender.loadURL(target);
  return target;
});

function createWindow() {
  const window = new BrowserWindow({
    width: 1180,
    height: 800,
    minWidth: 760,
    minHeight: 620,
    title: "Aquarius — Ted's Lab",
    backgroundColor: "#ffffff",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    const target = new URL(url);
    if (["http:", "https:"].includes(target.protocol)) {
      void shell.openExternal(target.href);
    }
    return { action: "deny" };
  });

  void window.loadFile(rendererPath);
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
