import React from "react";
import CategoryItem from "../category-item/category-item.compnent";

import "./directory.styles.scss";

function Directory({ categories }) {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
}

export default Directory;
