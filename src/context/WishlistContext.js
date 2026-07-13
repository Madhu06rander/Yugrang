import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('yugrang_wishlist')) || []
  );

  const addToWishlist = (product) => {
    const existing = wishlist.find(p => p.id === product.id);
    if (existing) return;
    const updated = [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem('yugrang_wishlist', JSON.stringify(updated));
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter(p => p.id !== productId);
    setWishlist(updated);
    localStorage.setItem('yugrang_wishlist', JSON.stringify(updated));
  };

  const isWishlisted = (productId) => {
    return wishlist.some(p => p.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('yugrang_wishlist');
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      clearWishlist,
      totalWishlist: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}