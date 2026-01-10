import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Utensils } from 'lucide-react'; // ← golden icons

const features = [
  {
    title: 'Best Deals',
    description: 'Get the best travel deals at unbeatable prices without compromising on quality.',
    image: '/assets/deal.jpg',
    icon: Star,
  },
  {
    title: 'Expert Guides',
    description: 'Travel with experienced guides for a seamless and enriching journey.',
    image: '/assets/guide.jpg',
    icon: ShieldCheck,
  },
  {
    title: 'Halal Food',
    description: 'Enjoy delicious and authentic Halal meals wherever you go.',
    image: '/assets/food.jpg',
    icon: Utensils,
  },
];

const ChooseUs = () => {
  const navigate = useNavigate();

  return (
    <section className="why-choose-us">
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="header-section"
        >
          <span className="premium-label">Why Travel With Us</span>
          <h2 className="premium-title">Why Choose Us?</h2>
          <p className="premium-subtitle">
            Looking for an amazing trip without breaking the bank? We've got you covered! Our agency specializes in
            <span className="highlight"> budget-friendly travel</span>, ensuring the best deals on accommodations,
            transport, and guided tours. Plus, we guarantee access to delicious
            <span className="highlight"> authentic Halal meals</span> everywhere you go — stress-free, top-rated, and unforgettable.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="glass-card"
            >
              <div className="card-image-container">
                <img src={feature.image} alt={feature.title} className="card-img" />
                <div className="image-gradient-overlay" />
                {/* Golden icon inside card - Replit style */}
                <div className="icon-badge">
                  <feature.icon className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.8} />
                </div>
              </div>

              <div className="card-body">
                <h3 className="card-heading">{feature.title}</h3>
                <p className="card-text">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="action-center"
        >
          <button className="luxury-btn" onClick={() => navigate('/about')}>
            Discover More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ChooseUs;