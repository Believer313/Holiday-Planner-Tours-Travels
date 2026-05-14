// ==================== RAZORPAY UTILS ====================

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      console.log("Razorpay already loaded");
      resolve(true);
      return;
    }
    
    console.log("Loading Razorpay script...");
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// ✅ Smart initiatePayment - Best for Final Year Project
export const initiatePayment = async (amount, bookingId, userDetails) => {
  const appMode = import.meta.env.VITE_APP_MODE || 'development';

  // ==================== PRODUCTION MODE (Live Visitors) ====================
  if (appMode === 'production') {
    const message = `Thank you for your interest in Holiday Planner Tours & Travels! 🌟


💳 Payment gateway is currently running in DEMO mode.

For actual bookings, please contact us directly:

📞 +91 99077 40169
✉️ nazmussayadatmona@gmail.com

Our team will confirm your booking manually within 2 hours.`;

    alert(message);
    return false;
  }

  // ==================== DEVELOPMENT / DEMO MODE ====================
  console.log("=== INITIATING TEST PAYMENT (Demo Mode) ===");
  console.log("Amount:", amount);
  console.log("Booking ID:", bookingId);

  try {
    const response = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount),
        receipt: `booking_${bookingId}`
      })
    });

    const data = await response.json();
    console.log("Backend Response:", data);

    if (!data.success) {
      alert(data.message || "Failed to create payment order");
      return false;
    }

    const { order } = data;

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay. Please refresh and try again.');
      return false;
    }

    const options = {
      key: data.key_id,
      amount: order.amount,
      currency: order.currency,
      name: "Holiday Planner Tours and Travels",
      description: `Booking ID: ${bookingId} (TEST MODE)`,
      order_id: order.id,
      image: "/favicon.ico",

      handler: function (response) {
        console.log("Test Payment Successful:", response);
        alert(`✅ TEST PAYMENT SUCCESSFUL!\n\nPayment ID: ${response.razorpay_payment_id}\n\nThis is a demo transaction for project evaluation.`);
      },

      prefill: {
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        contact: userDetails?.phone || ""
      },

      notes: { bookingId },
      theme: { color: "#064e3b" }
    };

    console.log("Opening Razorpay Test Checkout...");
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    
    return true;
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed: " + error.message);
    return false;
  }
};