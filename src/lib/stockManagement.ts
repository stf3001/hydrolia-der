import { supabase } from './supabase';

interface StockReservation {
  productId: string;
  quantity: number;
  expiresAt: Date;
}

const RESERVATION_TIMEOUT_MINUTES = 15;

export const checkStockAvailability = async (productId: string, quantity: number): Promise<boolean> => {
  const { data, error } = await supabase
    .from('products')
    .select('stock')
    .eq('id', productId)
    .single();

  if (error) throw error;
  
  // Vérifier les réservations actives
  const now = new Date();
  const { data: reservations, error: reservationsError } = await supabase
    .from('stock_reservations')
    .select('quantity')
    .eq('product_id', productId)
    .gt('expires_at', now.toISOString());

  if (reservationsError) throw reservationsError;

  const reservedQuantity = reservations?.reduce((sum, res) => sum + res.quantity, 0) || 0;
  const availableStock = data.stock - reservedQuantity;

  return availableStock >= quantity;
};

export const reserveStock = async (productId: string, quantity: number): Promise<void> => {
  const isAvailable = await checkStockAvailability(productId, quantity);
  if (!isAvailable) {
    throw new Error('Stock insuffisant');
  }

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + RESERVATION_TIMEOUT_MINUTES);

  const { error } = await supabase
    .from('stock_reservations')
    .insert([
      {
        product_id: productId,
        quantity,
        expires_at: expiresAt.toISOString()
      }
    ]);

  if (error) throw error;
};

export const releaseStockReservation = async (productId: string): Promise<void> => {
  const { error } = await supabase
    .from('stock_reservations')
    .delete()
    .eq('product_id', productId);

  if (error) throw error;
};

export const confirmStockReduction = async (productId: string, quantity: number): Promise<void> => {
  const { error } = await supabase.rpc('reduce_product_stock', {
    p_product_id: productId,
    p_quantity: quantity
  });

  if (error) throw error;
  await releaseStockReservation(productId);
};

// Fonction pour nettoyer les réservations expirées
export const cleanupExpiredReservations = async (): Promise<void> => {
  const now = new Date();
  
  const { error } = await supabase
    .from('stock_reservations')
    .delete()
    .lt('expires_at', now.toISOString());

  if (error) throw error;
}; 