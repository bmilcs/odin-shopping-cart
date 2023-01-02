import React from "react";
import NavBar from "./NavBar";
import "../styles/Header.scss";

function Header({ cartQuantity }) {
  return (
    <header>
      <div className="inside">
        <h1 className="page-title">facade</h1>
        <NavBar cartQuantity={cartQuantity} />
      </div>
    </header>
  );
}

export default Header;
