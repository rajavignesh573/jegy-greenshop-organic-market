
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Product, CartItem } from '@/types/product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, []);

  // Update cart total when items change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setCartTotal(total);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    
    setCartItems(prevItems => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        
        // Check if we have enough stock
        if (newQuantity > product.stock) {
          toast.error(`Sorry, only ${product.stock} ${product.unit}(s) available`);
          return prevItems;
        }
        
        updatedItems[existingItemIndex].quantity = newQuantity;
        toast.success(`Added ${quantity} more ${product.name} to your cart`);
        return updatedItems;
      } else {
        // Add new item
        toast.success(`Added ${product.name} to your cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.product.name} from your cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          // Check if we have enough stock
          if (quantity > item.product.stock) {
            toast.error(`Sorry, only ${item.product.stock} ${item.product.unit}(s) available`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Your cart has been cleared');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
