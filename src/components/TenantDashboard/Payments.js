import { useState } from 'react'; // Add this import
import { FaMoneyBillWave, FaCheckCircle, FaClock } from 'react-icons/fa';
import './TenantDashboard.css';

function Payments() {
  // Mock payments data with useState
  const [payments] = useState([
    {
      id: 1,
      date: '2023-07-01',
      amount: '$1200',
      status: 'paid',
      property: 'Beachfront Apartment'
    },
    {
      id: 2,
      date: '2023-08-01',
      amount: '$1200',
      status: 'pending',
      property: 'Beachfront Apartment'
    }
  ]);

  return (
    <div className="payments-container">
      <h2>Payment History</h2>
      
      <div className="payment-summary">
        <div className="summary-card">
          <h3>Next Payment Due</h3>
          <p className="amount">$1200</p>
          <p className="due-date">September 1, 2023</p>
          <button className="btn-pay">Make Payment</button>
        </div>
      </div>
      
      <div className="payments-list">
        <h3>Payment History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Property</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>{payment.amount}</td>
                <td>{payment.property}</td>
                <td>
                  {payment.status === 'paid' ? (
                    <span className="status-paid">
                      <FaCheckCircle /> Paid
                    </span>
                  ) : (
                    <span className="status-pending">
                      <FaClock /> Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;