import React from "react";
import AddShoppingCartIcon from "../assets/AddShoppingCartIcon";

function ProductCard({
  itemDetails: {
    title,
    price,
    description,
    image,
    rating: { rate },
  },
}) {
  return (
    <div className="product-card">
      <h2>{title}</h2>
      <h3>${price}</h3>
      <AddShoppingCartIcon />
      <p>{rate} / 5.0 Stars</p>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
}

export default ProductCard;
