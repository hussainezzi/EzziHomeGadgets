
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, CartItem } from './types';
import { productCsvString, WHATSAPP_NUMBER } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const parseCsv = (csv: string): Product[] => {
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const productLines = lines.slice(1);

      return productLines.map(line => {
        const values = line.split(',');
        const productData = headers.reduce((obj, header, index) => {
          // FIX: Correctly type `key` to be a key of `Product` to allow for proper parsing.
          const key = header.toLowerCase() as keyof Product;
          const value = values[index].trim();
          if (key === 'id' || key === 'price') {
             (obj as any)[key] = parseFloat(value);
          } else {
             (obj as any)[key] = value;
          }
          return obj;
        }, {} as Product);
        return productData;
      });
    };
    setProducts(parseCsv(productCsvString));
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);
  
  const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleRemoveItem = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    const orderDetails = cart.map(item => 
      `${item.name} (x${item.quantity}) - PKR ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `Hello! I'd like to place an order:\n\n${orderDetails}\n\n*Total: PKR ${total}*`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }, [cart]);
  
  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleShopNowClick = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Smarter Living Starts Here.</h2>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-indigo-100">
            Explore our curated collection of innovative home gadgets designed to simplify and enhance your daily life.
          </p>
          <button
            onClick={handleShopNowClick}
            className="mt-8 px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </section>

      <main id="products-section" className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;