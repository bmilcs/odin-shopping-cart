import NavBar from "./components/NavBar";
import Router from "./Router";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;

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
//      Sort by Price, by Category
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
//      Credit Card Type Accept
//      Promo Code Option
//  Footer
//    GitHub Icon / Link
//    Newsletter Signup
//    Page Links
