-- Create page_contents table
CREATE TABLE IF NOT EXISTS page_contents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    header_image TEXT
);

-- Create page_sections table
CREATE TABLE IF NOT EXISTS page_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    page_id UUID REFERENCES page_contents(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- Insert initial about page content
INSERT INTO page_contents (slug, title, content, meta_description, meta_keywords, header_image)
VALUES (
    'about',
    'Über Uns',
    'Willkommen bei Mukaan! Wir sind ein innovatives Unternehmen, das sich der Bereitstellung hochwertiger Dienstleistungen verschrieben hat.',
    'Erfahren Sie mehr über Mukaan und unsere Mission.',
    'mukaan, über uns, dienstleistungen, unternehmen',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3'
);

-- Get the about page ID
DO $$
DECLARE
    about_page_id UUID;
BEGIN
    SELECT id INTO about_page_id FROM page_contents WHERE slug = 'about';

    -- Insert initial sections for about page
    INSERT INTO page_sections (page_id, title, content, image_url, "order")
    VALUES
    (
        about_page_id,
        'Unsere Geschichte',
        'Mukaan wurde mit der Vision gegründet, innovative Lösungen für moderne Herausforderungen zu bieten.',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3',
        1
    ),
    (
        about_page_id,
        'Unsere Mission',
        'Wir streben danach, unseren Kunden erstklassige Dienstleistungen und Lösungen anzubieten.',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3',
        2
    );
END $$;
