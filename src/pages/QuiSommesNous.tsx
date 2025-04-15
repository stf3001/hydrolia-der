import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const QuiSommesNous = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* About Us Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-2">Hydrolia</h1>
          <h2 className="text-2xl text-gray-600 text-center mb-8">Chaque goutte compte</h2>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              En France, la qualité de l'eau est souvent perçue comme acquise. Pourtant, la réalité est plus nuancée. Entre <strong>polluants invisibles</strong>, <strong>microplastiques</strong>, et <strong>stress hydrique croissant</strong>, l'eau pure et accessible pour tous est un défi silencieux. C'est pour relever ce défi qu'est née <strong>Hydrolia</strong>, une entreprise fondée par une bande d'amis quadragénaires, <strong>parents et professionnels</strong>, venus d'horizons complémentaires : <strong>gestion d'entreprise, finance, droit, ingénierie mécanique, tech et photovoltaïque</strong>.
            </p>

            <p className="text-lg text-gray-700 mb-4">
              🌱 <strong>Tout commence en 2022</strong>, lors d'une visite dans le Var, en plein été caniculaire. Un des co-fondateurs échange avec une habitante, les larmes aux yeux face à l'interdiction d'arroser son jardin, voyant ses fleurs mourir jour après jour. Ce simple jardin symbolisait bien plus : <strong>la perte de son autonomie, de son lien à la nature</strong>. Ce moment a marqué un tournant.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
              <p className="text-lg">
                Offrir une solution durable et autonome pour l'accès à l'eau potable, tout en préservant les ressources naturelles et en réduisant l'impact environnemental.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Nos Valeurs</h3>
                <ul className="space-y-2">
                  <li>🌿 Innovation durable</li>
                  <li>💧 Qualité sans compromis</li>
                  <li>🤝 Engagement social</li>
                  <li>🌍 Responsabilité environnementale</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Notre Impact</h3>
                <ul className="space-y-2">
                  <li>🌊 Réduction du stress hydrique</li>
                  <li>♻️ Élimination des déchets plastiques</li>
                  <li>💪 Autonomie des communautés</li>
                  <li>🌱 Préservation des ressources</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="quote">Demande de devis</option>
                  <option value="demo">Démonstration</option>
                  <option value="support">Support technique</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuiSommesNous;