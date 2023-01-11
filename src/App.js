import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import "./styles/App.scss";
import { getInventory } from "./util/inventoryData";
import {
  addProductToCart,
  changeItemQuantityManually,
  decrementCartItemQuantity,
  getPromoDiscountPercentage,
  incrementCartItemQuantity,
  loadCartFromStorage,
  updateCartTotalItemCount,
} from "./util/cartUtilities";

function App() {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [cartTotalItemCount, setCartTotalItemCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  // on first page load, regardless of route
  // load inventory from localstorage or fetch via api
  // and load cart from localstorage
  useEffect(() => {
    getInventory(
      "https://fakestoreapi.com/products",
      setIsFetching,
      setProductList
    );
    loadCartFromStorage(setCart);
  }, []);

  // on cart change, update cart total item count (displayed in header/navbar)
  useEffect(() => {
    updateCartTotalItemCount(setCartTotalItemCount, cart);
  }, [cart]);

  const handleAddToCart = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    addProductToCart(productID, productList, setCart);
  };

  const onQuantityChange = (e) => {
    const {
      value: newQuantity,
      dataset: { product_id: productID },
    } = e.target;
    changeItemQuantityManually(productID, newQuantity, setCart);
  };

  const onIncrementQuantity = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    incrementCartItemQuantity(productID, cart, setCart);
  };

  const onDecrementQuantity = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    decrementCartItemQuantity(productID, cart, setCart);
  };

  const onPromoChange = (e) => {
    const { value } = e.target;
    setPromoCode(value);
  };

  const onPromoSubmit = (e) => {
    e.preventDefault();
    const promoCode = e.target.elements["promo"].value;
    const discount = getPromoDiscountPercentage(promoCode);
    setDiscountPercentage(discount);
    setPromoCode("");
  };

  return (
    <>
      <Header cartQuantity={cartTotalItemCount} />
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
                isFetching={isFetching}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                cartTotalItemCount={cartTotalItemCount}
                onQuantityChange={onQuantityChange}
                onIncrementQuantity={onIncrementQuantity}
                onDecrementQuantity={onDecrementQuantity}
                onPromoChange={onPromoChange}
                onPromoSubmit={onPromoSubmit}
                promoCode={promoCode}
                discountPercentage={discountPercentage}
              />
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
