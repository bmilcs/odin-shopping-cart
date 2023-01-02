import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import "./styles/App.scss";

function App() {
  const [cart, setCart] = useState({});
  const [cartQty, setCartQty] = useState(0);

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

  useEffect(() => {
    const getCartQuantity = () => {
      let totalQuantity = 0;
      for (const key in cart) {
        const product = cart[key];
        totalQuantity = totalQuantity + product.quantity;
      }
      return totalQuantity;
    };
    const newQuantity = getCartQuantity();
    setCartQty(newQuantity);
  }, [cart]);

  return (
    <>
      <Header cartQuantity={cartQty} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop onAddToCart={handleAddToCart} />}
          />
          <Route path="/cart" element={<Cart cartQuantity={cart} />} />
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
