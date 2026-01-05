import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ SAMPLE TOURS (Always visible)
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/tours`
        );
        if (!res.ok) throw new Error("Backend down");

        const data = await res.json();
        setTours([...sampleTours, ...data]);
      } catch (err) {
        console.log("Backend not reachable → showing sample tours");
        setTours(sampleTours);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleCardClick = (id) => {
    if (id.startsWith("sample-")) return;
    navigate(`/tour/${id}`);
  };

  const handleBookingClick = (e, id) => {
    e.stopPropagation();
    if (id.startsWith("sample-")) {
      alert("Booking will open soon!");
      return;
    }
    navigate(`/booking?tourId=${id}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        Loading tours...
      </div>
    );
  }

  return (
    <div className="tour-container">
      <h1 className="tour-title">Explore Our Tours</h1>

      <div className="tour-grid">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="tour-card"
            onClick={() => handleCardClick(tour._id)}
          >
            <img
              src={tour.images?.[0] || "/assets/Tiger.png"}
              alt={tour.title}
              className="tour-image"
              onError={(e) => (e.target.src = "/assets/Tiger.png")}
            />

            <div className="tour-details">
              <h3>{tour.title}</h3>
              <p>{tour.shortDescription}</p>
              <p className="tour-price">₹{tour.price}</p>

              <button
                className="booking-button"
                onClick={(e) => handleBookingClick(e, tour._id)}
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
  );
};

export default Tour;
