import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OwnerDashboard.css';

import { FaSpinner, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

function RentalApplications() {

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const token = localStorage.getItem('ownerToken');

  console.log('Owner token: ', token);

  useEffect(() => {

    const fetchApplications = async () => {

      if (!token) {

        setError('Unauthorized. Please login again.');

        setLoading(false);

        return;

      }

      try {

        const response = await axios.get('http://localhost:5162/api/RentalApplication', {

          headers: { Authorization: `Bearer ${token}` }

        });

        const raw = response.data;

        const cleanData = Array.isArray(raw) ? raw : raw.$values || [];

        setApplications(cleanData);

      } catch (err) {

        console.error('Error fetching applications:', err);

        setError('Failed to load applications.');

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, [token]);

  const handleStatusUpdate = async (id, newStatus) => {

    const token = localStorage.getItem('ownerToken');
   
    const formData = new FormData();
  
    formData.append('status', newStatus);
   
    try {
  
      const response = await axios.put(
  
        `http://localhost:5162/api/RentalApplication/status/${id}`,
  
        formData,
  
        {
  
          headers: {
  
            'Authorization': `Bearer ${token}`,
  
            'Content-Type': 'application/json'
  
          }
  
        }
  
      );
  
      alert(`Application status updated to '${newStatus}'`);
      console.log('Status updated:', response.data);

      setApplications((prev)=>
        prev.map((app)=>
          app.rentalApplicationID===id 
          ? {...app, status: newStatus}
          : app 
        )
      );
    } catch (error) {
  
      console.error('Failed to update status:', error);
  
    }
  
  };
  
   

  const getStatusClass = (status) => {

    switch (status?.toLowerCase()) {

      case 'pending':

        return 'status-pending';

      case 'approved':

      case 'accepted':

        return 'status-approved';

      case 'rejected':

      case 'declined':

        return 'status-rejected';

      default:

        return 'status-unknown';

    }

  };

  return (
    <div className="owner-applications">
      <h2>Applications for Your Properties</h2>

      {loading ? (
        <div className="loading">
          <FaSpinner className="spinner" /> Loading applications...
        </div>

      ) : error ? (
        <div className="error-message">
          <FaExclamationCircle /> {error}
        </div>

      ) : applications.length === 0 ? (
        <p>No rental applications available.</p>

      ) : (

        applications.map((app) => (
          <div key={app.rentalApplicationID} className="application-card">
            <div className="application-info">
              <h3>{app.property?.propertyId || 'Property ID'}</h3>
              <p><strong>Address:</strong> {app.property?.address || app.permanentAddress}</p>
              <p><strong>Tenant ID:</strong> {app.tenantID}</p>
              <p><strong>Start Date:</strong> {app.tentativeStartDate?.split('T')[0]}</p>
              <p><strong>No of People:</strong> {app.noOfPeople}</p>
              <p><strong>Specific Requirements:</strong> {app.specificRequirements}</p>
            </div>
            <div className={`application-status ${getStatusClass(app.status)}`}>

              {app.status}
            </div>
            {app.status?.toLowerCase()==='pending' && (
            <div className="action-buttons">
              <button onClick={() => handleStatusUpdate(app.rentalApplicationID, 'Accepted')} className="accept-btn">
                <FaCheckCircle /> Accept
              </button>
              <button onClick={() => handleStatusUpdate(app.rentalApplicationID, 'Rejected')} className="reject-btn">
                <FaTimesCircle /> Reject
              </button>
            </div>
            )}
          </div>

        ))

      )}
    </div>

  );

}

export default RentalApplications;