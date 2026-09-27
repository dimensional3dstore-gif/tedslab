# Backend Agent Responsibilities

The backend agent owns service boundaries, data validation, persistence, and authorization.

- Trace requests from the route handler to the database or external provider.
- Keep secrets server-side and reject untrusted identifiers by default.
- Use typed schemas and predictable response contracts.
- Preserve transaction and idempotency guarantees where relevant.
- Add tests for unauthorized, invalid, duplicate, and upstream-failure cases.
- Explain any migration or deployment requirement alongside the code change.
