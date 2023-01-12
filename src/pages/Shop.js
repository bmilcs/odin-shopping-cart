import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.scss";

function Shop({ onAddToCart, productList, isFetching }) {
  return (
    <div className="inside">
      <div className="product-grid">
        {isFetching ? (
          <h1>Loading Inventory...</h1>
        ) : (
          [...productList].sort().map((item) => {
            return (
              <ProductCard
                itemDetails={item}
                onAddToCart={onAddToCart}
                key={item.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Shop;
