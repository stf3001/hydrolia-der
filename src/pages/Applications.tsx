import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Hotel, School, Guitar as Hospital } from 'lucide-react';

const Applications = () => {
  const applications = [
    {
      icon: Home,
      title: "Résidentiel",
      description: "Une eau pure pour votre famille, sans microplastiques ni résidus chimiques.",
      examples: ["Maisons individuelles", "Appartements", "Résidences secondaires"],
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
    },
    {
      icon: Building2,
      title: "Entreprises",
      description: "Garantissez une eau de qualité à vos collaborateurs et clients.",
      examples: ["Bureaux", "Commerces", "Restaurants"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    },
    {
      icon: School,
      title: "Éducation",
      description: "Des solutions adaptées aux établissements scolaires.",
      examples: ["Écoles", "Collèges", "Universités"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
    },
    {
      icon: Hospital,
      title: "Santé",
      description: "Une eau pure pour les établissements de santé.",
      examples: ["Hôpitaux", "Cliniques", "Cabinets médicaux"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
    },
    {
      icon: Hotel,
      title: "Hôtellerie",
      description: "Solutions pour l'industrie hôtelière et touristique.",
      examples: ["Hôtels", "Resorts", "Campings"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    },
    {
      icon: Factory,
      title: "Industrie",
      description: "Applications industrielles et sites de production.",
      examples: ["Usines", "Entrepôts", "Zones industrielles"],
      image: "https://images.unsplash.com/photo-1513828583688-c52646f9b5d9?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Applications
            </h1>
            <p className="text-xl text-gray-600">
              Découvrez comment HYDROLIA s'adapte à tous les secteurs d'activité
              pour répondre à vos besoins en eau pure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 relative">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                    <app.icon className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{app.title}</h3>
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <div className="space-y-2">
                    {app.examples.map((example, i) => (
                      <div key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        <span className="text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Vous ne trouvez pas votre secteur ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous pour découvrir comment HYDROLIA peut s'adapter
            à vos besoins spécifiques.
          </p>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Nous contacter
          </button>
        </div>
      </section>
    </div>
  );
};

export default Applications;