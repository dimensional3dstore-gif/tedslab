export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("model" in body) ||
    typeof body.model !== "string" ||
    !/^[a-zA-Z0-9._:/-]{1,120}$/.test(body.model)
  )
    return Response.json({ error: "Provide a valid Ollama model identifier." }, { status: 400 });
  const configuredHost = process.env["OLLAMA_BASE_URL"];
  if (!configuredHost)
    return Response.json(
      { error: "Model import is unavailable. Configure OLLAMA_BASE_URL on the server." },
      { status: 503 },
    );
  let endpoint: URL;
  try {
    endpoint = new URL("/api/pull", configuredHost);
  } catch {
    return Response.json({ error: "OLLAMA_BASE_URL is invalid." }, { status: 503 });
  }
  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: body.model, stream: false }),
      signal: AbortSignal.timeout(60_000),
    });
    const result = await upstream.json().catch(() => null);
    return Response.json(result ?? { error: "Model service returned invalid JSON." }, {
      status: upstream.status,
    });
  } catch {
    return Response.json(
      { error: "Could not reach the configured local model service." },
      { status: 502 },
    );
  }
}
