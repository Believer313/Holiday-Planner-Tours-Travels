export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (amount, bookingId, userDetails) => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    alert('Payment gateway failed to load. Please try again.');
    return false;
  }

  // Test Key (Public test key - works in test mode)
  const options = {
    key: "rzp_test_YNjVZt3yQkYgPx", // Razorpay public test key
    amount: amount * 100, // Amount in paise
    currency: "INR",
    name: "Holiday Planner Tours and Travels",
    description: `Booking for ${bookingId}`,
    image: "/favicon.ico",
    handler: function(response) {
      console.log("Payment Success:", response);
      alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      return true;
    },
    prefill: {
      name: userDetails?.name || "Test User",
      email: userDetails?.email || "test@example.com",
      contact: userDetails?.phone || "9999999999"
    },
    notes: {
      bookingId: bookingId
    },
    theme: {
      color: "#064e3b"
    },
    modal: {
      ondismiss: function() {
        console.log("Payment modal closed");
        return false;
      }
    }
  };
  
  const razorpay = new window.Razorpay(options);
  razorpay.open();
  return true;
};
