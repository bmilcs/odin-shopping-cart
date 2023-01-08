import React from "react";

function OrderSummary({ orderSummary, discountPercentage }) {
  return (
    <div className="order-summary-wrapper">
      <h2 className="order-summary-title">Order Summary</h2>
      <p className="order-summary-label">Subtotal:</p>
      <p className="order-subtotal">${orderSummary.subtotal}</p>
      {discountPercentage ? (
        <>
          <p className="order-summary-label order-summary-discount-label">
            Discount:
          </p>
          <p className="order-subtotal order-summary-discount">
            - ${orderSummary.discount}
          </p>
        </>
      ) : null}
      <p className="order-summary-label">Taxes:</p>
      <p className="order-taxes">${orderSummary.taxes}</p>
      <p className="order-summary-label">Shipping:</p>
      <p className="order-shipping">${orderSummary.shipping}</p>
      <hr className="order-summary-line"></hr>
      <p className="order-summary-label order-total-label">Total:</p>
      <p className="order-total">${orderSummary.total}</p>
    </div>
  );
}

export default OrderSummary;
