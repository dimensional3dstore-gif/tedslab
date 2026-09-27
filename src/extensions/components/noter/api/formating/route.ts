const wrappers = {
  bold: ["**", "**"],
  italic: ["*", "*"],
  underline: ["<u>", "</u>"],
  strike: ["~~", "~~"],
} as const;

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("text" in body) ||
    typeof body.text !== "string" ||
    !("format" in body) ||
    typeof body.format !== "string"
  )
    return Response.json({ error: "A text value and format are required." }, { status: 400 });
  if (body.text.length > 20_000 || !(body.format in wrappers))
    return Response.json(
      { error: "Text is too long or the format is unsupported." },
      { status: 400 },
    );
  const [before, after] = wrappers[body.format as keyof typeof wrappers];
  return Response.json({ text: `${before}${body.text}${after}`, format: body.format });
}
