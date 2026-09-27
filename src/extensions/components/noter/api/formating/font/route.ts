const fonts = new Set(["sans", "serif", "mono"]);

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("font" in body) ||
    typeof body.font !== "string" ||
    !fonts.has(body.font)
  )
    return Response.json({ error: "Choose sans, serif, or mono." }, { status: 400 });
  return Response.json({ font: body.font, className: `font-${body.font}` });
}
