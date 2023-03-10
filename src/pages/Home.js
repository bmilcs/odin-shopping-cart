import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import splashImg from "../assets/splash-photo.jpg";

function Home() {
  return (
    <div className="home-hero-section">
      <div className="inside">
        <div className="hero-text-wrapper">
          <h1 className="hero-title">Be the envy of all</h1>
          <p className="hero-paragraph">
            Discover a world of endless possibilities at our online store! From
            sparkling jewelry to the latest electronics, and fashionable
            clothing for men and women, we have something for every taste and
            budget. Come explore and be inspired by our wide selection.
          </p>
          <Link to="/shop">
            <button className="hero-button">Shop Now</button>
          </Link>
        </div>
        <img
          src={splashImg}
          className="home-hero-image"
          alt="Happy woman giving peace signs"
        />
      </div>
    </div>
  );
}

export default Home;
