import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import "./styles/App.scss";
// import { loadFromLocalStorage, saveToLocalStorage } from "./util/storage";

function App() {
  const [productList, setProductList] = useState({});
  const [cart, setCart] = useState({});
  const [cartQty, setCartQty] = useState(0);
  // const PRODUCT_LIST_KEY = "facadeProductList";
  // const CART_KEY = "facadeCart";

  // on first render
  // attempt to load cart & productlist from localstorage
  // useEffect(() => {
  //   const cartData = loadFromLocalStorage(CART_KEY);
  //   if (cartData) setCart(cartData);
  //   const productListData = loadFromLocalStorage(PRODUCT_LIST_KEY);
  //   if (productListData) setProductList(productListData);
  // }, []);

  // on cart change, update cart quantity
  useEffect(() => {
    const getCartItemCount = () => {
      let totalQuantity = 0;
      for (const key in cart) {
        const product = cart[key];
        totalQuantity = totalQuantity + product.quantity;
      }
      return totalQuantity;
    };
    const cartQuantity = getCartItemCount();
    setCartQty(cartQuantity);
    // saveToLocalStorage(CART_KEY, cart);
  }, [cart]);

  // add product to cart: { productID: quantity: 1, ...}
  const handleAddToCart = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    setCart((prev) => ({
      ...prev,
      [productID]: {
        quantity: (prev[productID] ? prev[productID].quantity : 0) + 1,
      },
    }));
  };

  return (
    <>
      <Header cartQuantity={cartQty} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop
                onAddToCart={handleAddToCart}
                productList={productList}
                setProductList={setProductList}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} cartQty={cartQty} productList={productList} />
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

// Brainstorm/Pseudo-code

// Layout / Components

// App
//  Header (Static)
//    Logo & Store name
//    Navbar: Home, Shop
//      Cart Logo (with item count)
//  Main
//    Home
//    Shopping
//      Categories Bar (Sticky Bar)
//      Sort by Price, by Category
//      Product Grid
//        Product Cards
//          Image
//          Description
//          Quantity
//            Input:  # qty
//            Buttons: +/- qty
//          Button: Add to Cart
//    Cart
//      List of products
//      Subtotal
//      Checkout Button
//      Credit Card Type Accept
//      Promo Code Option
//  Footer
//    GitHub Icon / Link
//    Newsletter Signup
//    Page Links
