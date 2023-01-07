import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import "./styles/App.scss";
import { loadLocalData, saveDataLocally } from "./util/storage";

function App() {
  const [productList, setProductList] = useState({});
  const [viewList, setViewList] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const CART_KEY = "facadeCart";
  const INVENTORY_KEY = "facadeInventory";

  // on first page load, regardless of route,
  // load inventory from localstorage or fetch via api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        // fake store api is slow: improve performance
        saveDataLocally(INVENTORY_KEY, data);
        setProductList(data);
        setViewList(data);
        setIsFetching(false);
      } catch (error) {
        console.warn(`Facade Error: ${error}`);
      }
    };

    if (INVENTORY_KEY in localStorage) {
      setIsFetching(false);
      const data = loadLocalData(INVENTORY_KEY);
      setProductList(data);
      setViewList(data);
    } else {
      fetchProducts();
    }
  }, []);

  // on first render
  // attempt to load cart from localstorage
  useEffect(() => {
    const cartData = loadLocalData(CART_KEY);
    if (cartData) setCart(cartData);
  }, []);

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
    saveDataLocally(CART_KEY, cart);
  }, [cart]);

  const handleAddToCart = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    const [productDetails] = productList.filter(
      (product) => product.id === +productID
    );
    setCart((prev) => ({
      ...prev,
      [productID]: {
        ...productDetails,
        quantity: (prev[productID] ? prev[productID].quantity : 0) + 1,
      },
    }));
  };

  const onQuantityChange = (e) => {
    const {
      value: newValue,
      dataset: { product_id: productID },
    } = e.target;
    const newNumber = +newValue;
    if (newNumber && Number.isInteger(newNumber)) {
      changeItemQuantity(productID, newNumber);
    } else if (newNumber === 0) {
      removeItemFromCart(productID);
    }
  };

  const onIncrementQuantity = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    const quantity = getItemQuantity(productID);
    changeItemQuantity(productID, quantity + 1);
  };

  const onDecrementQuantity = (e) => {
    const {
      dataset: { product_id: productID },
    } = e.target;
    const quantity = getItemQuantity(productID);
    if (quantity > 1) {
      changeItemQuantity(productID, quantity - 1);
    } else {
      removeItemFromCart(productID);
    }
  };

  const changeItemQuantity = (productID, newQuantity) => {
    setCart((prev) => ({
      ...prev,
      [productID]: {
        ...prev[productID],
        quantity: newQuantity,
      },
    }));
  };

  const removeItemFromCart = (productID) => {
    setCart(() => {
      let newCart = {};
      for (const id in cart) {
        if (id !== productID) {
          newCart = { ...newCart, [id]: { ...cart[id] } };
        }
      }
      return newCart;
    });
  };

  const getItemQuantity = (productID) => {
    return cart[productID].quantity;
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
                viewList={viewList}
                setViewList={setViewList}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                cartQty={cartQty}
                onQuantityChange={onQuantityChange}
                onIncrementQuantity={onIncrementQuantity}
                onDecrementQuantity={onDecrementQuantity}
              />
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
