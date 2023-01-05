import { useEffect, useState } from "react";
import "../styles/Cart.scss";

function Cart({
  cart,
  cartQty,
  onQuantityChange,
  onIncrementQuantity,
  onDecrementQuantity,
}) {
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    setSubTotal(
      Object.keys(cart)
        .reduce((acc, cur) => {
          return acc + cart[cur].price * cart[cur].quantity;
        }, 0)
        .toFixed(2)
    );
  }, [cart]);

  useEffect(() => {
    setShipping((cartQty * 3.5).toFixed(2));
  }, [subTotal]);

  useEffect(() => {
    setTaxes((subTotal * 0.05).toFixed(2));
  }, [shipping]);

  useEffect(() => {
    setOrderTotal((+subTotal + +taxes + +shipping).toFixed(2));
  }, [taxes]);

  console.count("render");

  return (
    <div className="inside">
      <h1>Cart</h1>

      {/* shopping cart items, w/ -/+ buttons for changing qty*/}
      {!cartQty ? (
        <p>No items are present in your shopping cart</p>
      ) : (
        <div className="shopping-cart-wrapper">
          {Object.keys(cart).map((productID) => {
            const product = cart[productID];
            return (
              <>
                <img
                  className="cart-product-image"
                  src={product.image}
                  alt=""
                />
                <p className="cart-product-title">{product.title}</p>
                <div className="cart-quantity-wrapper">
                  <button
                    className="quantity-button"
                    data-product_id={product.id}
                    onClick={onDecrementQuantity}
                  >
                    -
                  </button>
                  <input
                    id={`${product.id}-quantity`}
                    className="cart-product-quantity"
                    data-product_id={product.id}
                    value={product.quantity}
                    onChange={onQuantityChange}
                  />
                  <button
                    className="quantity-button"
                    data-product_id={product.id}
                    onClick={onIncrementQuantity}
                  >
                    +
                  </button>
                </div>
                <div className="product-numbers-wrapper">
                  <p className="cart-product-price-unit">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="cart-product-price-total">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      )}

      {/* order summary */}
      <div className="order-summary-container">
        <h2 className="order-summary-title">Order Summary</h2>
        <div className="order-summary-wrapper">
          <p className="order-summary-label">Subtotal:</p>
          <p className="order-subtotal">${subTotal}</p>
          <p className="order-summary-label">Taxes:</p>
          <p className="order-taxes">${taxes}</p>
          <p className="order-summary-label">Shipping:</p>
          <p className="order-shipping">${shipping}</p>
          <p className="order-summary-label order-total-label">Total:</p>
          <p className="order-total">${orderTotal}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
