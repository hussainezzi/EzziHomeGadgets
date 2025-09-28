
import React from 'react';
import type { Product } from '../types';
import { PlusIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl">
      <div className="overflow-hidden">
        <img 
          src={product.imageurl} 
          alt={product.name} 
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 flex-grow mb-4">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-2xl font-bold text-indigo-600">PKR {product.price.toFixed(2)}</p>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 text-white rounded-full p-3 flex items-center justify-center shadow-md hover:bg-indigo-700 transition-all duration-300 transform group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label={`Add ${product.name} to cart`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;