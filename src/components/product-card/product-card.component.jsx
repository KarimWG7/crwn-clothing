import React, { useContext } from "react";

import Button from "../button/button.component";
import { cartContext } from "../../contexts/cart.context";

import "./product-card.styles.scss";

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(cartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}-product`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}.00</span>
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to card
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
