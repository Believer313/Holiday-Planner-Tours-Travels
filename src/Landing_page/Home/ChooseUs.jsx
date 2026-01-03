
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseUs = () => {
  const navigate = useNavigate();

  const handleDiscoverMore = () => {
    try {
      navigate('/about'); // Redirect to the About page
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="chooseus-container" role="region" aria-labelledby="chooseus-title">
      <div className="chooseus-box">
        <h2 className="chooseus-title" id="chooseus-title">Why Choose Us?</h2>
        <p className="chooseus-text">
          Looking for an amazing trip without breaking the bank? We've got you covered! 
          Our agency specializes in <span className="highlight-blue">budget-friendly travel</span>, 
          ensuring you get the best deals on accommodations, transport, and guided tours.  
          <br /><br />
          Plus, we understand the importance of <span className="highlight-green">Halal food</span>, 
          so we ensure you have access to delicious and authentic meals wherever you go. 
          With us, you enjoy <span className="highlight-red">stress-free travel</span>, 
          top-rated service, and incredible destinations – all at unbeatable prices!
        </p>

        <button
          className="chooseus-btn"
          onClick={handleDiscoverMore}
          aria-label="Discover more about our travel services"
        >
          DISCOVER MORE
        </button>

        <div className="card-container">
          <div className="card card-1">
            <img
              src="/assets/deal.jpg"
              alt="Budget-friendly travel deals"
              className="card-img"
            />
            <h3>Best Deals</h3>
            <p>Get the best travel deals at unbeatable prices.</p>
          </div>
          <div className="card card-2">
            <img
              src="/assets/guide.jpg"
              alt="Expert travel guides"
              className="card-img"
            />
            <h3>Expert Guides</h3>
            <p>Travel with experienced guides for a seamless journey.</p>
          </div>
          <div className="card card-3">
            <img
              src="/assets/food.jpg"
              alt="Halal food options"
              className="card-img"
            />
            <h3>Halal Food</h3>
            <p>Enjoy delicious and authentic Halal meals wherever you go.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;