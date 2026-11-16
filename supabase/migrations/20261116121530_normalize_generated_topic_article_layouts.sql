update public.articles a
set body = jsonb_build_object(
 'version',1,
 'tags',jsonb_build_array(a.subject_slug,a.topic_slug,'Topic introduction'),
 'facts',jsonb_build_array(jsonb_build_object('label','Subject','value',a.subject_slug),jsonb_build_object('label','Topic','value',a.title)),
 'overview',jsonb_build_array(coalesce(a.excerpt,'An introduction to '||a.title||'.'),'This is an expandable topic article. Add deeper explanations, examples, diagrams, applications and connections as the topic develops.'),
 'sections',jsonb_build_array(
  jsonb_build_object('heading','Core ideas','paragraphs',jsonb_build_array(coalesce(a.excerpt,'Explore the foundational ideas and vocabulary of this topic.')),'cards',jsonb_build_array(jsonb_build_object('title','Definition','text','Define the central idea precisely and identify its scope.'),jsonb_build_object('title','Key principles','text','Explain the main principles, mechanisms and relationships that organise this topic.'),jsonb_build_object('title','Examples','text','Add concrete examples, diagrams or worked explanations that make the ideas understandable.'))),
  jsonb_build_object('heading','Further directions','paragraphs',jsonb_build_array('Develop this topic with explanations, worked examples, historical context, applications and links to related fields.')),
  jsonb_build_object('heading','Questions for further study','paragraphs',jsonb_build_array('What are the central ideas? What examples show these ideas in practice? How does this topic connect to other areas of knowledge?'))
 )
)::text
where a.id like 'topic-article-%';
