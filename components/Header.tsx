
import React from 'react';
import { ShoppingCartIcon } from './Icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <a href="#">EzziHomeGadgets</a>
        </h1>
        <button 
          onClick={onCartClick}
          className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-300"
          aria-label="Open cart"
        >
          <ShoppingCartIcon className="h-7 w-7" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
