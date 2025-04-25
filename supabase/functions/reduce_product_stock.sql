CREATE OR REPLACE FUNCTION reduce_product_stock(p_product_id uuid, p_quantity integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE products
  SET stock = stock - p_quantity
  WHERE id = p_product_id AND stock >= p_quantity;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Stock insuffisant ou produit non trouvé';
  END IF;
END;
$$; 