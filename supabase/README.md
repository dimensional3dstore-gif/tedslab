# Ted's Lab Supabase

This directory contains the database source of truth used by Ted's Lab.

## Structure

- `migrations/` — versioned migrations applied to the Supabase project.
- `sql/01_content_schema.sql` — content table definitions and indexes.
- `sql/02_content_security.sql` — RLS policies and public/admin access model.
- `sql/03_article_editor.sql` — article publishing workflow, indexes and timestamp trigger.

## Article workflow

The admin editor writes to `public.articles`.

- `draft`: saved privately for continued editing.
- `review`: editorial review state.
- `published`: visible to the public site.

The article body is structured JSON consumed by the public article template.

## Security

The browser uses Supabase's publishable client only. Admin writes require a valid authenticated session and `public.is_admin()`. No password or service-role credential belongs in source control.

## Applying schema changes

Use the Supabase migration system for production schema changes. The SQL files under `sql/` are readable source-of-truth/reference files; the versioned migration files under `migrations/` are the deployment history.
