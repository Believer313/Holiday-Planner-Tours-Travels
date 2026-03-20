import React from 'react';

function OurTeam() {
  return (
    <div className="our-team">
      <h1>Our Team</h1>
      <p>Meet our team of professionals who are dedicated to providing you with the best travel experiences.</p>

      {/* Wrapper so nth-child works correctly */}
      <div className="team-list">

        {/* Team Member 1 */}
        <div className="team-member">
          <div className="team-photo">
            <img src="/assets/Founder.jpg" alt="Founder Najmus Saydat Mondal" />
          </div>
          <div className="team-details">
            <h2>Najmus Saydat Mondal</h2>
            <h3>Founder</h3>
            <p>
              CEO of Holiday Planner Tour & Travels. Najmus has been in the travel industry for over 20 years and has a passion for providing the
              best travel experiences to his customers.
            </p>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="team-member">
          <div className="team-photo">
            <img src="/assets/Co Founder.jpg" alt="Co-Founder Abdul Kader Mondal" />
          </div>
          <div className="team-details">
            <h2>Abdul Kader Mondal</h2>
            <h3>Co-Founder</h3>
            <p>
              Abdul Kader Mondal is the co-founder of Holiday Planner Tour & Travels. With his expertise in operations and logistics, he ensures that every
              trip is planned to perfection.
            </p>
          </div>
        </div>

        {/* Team Member 3 */}
        <div className="team-member">
          <div className="team-photo">
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a5c45, #d4a017)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '52px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '2px',
              fontFamily: 'Georgia, serif',
              border: '3px solid #d4a017',
              margin: '0 auto',
            }}>
              MK
            </div>
          </div>
          <div className="team-details">
            <h2>Marium Khatton</h2>
            <h3>Director</h3>
            <p>
              With her exceptional leadership and vision, she plays a vital role in shaping the future of Holiday Planner Tour & Travels and ensuring
              customer satisfaction.
            </p>
          </div>
        </div>

        {/* Team Member 4 */}
        <div className="team-member">
          <div className="team-photo">
            <img src="/assets/mern.jpg" alt="Developer Asif Mondal" />
          </div>
          <div className="team-details">
            <h2>Asif Mondal</h2>
            <h3>Full Stack Developer & Computer Science Engineer</h3>
            <p>
              Asif is a Full Stack Developer and Computer Science Engineer with expertise in MERN stack and Django. He is passionate about building secure, innovative solutions — combining his knowledge of cybersecurity with modern web development to enhance the user experience on the Holiday Planner Tour & Travels platform.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OurTeam;