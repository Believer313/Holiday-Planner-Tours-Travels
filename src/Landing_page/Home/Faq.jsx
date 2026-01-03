import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide budget-friendly travel packages, expert tour guides, halal food arrangements, and customized trip planning."
    },
    {
      question: "Do you arrange halal food on all trips?",
      answer:
        "Yes, we ensure you have access to delicious and authentic halal meals at every destination."
    },
    {
      question: "Can I customize my travel package?",
      answer:
        "Absolutely! You can choose destinations, hotels, transportation, and activities based on your preferences and budget."
    },
    {
      question: "How can I book a trip?",
      answer:
        "You can book directly from our website or contact our travel experts via phone or email for personalized assistance."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" id="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
        >
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className="faq-toggle">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
