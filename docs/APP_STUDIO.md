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

Ted's Lab is wired as:

- **GitHub:** `dimensional3dstore-gif/tedslab` is the source repository.
- **Supabase:** the connected project stores App Studio projects in `public.tedslab_app_projects`.
- **Vercel:** the `tedslab` project builds production from the GitHub `main` branch.
- **App deployments:** generated apps are published as isolated Vercel projects.

Server-side environment variables:

- `TEDSLAB_DATABASE_POSTGRES_URL` — Supabase Postgres connection supplied by the Vercel/Supabase integration.
- `ANTHROPIC_API_KEY` — required for prompt-to-app generation.
- `VERCEL_TOKEN` — required by the App Studio server function for creating isolated app deployments.
- `VERCEL_TEAM_ID` — optional; defaults to Ted's Lab's current Vercel team.
- `TEDSLAB_APP_MODEL` — optional Anthropic model override.

Never expose server-side secrets as `VITE_*` variables.

These must never be exposed as VITE_* variables.

## Domain

Generated apps are constrained in code to `<slug>.tedslab.app`. The Ted's Lab Vercel project currently has its `vercel.app` domains attached; the custom `tedslab.app` domain must be connected to Vercel before those generated subdomains can become live.

The Vercel deployment URL remains available as a fallback for testing.
