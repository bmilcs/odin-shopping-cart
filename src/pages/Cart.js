import React, { useEffect, useState } from "react";
import "../styles/Cart.scss";

function Cart({ cartQty, cart, productList }) {
  const [cartProductInfo, setCartProductInfo] = useState([]);

  useEffect(() => {
    const cartData = [];
    for (const productID in cart) {
      const [productInfo] = productList.filter(
        (product) => product.id === +productID
      );
      productInfo.quantity = cart[productID]["quantity"];
      cartData.push(productInfo);
    }
    setCartProductInfo(cartData);
  }, []);

  return (
    <div className="inside">
      <h1>Cart</h1>
      {!cartQty ? (
        <p>No items are present in your shopping cart</p>
      ) : (
        cartProductInfo.map((product) => {
          return (
            <div className="cart-product-wrapper">
              <img className="cart-product-image" src={product.image} alt="" />
              <h3 className="cart-product-title">{product.title}</h3>
              <p className="cart-product-quantity">{product.quantity}</p>
              <p className="cart-product-price-unit">${product.price}</p>
              <p
                className="
                product-price-total"
              >
                ${product.price * product.quantity}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cart;
