/*
  # Create images and clients tables

  1. New Tables
    - `images`
      - `id` (uuid, primary key)
      - `url` (text, required) - URL of the image
      - `alt_text` (text) - Alternative text for accessibility
      - `category` (text) - Category of the image (e.g., 'product', 'technology', 'application')
      - `title` (text) - Title of the image
      - `description` (text) - Description of the image
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `clients`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `contact_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `address` (text)
      - `postal_code` (text)
      - `city` (text)
      - `country` (text)
      - `industry` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

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

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text,
  contact_name text,
  email text UNIQUE NOT NULL,
  phone text,
  address text,
  postal_code text,
  city text,
  country text,
  industry text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies for images
CREATE POLICY "Images are viewable by authenticated users"
  ON images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Images are insertable by authenticated users"
  ON images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Images are updatable by authenticated users"
  ON images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for clients
CREATE POLICY "Clients are viewable by authenticated users"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients are insertable by authenticated users"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Clients are updatable by authenticated users"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_images_updated_at
  BEFORE UPDATE ON images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();