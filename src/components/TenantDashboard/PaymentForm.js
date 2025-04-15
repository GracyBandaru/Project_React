import React, { useState } from 'react';
import axios from 'axios'; // Or your preferred HTTP client
import { useParams, useNavigate } from 'react-router-dom'; // If using React Router

const PaymentForm = () => {
  const { notificationID } = useParams(); // Get the notification ID from the route (if passed)
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    leaseID: '', // You might need to fetch this based on the notification or context
    amount: '',
    paymentMethod: 'Credit Card', // Default payment method
  });
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentError('');
    setPaymentSuccess(false);

    try {
      const response = await axios.post('/api/Payments', paymentDetails); // Your API endpoint for creating payments
      setPaymentSuccess(true);
      // Optionally redirect the user or show a success message
      setTimeout(() => {
        navigate('/payments'); // Redirect to the payments page after successful payment
      }, 2000);
    } catch (error) {
      setPaymentError(error.response?.data || 'Failed to process payment.');
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      {notificationID && <p>You are paying for Notification ID: {notificationID}</p>} {/* Display notification ID if available */}
      {paymentSuccess && <p style={{ color: 'green' }}>Payment successful!</p>}
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="leaseID">Lease ID:</label>
          <input
            type="text"
            id="leaseID"
            name="leaseID"
            value={paymentDetails.leaseID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleChange}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            {/* Add more payment methods as needed */}
          </select>
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;