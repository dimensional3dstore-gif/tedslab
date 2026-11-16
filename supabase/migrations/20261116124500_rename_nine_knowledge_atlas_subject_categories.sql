update public.subjects
set title = case slug
  when 'biology' then 'Life Sciences & Biological Systems'
  when 'science' then 'Physical Sciences, Cosmology & Matter'
  when 'mathematics' then 'Mathematics & Formal Logic'
  when 'technology' then 'Computer Science, AI & Cybernetics'
  when 'mind' then 'Mind, Cognition & Human Psychology'
  when 'philosophy' then 'Philosophy, Ethics & Epistemology'
  when 'systems' then 'Systems Thinking, Networks & Emergence'
  when 'history' then 'World History, Revolutions & Human Geography'
  when 'english' then 'Language, Communication & Literature'
  else title
end,
description = case slug
  when 'biology' then 'Cellular biology, genetics, evolutionary theory, physiology and organismal taxonomy.'
  when 'science' then 'Physics, chemistry, cosmology and the fundamental laws governing matter and energy.'
  when 'mathematics' then 'Pure mathematics, geometry, formal proof systems and mathematical reasoning.'
  when 'technology' then 'Algorithms, software architecture, computation theory, artificial intelligence and digital security.'
  when 'mind' then 'Perception, learning, memory, mental processes, neuroscience and behaviour.'
  when 'philosophy' then 'Metaphysics, moral reasoning, existentialism, political philosophy and the nature of knowledge.'
  when 'systems' then 'Complexity science, feedback loops, self-organisation and interconnected dynamics.'
  when 'history' then 'Civilizational development, historical epochs, societal change and global exchange.'
  when 'english' then 'Linguistics, rhetoric, literary analysis, narrative structure and information theory.'
  else description
end
where slug in ('biology','science','mathematics','technology','mind','philosophy','systems','history','english');
