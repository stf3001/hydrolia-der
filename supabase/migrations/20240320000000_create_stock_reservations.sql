CREATE TABLE stock_reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_expiration CHECK (expires_at > created_at)
);

CREATE INDEX idx_stock_reservations_product ON stock_reservations(product_id);
CREATE INDEX idx_stock_reservations_expiration ON stock_reservations(expires_at);

-- Fonction pour nettoyer automatiquement les réservations expirées
CREATE OR REPLACE FUNCTION cleanup_expired_reservations()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM stock_reservations
  WHERE expires_at < NOW();
END;
$$;

-- Créer un job pour exécuter le nettoyage toutes les 5 minutes
SELECT cron.schedule(
  'cleanup-expired-reservations',
  '*/5 * * * *',
  'SELECT cleanup_expired_reservations()'
); 