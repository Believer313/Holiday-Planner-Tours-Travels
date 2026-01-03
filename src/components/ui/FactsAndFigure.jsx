
import React from 'react';
import CountUp from 'react-countup';
import {useInView} from 'react-intersection-observer';
import './FactsandFigure.css';

const FactsAndFigures = () => {
  return (
    <section className="facts-figures">
      <h2>Facts & Figures</h2>
      <div className="facts-container">
        <div className="fact">
          <h3><CountUp end={100} duration={2} />+</h3>
          <p>Tours Organized</p>
        </div>
        <div className="fact">
          <h3><CountUp end={5000} duration={2} />+</h3>
          <p>Happy Travelers</p>
        </div>
        <div className="fact">
          <h3><CountUp end={10} duration={2} />+</h3>
          <p>Years Experience</p>
        </div>
        <div className="fact">
          <h3><CountUp end={50} duration={2} />+</h3>
          <p>Destinations</p>
        </div>
      </div>
    </section>
  );
};

export default FactsAndFigures;