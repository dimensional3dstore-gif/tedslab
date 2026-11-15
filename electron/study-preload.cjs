const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("studyLabDesktop", Object.freeze({
  platform: process.platform,
  appName: "Study Lab",
  focusWindow: true,
  // This reports the desktop shell only. It does not claim to lock macOS itself.
  lockScope: "in-app",
  setKiosk: (enabled) => ipcRenderer.invoke("study-lab:set-kiosk", enabled),
}));
