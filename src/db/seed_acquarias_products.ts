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

const seedHydroliaProducts = async () => {
  const products = [
    {
      name: "H20 - Générateur d'eau atmosphérique compact",
      description: "Le H20 est notre générateur d'eau atmosphérique compact conçu pour les espaces résidentiels et les petits bureaux. Capable de produire jusqu'à 20L d'eau potable par jour dans des conditions optimales, il représente une solution innovante pour l'accès à l'eau potable.",
      short_description: "Générateur d'eau atmosphérique 20L/jour",
      price: 1999.99,
      stock: 15,
      image_url: "/images/products/h20.jpg",
      category: "Générateur atmosphérique",
      features: [
        "Production jusqu'à 20L/jour",
        "Design compact et moderne",
        "Filtration multi-étages",
        "Écran tactile de contrôle",
        "Faible consommation énergétique"
      ],
      technical_specs: {
        "Capacité": "20L/jour",
        "Dimensions": "45x38x78cm",
        "Poids": "35kg",
        "Puissance": "480W",
        "Niveau sonore": "45dB",
        "Plage de température": "15-35°C",
        "Humidité optimale": ">60%"
      },
      is_active: true
    },
    {
      name: "H20+ - Générateur d'eau atmosphérique premium",
      description: "Le H20+ est notre modèle premium de générateur d'eau atmosphérique, offrant une production optimisée et un système de filtration avancé. Idéal pour les environnements exigeants nécessitant une eau de haute qualité.",
      short_description: "Générateur d'eau atmosphérique premium 20L/jour",
      price: 2499.99,
      stock: 10,
      image_url: "/images/products/h20plus.jpg",
      category: "Générateur atmosphérique",
      features: [
        "Production optimisée jusqu'à 20L/jour",
        "Filtration premium 7 étages",
        "Contrôle intelligent via application",
        "Monitoring qualité d'eau en temps réel",
        "Mode éco-énergie"
      ],
      technical_specs: {
        "Capacité": "20L/jour",
        "Dimensions": "48x40x80cm",
        "Poids": "38kg",
        "Puissance": "450W",
        "Niveau sonore": "42dB",
        "Plage de température": "15-38°C",
        "Humidité optimale": ">55%"
      },
      is_active: true
    },
    {
      name: "HydroBox 100 - Purificateur industriel",
      description: "Le HydroBox 100 est notre solution de purification industrielle haute performance, conçue pour les applications commerciales et industrielles nécessitant un traitement d'eau fiable et efficace.",
      short_description: "Purificateur d'eau industriel",
      price: 3999.99,
      stock: 5,
      image_url: "/images/products/hydrobox100.jpg",
      category: "Purification industrielle",
      features: [
        "Capacité de traitement élevée",
        "Système de filtration multi-étages",
        "Monitoring en temps réel",
        "Installation professionnelle incluse",
        "Maintenance préventive intelligente"
      ],
      technical_specs: {
        "Débit": "100L/heure",
        "Dimensions": "120x60x150cm",
        "Poids": "165kg",
        "Puissance": "2000W",
        "Pression de service": "2-6 bar",
        "Durée de vie filtres": "12 mois"
      },
      is_active: true
    },
    {
      name: "HydroPure 10 - Purificateur compact",
      description: "Le HydroPure 10 est notre purificateur d'eau compact nouvelle génération, alliant performance et facilité d'utilisation pour les espaces résidentiels.",
      short_description: "Purificateur d'eau compact",
      price: 799.99,
      stock: 25,
      image_url: "/images/products/hydropure10.jpg",
      category: "Purification résidentielle",
      features: [
        "Installation plug-and-play",
        "Design compact",
        "Filtration 5 étages",
        "Indicateur de changement de filtres",
        "Économique en eau"
      ],
      technical_specs: {
        "Débit": "10L/heure",
        "Dimensions": "28x38x45cm",
        "Poids": "12kg",
        "Puissance": "65W",
        "Durée de vie filtres": "6-12 mois"
      },
      is_active: true
    },
    {
      name: "HydroPure 10+ - Purificateur avancé",
      description: "Le HydroPure 10+ est notre purificateur résidentiel avancé, intégrant une technologie de filtration premium et une connectivité intelligente.",
      short_description: "Purificateur avec filtration avancée",
      price: 999.99,
      stock: 20,
      image_url: "/images/products/hydropure10plus.jpg",
      category: "Purification résidentielle",
      features: [
        "Filtration premium 6 étages",
        "Connectivité WiFi",
        "Contrôle via application",
        "Maintenance prédictive",
        "Mode économie d'eau"
      ],
      technical_specs: {
        "Débit": "12L/heure",
        "Dimensions": "30x40x48cm",
        "Poids": "14kg",
        "Puissance": "70W",
        "Durée de vie filtres": "12 mois"
      },
      is_active: true
    },
    {
      name: "HydroPro 50 - Purificateur professionnel",
      description: "Le HydroPro 50 est notre solution professionnelle de purification d'eau, idéale pour les commerces et petites entreprises nécessitant une eau de qualité constante.",
      short_description: "Purificateur professionnel",
      price: 2499.99,
      stock: 8,
      image_url: "/images/products/hydropro50.jpg",
      category: "Purification professionnelle",
      features: [
        "Contrôle digital avancé",
        "Monitoring temps réel",
        "Double système de filtration",
        "Installation professionnelle",
        "Support technique dédié"
      ],
      technical_specs: {
        "Débit": "50L/heure",
        "Dimensions": "60x45x120cm",
        "Poids": "45kg",
        "Puissance": "350W",
        "Pression de service": "2-6 bar"
      },
      is_active: true
    },
    {
      name: "AquaGen 50 - Générateur atmosphérique professionnel",
      description: "L'AquaGen 50 est notre générateur d'eau atmosphérique professionnel, produisant jusqu'à 50L d'eau par jour. Parfait pour les entreprises et commerces.",
      short_description: "Générateur d'eau 50L/jour",
      price: 4999.99,
      stock: 6,
      image_url: "/images/products/aquagen50.jpg",
      category: "Générateur atmosphérique",
      features: [
        "Production jusqu'à 50L/jour",
        "Système de filtration avancé",
        "Interface tactile intuitive",
        "Connectivité IoT",
        "Support technique premium"
      ],
      technical_specs: {
        "Capacité": "50L/jour",
        "Dimensions": "80x60x150cm",
        "Poids": "85kg",
        "Puissance": "1200W",
        "Plage de température": "15-40°C"
      },
      is_active: true
    },
    {
      name: "AquaGen 100 - Générateur atmosphérique haute capacité",
      description: "L'AquaGen 100 est notre solution de génération d'eau atmosphérique haute capacité, idéale pour les applications commerciales nécessitant jusqu'à 100L par jour.",
      short_description: "Générateur d'eau 100L/jour",
      price: 7999.99,
      stock: 4,
      image_url: "/images/products/aquagen100.jpg",
      category: "Générateur atmosphérique",
      features: [
        "Production jusqu'à 100L/jour",
        "Double système de filtration",
        "Monitoring avancé",
        "Maintenance prédictive",
        "Installation sur mesure"
      ],
      technical_specs: {
        "Capacité": "100L/jour",
        "Dimensions": "100x80x180cm",
        "Poids": "120kg",
        "Puissance": "2200W",
        "Plage de température": "15-45°C"
      },
      is_active: true
    },
    {
      name: "AquaGen 250 - Générateur industriel",
      description: "L'AquaGen 250 est notre solution industrielle de génération d'eau atmosphérique, offrant une capacité de 250L par jour pour les grandes installations.",
      short_description: "Générateur d'eau industriel 250L/jour",
      price: 15999.99,
      stock: 2,
      image_url: "/images/products/aquagen250.jpg",
      category: "Générateur industriel",
      features: [
        "Production jusqu'à 250L/jour",
        "Système modulaire extensible",
        "Monitoring industriel",
        "Support technique 24/7",
        "Installation personnalisée"
      ],
      technical_specs: {
        "Capacité": "250L/jour",
        "Dimensions": "150x100x200cm",
        "Poids": "280kg",
        "Puissance": "4500W",
        "Plage de température": "10-45°C"
      },
      is_active: true
    },
    {
      name: "AquaGen 500 - Générateur industriel haute performance",
      description: "L'AquaGen 500 est notre générateur d'eau atmosphérique industriel haute performance, capable de produire jusqu'à 500L par jour pour les applications industrielles exigeantes.",
      short_description: "Générateur d'eau industriel 500L/jour",
      price: 24999.99,
      stock: 2,
      image_url: "/images/products/aquagen500.jpg",
      category: "Générateur industriel",
      features: [
        "Production jusqu'à 500L/jour",
        "Technologie multi-condenseur",
        "Système de contrôle industriel",
        "Maintenance préventive",
        "Support technique premium"
      ],
      technical_specs: {
        "Capacité": "500L/jour",
        "Dimensions": "200x120x220cm",
        "Poids": "450kg",
        "Puissance": "8500W",
        "Plage de température": "10-48°C"
      },
      is_active: true
    },
    {
      name: "AquaGen 1000 - Solution industrielle ultime",
      description: "L'AquaGen 1000 est notre solution ultime de génération d'eau atmosphérique industrielle, offrant une capacité de 1000L par jour pour les plus grandes installations.",
      short_description: "Générateur d'eau industriel 1000L/jour",
      price: 39999.99,
      stock: 1,
      image_url: "/images/products/aquagen1000.jpg",
      category: "Générateur industriel",
      features: [
        "Production jusqu'à 1000L/jour",
        "Technologie multi-module",
        "Système de contrôle avancé",
        "Support technique dédié",
        "Installation sur mesure"
      ],
      technical_specs: {
        "Capacité": "1000L/jour",
        "Dimensions": "250x150x250cm",
        "Poids": "850kg",
        "Puissance": "15000W",
        "Plage de température": "10-50°C"
      },
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
seedHydroliaProducts().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 