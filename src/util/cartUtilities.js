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

const updateOrderSummary = (setOrderSummary, cart, discountPercentage = 0) => {
  const totalItemCount = getCartTotalItemsCount(cart);

  const subtotal = getSubtotal(cart).toFixed(2);
  const discount = getDiscount(subtotal, discountPercentage).toFixed(2);
  const shipping = getShipping(totalItemCount).toFixed(2);
  const taxes = getTaxes(subtotal).toFixed(2);
  const total = getTotal(subtotal, shipping, taxes, discount).toFixed(2);

  setOrderSummary({
    subtotal: subtotal,
    discount: discount,
    shipping: shipping,
    taxes: taxes,
    total: total,
  });
};

const getSubtotal = (cart) =>
  +Object.keys(cart).reduce((acc, cur) => {
    return acc + cart[cur].price * cart[cur].quantity;
  }, 0);
const getShipping = (itemCount) => +(itemCount * 3.5);

const getTaxes = (subtotal) => subtotal * 0.05;

const getTotal = (subtotal, shipping, taxes, discount = 0) => {
  return +subtotal + +shipping + +taxes - +discount;
};

const getDiscount = (subtotal, discountPercentage) =>
  discountPercentage ? Number(subtotal * (discountPercentage / 100)) : 0;

const getPromoDiscountPercentage = (promoCode) => {
  if (/^20off$/gi.test(promoCode)) return 20;
  if (/^10off$/gi.test(promoCode)) return 10;
  return 0;
};

export {
  addProductToCart,
  changeCartItemQuantity,
  decrementCartItemQuantity,
  getCartTotalItemsCount,
  getPromoDiscountPercentage,
  incrementCartItemQuantity,
  loadCartFromStorage,
  changeItemQuantityManually,
  removeItemFromCart,
  updateCartTotalItemCount,
  updateOrderSummary,
};
