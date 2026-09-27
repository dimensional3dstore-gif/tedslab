export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("label" in body) || typeof body.label !== "string") {
    return Response.json({ error: "A string label is required." }, { status: 400 });
  }
  const label = body.label.trim();
  if (!label || label.length > 120) {
    return Response.json({ error: "The label must contain 1 to 120 characters." }, { status: 400 });
  }
  return Response.json({
    label,
    normalizedLabel: label.replace(/\s+/g, " "),
    identified: false,
    source: "manual-input",
  });
}
