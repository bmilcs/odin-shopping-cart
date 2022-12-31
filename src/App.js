import { useEffect, useState } from "react";

// Brainstorm/Pseudo-code

// Layout / Components

// App
//  Header (Static)
//    Logo & Store name
//    Navbar: Home, Shop
//      Cart Logo (with item count)
//  Main
//    Home
//    Shopping
//      Categories Bar (Sticky Bar)
//      Product Grid
//        Product Cards
//          Image
//          Description
//          Quantity
//            Input:  # qty
//            Buttons: +/- qty
//          Button: Add to Cart
//    Cart
//      List of products
//      Subtotal
//      Checkout Button
//  Footer
//    GitHub Icon / Link

function App() {
  const [productList, setProductList] = useState([]);

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

  useEffect(() => {
    const fetchGear = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setProductList(json);
    };
    fetchGear();
  }, []);

  return (
    <div className="App">
      <h1>Best Store Ever</h1>
      {/* {weaponList.map((weapon) => {
        return (
          <>
            <h2>{weapon.displayName}</h2>
            <h3>${weapon.shopData.cost}</h3>
            <p>{weapon.categoryText}</p>
            <img src={weapon.displayIcon} />
            {weapon.skins.slice(0, 5).map((skinned) => (
              <img src={skinned.displayIcon} alt={skinned.displayIcon} />
            ))}
          </>
        );
      })} */}

      {productList.map((item) => {
        return (
          <>
            <p>{item.category}</p>
            <p>{item.rating.rate} / 5.0 Stars</p>
            <h2>{item.title}</h2>
            <h3>${item.price}</h3>
            <p>{item.description}</p>
            <img src={item.image} />
          </>
        );
      })}
    </div>
  );
}

export default App;
