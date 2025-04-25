import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Commande confirmée !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Merci pour votre commande. Vous recevrez bientôt un email de confirmation avec les détails de votre commande.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link
            to="/espace-client"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Suivre ma commande
          </Link>
          <Link
            to="/produits"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 