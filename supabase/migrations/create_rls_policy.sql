-- Enable RLS
alter table calloutshtml enable row level security;

-- Create policy for authenticated users
create policy "authenticated users can manage callouts"
on calloutshtml
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

-- Add a suffix column for handling duplicates
ALTER TABLE calloutshtml ADD COLUMN IF NOT EXISTS slug_suffix INTEGER DEFAULT 0;

-- Create a function to handle duplicate slugs
CREATE OR REPLACE FUNCTION handle_duplicate_slug()
RETURNS TRIGGER AS $$
DECLARE
    new_suffix INTEGER;
BEGIN
    -- If we have a conflict, find the highest suffix for this slug and increment it
    IF EXISTS (SELECT 1 FROM calloutshtml WHERE slug = NEW.slug) THEN
        SELECT COALESCE(MAX(slug_suffix), 0) + 1
        INTO new_suffix
        FROM calloutshtml
        WHERE slug = NEW.slug;
        
        NEW.slug_suffix = new_suffix;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER handle_duplicate_slug_trigger
    BEFORE INSERT OR UPDATE ON calloutshtml
    FOR EACH ROW
    EXECUTE FUNCTION handle_duplicate_slug();
