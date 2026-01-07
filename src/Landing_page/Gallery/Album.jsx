import React from "react";


function Album() {
  const images = [
    { src: "/assets/purulia.jpg", title: "Purulia Hills" },
    { src: "/assets/purulake2.jpg", title: "Purulia Lake" },
    { src: "/assets/puru scence.jpg", title: "Scenic Purulia" },
    { src: "/assets/lakepuru.jpg", title: "Lakeside View" },
    { src: "/assets/touristteamsunder.jpg", title: "Sundarban Tour" },
    { src: "/assets/sunder island.jpg", title: "Sundarban Island" },
    { src: "/assets/noukajatra.jpg", title: "Nouka Jatra" },
  ];

  return (
    <section className="gallery-section">
      {/* Heading Section */}
      <div className="gallery-header">
        <h1 className="gallery-title">Our Tour Photos</h1>
        <p className="gallery-subtitle">
          Relive the majestic moments from our tours. A visual journey through
          nature&apos;s finest landscapes.
        </p>
      </div>

      {/* Gallery */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="gallery-card" key={index}>
            <img src={img.src} alt={img.title} />
            <div className="gallery-overlay"></div>
            <div className="gallery-caption">{img.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Album;
