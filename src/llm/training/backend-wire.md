# Wiring a Backend

## Integration contract
1. Define request and response schemas before connecting the UI.
2. Validate input at the server boundary and return consistent status codes.
3. Authenticate the caller and authorize access to each requested resource.
4. Keep provider credentials in server-side environment variables.
5. Add timeouts, bounded retries, and useful non-sensitive error messages.
6. Test malformed input, denied access, upstream failure, and success.

Never expose service-role credentials in client bundles or logs.
