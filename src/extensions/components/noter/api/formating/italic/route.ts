export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("text" in body) ||
    typeof body.text !== "string" ||
    body.text.length > 20_000
  )
    return Response.json(
      { error: "A text string of at most 20,000 characters is required." },
      { status: 400 },
    );
  return Response.json({ text: `*${body.text}*`, format: "italic" });
}
