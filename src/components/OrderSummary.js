import React from "react";

function OrderSummary({ orderSummary }) {
  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="order-summary-wrapper">
        <p className="order-summary-label">Subtotal:</p>
        <p className="order-subtotal">${orderSummary.subtotal}</p>
        <p className="order-summary-label">Taxes:</p>
        <p className="order-taxes">${orderSummary.taxes}</p>
        <p className="order-summary-label">Shipping:</p>
        <p className="order-shipping">${orderSummary.shipping}</p>
        <hr className="order-summary-line"></hr>
        <p className="order-summary-label order-total-label">Total:</p>
        <p className="order-total">${orderSummary.total}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
