import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer.utils";

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
    return updateCartItems(cartItems, productToAdd.id, "+");
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const cartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
});

const CART_ACTIONS_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  cartItems: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTIONS_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool));
  };
  const updateCartItemsReducer = (newCartItems) => {
    // generate newCartTotal
    const newCartTotal = newCartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    // generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    // dispatch new action with payload
    dispatch(
      createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        total: newCartTotal,
        count: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (id) => {
    const newcart = cartItems.filter((cartItem) => {
      return cartItem.id !== id;
    });
    const newCartItems = newcart;
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (item) => {
    if (item.quantity === 1) {
      clearItemFromCart(item.id);
    } else {
      const newCartItems = updateCartItems(cartItems, item.id, "-");
      updateCartItemsReducer(newCartItems);
    }
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    clearItemFromCart,
    removeItemFromCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
