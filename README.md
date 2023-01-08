# Odin Project #21: Shopping Cart

Welcome to Bryan Miller's Shopping Cart Project, the [twenty-first assignment](https://www.theodinproject.com/lessons/node-path-javascript-shopping-cart) within the Odin Project curriculum. The goal of this repo is to practice the following skill sets:

- React
  - React Testing Library
    - User Events (button click & input)
    - ByTestID
  - React Router DOM
    - Client side routing
  - Functional Components
    - Hooks
      - `useState`
      - `useEffect`
- API & Async JavaScript
  - [Fake Store API](https://github.com/keikaavousi/fake-store-api)
- LocalStorage
- SASS
- Media Queries
- Responsive Design
- GitHub Custom Domain
  - Cloudflare DNS
  - https://bmilcs.com/odin-shopping-cart

## Summary

For the third and final React project in the Odin Project cirriculum, we were tasked with developing a fake store with shopping cart. Here's how I attacked this project:

1. Created a new repo utilizing `create-react-app`, `sass` and `react-router-dom` npm packages
2. Collected resources: Fake Store API, icons, images & fonts
3. Wrote out ideas & laid out file structure

From there, I systemically broke the project down into smaller bite size chunks until I ended up with my final product.

### Fake Store API

Working with an API was a great experience. My first choice was Best Buy's API, but they have prohibit personal & `.edu` email accounts. After testing a few other free API's, I settled on the [Fake Store API](https://fakestoreapi.com/).

It was the perfect choice for this project. However, it was quite slow during fetch calls. To improve UX, I moved the `fetch` call to the `/home` page, giving it a head start before the user clicks on the Store navigation link. In addition, I implemented `localStorage` to cache the results, improving speed & preventing unnecessary calls to this awesome free service.

### `App.js` and Clean Code

Storing `state` and handler callback functions in the App component became messy quickly. As this project grew in complexity, I opted to segment a good amount of logic into the `utils/` directory, which is then imported and used within `App.js`:

- `utils/storage.js` contains localstorage utility functions
- `utils/inventoryData.js` contains the logic for loading the inventory from `localStorage` or the `fetch` API

`utils/cartUtilities.js` contains the bulk of the logic for this application. State variables are defined in `App`, and then passed as a parameter to functions that are imported from `cartUtilities`. For example:

- `addProductToCart(productID, productList, setCart)`
- `changeItemQuantityManually(productID, newQuantity, setCart);`
- `removeItemFromCart(productID, cart, setCart)`
- Several others...

### `Cart.js`

The `orderSummary` state variable contains an object of the financial details for the cart and is updated with the `updateOrderSummary` function. `useEffect()` came in handy, allowing me to update the order summary any time the `cart` object or `discountPercentage` is changed:

```js
// Cart.js
useEffect(() => {
  updateOrderSummary(setOrderSummary, cart, discountPercentage);
}, [cart, discountPercentage]);

// utils/cartUtilities.js
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
```

### Room for Improvement

As much as I would've liked to continue working on this project, I didn't want to spend more than a week on this. Some features I would've liked to have implemented include:

- Product sorting: by price, by name
- Product filtering: by category, by price ranges
- Individual product pages: showcasing large images & full descriptions
- Animation and transitions between pages
- Checkout page with address & payment fields
- Better UI / UX experience: better color scheme, typography, keyboard navigation, drop down menus

In addition, I'm not thrilled with the organization of this project as a whole. React is still a very new concept and the best practices for defining & handling state are beyond me at this point. However, I'm motivated to learn and improve as time goes on.

In summary, there are so many possibilities for a project like this, but I had to cut it short in order to move forward. Time is money and I'm looking forward to learning some advanced HTML/CSS and backend technologies.

## Screenshots

In progress...

## Links

- [Live Demo](https://bmilcs.github.io/odin-shopping-cart/)
- [My Odin Project Progress](https://github.com/bmilcs/odin-project)

## Deployment

```sh
# clone repo & change directories
git clone https://github.com/bmilcs/odin-shopping-cart
cd odin-shopping-cart

# install all dependencies
npm install

# run app
npm start
```
