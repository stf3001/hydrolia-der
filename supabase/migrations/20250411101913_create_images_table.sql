-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt_text text,
  category text,
  title text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policies for images
CREATE POLICY "Images are viewable by everyone"
  ON images
  FOR SELECT
  USING (true);

CREATE POLICY "Images are insertable by anyone"
  ON images
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Images are updatable by anyone"
  ON images
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Images are deletable by anyone"
  ON images
  FOR DELETE
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_images_updated_at
  BEFORE UPDATE ON images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 