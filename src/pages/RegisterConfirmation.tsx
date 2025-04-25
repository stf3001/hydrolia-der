import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const RegisterConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers l'espace client après 3 secondes
    const timer = setTimeout(() => {
      navigate('/espace-client');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Compte créé avec succès !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Votre compte a été créé avec succès. Vous allez être redirigé vers votre espace client dans quelques secondes...
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterConfirmation;