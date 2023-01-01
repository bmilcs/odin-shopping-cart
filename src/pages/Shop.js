import React from "react";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "../assets/AddShoppingCartIcon";

function Shop() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.count("Render Count");

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("fetch run");
      setIsLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      localStorage.setItem("facadeItems", JSON.stringify(data));
      setIsLoading(false);
      setProductList(data);
    };

    if ("facadeItems" in localStorage) {
      console.log("localstorage");
      setIsLoading(false);
      setProductList(JSON.parse(localStorage.getItem("facadeItems")));
    } else fetchProducts();
  }, []);

  return (
    <>
      <h1>Shop</h1>

      {isLoading ? (
        <h2>Loading items...</h2>
      ) : (
        productList.map((item) => {
          return (
            <>
              <p>{item.category}</p>
              <AddShoppingCartIcon />

              <p>{item.rating.rate} / 5.0 Stars</p>
              <h2>{item.title}</h2>
              <h3>${item.price}</h3>
              <p>{item.description}</p>
              <img src={item.image} alt={item.title} />
            </>
          );
        })
      )}
    </>
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
