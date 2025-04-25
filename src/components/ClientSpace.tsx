import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Building2, Phone, MapPin, Calendar, Mail, Edit, Save, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { useAuth } from '../lib/AuthContext';
import { LoginForm } from './auth/LoginForm';

type Client = Database['public']['Tables']['clients']['Row'];

const ClientSpace = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Client> | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user?.email) {
          throw new Error("Email non trouvé dans la session");
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session || session.user.email !== user.email) {
          throw new Error("Session invalide");
        }

        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            throw new Error("Aucune donnée client trouvée pour cet email");
          }
          throw error;
        }
        
        setClientData(data);
        setEditedData(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Échec de la récupération des données');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Échec de la déconnexion');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(clientData);
    setSuccessMessage(null);
  };

  const handleSave = async () => {
    if (!editedData || !clientData) return;

    try {
      const { error } = await supabase
        .from('clients')
        .update(editedData)
        .eq('id', clientData.id);

      if (error) throw error;

      setClientData(prev => prev ? { ...prev, ...editedData } : null);
      setIsEditing(false);
      setSuccessMessage('Informations mises à jour avec succès');
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Update error:', err);
      setError('Échec de la mise à jour des informations');
    }
  };

  const handleInputChange = (field: keyof Client, value: string) => {
    setEditedData(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Espace Client</h1>
            <p className="mt-2 text-gray-600">
              Connectez-vous ou créez votre compte pour accéder à votre espace personnel
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1A3E6B] hover:bg-opacity-90"
                >
                  Se connecter
                </Link>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-3 border border-[#1A3E6B] text-base font-medium rounded-md text-[#1A3E6B] bg-white hover:bg-gray-50"
                >
                  Créer un compte
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1A3E6B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <p className="text-red-600 mb-4 text-center">{error}</p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <p className="mb-4 text-center">Aucune donnée client trouvée</p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Mon Espace Client</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>{user.email}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-[#1A3E6B] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className="space-y-6">
              <p className="text-gray-600">
                Bienvenue dans votre espace client. Cette section est en cours de développement.
              </p>
              {/* Ajoutez ici le contenu de l'espace client */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientSpace;
