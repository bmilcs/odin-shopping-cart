import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { getCartTotalItemsCount } from "../../util/cartUtilities";
import Cart from "../Cart";

describe("shopping cart tests", () => {
  const cart = {
    1: {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      quantity: 2,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    },
  };

  const cartTotalItemCount = getCartTotalItemsCount(cart);
  const onIncrementQuantity = jest.fn();
  const onQuantityChange = jest.fn();
  const onDecrementQuantity = jest.fn();

  it("cart item count function", () => {
    expect(cartTotalItemCount).toBe(2);
  });

  it("increment quantity button click to fire onIncrementQuantity", () => {
    render(
      <Cart
        cart={cart}
        cartTotalItemCount={cartTotalItemCount}
        onQuantityChange={onQuantityChange}
        onIncrementQuantity={onIncrementQuantity}
        onDecrementQuantity={onDecrementQuantity}
      />
    );
    const button = screen.getByTestId("increment-1");
    userEvent.click(button);
    expect(onIncrementQuantity).toHaveBeenCalled();
  });

  it("decrement quantity button click to fire onDecrementQuantity", () => {
    render(
      <Cart
        cart={cart}
        cartTotalItemCount={cartTotalItemCount}
        onQuantityChange={onQuantityChange}
        onIncrementQuantity={onIncrementQuantity}
        onDecrementQuantity={onDecrementQuantity}
      />
    );
    const button = screen.getByTestId("decrement-1");
    userEvent.click(button);
    expect(onDecrementQuantity).toHaveBeenCalled();
  });

  it("manually change quantity input to fire onQuantityChange", () => {
    render(
      <Cart
        cart={cart}
        cartTotalItemCount={cartTotalItemCount}
        onQuantityChange={onQuantityChange}
        onIncrementQuantity={onIncrementQuantity}
        onDecrementQuantity={onDecrementQuantity}
      />
    );
    const input = screen.getByTestId("input-1");
    userEvent.type(input, "2");
    expect(onQuantityChange).toHaveBeenCalled();
  });
});

describe("empty shopping cart", () => {
  const cart = {};
  const cartTotalItemCount = getCartTotalItemsCount(cart);
  const onIncrementQuantity = jest.fn();
  const onQuantityChange = jest.fn();
  const onDecrementQuantity = jest.fn();

  it("empty cart image to appear", () => {
    // useHref error workaround
    // empty cart renders a button with a <Link> element in it
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Cart
                cart={cart}
                cartTotalItemCount={cartTotalItemCount}
                onQuantityChange={onQuantityChange}
                onIncrementQuantity={onIncrementQuantity}
                onDecrementQuantity={onDecrementQuantity}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const emptyCartImg = screen.getByTestId("empty-cart-image");
    expect(emptyCartImg).toBeVisible();
  });
});
