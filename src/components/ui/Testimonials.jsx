import React, { useState, useEffect } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Ahmed",
    location: "Kolkata, West Bengal",
    tour: "Sunderban Expedition",
    rating: 5,
    review: "An absolutely unforgettable experience! The boat safari through the mangroves was breathtaking. Our guide was incredibly knowledgeable and the Halal food arrangements were perfect. Holiday Planner made everything stress-free.",
    avatar: "RA",
    color: "#1a3c34",
  },
  {
    id: 2,
    name: "Fatima Begum",
    location: "Hooghly, West Bengal",
    tour: "Darjeeling Trip",
    rating: 5,
    review: "We visited Darjeeling with our whole family and it was magical. The tea garden visit was a highlight. Everything was organized perfectly — from transport to meals. Will definitely book again!",
    avatar: "FB",
    color: "#064e3b",
  },
  {
    id: 3,
    name: "Mohammad Salim",
    location: "Howrah, West Bengal",
    tour: "Purulia Trip",
    rating: 5,
    review: "Purulia was a hidden gem we never knew about. The tribal culture, the waterfalls, the Chhau dance performance — it was all beyond our expectations. Najmus bhai personally made sure we were comfortable throughout.",
    avatar: "MS",
    color: "#047857",
  },
  {
    id: 4,
    name: "Anwar Hussain",
    location: "Murshidabad, West Bengal",
    tour: "Mumbai City Tour",
    rating: 5,
    review: "First time in Mumbai and Holiday Planner made it so easy. Gateway of India, Marine Drive, the food — everything was covered. The Halal restaurant arrangements were excellent. Highly recommended!",
    avatar: "AH",
    color: "#065f46",
  },
  {
    id: 5,
    name: "Rubina Khatun",
    location: "Nadia, West Bengal",
    tour: "Sunderban Expedition",
    rating: 5,
    review: "I was nervous about traveling with my elderly parents but the team took such good care of us. The houseboat was comfortable, food was delicious and we even spotted a Royal Bengal Tiger! Best trip of our lives.",
    avatar: "RK",
    color: "#1a3c34",
  },
  {
    id: 6,
    name: "Abdul Karim",
    location: "Burdwan, West Bengal",
    tour: "Darjeeling Trip",
    rating: 5,
    review: "Excellent service from start to finish. The sunrise from Tiger Hill was something I will never forget. Booking was simple, price was very reasonable and the team was always available on WhatsApp for any questions.",
    avatar: "AK",
    color: "#064e3b",
  },
];

const StarRating = ({ rating }) => (
  <div className="testimonial-stars">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? "#d4af37" : "none"}
        stroke="#d4af37"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  const prev = () => goTo(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => goTo(current === testimonials.length - 1 ? 0 : current + 1);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const t = testimonials[current];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-tag">What Our Travelers Say</span>
          <h2 className="testimonials-title">Real Stories, Real Smiles</h2>
          <p className="testimonials-subtitle">
            Join thousands of happy travelers who have explored India with us
          </p>
        </div>

        {/* Slider */}
        <div className="testimonials-slider">

          {/* Prev Button */}
          <button className="testimonials-nav prev" onClick={prev} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Card */}
          <div className={`testimonials-card ${isAnimating ? "fade-out" : "fade-in"}`}>
            <div className="testimonials-quote-icon">❝</div>
            <p className="testimonials-review">{t.review}</p>
            <StarRating rating={t.rating} />
            <div className="testimonials-author">
              <div
                className="testimonials-avatar"
                style={{ background: t.color }}
              >
                {t.avatar}
              </div>
              <div className="testimonials-author-info">
                <div className="testimonials-name">{t.name}</div>
                <div className="testimonials-location">{t.location}</div>
                <div className="testimonials-tour">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {t.tour}
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button className="testimonials-nav next" onClick={next} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

        </div>

        {/* Dots */}
        <div className="testimonials-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="testimonials-stats">
          <div className="testimonials-stat">
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="testimonials-stat-divider" />
          <div className="testimonials-stat">
            <span className="stat-number">4.9★</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="testimonials-stat-divider" />
          <div className="testimonials-stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Tours Completed</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;