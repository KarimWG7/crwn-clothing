import React from "react";
import "./cart-item.styles.scss";

function CartItem({ product }) {
  const { name, quantity, imageUrl, price } = product;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
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
