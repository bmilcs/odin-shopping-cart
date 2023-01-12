import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.scss";
import emptyCartImg from "../assets/empty-cart.jpg";
import { updateOrderSummary } from "../util/cartUtilities";
import CartProduct from "../components/CartProduct";
import OrderSummary from "../components/OrderSummary";
import PromoCode from "../components/PromoCode";

function Cart({
  cart,
  cartTotalItemCount,
  onQuantityChange,
  onIncrementQuantity,
  onDecrementQuantity,
  onPromoChange,
  onPromoSubmit,
  promoCode,
  discountPercentage,
}) {
  const [orderSummary, setOrderSummary] = useState({});

  // update order summary on cart or discount % changes
  useEffect(() => {
    updateOrderSummary(setOrderSummary, cart, discountPercentage);
  }, [cart, discountPercentage]);

  return (
    <div className="inside">
      {!cartTotalItemCount ? (
        // empty cart: return image with button to return to shop
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
        // cart with 1+ items
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

            <div className="promo-summary-wrapper">
              <PromoCode
                onPromoChange={onPromoChange}
                onPromoSubmit={onPromoSubmit}
                promoCode={promoCode}
                discountPercentage={discountPercentage}
              />
              <OrderSummary
                orderSummary={orderSummary}
                discountPercentage={discountPercentage}
              />
              <button className="checkout-button">Check Out</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
