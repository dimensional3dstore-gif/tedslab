# Ted's Lab App Studio

Ted's Lab App Studio is a prompt-to-web-app workflow inspired by platforms such as Base44 and Lovable.

## Workflow

1. Sign in to Ted's Lab.
2. Open App Studio.
3. Describe an app in natural language.
4. Ted's Lab generates HTML, CSS, and browser JavaScript.
5. Review the generated app in the live preview.
6. Deploy it to an isolated Vercel project.
7. The intended public address is `<slug>.tedslab.app`.

## Production configuration

Server-side environment variables:

- ANTHROPIC_API_KEY — required for generation.
- VERCEL_TOKEN — required for deployment.
- VERCEL_TEAM_ID — optional; defaults to Ted's Lab's current Vercel team.
- TEDSLAB_APP_MODEL — optional Anthropic model override.

These must never be exposed as VITE_* variables.

## Domain

tedslab.app is currently available for registration, but the domain is not automatically purchased by this feature. After the domain is owned and connected to Vercel, generated apps can use subdomains such as calculator.tedslab.app and study-timer.tedslab.app.

The Vercel deployment URL remains available as a fallback for testing.
