import React, { useContext } from "react";
import "./cart-item.styles.scss";
import { cartContext } from "../../contexts/cart.context";

function CartItem({ product }) {
  const { name, quantity, imageUrl, price } = product;
  const { } = useContext(cartContext);
  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
        onClick={() => {
       
        }}
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>
          {quantity} × {price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
