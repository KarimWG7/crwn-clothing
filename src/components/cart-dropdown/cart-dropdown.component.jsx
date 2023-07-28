import React, { useContext } from "react";

import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { cartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

function CartDropdown() {
  const { cartItems } = useContext(cartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} product={cartItem} />
          ))
        ) : (
          <p className="empty-message">No Items Found</p>
        )}
      </div>
      <Button>Go To Checkout</Button>
    </div>
  );
}

export default CartDropdown;
