import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplets, Leaf, Shield, Banknote, Star, Quote } from 'lucide-react';

const Home = () => {
  const testimonials = [
    {
      text: "Grâce à Hydrolia, nous avons accès à une eau pure et écologique. Une vraie révolution !",
      author: "Marie",
      country: "France",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
      text: "Hydrolia is the best solution for clean water. Highly recommend!",
      author: "John",
      country: "UK",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
      text: "Grazie a Hydrolia, abbiamo acqua pura ogni giorno. Perfetto per la nostra famiglia.",
      author: "Lucia",
      country: "Italia",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop"
    },
    {
      text: "¡Increíble! Agua limpia y sin plástico gracias a Hydrolia.",
      author: "Carlos",
      country: "España",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=1920&q=80"
            alt="Pure water droplet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              L'Eau Pure 
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Produisez votre eau potable à partir de l'air tout en respectant la planète.
              Une solution durable, économique et respectueuse de votre santé.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link
                to="/produits"
                className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-200 shadow-lg"
              >
                Découvrez nos générateurs maintenant !
              </Link>
              <Link
                to="/calculateur"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-colors duration-200"
              >
                Calculer mon potentiel
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="h-12 w-12 text-green-500" />,
                title: "Écologique",
                description: "Réduction des déchets plastiques et empreinte carbone minimale"
              },
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: "Pureté garantie",
                description: "Certification in situ incluse avec chaque générateur"
              },
              {
                icon: <Banknote className="h-12 w-12 text-green-600" />,
                title: "Économique",
                description: "Rentable sur le long terme, sans achat de bouteilles"
              },
              {
                icon: <Droplets className="h-12 w-12 text-blue-500" />,
                title: "Autonomie totale",
                description: "Production d'eau indépendante du réseau"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos clients à travers le monde
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Quote className="h-8 w-8 text-blue-500 mb-4" />
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              Découvrez votre potentiel hydrique
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Calculez la quantité d'eau que vous pourriez produire avec nos solutions HYDROLIA
              et commencez votre transition vers une autonomie en eau responsable.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/calculateur"
                className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Calculer maintenant
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;