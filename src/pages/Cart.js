import "../styles/Cart.scss";

function Cart({
  cart,
  cartQty,
  onQuantityChange,
  onIncrementQuantity,
  onDecrementQuantity,
}) {
  return (
    <div className="inside">
      <h1>Cart</h1>
      {!cartQty ? (
        <p>No items are present in your shopping cart</p>
      ) : (
        <div className="shopping-cart-wrapper">
          {Object.keys(cart).map((productID) => {
            const product = cart[productID];
            return (
              // <div className="cart-product-wrapper" key={productID}>
              <>
                <img
                  className="cart-product-image"
                  src={product.image}
                  alt=""
                />
                {/* <div className="product-details-wrapper"> */}
                <p className="cart-product-title">{product.title}</p>
                <div className="cart-quantity-wrapper">
                  <button
                    className="quantity-button"
                    data-product_id={product.id}
                    onClick={onDecrementQuantity}
                  >
                    -
                  </button>
                  <input
                    id={`${product.id}-quantity`}
                    className="cart-product-quantity"
                    data-product_id={product.id}
                    value={product.quantity}
                    onChange={onQuantityChange}
                  />
                  <button
                    className="quantity-button"
                    data-product_id={product.id}
                    onClick={onIncrementQuantity}
                  >
                    +
                  </button>
                </div>
                <div className="product-numbers-wrapper">
                  <p className="cart-product-price-unit">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="cart-product-price-total">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  {/* </div> */}
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cart;
