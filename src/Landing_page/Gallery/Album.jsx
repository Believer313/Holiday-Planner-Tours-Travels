import React, { useState } from "react";

const sections = [
  {
    id: "all",
    label: "All Photos",
  },
  {
    id: "sundarbans",
    label: "Sundarbans",
  },
  {
    id: "purulia",
    label: "Purulia",
  },
  {
    id: "darjeeling",
    label: "Darjeeling",
  },
  {
    id: "travelers",
    label: "Our Travelers",
  },
];

const images = [
  // Sundarbans
  {
    src: "/assets/touristteamsunder.jpg",
    title: "Sundarban Tour Group",
    location: "Sundarbans, West Bengal",
    category: "travelers",
  },
  {
    src: "/assets/sunder island.jpg",
    title: "Sundarban Island",
    location: "Sundarbans, West Bengal",
    category: "sundarbans",
  },
  {
    src: "/assets/noukajatra.jpg",
    title: "Nouka Jatra — Boat Safari",
    location: "Sundarbans, West Bengal",
    category: "sundarbans",
  },
  // Purulia
  {
    src: "/assets/purulia.jpg",
    title: "Purulia Hills",
    location: "Purulia, West Bengal",
    category: "purulia",
  },
  {
    src: "/assets/purulake2.jpg",
    title: "Purulia Lake",
    location: "Purulia, West Bengal",
    category: "purulia",
  },
  {
    src: "/assets/puru scence.jpg",
    title: "Scenic Purulia",
    location: "Purulia, West Bengal",
    category: "purulia",
  },
  {
    src: "/assets/lakepuru.jpg",
    title: "Lakeside View",
    location: "Purulia, West Bengal",
    category: "purulia",
  },
];

function Album() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeFilter === "all"
    ? images
    : images.filter((img) => img.category === activeFilter);

  return (
    <section className="gallery-section">

      {/* Header */}
      <div className="gallery-header">
        <span className="gallery-tag">Our Memories</span>
        <h1 className="gallery-title">Tour Photo Gallery</h1>
        <p className="gallery-subtitle">
          Real moments from real journeys — captured by our team and happy travelers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="gallery-filters">
        {sections.map((sec) => (
          <button
            key={sec.id}
            className={`gallery-filter-btn ${activeFilter === sec.id ? "active" : ""}`}
            onClick={() => setActiveFilter(sec.id)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Photo Count */}
      <div className="gallery-count">
        Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
        {activeFilter !== "all" ? ` from ${sections.find(s => s.id === activeFilter)?.label}` : ""}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filtered.map((img, index) => (
          <div
            className="gallery-card"
            key={index}
            onClick={() => setLightbox(img)}
          >
            <div className="gallery-image-wrapper">
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="gallery-overlay">
                <div className="gallery-caption">
                  <span className="gallery-caption-title">{img.title}</span>
                  <span className="gallery-caption-location">📍 {img.location}</span>
                </div>
                <div className="gallery-zoom-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="gallery-empty">
          <p>Photos coming soon for this destination!</p>
        </div>
      )}

      {/* Coming Soon Banner */}
      <div className="gallery-coming-soon">
        <div className="gallery-coming-soon-content">
          <span className="gallery-coming-soon-icon">📸</span>
          <div>
            <h3>More Photos Coming Soon</h3>
            <p>We are adding photos from Darjeeling, Mumbai, Goa and Kerala tours. Stay tuned!</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="gallery-cta">
        <p>Inspired by what you see?</p>
        <a href="/booking" className="gallery-cta-btn">Book Your Tour Now →</a>
        <a href="https://wa.me/919907740169" target="_blank" rel="noopener noreferrer" className="gallery-cta-whatsapp">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
            <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.638 4.625 1.848 6.625L2.667 29.333l6.885-1.807A13.285 13.285 0 0 0 16.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 0 1-5.616-1.539l-.403-.24-4.086 1.073 1.09-3.98-.263-.41A10.974 10.974 0 0 1 5.04 16c0-6.044 4.919-10.96 10.963-10.96S26.96 9.956 26.96 16s-4.913 10.933-10.957 10.933zm6.01-8.2c-.33-.165-1.951-.963-2.254-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.293-.193.22-.385.248-.715.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.835-2.286-.193-.33-.021-.508.145-.673.15-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.793-1.018-2.454-.268-.644-.54-.557-.743-.567l-.633-.011c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.751s1.183 3.191 1.348 3.411c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.095 1.951-.797 2.226-1.567.275-.77.275-1.43.193-1.567-.083-.138-.303-.22-.633-.385z" />
          </svg>
          WhatsApp Us
        </a>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="gallery-lightbox-info">
              <span className="gallery-lightbox-title">{lightbox.title}</span>
              <span className="gallery-lightbox-location">📍 {lightbox.location}</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default Album;