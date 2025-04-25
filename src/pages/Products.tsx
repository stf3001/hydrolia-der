import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Image = Database['public']['Tables']['images']['Row'];

const Products = () => {
  const [productImages, setProductImages] = useState<Image[]>([]);
  const [accessoryImages, setAccessoryImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      // Récupérer les images des produits
      const { data: productsData, error: productsError } = await supabase
        .from('images')
        .select('*')
        .eq('category', 'product');

      if (productsError) throw productsError;

      // Récupérer les images des accessoires
      const { data: accessoriesData, error: accessoriesError } = await supabase
        .from('images')
        .select('*')
        .eq('category', 'accessory');

      if (accessoriesError) throw accessoriesError;

      setProductImages(productsData || []);
      setAccessoryImages(accessoriesData || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }

  const awgProducts = [
    {
      id: '1',
      name: 'MINI',
      production: '10 L/jour',
      price: '1 290 €',
      description: 'Idéal pour une personne ou un usage nomade. Compact et silencieux, il s\'intègre partout.',
      image: productImages.find(img => img.title === 'MINI')?.url || '/images/products/mini.jpg'
    },
    {
      id: '2',
      name: 'HOME',
      production: '20 L/jour',
      price: '1 990 €',
      description: 'Pensé pour les foyers, il assure une eau pure au quotidien pour toute la famille.',
      image: productImages.find(img => img.title === 'HOME')?.url || '/images/products/home.jpg'
    },
    {
      id: '3',
      name: 'FAMILY',
      production: '50 L/jour',
      price: '3 490 €',
      description: 'Idéal pour une famille de 4 personnes ou petits collectifs.',
      image: productImages.find(img => img.title === 'FAMILY')?.url || '/images/products/family.jpg'
    },
    {
      id: '4',
      name: 'FAMILY+',
      production: '90 L/jour',
      price: '4 990 €',
      description: 'Pour les grandes familles, associations ou petits établissements.',
      image: productImages.find(img => img.title === 'FAMILY+')?.url || '/images/products/family-plus.jpg'
    },
    {
      id: '5',
      name: 'SMART',
      production: '100 L/jour',
      price: '5 490 €',
      description: 'Modèle polyvalent pour collectivités, écoles ou restaurants.',
      image: productImages.find(img => img.title === 'SMART')?.url || '/images/products/smart.jpg'
    },
    {
      id: '6',
      name: 'BUSINESS',
      production: '250 L/jour',
      price: '7 990 €',
      description: 'Idéal pour hôtels, établissements touristiques ou sites industriels de taille moyenne.',
      image: productImages.find(img => img.title === 'BUSINESS')?.url || '/images/products/business.jpg'
    },
    {
      id: '7',
      name: 'EXPERT',
      production: '500 L/jour',
      price: '12 900 €',
      description: 'Pour les besoins importants : grandes entreprises, sites agricoles ou industriels.',
      image: productImages.find(img => img.title === 'EXPERT')?.url || '/images/products/expert.jpg'
    },
    {
      id: '8',
      name: 'INDUSTRY',
      production: '1 000 L/jour',
      price: '19 900 €',
      description: 'La solution ultime pour l\'industrie, les collectivités ou les bases isolées.',
      image: productImages.find(img => img.title === 'INDUSTRY')?.url || '/images/products/industry.jpg'
    }
  ];

  const accessories = [
    {
      id: 'a1',
      name: 'Kit photovoltaïque',
      description: 'Alimentez votre générateur Hydrolia grâce à l\'énergie solaire.',
      price: '990 €',
      image: accessoryImages.find(img => img.title === 'Kit photovoltaïque')?.url || '/images/accessories/solar.jpg'
    },
    {
      id: 'a2',
      name: 'Gourde Air\'Up',
      description: 'Gourde innovante pour savourer l\'eau Hydrolia partout.',
      price: '39 €',
      image: accessoryImages.find(img => img.title === 'Gourde Air\'Up')?.url || '/images/accessories/bottle.jpg'
    },
    {
      id: 'a3',
      name: 'Pastilles Hydrology',
      description: 'Pastilles minéralisantes pour enrichir votre eau.',
      price: '19 €',
      image: accessoryImages.find(img => img.title === 'Pastilles Hydrology')?.url || '/images/accessories/pills.jpg'
    },
    {
      id: 'a4',
      name: 'Carafes en verre design',
      description: 'Carafes élégantes pour servir votre eau Hydrolia.',
      price: '49 €',
      image: accessoryImages.find(img => img.title === 'Carafes en verre design')?.url || '/images/accessories/carafe.jpg'
    },
    {
      id: 'a5',
      name: 'Vaporisateur',
      description: 'Pour brumiser l\'eau Hydrolia et rafraîchir l\'air ambiant.',
      price: '29 €',
      image: accessoryImages.find(img => img.title === 'Vaporisateur')?.url || '/images/accessories/spray.jpg'
    },
    {
      id: 'a6',
      name: 'Sodastream',
      description: 'Transformez l\'eau Hydrolia en eau pétillante à la maison.',
      price: '99 €',
      image: accessoryImages.find(img => img.title === 'Sodastream')?.url || '/images/accessories/sodastream.jpg'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

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
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-center mb-4">
                    Production : {product.production}
                  </p>
                  <p className="text-gray-600 text-center mb-6">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-center mb-6">
                    {product.price}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Commander
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Accessoires */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complétez votre expérience Hydrolia
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Découvrez nos accessoires pour optimiser votre utilisation des générateurs d'eau atmosphérique
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {accessories.map((accessory, index) => (
              <motion.div
                key={accessory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={accessory.image}
                    alt={accessory.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{accessory.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{accessory.description}</p>
                  <p className="text-lg font-bold mb-4">{accessory.price}</p>
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