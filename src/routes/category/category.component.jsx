//NOTE: need to Change
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import {
  selectCategories,
  selectCategoriesMap,
} from "../../store/categories/category.selector";

import "./category.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

const Category = ({isLoading}) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  // const categoriesMap = useSelector(selectCatgoriesMap);
  const categoriesMap = useSelector(selectCategories);

  useEffect(() => {
    const productsArr = categoriesMap[category];
    setProducts(productsArr);
  }, [categoriesMap, category]);
  return (
    <Fragment>
      <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="products-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
  
};

export default Category;
