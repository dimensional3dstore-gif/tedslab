update public.subjects set sort = case slug
 when 'philosophy' then 0 when 'science' then 1 when 'mathematics' then 2
 when 'biology' then 3 when 'english' then 4 when 'technology' then 5
 when 'history' then 6 when 'mind' then 7 when 'systems' then 8 else sort end,
 updated_at = now()
where slug in ('philosophy','science','mathematics','biology','english','technology','history','mind','systems');
