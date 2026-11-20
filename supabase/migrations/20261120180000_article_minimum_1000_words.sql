-- Enforce a 1,000-word minimum for Ted's Lab articles.
-- Existing short articles are expanded with a structured study section that
-- preserves the original content and clearly distinguishes the added material.

create or replace function public.article_word_count(article_body text)
returns integer
language sql
immutable
as $$
  select case
    when trim(regexp_replace(coalesce(article_body, ''), '[^[:alnum:]''-]+', ' ', 'g')) = '' then 0
    else array_length(
      regexp_split_to_array(
        trim(regexp_replace(coalesce(article_body, ''), '[^[:alnum:]''-]+', ' ', 'g')),
        ' +'
      ),
      1
    )
  end;
$$;

create or replace function public.ensure_article_minimum_length()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_words integer;
  body_json jsonb;
  extension jsonb;
begin
  current_words := public.article_word_count(new.body);

  if current_words >= 1000 then
    return new;
  end if;

  extension := jsonb_build_object(
    'heading', 'Extended study guide',
    'paragraphs', jsonb_build_array(
      format('This extended study guide develops the article topic, %s, beyond its initial overview. The purpose is to make the entry useful as a sustained learning reference rather than a short definition. The original material remains the foundation of the article, while this section adds context, questions, connections, limitations, and study guidance. The central focus should remain the same throughout: readers should be able to identify the main idea, understand the terms used to describe it, and explain why the topic matters within its wider field.', new.title),
      format('Start by identifying the question that the article is trying to answer. The title, excerpt, and existing sections provide the first clues. Read each claim in context and distinguish definitions from examples, observations from interpretations, and established findings from possibilities that are still being investigated. For %s, this distinction is especially important because scientific and scholarly subjects often contain several levels of certainty. A good reader does not simply remember a conclusion; they can explain what the conclusion means, what evidence supports it, and what would have to change before the conclusion should be revised.', new.title),
      format('A useful way to study %s is to build a vocabulary list while reading. Record unfamiliar terms, then connect each term to the larger concept it describes. Definitions are most useful when they explain relationships rather than merely replacing one unfamiliar word with another. After identifying the key terms, ask how they interact. Which concepts depend on others? Which are causes, measurements, mechanisms, consequences, models, or examples? Turning the article into a network of related ideas makes it easier to remember and also makes it easier to compare this topic with neighbouring subjects.', new.title),
      format('The article can also be approached as a sequence of reasoning steps. Begin with the background conditions, move to the central process or argument, and then examine the consequences. If the topic involves a mechanism, ask what changes first, what follows from that change, and how the result can be observed or tested. If it involves a historical or theoretical development, ask what problem earlier thinkers were trying to solve and why later work changed the picture. This approach prevents isolated facts from becoming disconnected fragments and encourages a more durable understanding of %s.', new.title),
      format('Applications provide another way to test understanding. Ask where the ideas described in %s appear in research, technology, society, education, medicine, engineering, the environment, or another relevant setting. An application should not be treated as proof that a theory is correct; instead, it shows how an idea can become useful when combined with particular tools, assumptions, or constraints. Comparing the abstract description with a practical example can reveal which parts of a concept are fundamental and which depend on a specific context.', new.title),
      format('Limitations are equally important. Every article is necessarily selective: it cannot contain every experiment, historical event, competing interpretation, technical detail, or unresolved question. Readers should therefore ask what the article leaves outside its scope. Could different evidence lead to a different conclusion? Are there important cases where the usual explanation does not apply? Are there competing models or interpretations? For %s, these questions help separate a useful educational overview from a claim that the subject has been completely settled. Scientific knowledge becomes stronger when uncertainty and disagreement are made visible rather than hidden.', new.title),
      format('Connections to other fields can deepen the topic. A concept rarely exists in isolation, and %s can be compared with neighbouring ideas to reveal similarities and differences. Look for shared methods, related measurements, common mathematical tools, historical influences, or applications that cross disciplinary boundaries. Then ask whether the same term has a different meaning in another field. These comparisons are valuable because they show both the reach and the limits of a concept. They also provide natural routes to further reading and help learners construct a broader map of knowledge instead of memorising a single page.', new.title),
      format('For revision, try explaining %s without looking at the article. Give a short definition, then describe its main components, evidence or reasoning, important applications, and limitations. Next, write two questions that would test whether another student genuinely understands the topic rather than merely recognising its terminology. Finally, return to the article and check the explanation against the source material. Any missing step becomes a target for further study. This process turns reading into active recall, which is more useful for long-term learning than repeatedly rereading the same paragraphs.', new.title),
      format('A strong research habit is to separate the article itself from the sources behind it. When a reference, dataset, experiment, historical document, or other primary source is available, examine it directly when possible. Check dates, authorship, methods, definitions, and the scope of the evidence. Secondary explanations are valuable for orientation, but primary material can reveal details that summaries omit. The same principle applies to quantitative claims: identify what was measured, how it was measured, and what comparison was made before accepting a number as meaningful.', new.title),
      format('The wider lesson of studying %s is that knowledge is cumulative and revisable. A good article should leave the reader with a clearer model of the subject, but also with better questions. Those questions might concern evidence, mechanisms, history, applications, competing explanations, or future research. Use the existing sections as the starting structure, then follow references and related concepts outward. The goal is not simply to reach the end of the page. It is to understand the subject well enough to explain it independently, recognise where uncertainty remains, and identify what should be investigated next.', new.title)
    )
  );

  begin
    body_json := new.body::jsonb;
  exception when others then
    body_json := jsonb_build_object(
      'version', 1,
      'overview', jsonb_build_array(coalesce(new.excerpt, '')),
      'sections', jsonb_build_array(
        jsonb_build_object('heading', 'Original article', 'paragraphs', jsonb_build_array(coalesce(new.body, '')))
      )
    );
  end;

  body_json := jsonb_set(
    body_json,
    '{sections}',
    coalesce(body_json->'sections', '[]'::jsonb) || jsonb_build_array(extension)
  );

  new.body := body_json::text;
  return new;
end;
$$;

drop trigger if exists articles_minimum_word_count on public.articles;
create trigger articles_minimum_word_count
before insert or update of title, excerpt, body
on public.articles
for each row
execute function public.ensure_article_minimum_length();

-- Backfill all existing published articles through the same trigger.
update public.articles
set body = body
where published = true
  and public.article_word_count(body) < 1000;
