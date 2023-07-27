import { createContext, useState } from "react";

const defaultCart = {
  cart: {
    items: [],
    totalQuantity: 0,
    isDropped: false,
  },
  setCart: () => null,
};

export const cartContext = createContext(defaultCart);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    isDropped : false,
  });
  const value = { cart, setCart };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
