import React from "react";
import RedeemIcon from "../assets/RedeemIcon";

function PromoCode({ onPromoChange, onPromoSubmit, promoCode }) {
  return (
    <form onSubmit={onPromoSubmit} className="promo-form-container">
      <div className="promo-label-container">
        <label htmlFor="promo" className="promo-label">
          Discount Code
        </label>
        <RedeemIcon />
      </div>
      <input
        type="text"
        placeholder="'20OFF' & '10OFF' are Real Promo Codes!"
        className="promo-input"
        id="promo"
        name="promo"
        onChange={onPromoChange}
        value={promoCode}
      />
      <button className="promo-button">Apply Discount</button>
    </form>
  );
}

export default PromoCode;
