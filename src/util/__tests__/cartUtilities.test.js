import "@testing-library/jest-dom";
import { updateOrderSummary } from "../cartUtilities";

describe("order summary math", () => {
  const fakeCart = {
    1: {
      id: 1,
      price: 109.95,
      quantity: 2,
    },
    2: {
      id: 2,
      price: 50.95,
      quantity: 3,
    },
  };

  // mock setState function
  let summary;
  const setOrderSummary = (obj) => (summary = obj);

  updateOrderSummary(setOrderSummary, fakeCart);

  it("check subtotal value:", () => {
    expect(summary.subtotal).toBe("372.75");
  });

  it("check taxes value:", () => {
    expect(summary.taxes).toBe("18.64");
  });

  it("check shipping value:", () => {
    expect(summary.shipping).toBe("17.50");
  });

  it("check total value:", () => {
    expect(summary.total).toBe("408.89");
  });
});
