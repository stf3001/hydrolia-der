import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, Menu, X, User, Award, ShoppingCart } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useCart } from '../lib/CartContext';
import { supabase } from '../lib/supabase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, role } = useAuth();
  const { itemCount } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session?.user);
  };

  const navigation = [
    { name: 'Technologie', href: '/technologie' },
    { name: 'Produits', href: '/produits' },
    { name: 'Mon potentiel hydrique', href: '/calculateur' },
    { name: 'Applications', href: '/applications' },
    { name: 'Certification & Qualité', href: '/certification' },
    { name: 'Qui sommes-nous?', href: '/qui-sommes-nous' },
    { name: "L'esprit Colibri", href: '/esprit-colibri' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Espace Ambassadeur', href: '/espace-ambassadeur' },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">HYDROLIA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Panier */}
            <Link
              to="/panier"
              className="relative text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/espace-client"
                  className="flex items-center space-x-1 text-[#6BA292] hover:text-[#1A3E6B] transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span>Mon Compte</span>
                </Link>
                {role === 'ambassador' && (
                  <Link
                    to="/espace-ambassadeur"
                    className="flex items-center space-x-1 text-[#6BA292] hover:text-[#1A3E6B] transition-colors duration-200"
                  >
                    <Award className="h-4 w-4" />
                    <span>Espace Ambassadeur</span>
                  </Link>
                )}
                {role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-[#6BA292] hover:text-[#1A3E6B] transition-colors duration-200"
                  >
                    <Award className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-[#1A3E6B] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/panier"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Panier
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/espace-client"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#6BA292] hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mon Compte
                  </Link>
                  {role === 'ambassador' && (
                    <Link
                      to="/espace-ambassadeur"
                      className="block px-3 py-2 rounded-md text-base font-medium text-[#6BA292] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Espace Ambassadeur
                    </Link>
                  )}
                  {role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-[#6BA292] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-[#1A3E6B] text-white hover:bg-opacity-90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;