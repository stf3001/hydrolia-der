-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated admins to manage products
CREATE POLICY "Products are manageable by admins"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin'); 