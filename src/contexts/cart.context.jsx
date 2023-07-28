import { createContext, useEffect, useState } from "react";


const updateCartItems = (cartItems, id, oper) => {
  return cartItems.map((cartItem) =>
    cartItem.id === id
      ? {
          ...cartItem,
          quantity: oper === "+" ? ++cartItem.quantity : --cartItem.quantity,
        }
      : cartItem
  );
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    updateCartItems(cartItems, productToAdd.id, "+");
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const cartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItem: () => {},
  increase: () => {},
  decrease: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // const removeItem = (id) => {
  //   const newcart = cartItems.filter((cartItem) => {
  //     return cartItem.id !== id;
  //   });
  //   setCartItems(newcart);
  // };
  // const increase = (item) => {
  //   const newCartItems = updateCartItems(cartItems, item.id, "+");
  //   setCartItems(newCartItems);
  // };

  // const decrease = (item) => {
  //   if (item.quantity === 1) {
  //     removeItem(item.id);
  //   } else {
  //     const newCartItems = updateCartItems(cartItems, item.id, "-");
  //     setCartItems(newCartItems);
  //   }
  // };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    // removeItem,
    // decrease,
    // increase,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
