import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const seedProducts = async () => {
  const products = [
    {
      name: "Système de filtration H2O-Pure",
      description: "Système de filtration d'eau avancé pour une eau pure et saine. Élimine 99,9% des contaminants tout en préservant les minéraux essentiels.",
      short_description: "Système de filtration d'eau haute performance",
      price: 599.99,
      stock: 50,
      image_url: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500",
      category: "Filtration",
      features: ["Filtration 4 étapes", "Installation facile", "Maintenance annuelle"],
      is_active: true
    },
    {
      name: "Adoucisseur d'eau Premium",
      description: "Adoucisseur d'eau intelligent qui élimine le calcaire et protège vos installations. Système automatique avec régénération optimisée.",
      short_description: "Adoucisseur d'eau intelligent nouvelle génération",
      price: 899.99,
      stock: 30,
      image_url: "https://images.unsplash.com/photo-1585687289584-d9a46315ae6e?w=500",
      category: "Adoucisseur",
      features: ["Contrôle digital", "Économie de sel", "Bypass intégré"],
      is_active: true
    },
    {
      name: "Osmoseur Inverse Compact",
      description: "Système d'osmose inverse compact et efficace pour une eau ultra-pure. Idéal pour les espaces réduits avec une performance maximale.",
      short_description: "Système d'osmose inverse compact",
      price: 449.99,
      stock: 45,
      image_url: "https://images.unsplash.com/photo-1571781418606-70265b9cce90?w=500",
      category: "Osmose",
      features: ["5 étages de filtration", "Compact", "Installation sous évier"],
      is_active: true
    }
  ];

  console.log('Connected to Supabase with service role');

  try {
    // Insérer tous les produits en une seule opération
    const { data, error } = await supabase
      .from('products')
      .upsert(products)
      .select();

    if (error) {
      console.error('Error inserting products:', error);
    } else {
      console.log('Successfully inserted products:', data?.length || 0);
      console.log('Products:', data);
    }
  } catch (error) {
    console.error('Fatal error:', error);
  }
};

// Exécuter la fonction de seed
seedProducts().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 