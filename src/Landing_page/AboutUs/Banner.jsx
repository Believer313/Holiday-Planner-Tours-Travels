import React from "react";
import bannerImage from "/assets/Aboutnewbanner.jpg";

const AboutBanner = () => {
  return (
    <section className="about-banner">
      <img
        src={bannerImage}
        alt="About Holiday Planner Tour & Travel"
        className="about-banner-bg"
      />

      <div className="about-banner-overlay">
        <span className="about-banner-tag">Who We Are</span>

        <h1 className="about-banner-title">
          Crafting Meaningful
          <span>Journeys</span>
        </h1>

        <p className="about-banner-text">
          At Holiday Planner Tour & Travel, we design experiences — not just
          trips. Every journey is curated with passion, purpose, and a deep
          respect for culture and comfort.
        </p>
      </div>
    </section>
  );
};

export default AboutBanner;
