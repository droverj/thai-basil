import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Load cart data from local storage if available
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

  const [cart, setCart] = useState(initialCart);


  const calculateTotalItems = () => {
    const total = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    return total;
  };

  const emptyCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    const subtotal = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
    return subtotal.toFixed(2);
  };

  useEffect(() => {
    // Save cart data to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const price = parseFloat(item.price).toFixed(2);
      setCart([...cart, { ...item, quantity: 1, price }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const deleteItemFromCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(existingItemIndex, 1);
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteItemFromCart,
        totalItems: calculateTotalItems(),
        subtotal: calculateSubtotal(),
        emptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
