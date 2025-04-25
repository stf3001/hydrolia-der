import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Création de la table products si elle n'existe pas
export const createProductsTable = async () => {
  const { error } = await supabase.rpc('create_products_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        short_description VARCHAR(500),
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        image_url TEXT,
        category VARCHAR(100),
        technical_specs JSONB,
        features TEXT[],
        dimensions JSONB,
        weight DECIMAL(10,2),
        sku VARCHAR(100) UNIQUE,
        manufacturer VARCHAR(255),
        warranty_info TEXT,
        installation_guide TEXT,
        maintenance_info TEXT,
        certifications TEXT[],
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
      );

      -- Index pour améliorer les performances des recherches
      CREATE INDEX IF NOT EXISTS idx_products_name ON public.products(name);
      CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
      CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);

      -- Trigger pour mettre à jour updated_at automatiquement
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = TIMEZONE('utc'::text, NOW());
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
      
      CREATE TRIGGER update_products_updated_at
        BEFORE UPDATE ON public.products
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `
  });

  if (error) {
    console.error('Error creating products table:', error);
    throw error;
  }
};

// Appeler la fonction lors de l'initialisation si nécessaire
createProductsTable().catch(console.error);