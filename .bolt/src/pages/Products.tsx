import React from 'react';
import { motion } from 'framer-motion';
import { Download, Droplets, Sun, Zap, Cloud, Factory, Building2 } from 'lucide-react';

const Products = () => {
  const awgProducts = [
    {
      name: "HYDROLIA Micro",
      capacity: "10L/jour",
      price: "990€ TTC",
      features: [
        "Idéal pour petit ménage",
        "Consommation 0.9 kWh/L",
        "Certification in situ incluse",
        "Contrôle via application mobile",
        "Garantie 2 ans"
      ],
      icon: <Droplets className="h-16 w-16 text-blue-300" />
    },
    {
      name: "HYDROLIA Home",
      capacity: "20L/jour",
      price: "1990€ TTC",
      features: [
        "Idéal famille ou petit bureau",
        "Consommation 0.8 kWh/L",
        "Certification in situ incluse",
        "Contrôle via application mobile",
        "Garantie 3 ans"
      ],
      icon: <Droplets className="h-16 w-16 text-blue-600" />
    },
    {
      name: "HYDROLIA Compact",
      capacity: "50L/jour",
      price: "2990€ TTC",
      features: [
        "Parfait pour restaurants et petites collectivités",
        "Consommation 0.6 kWh/L", 
        "Filtration multicouche",
        "Réservoir de stockage 100L",
        "Maintenance prédictive"
      ],
      icon: <Cloud className="h-16 w-16 text-blue-400" />
    },
    {
      name: "HYDROLIA Big",
      capacity: "100L/jour",
      price: "4200€ TTC",
      features: [
        "Solution professionnelle clé en main",
        "Consommation 0.4 kWh/L",
        "Contrôle hygrométrie intelligent",
        "Connectivité LoRaWAN",
        "Contrat maintenance incluse"
      ],
      icon: <Building2 className="h-16 w-16 text-blue-800" />
    },
    {
      name: "HYDROLIA Industrial 500",
      capacity: "500L/jour",
      price: "Sur devis",
      features: [
        "Pour hôtels et industries",
        "Système modulaire extensible",
        "Production 24h/24",
        "Monitoring avancé",
        "Installation sur mesure"
      ],
      icon: <Zap className="h-16 w-16 text-yellow-500" />
    },
    {
      name: "HYDROLIA Mega 1000",
      capacity: "1000L/jour", 
      price: "Sur devis",
      features: [
        "Solution communale",
        "Réseau de distribution intégré",
        "Backup énergie solaire",
        "Contrôle qualité automatisé",
        "Support prioritaire"
      ],
      icon: <Sun className="h-16 w-16 text-orange-500" />
    },
    {
      name: "HYDROLIA Titan 10000",
      capacity: "10 000L/jour",
      price: "Sur devis",
      features: [
        "Centrale de production d'eau",
        "Solutions énergétiques hybrides",
        "Système de purification avancé",
        "Maintenance robotisée",
        "Contrat de service premium"
      ],
      icon: <Factory className="h-16 w-16 text-gray-900" />
    }
  ];

  const upsellProducts = [
    {
      name: "Kit Solaire Plug & Play 3kWc",
      description: "Système solaire complet avec micro-onduleurs et monitoring",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" // Solar panel installation
    },
    {
      name: "Vaporisateur Hydrolia",
      description: "Design élégant en verre soufflé avec gravure au laser",
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80"
    },
    {
      name: "Bouteilles Signature",
      description: "Verre borosilicate 750ml avec étiquette NFC intégrée",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    },
    {
      name: "Gourde Inox Pro",
      description: "Isotherme 500ml avec filtre intégré et capteur de qualité",
      image: "https://images.unsplash.com/photo-1570087735542-aaa833b12323?w=800&q=80"
    },
    {
      name: "Kit Filtration Premium",
      description: "Pack 3 filtres à charbon actif + minéralisation",
      image: "https://images.unsplash.com/photo-1624958723474-0e0881266113?w=800&q=80"
    },
    {
      name: "Gourde AIR'UP",
      description: "Système de aromatisation sans sucre ni additifs",
      image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&q=80"
    },
    {
      name: "SodaStream Terra",
      description: "Gazéificateur connecté avec design écologique",
      image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=800&q=80"
    },
    {
      name: "EM Water Magnesium",
      description: "Enrichisseur minéral à infusion progressive",
      image: "https://images.unsplash.com/photo-1550505095-81378a674395?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section AWG */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Générateurs d'Eau Atmosphérique
            </h1>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à chaque besoin, de la maison individuelle aux installations industrielles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awgProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {product.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-center mb-4">
                    {product.capacity}
                  </p>
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
                        <span className="flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-center mb-6">
                    {product.price}
                  </p>
                  <div className="flex flex-col space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      {product.price === 'Sur devis' ? 'Demander un devis' : 'Commander'}
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg transition-colors">
                      <Download className="h-5 w-5" />
                      Fiche technique
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Upsell */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Accessoires & Compléments
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Optimisez votre expérience Hydrolia avec nos accessoires sélectionnés
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {upsellProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Commander
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;