import React, { useEffect, useState } from "react";

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
            <div className="product-wrapper">
              <img src={product.image} alt="" />
              <h3>{product.title}</h3>
              <p>{product.quantity}</p>
              <p>${product.price}</p>
              <p>${product.price * product.quantity}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cart;
