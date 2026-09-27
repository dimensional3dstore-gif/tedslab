export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("latitude" in body) || !("longitude" in body)) {
    return Response.json({ error: "Latitude and longitude are required." }, { status: 400 });
  }
  const { latitude, longitude } = body;
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return Response.json(
      { error: "Coordinates are outside valid latitude/longitude bounds." },
      { status: 400 },
    );
  }
  return Response.json({ latitude, longitude, recordedAt: new Date().toISOString() });
}
