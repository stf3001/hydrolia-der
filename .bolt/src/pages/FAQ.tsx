import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment fonctionne un générateur d'eau atmosphérique ?",
      answer: "Un générateur d'eau atmosphérique extrait l'humidité de l'air ambiant par un processus de condensation, similaire à la formation naturelle de la rosée. L'air est refroidi jusqu'à son point de rosée, provoquant la condensation de la vapeur d'eau. L'eau est ensuite filtrée, minéralisée et purifiée pour la rendre potable."
    },
    {
      question: "Quelle est la qualité de l'eau produite ?",
      answer: "L'eau produite par nos générateurs est d'une qualité exceptionnelle, certifiée par des tests in situ réguliers. Elle est pure, sans microplastiques, sans métaux lourds et parfaitement équilibrée en minéraux. Hydrolia est la seule entreprise à garantir cette qualité par des contrôles sur site."
    },
    {
      question: "Quelle est la capacité de production quotidienne ?",
      answer: "La capacité de production varie selon le modèle et les conditions atmosphériques. Nos générateurs peuvent produire de 20L à 10 000L par jour. Utilisez notre calculateur de potentiel hydrique pour estimer la production possible dans votre région."
    },
    {
      question: "Comment est assurée la maintenance des générateurs ?",
      answer: "Nos générateurs sont équipés d'un système de surveillance en temps réel. La maintenance préventive est planifiée selon l'usage, et nos techniciens interviennent régulièrement pour les contrôles de qualité et le remplacement des filtres."
    },
    {
      question: "Quelle est la consommation énergétique ?",
      answer: "La consommation énergétique varie selon le modèle et les conditions. Nos générateurs sont optimisés pour une efficacité maximale, avec une consommation moyenne de 0.3 à 0.8 kWh par litre d'eau produit. L'option solaire permet de réduire significativement ces coûts."
    },
    {
      question: "Les générateurs fonctionnent-ils dans toutes les conditions ?",
      answer: "Les générateurs Hydrolia sont conçus pour fonctionner dans une large gamme de conditions climatiques. L'efficacité optimale est atteinte avec une humidité relative supérieure à 40% et une température entre 15°C et 45°C."
    },
    {
      question: "Comment est garantie la qualité de l'eau ?",
      answer: "Hydrolia est unique sur le marché avec sa certification in situ. Chaque générateur est livré avec un kit d'analyse complet permettant des tests réguliers sur site. Nos techniciens effectuent également des contrôles périodiques pour garantir une qualité constante."
    },
    {
      question: "Quel est le coût de revient du litre d'eau ?",
      answer: "Le coût de revient dépend du modèle et de votre consommation énergétique. En moyenne, il varie entre 0,10€ et 0,30€ par litre, ce qui est très compétitif par rapport à l'eau en bouteille. L'option solaire permet de réduire davantage ces coûts."
    },
    {
      question: "Quelle est la durée de vie d'un générateur ?",
      answer: "Nos générateurs sont conçus pour durer plus de 15 ans avec une maintenance appropriée. La garantie standard est de 3 ans, extensible à 5 ans avec un contrat de maintenance."
    },
    {
      question: "Comment puis-je financer mon générateur ?",
      answer: "Nous proposons plusieurs solutions de financement : achat direct, leasing, ou location longue durée. Des subventions peuvent être disponibles selon votre région et votre secteur d'activité."
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
              Questions Fréquentes
            </h1>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur nos générateurs d'eau atmosphérique
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Plus className="h-5 w-5 text-blue-600" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans votre projet.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Contactez-nous
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;