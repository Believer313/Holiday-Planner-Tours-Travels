import React from 'react';

function Mission() {
  return (
    <div className="mission-container">
      <div className="row g-4 align-items-center">
        {/* Image Column */}
        <div className="col-6 mission-image">
          <img
            src="/assets/mission.jpg"
            alt="Our Mission"
            className="mission-img img-fluid"
          />
        </div>

        {/* Text Column */}
        <div className="col-6 mission-text">
          <h2>Our Mission</h2>
          <p>
            At Holiday Planner Tour & Travels , our mission is to make travel accessible, enjoyable, and culturally enriching for everyone. 
            We strive to provide <span className="highlight-blue">budget-friendly adventures</span> 
            that cater to diverse needs, including access to <span className="highlight-green">Halal food</span> 
            and expertly curated itineraries. Our goal is to create unforgettable experiences that inspire wanderlust 
            while ensuring <span className="highlight-red">stress-free planning</span> and exceptional customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Mission;