import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useCart } from '../lib/CartContext';
import { supabase } from '../lib/supabase';
import { createPaymentIntent, confirmPayment } from '../lib/stripe';
import { sendOrderStatusEmail } from '../lib/notifications';
import { checkStockAvailability, reserveStock, releaseStockReservation, confirmStockReduction } from '../lib/stockManagement';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CheckoutForm {
  shippingAddress: string;
  billingAddress: string;
  sameAsShipping: boolean;
}

const Checkout = () => {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    shippingAddress: '',
    billingAddress: '',
    sameAsShipping: true,
  });

  useEffect(() => {
    // Vérifier le stock pour tous les articles
    const checkStock = async () => {
      try {
        for (const item of items) {
          const isAvailable = await checkStockAvailability(item.product.id, item.quantity);
          if (!isAvailable) {
            setError(`Stock insuffisant pour ${item.product.name}`);
            return false;
          }
        }
        return true;
      } catch (err) {
        console.error('Error checking stock:', err);
        setError('Erreur lors de la vérification du stock');
        return false;
      }
    };

    // Réserver le stock et créer l'intention de paiement
    const initializeCheckout = async () => {
      if (!items.length) return;
      
      const stockAvailable = await checkStock();
      if (!stockAvailable) return;

      try {
        // Réserver le stock pour chaque article
        for (const item of items) {
          await reserveStock(item.product.id, item.quantity);
        }

        // Créer l'intention de paiement
        const { clientSecret: secret } = await createPaymentIntent(Math.round(total * 100));
        setClientSecret(secret);
      } catch (err) {
        console.error('Error initializing checkout:', err);
        setError('Erreur lors de l\'initialisation du paiement');
      }
    };

    initializeCheckout();

    // Nettoyer les réservations à la sortie
    return () => {
      items.forEach(item => {
        releaseStockReservation(item.product.id).catch(console.error);
      });
    };
  }, [items, total]);

  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements || !clientSecret) {
      setError('Erreur de configuration du paiement');
      setLoading(false);
      return;
    }

    try {
      // Confirmer le paiement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const paymentResult = await confirmPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              line1: form.sameAsShipping ? form.shippingAddress : form.billingAddress
            }
          }
        }
      });

      // Créer la commande
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            status: 'paid',
            total_amount: total,
            shipping_address: form.shippingAddress,
            billing_address: form.sameAsShipping ? form.shippingAddress : form.billingAddress,
            payment_intent_id: paymentResult.id
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Créer les lignes de commande et mettre à jour le stock
      for (const item of items) {
        await supabase
          .from('order_items')
          .insert([
            {
              order_id: order.id,
              product_id: item.product.id,
              quantity: item.quantity,
              unit_price: item.product.price
            }
          ]);

        await confirmStockReduction(item.product.id, item.quantity);
      }

      // Envoyer l'email de confirmation
      await sendOrderStatusEmail(user.id, order.id, 'paid');

      // Vider le panier et rediriger
      clearCart();
      navigate('/commande-confirmee');

    } catch (err) {
      console.error('Error processing order:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Validation de la commande</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Récapitulatif</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.product.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Quantité : {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              ))}
              <div className="py-4 flex justify-between">
                <p className="font-semibold text-gray-900">Total</p>
                <p className="font-semibold text-gray-900">{total.toFixed(2)} €</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Adresses</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="shipping" className="block text-sm font-medium text-gray-700">
                  Adresse de livraison
                </label>
                <textarea
                  id="shipping"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  value={form.shippingAddress}
                  onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={form.sameAsShipping}
                  onChange={(e) => setForm({ ...form, sameAsShipping: e.target.checked })}
                />
                <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                  Utiliser la même adresse pour la facturation
                </label>
              </div>

              {!form.sameAsShipping && (
                <div>
                  <label htmlFor="billing" className="block text-sm font-medium text-gray-700">
                    Adresse de facturation
                  </label>
                  <textarea
                    id="billing"
                    required={!form.sameAsShipping}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    value={form.billingAddress}
                    onChange={(e) => setForm({ ...form, billingAddress: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Paiement</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !stripe}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 