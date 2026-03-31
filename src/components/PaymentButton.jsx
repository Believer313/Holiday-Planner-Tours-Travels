import React, { useState } from 'react';
import { initiateTestPayment } from '../utils/razorpay';

const PaymentButton = ({ amount, bookingId, userDetails, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    const result = await initiateTestPayment(amount, bookingId, userDetails);
    if (result) {
      onSuccess && onSuccess();
    }
    setProcessing(false);
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={processing}
      className="payment-btn"
      style={{
        background: '#064e3b',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        cursor: processing ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100%'
      }}
    >
      {processing ? 'Processing...' : 'Pay Online (Test Mode)'}
    </button>
  );
};

export default PaymentButton;
