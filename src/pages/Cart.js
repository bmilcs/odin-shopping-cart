import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.scss";
import emptyCartImg from "../assets/empty-cart.jpg";

function Cart({
  cart,
  cartQty,
  onQuantityChange,
  onIncrementQuantity,
  onDecrementQuantity,
}) {
  const [orderSummary, setOrderSummary] = useState({});

  const getSubtotal = () =>
    Object.keys(cart)
      .reduce((acc, cur) => {
        return acc + cart[cur].price * cart[cur].quantity;
      }, 0)
      .toFixed(2);

  const getShipping = () => (cartQty * 3.5).toFixed(2);

  const getTaxes = () => (getSubtotal() * 0.05).toFixed(2);

  const getTotal = () =>
    (+getSubtotal() + +getTaxes() + +getShipping()).toFixed(2);

  // on changes to the cart object, update the order summary details
  useEffect(() => {
    setOrderSummary({
      subtotal: getSubtotal(),
      shipping: getShipping(),
      taxes: getTaxes(),
      total: getTotal(),
    });
  }, [cart]);

  return (
    <div className="inside">
      {/* shopping cart items, w/ -/+ buttons for changing qty*/}
      {!cartQty ? (
        <div className="empty-shopping-cart-wrapper">
          <img className="empty-cart-image" src={emptyCartImg} alt="" />
          <Link to="/shop">
            <button className="empty-cart-button">Fill me up!</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-page-wrapper">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="shopping-cart-wrapper">
              {Object.keys(cart).map((productID) => {
                const product = cart[productID];
                return (
                  <>
                    <div className="cart-product-wrapper">
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
                      <p className="cart-product-price-unit">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>

            {/* order summary */}
            <div className="order-summary-container">
              <h2 className="order-summary-title">Order Summary</h2>
              <div className="order-summary-wrapper">
                <p className="order-summary-label">Subtotal:</p>
                <p className="order-subtotal">${orderSummary.subtotal}</p>
                <p className="order-summary-label">Taxes:</p>
                <p className="order-taxes">${orderSummary.taxes}</p>
                <p className="order-summary-label">Shipping:</p>
                <p className="order-shipping">${orderSummary.shipping}</p>
                <hr className="order-summary-line"></hr>
                <p className="order-summary-label order-total-label">Total:</p>
                <p className="order-total">${orderSummary.total}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
