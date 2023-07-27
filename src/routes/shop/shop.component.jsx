import React, { useContext } from "react";
import { productsContext } from "../../contexts/product.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

function Shop() {
  const { products } = useContext(productsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default Shop;
