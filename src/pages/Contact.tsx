import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
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
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ContactForm />

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">contact@hydrolia.fr</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">Téléphone</h3>
                        <p className="text-gray-600">01 23 45 67 89</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">Adresse</h3>
                        <p className="text-gray-600">
                          123 Avenue de l'Innovation<br />
                          75001 Paris, France
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">Horaires</h3>
                        <p className="text-gray-600">
                          Lundi - Vendredi : 9h00 - 18h00<br />
                          Samedi : Sur rendez-vous
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Démonstration en ligne</h2>
                  <p className="text-gray-600 mb-6">
                    Découvrez nos solutions en direct lors d'une démonstration
                    personnalisée avec l'un de nos experts.
                  </p>
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Réserver une démo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;