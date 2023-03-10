import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.scss";

function NavBar({ cartQuantity }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">
            Cart{" "}
            {cartQuantity === 0 ? null : (
              <span className="cart-quantity">{cartQuantity}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
