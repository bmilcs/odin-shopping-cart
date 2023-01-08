import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.scss";
import emptyCartImg from "../assets/empty-cart.jpg";
import { updateOrderSummary } from "../util/cartUtilities";
import CartProduct from "../components/CartProduct";
import OrderSummary from "../components/OrderSummary";

function Cart({
  cart,
  cartTotalItemCount,
  onQuantityChange,
  onIncrementQuantity,
  onDecrementQuantity,
}) {
  const [orderSummary, setOrderSummary] = useState({});

  // update order summary on cart changes
  useEffect(() => {
    updateOrderSummary(setOrderSummary, cart);
  }, [cart]);

  return (
    <div className="inside">
      {!cartTotalItemCount ? (
        // empty cart image with button to return to shop
        <div className="empty-shopping-cart-wrapper">
          <img
            className="empty-cart-image"
            src={emptyCartImg}
            alt="Empty shopping cart"
            data-testid="empty-cart-image"
          />
          <Link to="/shop">
            <button className="empty-cart-button">Fill me up!</button>
          </Link>
        </div>
      ) : (
        // {/* shopping cart item list, w/ -/+ buttons for changing qty*/}
        <>
          <div className="cart-page-wrapper">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="shopping-cart-wrapper">
              {Object.keys(cart).map((productID) => {
                const product = cart[productID];
                return (
                  <CartProduct
                    product={product}
                    onDecrementQuantity={onDecrementQuantity}
                    onIncrementQuantity={onIncrementQuantity}
                    onQuantityChange={onQuantityChange}
                    key={product.id}
                  />
                );
              })}
            </div>

            {/* order summary */}
            <OrderSummary orderSummary={orderSummary} />

            {/* checkout button */}
            <button className="checkout-button">Check Out</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
