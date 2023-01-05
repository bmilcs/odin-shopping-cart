import React from "react";
import splashImg from "../assets/splash-photo.jpg";
import "../styles/Home.scss";
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
          <a href="/shop">
            <button className="hero-button">Shop Now</button>
          </a>
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
