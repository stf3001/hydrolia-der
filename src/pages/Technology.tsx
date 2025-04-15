import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Shield, 
  Leaf, 
  BarChart3, 
  CheckCircle, 
  XCircle,
  Wind,
  Thermometer,
  Waves,
  CloudRain,
  Filter,
  Zap,
  Container
} from 'lucide-react';

const Technology = () => {
  const processSteps = [
    {
      icon: Wind,
      title: "Capture de l'air",
      description: "L'air ambiant est aspiré à travers des filtres haute performance qui éliminent les particules et les contaminants.",
      image: "https://fr.accairwater.com/uploadfile/2021/0929/20210929025815491.jpg"
    },
    {
      icon: Thermometer,
      title: "Condensation",
      description: "L'air est refroidi jusqu'à son point de rosée, provoquant la condensation de l'humidité en gouttelettes d'eau pure.",
      image: "https://fr.accairwater.com/uploadfile/2021/0929/20210929025815491.jpg"
    },
    {
      icon: Filter,
      title: "Filtration avancée",
      description: "L'eau passe par un système de filtration multi-étages incluant charbon actif, minéralisation et stérilisation UV.",
      image: "https://fr.accairwater.com/uploadfile/2021/0929/20210929025827400.jpg"
    },
    {
      icon: Container,
      title: "Stockage sécurisé",
      description: "L'eau est stockée dans une cuve interne réfrigérée, constamment remuée et stérilisée par UV pour garantir sa pureté.",
      image: "https://fr.accairwater.com/uploadfile/2021/0929/20210929025839387.jpg"
    }
  ];

  const features = [
    {
      title: "Certification in situ",
      description: "Chaque générateur inclut un kit d'analyse complet pour des tests réguliers sur site",
      icon: Shield,
      color: "blue"
    },
    {
      title: "Écologique",
      description: "Zéro déchet plastique, faible consommation énergétique",
      icon: Leaf,
      color: "green"
    },
    {
      title: "Performance",
      description: "Production optimisée selon les conditions atmosphériques",
      icon: BarChart3,
      color: "purple"
    },
    {
      title: "Autonomie",
      description: "Production d'eau indépendante du réseau traditionnel",
      icon: Zap,
      color: "yellow"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://fr.accairwater.com/uploadfile/2021/0929/20210929025815491.jpg"
            alt="Technologie de production d'eau atmosphérique"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              La Technologie du Futur
            </h1>
            <p className="text-xl mb-8">
              Découvrez comment nous transformons l'air en eau potable pure grâce à notre technologie brevetée de génération d'eau atmosphérique.
            </p>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-lg">
              Explorer notre technologie
            </button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre technologie brevetée transforme l'humidité de l'air en eau potable pure à travers un processus sophistiqué en plusieurs étapes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <step.icon className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-${feature.color}-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <feature.icon className={`h-12 w-12 text-${feature.color}-600 mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-6">Standards de Qualité</h2>
              <p className="text-lg text-gray-600">
                Notre eau répond aux normes les plus strictes en matière de qualité et de sécurité.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Paramètres contrôlés</h3>
                <ul className="space-y-3">
                  {[
                    "pH et minéralisation optimale",
                    "Absence totale de bactéries",
                    "Zéro métaux lourds",
                    "Aucun pesticide",
                    "Sans microplastiques",
                    "Exempt de résidus médicamenteux"
                  ].map((param, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{param}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                <ul className="space-y-3">
                  {[
                    "Certification ISO 9001",
                    "Conformité ACS",
                    "Normes CE",
                    "Agrément sanitaire",
                    "Label Éco-conception",
                    "Certification NSF"
                  ].map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              Prêt à découvrir votre potentiel de production ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Utilisez notre calculateur pour estimer votre production d'eau potable
              et commencez votre transition vers l'autonomie en eau.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Calculer mon potentiel
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors duration-200">
                Nous contacter
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Technology;