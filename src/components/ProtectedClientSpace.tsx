import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import OrderTracking from './OrderTracking';
import type { OrderStatus } from '../lib/notifications';

interface Order {
  id: string;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
}

const ProtectedClientSpace = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">Erreur: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Espace client</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des commandes */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Mes commandes</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">Aucune commande pour le moment</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedOrder === order.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">
                        Commande #{order.id.slice(-8)}
                      </div>
                      <div className="text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {order.total_amount.toFixed(2)} €
                      </div>
                      <div
                        className={`text-sm font-medium px-2 py-1 rounded ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status === 'pending' && 'En attente'}
                        {order.status === 'paid' && 'Payée'}
                        {order.status === 'processing' && 'En préparation'}
                        {order.status === 'shipped' && 'Expédiée'}
                        {order.status === 'delivered' && 'Livrée'}
                        {order.status === 'cancelled' && 'Annulée'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Détails de la commande sélectionnée */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <OrderTracking orderId={selectedOrder} />
          ) : (
            <div className="bg-white shadow-sm rounded-lg p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">
                Sélectionnez une commande pour voir les détails
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedClientSpace;