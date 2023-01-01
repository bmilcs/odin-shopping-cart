import React from "react";
import Button from "./Button";
import "../styles/ProductCard.scss";

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
      <div className="image-wrapper">
        <img className="product-image" src={image} alt={title} />
      </div>
      <h2 className="product-name">{title}</h2>
      <p className="product-rating">{rate} / 5.0 Stars</p>
      <p className="product-description">{description}</p>
      <div className="price-button-wrapper">
        <h3 className="product-price">${price}</h3>
        <Button>Add To Cart</Button>
      </div>
    </div>
  );
}

export default ProductCard;
