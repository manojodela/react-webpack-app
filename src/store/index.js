import React, { createContext, useContext, useEffect, useState } from 'react';
import { encryptData, getData } from '../common/storage';

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = getData("cart");
    return savedCart ? savedCart : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    encryptData("cart", cart);
  }, [cart]);

  const addProductToCart = (newProduct) => {
    setCart((prevCart) => {
      const productExists = prevCart.find(product => product.id === newProduct.id);
      if (productExists) {
        return prevCart.map(product => 
          product.id === newProduct.id 
            ? { ...product, quantity: product.quantity + 1 } 
            : product
        );
      }
      return [...prevCart, { ...newProduct, quantity: 1 }];
    });
  };

  const removeProductFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== productId);
      encryptData("cart", updatedCart); // Update local storage with the new cart state
      return updatedCart;
    });
  };

  const incrementProductQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(product => 
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
      );
      encryptData("cart", updatedCart); // Update local storage with the new cart state
      return updatedCart;
    });
  };

  const decrementProductQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(product => 
        product.id === productId && product.quantity > 1 
          ? { ...product, quantity: product.quantity - 1 } 
          : product
      );
      encryptData("cart", updatedCart); // Update local storage with the new cart state
      return updatedCart;
    });
  };

  const getCartData = () => {
    return getData("cart");
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addProductToCart, 
      removeProductFromCart, 
      incrementProductQuantity, 
      decrementProductQuantity, 
      showModal, 
      setShowModal, 
      product, 
      setProduct, 
      showCart, 
      setShowCart, 
      getCartData ,
      getTotalCartPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};
