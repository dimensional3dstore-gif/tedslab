export type OmlxModel = {
  id: string;
  object?: string;
  owned_by?: string;
};

export type OmlxConfig = {
  baseUrl: string;
  model: string;
  apiKey?: string;
};

export type OmlxMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OmlxDesktopBridge = {
  listModels: (baseUrl: string, apiKey?: string) => Promise<unknown>;
  loadModel: (baseUrl: string, modelId: string, apiKey?: string) => Promise<unknown>;
  chat: (
    baseUrl: string,
    modelId: string,
    messages: OmlxMessage[],
    apiKey?: string,
  ) => Promise<unknown>;
};

declare global {
  interface Window {
    chronosOS?: { omlx?: OmlxDesktopBridge };
  }
}

export function isOmlxDesktopBridgeAvailable(): boolean {
  return typeof window !== "undefined" && Boolean(window.chronosOS?.omlx);
}

function apiBase(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, "").replace(/\/v1$/, "");
}

async function readResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  let payload: unknown;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }
  if (!response.ok) {
    let message = `oMLX returned HTTP ${response.status}`;
    if (typeof payload === "object" && payload !== null) {
      if ("detail" in payload && typeof payload.detail === "string") message = payload.detail;
      else if ("error" in payload && typeof payload.error === "string") message = payload.error;
      else if (
        "error" in payload &&
        typeof payload.error === "object" &&
        payload.error !== null &&
        "message" in payload.error &&
        typeof payload.error.message === "string"
      ) {
        message = payload.error.message;
      }
    }
    throw new Error(message);
  }
  return payload;
}

function requestHeaders(apiKey: string | undefined, json = false): Headers {
  const headers = new Headers({ Accept: "application/json" });
  if (json) headers.set("Content-Type", "application/json");
  if (apiKey?.trim()) headers.set("Authorization", `Bearer ${apiKey.trim()}`);
  return headers;
}

export async function listOmlxModels(baseUrl: string, apiKey?: string): Promise<OmlxModel[]> {
  const bridge = typeof window === "undefined" ? undefined : window.chronosOS?.omlx;
  const payload = bridge
    ? await bridge.listModels(baseUrl, apiKey)
    : await readResponse(
        await fetch(`${apiBase(baseUrl)}/v1/models`, {
          headers: requestHeaders(apiKey),
        }),
      );
  if (!payload || typeof payload !== "object")
    throw new Error("oMLX returned an invalid model list.");
  const data = "data" in payload ? payload.data : undefined;
  return Array.isArray(data)
    ? data.filter((model): model is OmlxModel => typeof model?.id === "string")
    : [];
}

export async function loadOmlxModel(
  baseUrl: string,
  modelId: string,
  apiKey?: string,
): Promise<void> {
  if (!modelId.trim()) throw new Error("Select a local model first.");
  const bridge = typeof window === "undefined" ? undefined : window.chronosOS?.omlx;
  const payload = bridge
    ? await bridge.loadModel(baseUrl, modelId, apiKey)
    : await readResponse(
        await fetch(`${apiBase(baseUrl)}/v1/models/${encodeURIComponent(modelId)}/load`, {
          method: "POST",
          headers: requestHeaders(apiKey),
        }),
      );
  if (
    !payload ||
    typeof payload !== "object" ||
    !("status" in payload) ||
    payload.status !== "ok" ||
    !("model_id" in payload) ||
    payload.model_id !== modelId
  ) {
    throw new Error("oMLX did not confirm that the selected model loaded.");
  }
}

export async function chatWithOmlx(config: OmlxConfig, messages: OmlxMessage[]): Promise<string> {
  if (!config.model.trim()) throw new Error("Select an oMLX model first.");
  const bridge = typeof window === "undefined" ? undefined : window.chronosOS?.omlx;
  const payload = bridge
    ? await bridge.chat(config.baseUrl, config.model, messages, config.apiKey)
    : await readResponse(
        await fetch(`${apiBase(config.baseUrl)}/v1/chat/completions`, {
          method: "POST",
          headers: requestHeaders(config.apiKey, true),
          body: JSON.stringify({ model: config.model, messages, temperature: 0.2, stream: false }),
        }),
      );
  if (!payload || typeof payload !== "object")
    throw new Error("oMLX returned an invalid chat response.");
  const choices = "choices" in payload ? payload.choices : undefined;
  const content = Array.isArray(choices) ? choices[0]?.message?.content : undefined;
  if (typeof content !== "string" || !content.trim())
    throw new Error("oMLX returned no assistant content.");
  return content.trim();
}

export function defaultOmlxUrl(): string {
  return import.meta.env.VITE_OMLX_URL ?? "http://127.0.0.1:8000";
}
