import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.scss";

function Shop({ onAddToCart }) {
  const [productList, setProductList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortProductsByCategory = (products) => {
    return products.reduce((sorted, item) => {
      const { category, ...rest } = item;
      sorted[category] = sorted[category] || [];
      sorted[category].push(rest);
      return sorted;
    }, {});
  };

  const viewElectronics = () => setViewList(productList["electronics"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        // fake store api is slow: improve performance on page switching
        const sortedData = sortProductsByCategory(data);
        localStorage.setItem("facadeItems", JSON.stringify(sortedData));
        setProductList(sortedData);
        setViewList(sortedData.electronics);
        setIsLoading(false);
      } catch (error) {
        console.warn(`Facade Error: ${error}`);
      }
    };

    if ("facadeItems" in localStorage) {
      setIsLoading(false);
      const storedData = JSON.parse(localStorage.getItem("facadeItems"));
      setProductList(storedData);
      setViewList(storedData.electronics);
    } else fetchProducts();
  }, []);

  console.count("Render Called");

  return (
    <div className="inside">
      <h2 className="page-header">Shop</h2>

      <div className="product-grid">
        {isLoading ? (
          <p>Loading items...</p>
        ) : (
          [...viewList].sort().map((item) => {
            return (
              <ProductCard
                itemDetails={item}
                key={item.id}
                onAddToCart={onAddToCart}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Shop;

// weapon api alternative

// useEffect(() => {
//   const fetchWeapons = async () => {
//     const response = await fetch("https://valorant-api.com/v1/weapons");
//     const json = await response.json();
//     const weapons = json.data;
//     const notFreeWeapons = weapons.filter(
//       (weapon) => weapon.shopData !== null
//     );
//     console.log(weapons);
//     setWeaponList(notFreeWeapons);
//   };
//   fetchWeapons();
// }, []);

//   {weaponList.map((weapon) => {
//   return (
//     <>
//       <h2>{weapon.displayName}</h2>
//       <h3>${weapon.shopData.cost}</h3>
//       <p>{weapon.categoryText}</p>
//       <img src={weapon.displayIcon} />
//       {weapon.skins.slice(0, 5).map((skinned) => (
//         <img src={skinned.displayIcon} alt={skinned.displayIcon} />
//       ))}
//     </>
//   );
// })}
