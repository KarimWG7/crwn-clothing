import React, { useContext } from "react";

import { cartContext } from "../../contexts/cart.context";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

function CartIcon() {
  const { cart, setCart } = useContext(cartContext);
  const toggleIsCartOpen = () => {
    setCart({ ...cart, isDropped: !cart.isDropped });
  };

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">{cart.totalQuantity}</span>
    </div>
  );
}

export default CartIcon;
