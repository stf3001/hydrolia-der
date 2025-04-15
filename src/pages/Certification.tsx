import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, FileText } from 'lucide-react';

const Certification = () => {
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
              Certification &amp; Qualité
            </h1>
            <p className="text-xl text-gray-600">
              Une eau certifiée pure et saine, garantie par notre système de certification intégré et nos contrôles rigoureux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Notre processus de certification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Contrôle continu",
                  description: "Surveillance en temps réel de la qualité de l'eau produite via des capteurs intégrés."
                },
                {
                  icon: Award,
                  title: "Certification sur site",
                  description: "Kit d'analyse complet fourni pour des tests réguliers directement sur votre installation."
                },
                {
                  icon: CheckCircle,
                  title: "Analyses laboratoire",
                  description: "Validation périodique par des laboratoires indépendants accrédités."
                },
                {
                  icon: FileText,
                  title: "Documentation complète",
                  description: "Accès à l'historique complet des analyses et certifications via l'application HYDROLIA."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <item.icon className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Normes et standards
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Paramètres contrôlés</h3>
                  <ul className="space-y-3">
                    {[
                      "pH et minéralisation",
                      "Bactériologie",
                      "Métaux lourds",
                      "Pesticides",
                      "Microplastiques",
                      "Résidus médicamenteux"
                    ].map((param, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {param}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                  <ul className="space-y-3">
                    {[
                      "Norme ISO 9001",
                      "Certification ACS",
                      "Conformité CE",
                      "Agrément sanitaire",
                      "Label Éco-conception",
                      "Certification NSF"
                    ].map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nouvelle section : Qualité de l’Eau */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">
              Qualité de l’Eau
            </h2>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                Chez Hydrolia, nous ne nous contentons pas de produire de l’eau ; nous garantissons sa pureté grâce à un test en laboratoire unique sur le marché. Notre démarche rigoureuse assure une eau toujours conforme aux normes sanitaires les plus strictes.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">
                Les Enjeux de la Qualité de l’Eau
              </h3>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                <li>
                  <strong>Contaminants chimiques :</strong> Métaux lourds (plomb, arsenic, mercure, cadmium) provenant de vieilles canalisations ou de pollution industrielle, et résidus industriels et agricoles (nitrates, pesticides, herbicides, résidus médicamenteux, HAP) pouvant provoquer des troubles neurologiques, rénaux et augmenter le risque de cancers. Les sous-produits du traitement, comme le chlore et l’aluminium, présentent également des risques à long terme.
                </li>
                <li>
                  <strong>Contaminants biologiques :</strong> Bactéries et virus (E. coli, Salmonella, Legionella, Hépatite A, norovirus) ainsi que des parasites (Cryptosporidium, Giardia) pouvant engendrer des infections gastro-intestinales et des troubles digestifs sévères.
                </li>
                <li>
                  <strong>Particules et microplastiques :</strong> Présents notamment dans les eaux embouteillées, ils peuvent contenir des perturbateurs endocriniens et transporter des toxines et métaux lourds, entraînant des inflammations et des risques neurologiques.
                </li>
              </ul>
              <p className="text-gray-700">
                En dépit d’un contrôle rigoureux, des cas de non-conformité existent, soulignant l’importance de mesures de surveillance et de correction pour garantir une eau pure et sûre.
              </p>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-blue-900">
                Ressources et Liens Utiles
              </h3>
              <p className="text-gray-700 mb-4">
                Pour approfondir vos connaissances sur la qualité de l’eau et les normes en vigueur, consultez les ressources suivantes :
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.ecologie.gouv.fr/eau"
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    Ministère de la Transition Écologique – Eau et environnement
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.who.int/fr/news-room/fact-sheets/detail/drinking-water"
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    Organisation Mondiale de la Santé (OMS) – Qualité de l’eau potable
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.oieau.fr/"
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    OIEau – Observatoire de l’Eau
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.generations-futures.fr/qui-sommes-nous/ressources/"
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    Générations Futures – Ressources sur l’eau et pesticides
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Testimony */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50 p-8 rounded-xl relative"
            >
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                <svg
                  className="h-16 w-16 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <div className="relative">
                <p className="text-lg text-gray-700 mb-6">
                  "Le système de certification HYDROLIA représente une avancée majeure dans le domaine du traitement de l'eau. La qualité de l'eau produite est constamment surveillée et répond aux normes les plus strictes."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="Dr. Thomas Martin"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Dr. Thomas Martin</p>
                    <p className="text-gray-600">Expert en traitement des eaux</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certification;
