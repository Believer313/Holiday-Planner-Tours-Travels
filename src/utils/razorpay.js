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

// ✅ SMART RAZORPAY - Works on BOTH Local + Live Website
export const initiatePayment = async (amount, bookingId, userDetails) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const appMode = import.meta.env.VITE_APP_MODE || 'development';

  console.log("=== INITIATING PAYMENT ===");
  console.log("API URL:", apiUrl);
  console.log("App Mode:", appMode);

  // ==================== LIVE WEBSITE (Production) ====================
  if (appMode === 'production') {
    const message = `Thank you for your interest in Holiday Planner Tours & Travels! 🌟\n\n` +
                    `💳 Payment is currently running in DEMO mode.\n\n` +
                    `For real bookings, please contact us:\n` +
                    `📞 +91 99077 40169\n` +
                    `✉️ nazmussayadatmona@gmail.com`;
    alert(message);
    return false;
  }

  // ==================== LOCAL / DEVELOPMENT MODE ====================
  try {
    const response = await fetch(`${apiUrl}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount),
        receipt: `booking_${bookingId}`
      })
    });

    const data = await response.json();

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
      key: data.key_id || import.meta.env.VITE_RAZORPAY_TEST_KEY || "rzp_test_SZGNEW7c9AVyLl",
      amount: order.amount,
      currency: order.currency,
      name: "Holiday Planner Tours and Travels",
      description: `Booking ID: ${bookingId} (TEST)`,
      order_id: order.id,
      image: "/favicon.ico",

      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true
      },

      handler: function (response) {
        console.log("Payment Successful:", response);
        alert(`✅ TEST PAYMENT SUCCESSFUL!\n\nPayment ID: ${response.razorpay_payment_id}`);
      },

      prefill: {
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        contact: userDetails?.phone || ""
      },

      notes: { bookingId },
      theme: { color: "#064e3b" },

      modal: {
        ondismiss: function() {
          console.log("Payment modal closed");
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    
    return true;
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed: " + error.message);
    return false;
  }
};