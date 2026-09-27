# Backend Engineering

- Keep business rules in testable server-side modules.
- Validate request bodies and query parameters at entry points.
- Enforce authentication, authorization, and row-level access independently.
- Use migrations for schema changes and make seed operations repeatable.
- Handle external calls with timeouts and bounded response sizes.
- Return errors that help the client recover without exposing internals.
- Add tests for permissions, malformed input, concurrency, and failure paths.
