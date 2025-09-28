
import React, { useMemo } from 'react';
import type { CartItem } from '../types';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from './Icons';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close cart">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center py-4">
                  <img src={item.imageurl} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">PKR {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200" aria-label="Decrease quantity">
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200" aria-label="Increase quantity">
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                     <p className="font-semibold text-lg text-gray-800">PKR {(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-sm mt-2" aria-label="Remove item">
                          <TrashIcon className="h-5 w-5 inline-block"/>
                      </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 border-t mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-medium text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-gray-900">PKR {totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;