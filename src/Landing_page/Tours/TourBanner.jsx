import React from "react";
import bannerImage from "/assets/tourbanner.png";

const TourBanner = () => {
  return (
    <section className="tour-banner">
      <img
        src={bannerImage}
        alt="Curated Tour Experiences"
        className="tour-banner-bg"
      />

      <div className="tour-banner-content">
        <div className="tour-banner-label">
          Curated Experiences
        </div>

        <h1 className="tour-banner-title">
          Discover Extraordinary
          <span>Destinations</span>
        </h1>

        <p className="tour-banner-subtitle">
          Immerse yourself in handcrafted journeys through India's most
          captivating landscapes. Every tour is designed for those who seek
          authentic experiences wrapped in luxury.
        </p>

        <button className="tour-banner-cta">
          Explore Our Tours
        </button>
      </div>

      <div className="tour-banner-scroll">
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default TourBanner;
