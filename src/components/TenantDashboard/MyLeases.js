import { FaFileContract, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import './TenantDashboard.css';

function MyLeases() {
  // Mock leases data
  const leases = [
    {
      id: 1,
      property: 'Beachfront Apartment',
      startDate: '2023-07-01',
      endDate: '2024-06-30',
      rent: '$1200/month',
      document: 'lease_agreement_123.pdf'
    }
  ];

  return (
    <div className="leases-container">
      <h2>My Lease Agreements</h2>
      
      {leases.length === 0 ? (
        <div className="no-leases">
          <p>You don't have any active leases yet.</p>
        </div>
      ) : (
        <div className="leases-list">
          {leases.map(lease => (
            <div key={lease.id} className="lease-card">
              <div className="lease-header">
                <FaFileContract className="lease-icon" />
                <h3>{lease.property}</h3>
              </div>
              
              <div className="lease-details">
                <p><FaCalendarAlt /> <strong>Term:</strong> {lease.startDate} to {lease.endDate}</p>
                <p><strong>Rent:</strong> {lease.rent}</p>
              </div>
              
              <div className="lease-actions">
                <a href="#" className="btn-download">
                  <FaDownload /> Download Lease
                </a>
                <button className="btn-view">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLeases;