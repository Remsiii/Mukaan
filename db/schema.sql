create table calloutsHTML (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  html_content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Beispiel-Eintrag für die Initialisierung:
insert into calloutsHTML (slug, title, html_content) values (
  'example-post',
  'Mein erster Blogpost',
  '<h1>Willkommen zu meinem Blog</h1>
   <p>Dies ist ein Beispieltext.</p>
   <img src="/path/to/image.jpg" alt="Beispielbild" />
   <h2>Weitere Informationen</h2>
   <ul>
     <li>Punkt 1</li>
     <li>Punkt 2</li>
   </ul>'
);
