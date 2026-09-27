const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("chronosOS", {
  omlx: {
    listModels: (baseUrl, apiKey) => ipcRenderer.invoke("chronos-omlx:list", baseUrl, apiKey),
    loadModel: (baseUrl, modelId, apiKey) =>
      ipcRenderer.invoke("chronos-omlx:load", baseUrl, modelId, apiKey),
    chat: (baseUrl, modelId, messages, apiKey) =>
      ipcRenderer.invoke("chronos-omlx:chat", baseUrl, modelId, messages, apiKey),
  },
});