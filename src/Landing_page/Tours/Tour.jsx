import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tour = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SAMPLE TOURS
  const sampleTours = [
    {
      _id: "sample-1",
      title: "Sunderban Trip",
      images: ["/assets/Tiger.png"],
      shortDescription:
        "Explore mystical mangroves and spot the Royal Bengal Tiger.",
      price: 4500,
    },
    {
      _id: "sample-2",
      title: "Darjeeling Trip",
      images: ["/assets/Kanchenjunga.jpg"],
      shortDescription:
        "Witness breathtaking sunrises and world-famous tea gardens.",
      price: 2500,
    },
    {
      _id: "sample-3",
      title: "Purulia Trip",
      images: ["/assets/purulia.jpg"],
      shortDescription:
        "Experience tribal culture and mesmerizing Chhau dance.",
      price: 5500,
    },
  ];

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tours`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTours([...sampleTours, ...data]);
      } catch {
        setTours(sampleTours);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Loading tours...
      </div>
    );
  }

  return (
    <section className="tour-section">
      <div className="tour-container">
        <h2 className="tour-title">Explore Our Tours</h2>

        <div className="tour-grid">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="tour-card"
              onClick={() => navigate(`/tour/${tour._id}`)}
            >
              <div className="tour-card-image-wrapper">
                <img
                  src={tour.images?.[0] || "/assets/Tiger.png"}
                  alt={tour.title}
                  className="tour-image"
                  onError={(e) =>
                    (e.target.src = "/assets/Tiger.png")
                  }
                />
              </div>

              <div className="tour-details">
                <h3 className="tour-card-title">{tour.title}</h3>

                <p className="tour-card-description">
                  {tour.shortDescription}
                </p>

                <p className="tour-price">₹{tour.price}</p>

                <button
                  className="booking-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (tour._id.startsWith("sample-")) {
                      alert("Booking will open soon!");
                    } else {
                      navigate(`/booking?tourId=${tour._id}`);
                    }
                  }}
                >
                  {tour._id.startsWith("sample-")
                    ? "Coming Soon"
                    : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tour;
