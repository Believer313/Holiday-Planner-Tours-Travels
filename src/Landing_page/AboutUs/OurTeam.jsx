
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

function OurTeam() {
  return (
    <div className="our-team">
      <h1>Our Team</h1>
      <p>Meet our team of professionals who are dedicated to providing you with the best travel experiences.</p>

      {/* Team Member 1 */}
      <div className="team-member team-member-left">
        <div className="team-photo">
          <img src="/assets/Founder.jpg" alt="Founder Najmus Saydat Mondal" />
        </div>
        <div className="team-details">
          <h2>Najmus Saydat Mondal</h2>
          <h3>Founder</h3>
          <p>
            CEO of TravelX. Najmus has been in the travel industry for over 20 years and has a passion for providing the
            best travel experiences to his customers.
          </p>
        </div>
      </div>

      {/* Team Member 2 */}
      <div className="team-member team-member-right">
        <div className="team-details">
          <h2>Abdul Kader Mondal</h2>
          <h3>Co-Founder</h3>
          <p>
            Abdul Kader Mondal is the co-founder of TravelX. With his expertise in operations and logistics, he ensures that every
            trip is planned to perfection.
          </p>
        </div>
        <div className="team-photo">
          <img src="/assets/Co Founder.jpg" alt="Co-Founder Abdul Kader Mondal" />
        </div>
      </div>

      {/* Team Member 3 */}
      <div className="team-member team-member-left">
        <div className="team-photo">
          <FontAwesomeIcon icon={faCrown} className="team-icon fa-thin" beatFade style={{ color: '#f30909' }} aria-label="Thin crown icon for Director Marium Khatton" />
        </div>
        <div className="team-details">
          <h2>Marium Khatton</h2>
          <h3>Director</h3>
          <p>
            With her exceptional leadership and vision, she plays a vital role in shaping the future of TravelX and ensuring
            customer satisfaction.
          </p>
        </div>
      </div>

      {/* Team Member 4 */}
      <div className="team-member team-member-right">
        <div className="team-details">
          <h2>Asif Mondal</h2>
          <h3>Full MERN Stack Developer, Computer Science Engineer</h3>
          <p>
            Asif is a Full MERN Stack Developer and Computer Science Engineer. He is passionate about creating innovative solutions
            and enhancing the user experience on the TravelX platform.
          </p>
        </div>
        <div className="team-photo">
          <img src="/assets/mern.jpg" alt="Developer Asif Mondal" />
        </div>
      </div>
    </div>
  );
}

export default OurTeam;