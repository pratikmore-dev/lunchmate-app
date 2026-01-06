import { createContext, useContext, useState, ReactNode } from 'react';

// Define the cart item structure
export interface CartItem {
  vendorMenuID: string;
  menuID: string;
  menuName: string;
  vendorID: string;
  vendorName: string;
  fullRate: number;
  halfRate: number;
  selectedRate: 'full' | 'half';
  quantity: number;
  vendorSpecificNotes?: string;
}

// Define context value type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'selectedRate'>) => void;
  updateQuantity: (vendorMenuID: string, quantity: number) => void;
  updateRate: (vendorMenuID: string, rate: 'full' | 'half') => void;
  removeFromCart: (vendorMenuID: string) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getItemInCart: (vendorMenuID: string) => CartItem | undefined;
}

// Create context with undefined default (will be provided by Provider)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart or update if exists
  const addToCart = (item: Omit<CartItem, 'quantity' | 'selectedRate'>) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.vendorMenuID === item.vendorMenuID);
      
      if (existingItem) {
        // Item already exists, increment quantity
        return prev.map((i) =>
          i.vendorMenuID === item.vendorMenuID
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      // New item, add with default values
      return [...prev, { ...item, quantity: 1, selectedRate: 'full' }];
    });
  };

  // Update quantity (can be 0 to remove)
  const updateQuantity = (vendorMenuID: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(vendorMenuID);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.vendorMenuID === vendorMenuID
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Update rate selection
  const updateRate = (vendorMenuID: string, rate: 'full' | 'half') => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.vendorMenuID === vendorMenuID
          ? { ...item, selectedRate: rate }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (vendorMenuID: string) => {
    setCartItems((prev) => prev.filter((item) => item.vendorMenuID !== vendorMenuID));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total item count
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const rate = item.selectedRate === 'full' ? item.fullRate : item.halfRate;
      return total + rate * item.quantity;
    }, 0);
  };

  // Get specific item from cart
  const getItemInCart = (vendorMenuID: string) => {
    return cartItems.find((item) => item.vendorMenuID === vendorMenuID);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    updateRate,
    removeFromCart,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getItemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook for using cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}