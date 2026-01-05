import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  const sampleTours = {
    "sample-1": {
      title: "Sunderban Trip",
      images: ["/assets/Tiger.png"],
      description:
        "3 Days & 2 Nights package with food, boat safari & guide.",
      price: 4500,
    },
    "sample-2": {
      title: "Darjeeling Trip",
      images: ["/assets/Kanchenjunga.jpg"],
      description:
        "4 Days & 3 Nights trip including sightseeing and meals.",
      price: 2500,
    },
    "sample-3": {
      title: "Purulia Trip",
      images: ["/assets/purulia.jpg"],
      description:
        "3 Days & 2 Nights cultural experience with local food.",
      price: 5500,
    },
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/tours/${id}`
        );
        if (!res.ok) throw new Error();

        const data = await res.json();
        setTour(data);
      } catch (err) {
        setTour(sampleTours[id]);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <div style={{ padding: "100px" }}>Loading...</div>;
  if (!tour) return <div>Tour not found</div>;

  return (
    <div className="tour-details-container">
      <img
        src={tour.images?.[0] || "/assets/Tiger.png"}
        alt={tour.title}
        className="tour-details-image"
      />

      <h1>{tour.title}</h1>
      <p className="tour-price">₹{tour.price}</p>

      <p style={{ whiteSpace: "pre-line" }}>{tour.description}</p>

      <button
        className="booking-button"
        onClick={() => navigate(`/booking?tourId=${id}`)}
      >
        Book This Tour
      </button>
    </div>
  );
};

export default TourDetails;
