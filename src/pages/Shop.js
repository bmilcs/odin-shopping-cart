import React from "react";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "../assets/AddShoppingCartIcon";

function Shop() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setProductList(json);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Shop</h1>
      {productList.map((item) => {
        return (
          <>
            <p>{item.category}</p>
            <AddShoppingCartIcon />

            <p>{item.rating.rate} / 5.0 Stars</p>
            <h2>{item.title}</h2>
            <h3>${item.price}</h3>
            <p>{item.description}</p>
            <img src={item.image} />
          </>
        );
      })}
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
