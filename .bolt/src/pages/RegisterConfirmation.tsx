import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compte créé avec succès !
          </h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Vérifiez votre boîte mail</span>
            </div>
            <p className="text-sm text-gray-600">
              Un email de confirmation vous a été envoyé.
              Cliquez sur le lien dans l'email pour activer votre compte.
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            Une fois votre email confirmé, vous pourrez vous connecter à votre espace client.
          </p>

          <Link
            to="/espace-client"
            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour à l'espace client
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterConfirmation;