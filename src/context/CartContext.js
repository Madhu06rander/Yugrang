import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, color) => {
    const existing = cartItems.find(
      item => item.id === product.id && item.size === size
    );
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        ...product,
        size,
        color,
        quantity: 1,
        cartId: Date.now(),
      }]);
    }
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, qty) => {
    if (qty < 1) { removeFromCart(cartId); return; }
    setCartItems(cartItems.map(item =>
      item.cartId === cartId ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      updateQuantity, clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}