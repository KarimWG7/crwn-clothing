import { CART_ACTIONS_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer.utils";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);

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


  export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,newCartItems);
  };

  export const clearItemFromCart = ( cartItems,id) => {
    const newcart = cartItems.filter((cartItem) => {
      return cartItem.id !== id;
    });
    const newCartItems = newcart;
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,newCartItems);
  };

  export const removeItemFromCart = (cartItems, item) => {
    if (item.quantity === 1) {
      clearItemFromCart(item.id);
    } else {
      const newCartItems = updateCartItems(cartItems, item.id, "-");
      return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,newCartItems);
    }
  };
