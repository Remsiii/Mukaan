-- Tabelle löschen falls sie existiert
drop table if exists calloutshtml;

-- Neue Tabelle erstellen
create table calloutshtml (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    html_content text not null,
    title text not null default 'Neuer Artikel',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Basis-Policies entfernen
drop policy if exists "Allow public read access" on calloutshtml;
drop policy if exists "Allow admin write access" on calloutshtml;

-- RLS aktivieren
alter table calloutshtml enable row level security;

-- Einfachere Policy für Authentifizierte Benutzer
create policy "Enable all access for authenticated users"
    on calloutshtml
    for all
    to authenticated
    using (true)
    with check (true);
