import { loadLocalData, saveDataLocally } from "../util/storage";

const CART_KEY = "facadeCart";

const loadCartFromStorage = (setCart) => {
  const cartData = loadLocalData(CART_KEY);
  if (cartData) setCart(cartData);
};

const updateCartTotalItemCount = (setCartTotalItemCount, cart) => {
  const cartQuantity = getCartTotalItemsCount(cart);
  setCartTotalItemCount(cartQuantity);
  saveDataLocally(CART_KEY, cart);
};

const getCartTotalItemsCount = (cart) => {
  let totalQuantity = 0;
  for (const key in cart) {
    const product = cart[key];
    totalQuantity = totalQuantity + product.quantity;
  }
  return totalQuantity;
};

const getCartItemCount = (productID, cart) => cart[productID].quantity;

const addProductToCart = (productID, productList, setCart) => {
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

const changeCartItemQuantity = (productID, newQuantity, setCart) => {
  setCart((prev) => ({
    ...prev,
    [productID]: {
      ...prev[productID],
      quantity: newQuantity,
    },
  }));
};

const changeItemQuantityManually = (productID, newQuantity, setCart) => {
  const quantity = +newQuantity;
  if (quantity && Number.isInteger(quantity)) {
    changeCartItemQuantity(productID, quantity, setCart);
  } else if (quantity === 0) {
    removeItemFromCart(productID, setCart);
  }
};

const incrementCartItemQuantity = (productID, cart, setCart) => {
  const quantity = getCartItemCount(productID, cart);
  changeCartItemQuantity(productID, quantity + 1, setCart);
};

const decrementCartItemQuantity = (productID, cart, setCart) => {
  const quantity = getCartItemCount(productID, cart);
  if (quantity > 1) {
    changeCartItemQuantity(productID, quantity - 1, setCart);
  } else {
    removeItemFromCart(productID, cart, setCart);
  }
};

const removeItemFromCart = (productID, cart, setCart) => {
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

const updateOrderSummary = (setOrderSummary, cart) => {
  const totalItemCount = getCartTotalItemsCount(cart);

  const subtotal = getSubtotal(cart);
  const shipping = getShipping(totalItemCount);
  const taxes = getTaxes(+subtotal);
  const total = getTotal(+subtotal, +shipping, +taxes);

  setOrderSummary({
    subtotal: subtotal,
    shipping: shipping,
    taxes: taxes,
    total: total,
  });
};

const getSubtotal = (cart) =>
  Object.keys(cart)
    .reduce((acc, cur) => {
      return acc + cart[cur].price * cart[cur].quantity;
    }, 0)
    .toFixed(2);

const getShipping = (itemCount) => (itemCount * 3.5).toFixed(2);

const getTaxes = (subtotal) => (subtotal * 0.05).toFixed(2);

const getTotal = (subtotal, shipping, taxes) =>
  (subtotal + shipping + taxes).toFixed(2);

export {
  addProductToCart,
  changeCartItemQuantity,
  decrementCartItemQuantity,
  getCartTotalItemsCount,
  incrementCartItemQuantity,
  loadCartFromStorage,
  changeItemQuantityManually,
  removeItemFromCart,
  updateCartTotalItemCount,
  updateOrderSummary,
};
