import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HYDROLIA</h3>
            <p className="text-blue-200 mb-4">
              De l'eau pure, extraite de l'air
            </p>
            <div className="space-y-2">
              <a href="mailto:contact@hydrolia.fr" className="flex items-center text-blue-200 hover:text-white">
                <Mail className="h-4 w-4 mr-2" />
                contact@hydrolia.fr
              </a>
              <a href="tel:+33123456789" className="flex items-center text-blue-200 hover:text-white">
                <Phone className="h-4 w-4 mr-2" />
                01 23 45 67 89
              </a>
              <div className="flex items-start text-blue-200">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>
                  123 Avenue de l'Innovation<br />
                  75001 Paris, France
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/technologie" className="text-blue-200 hover:text-white">
                  Technologie
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-blue-200 hover:text-white">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-blue-200 hover:text-white">
                  Applications
                </Link>
              </li>
              <li>
                <Link to="/calculateur" className="text-blue-200 hover:text-white">
                  Calculateur
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">À propos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/qui-sommes-nous" className="text-blue-200 hover:text-white">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link to="/esprit-colibri" className="text-blue-200 hover:text-white">
                  L'esprit Colibri
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-blue-200 hover:text-white">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-blue-200 hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 rounded bg-blue-700 text-white placeholder-blue-300 border border-blue-600 focus:outline-none focus:border-blue-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-200"
                >
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} HYDROLIA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;