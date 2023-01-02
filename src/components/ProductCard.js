import React from "react";
import "../styles/ProductCard.scss";
import "../styles/Button.scss";

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
        <button onClick={onAddToCart} data-product_id={id}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
