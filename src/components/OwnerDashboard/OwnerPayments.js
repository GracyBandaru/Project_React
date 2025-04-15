import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Payments.css';

const OwnerPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5162/api/Payments/history/owner', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPayments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div className="loading">Loading payments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="payments-container">
      <h2>Payment History</h2>
      <div className="payment-filters">
        <input type="text" placeholder="Search by tenant or property" />
        <select>
          <option>All Payments</option>
          <option>This Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tenant</th>
            <th>Property</th>
            <th>Amount</th>
            <th>Invoice</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.invoiceNumber}>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>{payment.tenantName}</td>
              <td>{payment.propertyName}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>
                <Link to={`/owner/payments/${payment.invoiceNumber}`}>
                  {payment.invoiceNumber}
                </Link>
              </td>
              <td>
                <span className={`status ${payment.status || 'paid'}`}>
                  {payment.status || 'Paid'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerPayments;