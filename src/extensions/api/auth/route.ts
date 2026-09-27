export function GET(): Response {
  const configured = Boolean(
    import.meta.env?.["VITE_SUPABASE_URL"] && import.meta.env?.["VITE_SUPABASE_ANON_KEY"],
  );
  return Response.json({ configured, provider: "supabase", clientManaged: true });
}
