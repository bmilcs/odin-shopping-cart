import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.scss";

function Shop({
  onAddToCart,
  productList,
  setProductList,
  isFetching,
  setIsFetching,
  viewList,
  setViewList,
}) {
  // const sortProductsByCategory = (products) => {
  //   return products.reduce((sorted, item) => {
  //     const { category, ...rest } = item;
  //     sorted[category] = sorted[category] || [];
  //     sorted[category].push(rest);
  //     return sorted;
  //   }, {});
  // };

  // const viewElectronics = () => setViewList(productList["electronics"]);

  return (
    <div className="inside">
      <h2 className="page-header">Shop</h2>

      <div className="product-grid">
        {isFetching ? (
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
