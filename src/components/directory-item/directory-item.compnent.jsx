import React from "react";
import "./directory-item.styles.scss";
import { Link, useNavigate } from "react-router-dom";

function DirectoryItem({ category }) {
  const { imageUrl, route, title } = category;

  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
