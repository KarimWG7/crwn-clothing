import { createSlice } from "@reduxjs/toolkit";
const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

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

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = !state.isCartOpen;
    },
    addItemToCart(state, action) {
      const { payload } = action;
      state.cartItems = addCartItem(state.cartItems, payload);
    },
    clearItemFromCart(state, action) {
      const { payload } = action;
      const newcart = state.cartItems.filter((cartItem) => {
        return cartItem.id !== payload;
      });
      state.cartItems = newcart;
    },
    removeItemFromCart(state, action) {
      const { payload } = action;
      if (payload.quantity === 1) {
        this.clearItemFromCart(payload.id);
      } else {
        const newCartItems = updateCartItems(state.cartItems, payload.id, "-");
        state.cartItems = newCartItems;
      }
    },
  },
});
export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// export const cartReducer = (state = CARt_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;
//   switch (type) {
//     case CART_ACTIONS_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         cartItems: payload,
//       };
//     case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };

//     default:
//       return state;
//   }
// };
