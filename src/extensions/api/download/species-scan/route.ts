export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("species" in body) ||
    typeof body.species !== "string" ||
    body.species.trim().length === 0
  )
    return Response.json({ error: "A species name is required." }, { status: 400 });
  const report = {
    species: body.species.trim().slice(0, 160),
    createdAt: new Date().toISOString(),
    source: "user observation",
  };
  return new Response(JSON.stringify(report, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="species-scan.json"',
    },
  });
}
