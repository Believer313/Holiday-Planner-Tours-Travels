import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Hero = () => {
  return (
    <section className="hero">
      {/* Background Swiper */}
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true, el: null }} // hide default pagination if you want clean look
        loop={true}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        slidesPerView={1}
        className="hero-swiper"
      >
        <SwiperSlide>
          <img
            src="/assets/DarjeelingTrainFruitshop_(2).jpg"
            alt="Darjeeling"
            className="hero-bg-image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/assets/Beachbakkhali.jpg"
            alt="Bakkhali Beach"
            className="hero-bg-image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/assets/ootytea.jpg"
            alt="Ooty Tea Garden"
            className="hero-bg-image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/assets/kodaikanal.jpg"
            alt="Kodaikanal Hills"
            className="hero-bg-image"
          />
        </SwiperSlide>
      </Swiper>

      {/* Overlay gradient - same as tour-banner */}
      <div className="hero-overlay"></div>

      {/* Content - very similar structure to tour-banner */}
      <div className="hero-content">
        <div className="hero-label">
          Premium Travel Experiences
        </div>

        <h1 className="hero-title">
          Discover Your Next
          <span>Dream Destination</span>
        </h1>

        <p className="hero-subtitle">
          Explore breathtaking locations, curated tours, and unforgettable
          journeys crafted just for you.
        </p>

        <div className="hero-cta-group">
          <button className="hero-cta primary">Explore Tours</button>
          <button className="hero-cta secondary">Watch Our Story</button>
        </div>
      </div>

      {/* Scroll indicator - same as tour banner */}
      <div className="hero-scroll">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;