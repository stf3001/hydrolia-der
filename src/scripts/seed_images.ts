import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Les variables d\'environnement Supabase ne sont pas configurées');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const productImages = [
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique MINI',
    category: 'product',
    title: 'MINI',
    description: 'Générateur d\'eau atmosphérique MINI - 10 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique HOME',
    category: 'product',
    title: 'HOME',
    description: 'Générateur d\'eau atmosphérique HOME - 20 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique FAMILY',
    category: 'product',
    title: 'FAMILY',
    description: 'Générateur d\'eau atmosphérique FAMILY - 50 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique FAMILY+',
    category: 'product',
    title: 'FAMILY+',
    description: 'Générateur d\'eau atmosphérique FAMILY+ - 90 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique SMART',
    category: 'product',
    title: 'SMART',
    description: 'Générateur d\'eau atmosphérique SMART - 100 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique BUSINESS',
    category: 'product',
    title: 'BUSINESS',
    description: 'Générateur d\'eau atmosphérique BUSINESS - 250 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique EXPERT',
    category: 'product',
    title: 'EXPERT',
    description: 'Générateur d\'eau atmosphérique EXPERT - 500 L/jour'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Générateur d\'eau atmosphérique INDUSTRY',
    category: 'product',
    title: 'INDUSTRY',
    description: 'Générateur d\'eau atmosphérique INDUSTRY - 1000 L/jour'
  }
];

const accessoryImages = [
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Kit photovoltaïque Hydrolia',
    category: 'accessory',
    title: 'Kit photovoltaïque',
    description: 'Kit photovoltaïque pour alimenter votre générateur Hydrolia'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Gourde Air\'Up Hydrolia',
    category: 'accessory',
    title: 'Gourde Air\'Up',
    description: 'Gourde innovante pour savourer l\'eau Hydrolia partout'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Pastilles Hydrology',
    category: 'accessory',
    title: 'Pastilles Hydrology',
    description: 'Pastilles minéralisantes pour enrichir votre eau'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Carafes en verre design Hydrolia',
    category: 'accessory',
    title: 'Carafes en verre design',
    description: 'Carafes élégantes pour servir votre eau Hydrolia'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Vaporisateur Hydrolia',
    category: 'accessory',
    title: 'Vaporisateur',
    description: 'Pour brumiser l\'eau Hydrolia et rafraîchir l\'air ambiant'
  },
  {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c7a1a1c9a?w=800&h=800&fit=crop',
    alt_text: 'Sodastream Hydrolia',
    category: 'accessory',
    title: 'Sodastream',
    description: 'Transformez l\'eau Hydrolia en eau pétillante à la maison'
  }
];

async function seedImages() {
  try {
    // Vider la table images
    const { error: deleteError } = await supabase
      .from('images')
      .delete()
      .gt('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      throw deleteError;
    }

    // Insérer les images des produits
    const { error: productError } = await supabase
      .from('images')
      .insert(productImages);

    if (productError) {
      throw productError;
    }

    // Insérer les images des accessoires
    const { error: accessoryError } = await supabase
      .from('images')
      .insert(accessoryImages);

    if (accessoryError) {
      throw accessoryError;
    }

    console.log('Images ajoutées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des images:', error);
  }
}

seedImages(); 