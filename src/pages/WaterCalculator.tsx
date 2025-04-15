import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, MapPin, ChevronDown, Sun } from 'lucide-react';

// Base de données simplifiée des villes françaises avec leurs données météo moyennes
const donneesVilles = {
  "Paris": {
    temperature: 11.6,
    humidite: 79.9,
    production_annuelle: 13177,
    consommation_annuelle: 6772.31
  },
  "Marseille": {
    temperature: 15.9,
    humidite: 70.3,
    production_annuelle: 15156,
    consommation_annuelle: 7069.38
  },
  "Lyon": {
    temperature: 13.1,
    humidite: 77.2,
    production_annuelle: 13254,
    consommation_annuelle: 6734.27
  },
  "Toulouse": {
    temperature: 13.7,
    humidite: 78.0,
    production_annuelle: 14143,
    consommation_annuelle: 6918.75
  },
  "Nice": {
    temperature: 15.5,
    humidite: 72.1,
    production_annuelle: 14156,
    consommation_annuelle: 6568.02
  },
  "Nantes": {
    temperature: 12.8,
    humidite: 80.2,
    production_annuelle: 13986,
    consommation_annuelle: 6993.00
  },
  "Strasbourg": {
    temperature: 11.2,
    humidite: 76.8,
    production_annuelle: 12805,
    consommation_annuelle: 6659.80
  },
  "Montpellier": {
    temperature: 15.4,
    humidite: 71.5,
    production_annuelle: 14890,
    consommation_annuelle: 6945.35
  },
  "Bordeaux": {
    temperature: 13.9,
    humidite: 80.0,
    production_annuelle: 14650,
    consommation_annuelle: 7076.37
  },
  "Lille": {
    temperature: 11.0,
    humidite: 81.5,
    production_annuelle: 13083,
    consommation_annuelle: 6864.02
  },
  "Rennes": {
    temperature: 12.3,
    humidite: 81.7,
    production_annuelle: 13725,
    consommation_annuelle: 6999.75
  },
  "Brest": {
    temperature: 11.8,
    humidite: 83.2,
    production_annuelle: 13483,
    consommation_annuelle: 7001.16
  }
};

const WaterCalculator = () => {
  const [ville, setVille] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [useSolar, setUseSolar] = useState(false);
  const [results, setResults] = useState({
    daily: 0,
    monthly: 0,
    yearly: 0,
    bottles: 0,
    energy: 0,
    temperature: 0,
    humidity: 0,
    costPerLiter: 0,
    totalEnergyCost: 0,
    totalFilterCost: 0,
    totalCost: 0
  });
  const [isCalculated, setIsCalculated] = useState(false);

  // Constantes pour les calculs
  const COUT_KWH = 0.23; // en euros
  const COUT_FILTRES_ANNUEL = 100; // en euros
  const COUT_FILTRES_SOLAIRE = 50; // en euros

  const filteredCities = Object.keys(donneesVilles).filter(
    city => city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (selectedCity) => {
    setVille(selectedCity);
    setSearchTerm('');
    setIsDropdownOpen(false);
    calculateWater(selectedCity, useSolar);
  };

  const toggleSolarOption = () => {
    setUseSolar(!useSolar);
    if (ville) {
      calculateWater(ville, !useSolar);
    }
  };

  const calculateWater = (selectedCity, solarPowered) => {
    if (!donneesVilles[selectedCity]) {
      alert('Veuillez sélectionner une ville dans la liste.');
      return;
    }

    const donnees = donneesVilles[selectedCity];
    
    // Calcul de la production d'eau
    let yearlyProduction = donnees.production_annuelle;
    let energyConsumption = donnees.consommation_annuelle;
    
    // Ajustement pour l'option solaire (1/3 de la production)
    if (solarPowered) {
      yearlyProduction = Math.round(yearlyProduction / 3);
      energyConsumption = 0; // Pas de consommation d'énergie payante avec le solaire
    }
    
    const dailyProduction = yearlyProduction / 365;
    const monthlyProduction = dailyProduction * 30;
    const bottlesAvoided = yearlyProduction * 2;
    
    // Calcul des coûts
    const energyCost = energyConsumption * COUT_KWH;
    const filterCost = solarPowered ? COUT_FILTRES_SOLAIRE : COUT_FILTRES_ANNUEL;
    const totalCost = energyCost + filterCost;
    const costPerLiter = totalCost / yearlyProduction;
    
    setResults({
      daily: Math.round(dailyProduction),
      monthly: Math.round(monthlyProduction),
      yearly: Math.round(yearlyProduction),
      bottles: Math.round(bottlesAvoided),
      energy: Math.round(energyConsumption),
      temperature: Math.round(donnees.temperature * 10) / 10,
      humidity: Math.round(donnees.humidite),
      costPerLiter: Math.round(costPerLiter * 1000) / 1000, // Arrondi à 3 décimales
      totalEnergyCost: Math.round(energyCost * 100) / 100,
      totalFilterCost: filterCost,
      totalCost: Math.round(totalCost * 100) / 100
    });
    
    setIsCalculated(true);
  };

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
              Calculateur Hydrique AWG
            </h1>
            <p className="text-xl text-gray-600">
              Découvrez le potentiel de production d'eau de nos générateurs HYDROLIA dans votre ville
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Sélectionnez votre ville</h2>
                
                <div className="space-y-6">
                  {/* Location Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville la plus proche
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white px-4 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                          {ville || 'Choisissez une ville'}
                        </span>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                          <div className="p-2">
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Rechercher une ville..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCities.map((city) => (
                              <button
                                key={city}
                                type="button"
                                onClick={() => handleCitySelect(city)}
                                className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150"
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Solar Option */}
                  <div className="mt-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useSolar}
                        onChange={toggleSolarOption}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="flex items-center text-gray-700">
                        <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                        AWG couplé à l'énergie solaire
                      </span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1 ml-8">
                      Production limitée à 8h/jour avec énergie gratuite
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-blue-50 p-8 rounded-xl shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Potentiel de production</h2>
                
                <div className="space-y-6">
                  {isCalculated ? (
                    <>
                      <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Production journalière</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {results.daily}L
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Production mensuelle</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {results.monthly}L
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Production annuelle</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {results.yearly}L
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-100 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Conditions météorologiques moyennes</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Température</span>
                          <span className="text-xl font-bold text-blue-600">
                            {results.temperature}°C
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Humidité relative</span>
                          <span className="text-xl font-bold text-blue-600">
                            {results.humidity}%
                          </span>
                        </div>
                      </div>

                      {/* Coût de revient section - MODIFIÉE */}
                      <div className="bg-purple-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Coût de revient de votre eau pure</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Coût par litre</span>
                          <span className="text-xl font-bold text-purple-600">
                            {results.costPerLiter}€
                          </span>
                        </div>
                        {useSolar ? (
                          <div className="text-sm text-gray-500 mt-2">
                            <p>Basé sur un coût annuel de filtres de {results.totalFilterCost}€</p>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 mt-2">
                            <p>Basé sur un coût énergétique de {COUT_KWH}€/kWh et un coût annuel de filtres de {results.totalFilterCost}€</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Impact environnemental</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Bouteilles plastiques évitées</span>
                          <span className="text-xl font-bold text-green-600">
                            {results.bottles}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Consommation énergétique</span>
                          <span className="text-xl font-bold text-amber-600">
                            {useSolar ? '0' : results.energy} kWh/an
                          </span>
                        </div>
                      </div>

                      <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Recevoir le détail par email
                      </button>
                    </>
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                      <Droplets className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                      <p className="text-gray-600">
                        Sélectionnez votre ville pour découvrir le potentiel de production d'eau de nos générateurs d'eau atmosphérique.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      {isCalculated && (
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Comment fonctionne notre calculateur ?</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">
                  Notre calculateur hydrique AWG utilise les données météorologiques moyennes de villes françaises pour estimer la production d'eau de nos générateurs d'eau atmosphérique.
                </p>
                
                <p className="mb-4">
                  Les résultats sont basés sur les performances de notre modèle AWG 50 litres, qui peut produire jusqu'à 50 litres d'eau par jour dans des conditions optimales.
                </p>
                
                <p className="mb-4">
                  La production réelle peut varier en fonction des conditions météorologiques spécifiques et de l'emplacement exact de votre appareil. Contactez-nous pour une étude personnalisée.
                </p>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <h4 className="font-semibold mb-2">Informations complémentaires :</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Coût moyen du kWh utilisé pour les calculs : 0,23€/kWh</li>
                    <li>Source des données météorologiques : statistiques de Météo France de 1940 à nos jours</li>
                    <li>Les AWG couplés au solaire fonctionnent en moyenne 8h par jour sur l'année</li>
                    <li>La production est donnée à titre indicatif, la production réelle dépendant de l'environnement spécifique de l'AWG</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WaterCalculator;
