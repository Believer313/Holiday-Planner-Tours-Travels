import React from 'react';
import bannerImage from "/assets/Aboutnewbanner.jpg"; // Adjust the relative path as needed

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Banner" className="banner-image" />
    </div>
  );
}

export default Banner;