import { FaFilePdf, FaCheck, FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerDashboard.css';

function LeaseAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState({});

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const token = localStorage.getItem('ownerToken');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await axios.get(
          'http://localhost:5162/api/Owner/lease-agreements',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        // Ensure response.data is an array
        const data = Array.isArray(response.data) ? response.data : [];
        setAgreements(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch lease agreements');
        setAgreements([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      const token = localStorage.getItem('ownerToken');
      await axios.put(
        `http://localhost:5162/api/Owner/lease-agreements/${id}/status`,
        { status: decision },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setAgreements(prev => 
        prev.map(agreement => 
          agreement.id === id ? { ...agreement, status: decision } : agreement
        )
      );
    } catch (err) {
      alert(`Failed to update agreement: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDocumentUpload = async (id, file) => {
    if (!file) return;

    try {
      setUploading(prev => ({ ...prev, [id]: true }));

      const token = localStorage.getItem('ownerToken');
      const formData = new FormData();
      formData.append('document', file);

      await axios.post(
        `http://localhost:5162/api/Owner/lease-agreements/${id}/document`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setAgreements(prev => 
        prev.map(agreement => 
          agreement.id === id ? { 
            ...agreement, 
            status: 'completed',
            document: file.name
          } : agreement
        )
      );
    } catch (err) {
      alert(`Failed to upload document: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner-icon" />
        <p>Loading lease agreements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <h3>Error Loading Agreements</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (agreements.length === 0) {
    return (
      <div className="no-agreements">
        <h3>No Lease Agreements Found</h3>
        <p>You currently have no lease agreements.</p>
      </div>
    );
  }

  return (
    <div className="lease-agreements">
      <h2>Lease Agreements</h2>
      
      <div className="agreements-list">
        {agreements.map(agreement => {
          const safeAgreement = {
            id: agreement.id || 0,
            tenant: agreement.tenantName || 'Unknown Tenant',
            property: agreement.propertyAddress || 'Unknown Property',
            status: agreement.status || 'pending',
            document: agreement.documentUrl || null
          };

          return (
            <div key={safeAgreement.id} className="agreement-card">
              <div className="agreement-info">
                <h3>{safeAgreement.tenant}</h3>
                <p>Property: {safeAgreement.property}</p>
                <p>Status: <span className={`status-${safeAgreement.status}`}>{safeAgreement.status}</span></p>
                
                {safeAgreement.document && (
                  <a 
                    href={safeAgreement.document} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    <FaFilePdf /> View Agreement
                  </a>
                )}
              </div>

              {safeAgreement.status === 'pending' && (
                <div className="agreement-actions">
                  <button 
                    className="btn-accept"
                    onClick={() => handleDecision(safeAgreement.id, 'approved')}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleDecision(safeAgreement.id, 'rejected')}
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              )}

              {safeAgreement.status === 'approved' && (
                <div className="upload-section">
                  <p>Upload signed document:</p>
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => handleDocumentUpload(safeAgreement.id, e.target.files[0])}
                    disabled={uploading[safeAgreement.id]}
                  />
                  {uploading[safeAgreement.id] && (
                    <div className="uploading-status">
                      <FaSpinner className="small-spinner" /> Uploading...
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaseAgreements;