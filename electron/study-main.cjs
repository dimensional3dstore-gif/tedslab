const { app, BrowserWindow, Menu } = require("electron");
const path = require("node:path");

const defaultUrl = "https://tedslab-dimensional3dstore-gif.vercel.app/study?desktop=1&focus=1";
const appUrl = new URL(process.env.STUDY_LAB_URL || defaultUrl);
const allowedHosts = new Set(["tedslab-dimensional3dstore-gif.vercel.app", "teds-lab.com", "localhost", "127.0.0.1"]);
if (!allowedHosts.has(appUrl.hostname) || (appUrl.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(appUrl.hostname))) {
  throw new Error("Study Lab must load from a trusted Ted Lab HTTPS origin.");
}
const trustedOrigin = appUrl.origin;

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 900,
    minHeight: 650,
    title: "Study Lab",
    backgroundColor: "#0b1020",
    autoHideMenuBar: true,
    fullscreen: true,
    kiosk: process.env.STUDY_LAB_KIOSK !== "0",
    webPreferences: {
      preload: path.join(__dirname, "study-preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: false,
    },
  });

  window.webContents.on("will-navigate", (event, target) => {
    try {
      if (new URL(target).origin !== trustedOrigin) event.preventDefault();
    } catch {
      event.preventDefault();
    }
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    // Study Lab is intentionally self-contained; external links are not opened.
    return { action: "deny" };
  });
  window.webContents.on("before-input-event", (event, input) => {
    const key = input.key.toLowerCase();
    const devToolsShortcut =
      (input.control || input.meta) && input.shift && ["i", "j", "c"].includes(key);
    const reloadShortcut = (input.control || input.meta) && ["r", "f5"].includes(key);
    if (devToolsShortcut || reloadShortcut || key === "f12") event.preventDefault();
  });
  void window.loadURL(appUrl.href);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: "Study Lab", submenu: [{ label: "About Study Lab", role: "about" }, { type: "separator" }, { label: "Exit Study Lab", accelerator: "Command+Q", click: () => app.quit() }] },
  ]));
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
