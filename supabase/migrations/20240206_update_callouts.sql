-- First copy title to name for existing records
UPDATE callouts SET name = title WHERE name IS NULL;

-- Make title nullable
ALTER TABLE callouts ALTER COLUMN title DROP NOT NULL;

-- Add new columns if they don't exist
ALTER TABLE callouts
ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS slug text NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS image_src text NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS image_alt text NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS page_content jsonb NOT NULL DEFAULT '{
  "title": "",
  "subtitle": "",
  "imagePath": "",
  "imageAlt": "",
  "content": []
}'::jsonb;

-- Update existing rows to have proper values
UPDATE callouts
SET 
  slug = LOWER(REGEXP_REPLACE(COALESCE(name, ''), '[^a-zA-Z0-9]+', '-', 'g')),
  page_content = jsonb_build_object(
    'title', COALESCE(name, ''),
    'subtitle', '',
    'imagePath', COALESCE(image_src, ''),
    'imageAlt', COALESCE(image_alt, ''),
    'content', '[]'::jsonb
  )
WHERE page_content IS NULL;
