const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("aquarius", {
  navigate: (address) => ipcRenderer.invoke("aquarius:navigate", address),
});
