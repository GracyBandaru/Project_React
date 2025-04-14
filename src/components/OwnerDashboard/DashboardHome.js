import { FaHome, FaClipboardCheck, FaFileSignature, FaMoneyBillAlt } from 'react-icons/fa';
import FloatingHomeButton from '../FloatingHomeButton/FloatingHomeButton';

function DashboardHome() {
  const stats = [
    { title: 'Total Properties', value: 8, icon: <FaHome /> },
    { title: 'Pending Applications', value: 3, icon: <FaClipboardCheck /> },
    { title: 'Active Leases', value: 5, icon: <FaFileSignature /> },
    { title: 'Monthly Revenue', value: '$6,200', icon: <FaMoneyBillAlt /> }
  ];

  const recentActivity = [
    'New application for Beach Villa',
    'Lease signed for Downtown Apartment',
    'Payment received from Tenant A ($1,200)',
    'Maintenance request for Suburban House'
  ];

  return (
    <div className="dashboard-home">
      <h2>Owner Dashboard</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          {recentActivity.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;