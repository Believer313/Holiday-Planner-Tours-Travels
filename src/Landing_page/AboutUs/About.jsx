const About = () => {
  const values = [
    {
      icon: "✦",
      title: "Affordable Excellence",
      desc: "High-quality travel experiences at prices that won't break the bank.",
    },
    {
      icon: "✦",
      title: "Personalized Care",
      desc: "Every trip is tailored to your needs with attentive, dedicated service.",
    },
    {
      icon: "✦",
      title: "Halal & Hygienic Meals",
      desc: "Delicious, fully halal meal options guaranteed on every journey.",
    },
    {
      icon: "✦",
      title: "Seamless Planning",
      desc: "We handle everything — accommodation, transport, and every detail in between.",
    },
  ];

  return (
    <div className="about">

      {/* Short intro — max 2 sentences */}
      <p className="about-intro">
        At Holiday Planner Tour & Travels, we design experiences — not just trips.
        Founded in Hooghly, West Bengal, we have been crafting stress-free, memorable
        journeys for thousands of happy travelers across India.
      </p>

      {/* Value cards */}
      <div className="about-values">
        {values.map((item, index) => (
          <div className="about-value-card" key={index}>
            <span className="about-value-icon">{item.icon}</span>
            <div>
              <h4 className="about-value-title">{item.title}</h4>
              <p className="about-value-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default About;