-- Keep the public article feed readable through the Supabase Data API.
-- RLS remains the row-level boundary: only published rows are public.
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON TABLE public.articles TO anon, authenticated;

CREATE INDEX IF NOT EXISTS articles_public_feed_sort_idx
  ON public.articles (published, status, sort, title);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'articles'
      AND policyname = 'public_read_published'
  ) THEN
    CREATE POLICY public_read_published
      ON public.articles
      FOR SELECT
      TO anon, authenticated
      USING (published = true AND status = 'published');
  END IF;
END
$$;
