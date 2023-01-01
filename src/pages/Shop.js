import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.count("Render Count");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("fetch run");
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        localStorage.setItem("facadeItems", JSON.stringify(data));
        setIsLoading(false);
        setProductList(data);
      } catch (error) {
        console.warn("Error");
        console.log(error);
      }
    };

    if ("facadeItems" in localStorage) {
      console.log("localstorage");
      setIsLoading(false);
      setProductList(JSON.parse(localStorage.getItem("facadeItems")));
    } else fetchProducts();
  }, []);

  return (
    <div className="inside">
      <h1>Shop</h1>

      {isLoading ? (
        <h2>Loading items...</h2>
      ) : (
        productList.map((item) => {
          return <ProductCard itemDetails={item} key={item.id} />;
        })
      )}
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
