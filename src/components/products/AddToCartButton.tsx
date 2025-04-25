import React, { useState } from 'react';
import { useCart } from '../../lib/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
}

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Commander
      </button>

      {/* Notification */}
      {showNotification && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg text-sm whitespace-nowrap">
          Produit ajouté au panier !
        </div>
      )}
    </div>
  );
};

export default AddToCartButton; 