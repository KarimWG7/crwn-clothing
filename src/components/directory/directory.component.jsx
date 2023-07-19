import React from "react";
import Category from "../category-item/category-item.compnent";

import "./directory.styles.scss";

function Directory({categories}) {
  
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <Category key={category.id} category={category} />;
      })}
    </div>
  );
}

export default Directory;
