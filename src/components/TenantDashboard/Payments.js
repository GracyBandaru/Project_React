import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payments.css';
// Import CSS for notifications

const Payments = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [lateNotifications, setLateNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentsAndNotifications = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('tenantToken');

      try {
        const historyResponse = await axios.get('http://localhost:5162/api/Payments/history/tenant', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Payment History Data:", historyResponse.data);
        const paymentsWithStatus = historyResponse.data.$values.map(payment => ({
          ...payment,
          status: 'Paid',
        }));
        setPaymentHistory(paymentsWithStatus);

        const notificationsResponse = await axios.get('http://localhost:5162/api/Payments/notifications/tenant', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Late Payment Notifications:", notificationsResponse.data);
        setLateNotifications(notificationsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsAndNotifications();
  }, []);

  if (loading) {
    return <div>Loading payment information...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="payments-container">
      <h2>Payment History</h2>
      {paymentHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Property</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map(payment => (
              <tr key={payment.invoiceNumber}>
                <td>{payment.invoiceNumber}</td>
                <td>₹{payment.amount}</td>
                <td>{new Date(payment.paymentDate).toLocaleDateString('en-IN')}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.propertyName}</td>
                <td className="status paid">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payment history available.</p>
      )}

      <div className="late-payment-notifications-container">
        <h2>Late Payment Notifications</h2>
        {lateNotifications.length > 0 ? (
          <ul>
            {lateNotifications.map(notification => (
              <li key={notification.notificationID}>
                <p><strong>Property:</strong> {notification.propertyAddress}</p>
                <p><strong>Message:</strong> {notification.message}</p>
                <p><strong>Sent On:</strong> {new Date(notification.createdAt).toLocaleDateString('en-IN')}</p>
                {notification.daysLate !== undefined && (
                  <p className="late-days"><strong>Days Late:</strong> {notification.daysLate}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-notifications">No late payment notifications at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Payments;