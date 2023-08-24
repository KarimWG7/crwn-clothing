import { useDispatch, useSelector } from "react-redux";

import Button from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.reducer";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./product-card.styles.scss";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;
  const addProductToCart = () => dispatch(addItemToCart(product));
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
