-- Ted's Lab content hierarchy: Subject -> Topic -> Article.
-- Legacy sections remain intact for backwards compatibility, but are no longer a parent level.
ALTER TABLE public.topics
  ADD COLUMN IF NOT EXISTS subject_id text,
  ADD COLUMN IF NOT EXISTS subject_slug text;

UPDATE public.topics t
SET subject_id = s.subject_id,
    subject_slug = sub.slug
FROM public.sections s
JOIN public.subjects sub ON sub.id = s.subject_id
WHERE t.section_id = s.id
  AND (t.subject_id IS NULL OR t.subject_slug IS NULL);

-- Preserve existing subject pathways by promoting each section to a topic.
INSERT INTO public.topics (id, section_id, subject_id, subject_slug, slug, title, blurb, body, image_url, sort)
SELECT 'topic-' || s.id, s.id, s.subject_id, sub.slug, s.slug, s.title,
       s.description, s.body, s.image_url, s.sort
FROM public.sections s
JOIN public.subjects sub ON sub.id = s.subject_id
WHERE NOT EXISTS (
  SELECT 1 FROM public.topics t
  WHERE t.slug = s.slug AND t.subject_slug = sub.slug
);

ALTER TABLE public.topics
  ALTER COLUMN subject_id SET NOT NULL,
  ALTER COLUMN subject_slug SET NOT NULL,
  ALTER COLUMN section_id DROP NOT NULL;

ALTER TABLE public.topics
  ADD CONSTRAINT topics_subject_id_fkey
    FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE,
  ADD CONSTRAINT topics_subject_slug_fkey
    FOREIGN KEY (subject_slug) REFERENCES public.subjects(slug) ON DELETE CASCADE;

CREATE UNIQUE INDEX IF NOT EXISTS topics_slug_subject_slug_key
  ON public.topics (slug, subject_slug);

ALTER TABLE public.articles
  ALTER COLUMN topic_slug SET NOT NULL;

ALTER TABLE public.articles
  ADD CONSTRAINT articles_topic_subject_fkey
    FOREIGN KEY (topic_slug, subject_slug)
    REFERENCES public.topics (slug, subject_slug)
    ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_topics_subject_id_sort
  ON public.topics (subject_id, sort);
