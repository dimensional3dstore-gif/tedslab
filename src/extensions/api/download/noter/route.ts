export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("text" in body) ||
    typeof body.text !== "string" ||
    body.text.length > 1_000_000
  )
    return Response.json({ error: "A note of at most 1 MB is required." }, { status: 400 });
  return new Response(body.text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="notes.txt"',
    },
  });
}
