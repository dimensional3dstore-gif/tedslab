export function GET(): Response {
  return Response.json({
    available: true,
    permissionModel: "browser",
    requiresSecureContext: true,
    endpointGrantsNoPermissions: true,
  });
}
