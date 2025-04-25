import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

// Remplacer par votre clé publique Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export interface PaymentIntent {
  clientSecret: string;
  id: string;
}

export const createPaymentIntent = async (amount: number): Promise<PaymentIntent> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: { amount }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (clientSecret: string, paymentMethod: any) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe not initialized');

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod
  });

  if (error) throw error;
  return paymentIntent;
};

export default stripePromise; 