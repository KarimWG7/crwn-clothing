import React, { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

const defaultProduct = {
  products: [],
  setProducts: () => null,
};

export const productsContext = createContext(defaultProduct);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };

  return (
    <productsContext.Provider value={value}>
      {children}
    </productsContext.Provider>
  );
}
