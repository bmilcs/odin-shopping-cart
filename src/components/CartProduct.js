import React from "react";

function CartProduct({
  product,
  onDecrementQuantity,
  onIncrementQuantity,
  onQuantityChange,
}) {
  return (
    <div className="cart-product-wrapper">
      <img className="cart-product-image" src={product.image} alt="" />
      <p className="cart-product-title">{product.title}</p>
      <div className="cart-quantity-wrapper">
        <button
          className="quantity-button"
          data-product_id={product.id}
          data-testid={`decrement-${product.id}`}
          onClick={onDecrementQuantity}
        >
          -
        </button>
        <input
          id={`${product.id}-quantity`}
          className="cart-product-quantity"
          data-product_id={product.id}
          data-testid={`input-${product.id}`}
          value={product.quantity}
          onChange={onQuantityChange}
        />
        <button
          className="quantity-button"
          data-product_id={product.id}
          data-testid={`increment-${product.id}`}
          onClick={onIncrementQuantity}
        >
          +
        </button>
      </div>
      <p className="cart-product-price-unit">${product.price.toFixed(2)}</p>
    </div>
  );
}

export default CartProduct;
