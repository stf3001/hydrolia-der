import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { subscribeToOrderUpdates } from '../lib/notifications';
import type { OrderStatus } from '../lib/notifications';

interface Order {
  id: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  product: {
    name: string;
    image_url: string | null;
  };
}

interface OrderTrackingProps {
  orderId: string;
}

const statusSteps = [
  { status: 'pending', label: 'En attente' },
  { status: 'paid', label: 'Payée' },
  { status: 'processing', label: 'En préparation' },
  { status: 'shipped', label: 'Expédiée' },
  { status: 'delivered', label: 'Livrée' }
];

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Récupérer les détails de la commande
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (orderError) throw orderError;
        setOrder(orderData);

        // Récupérer les articles de la commande
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            quantity,
            unit_price,
            product_id,
            product:products (
              name,
              image_url
            )
          `)
          .eq('order_id', orderId);

        if (itemsError) throw itemsError;
        setItems(itemsData as OrderItem[]);

      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

    // S'abonner aux mises à jour de statut
    const unsubscribe = subscribeToOrderUpdates(orderId, (newStatus) => {
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
    });

    return () => {
      unsubscribe();
    };
  }, [orderId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">Erreur: {error}</div>;
  if (!order) return <div>Commande non trouvée</div>;

  const currentStepIndex = statusSteps.findIndex(step => step.status === order.status);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Suivi de commande</h2>

      {/* Barre de progression */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2" />
        <div
          className="absolute left-0 top-1/2 h-1 bg-blue-600 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => (
            <div
              key={step.status}
              className={`flex flex-col items-center ${
                index <= currentStepIndex ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStepIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Détails de la commande */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Informations générales</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Numéro de commande</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-500">Date de commande</p>
              <p className="font-medium">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Montant total</p>
              <p className="font-medium">{order.total_amount.toFixed(2)} €</p>
            </div>
            <div>
              <p className="text-gray-500">Dernière mise à jour</p>
              <p className="font-medium">
                {new Date(order.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Articles commandés</h3>
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <div key={index} className="py-4 flex items-center space-x-4">
                {item.product.image_url && (
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantité : {item.quantity} × {item.unit_price.toFixed(2)} €
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {(item.quantity * item.unit_price).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Adresse de livraison</h3>
          <p className="text-sm whitespace-pre-line">{order.shipping_address}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 