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

export const initiatePayment = async (amount, bookingId, userDetails) => {
  const appMode = import.meta.env.VITE_APP_MODE || 'development';

  if (appMode === 'production') {
    alert(`Thank you!\n\nPayment is in DEMO mode.\nPlease contact: +91 99077 40169`);
    return false;
  }

  console.log("=== INITIATING TEST PAYMENT ===");

  try {
    const response = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amount), receipt: `booking_${bookingId}` })
    });

    const data = await response.json();

    if (!data.success) {
      alert("Failed to create order");
      return false;
    }

    const { order } = data;
    await loadRazorpayScript();

    const options = {
      key: data.key_id || "rzp_test_SZGNEW7c9AVyLl",
      amount: order.amount,
      currency: "INR",
      name: "Holiday Planner Tours and Travels",
      description: `Booking ID: ${bookingId} (TEST)`,
      order_id: order.id,

      // ✅ FIX 1: Correct way to control which methods appear in the checkout UI
      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay via UPI",
              instruments: [
                { method: "upi" }
              ]
            },
            card: {
              name: "Pay via Card",
              instruments: [
                { method: "card" }
              ]
            },
            other: {
              name: "Other Methods",
              instruments: [
                { method: "netbanking" },
                { method: "wallet" }
              ]
            }
          },
          sequence: ["block.upi", "block.card", "block.other"], // UPI shown first
          preferences: { show_default_blocks: false }
        }
      },

      handler: function (response) {
        alert(`✅ TEST PAYMENT SUCCESSFUL!\nPayment ID: ${response.razorpay_payment_id}`);
      },

      prefill: {
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        contact: userDetails?.phone || ""
      },

      theme: { color: "#064e3b" }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed: " + error.message);
  }
};