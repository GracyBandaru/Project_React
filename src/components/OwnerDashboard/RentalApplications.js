import { FaUser, FaHome, FaCheck, FaTimes, FaEnvelope, FaPhone, FaSpinner } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerDashboard.css'; // Assuming you have CSS for styling

function RentalApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('ownerToken');
                if (!token) {
                    throw new Error('Authentication required');
                }

                const response = await axios.get(
                    'http://localhost:5162/api/RentalApplication/owner/applications', // Corrected endpoint for owner's applications
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                const data = Array.isArray(response.data) ? response.data : [];
                setApplications(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch applications');
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleDecision = async (id, decision) => {
        try {
            const token = localStorage.getItem('ownerToken');
            await axios.put(
                `http://localhost:5162/api/RentalApplication/status/${id}`,
                { status: decision },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setApplications(prev =>
                Array.isArray(prev)
                    ? prev.map(app => app.rentalApplicationId === id ? { ...app, status: decision } : app)
                    : []
            );
        } catch (err) {
            alert(`Failed to update application status: ${err.response?.data?.message || err.message}`);
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return <FaCheck className="status-icon approved" />;
            case 'rejected': return <FaTimes className="status-icon rejected" />;
            case 'pending':
            default: return null; // No icon for pending in owner view
        }
    };

    const getStatusClassName = (status) => {
        return `status-badge ${status?.toLowerCase()}`;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="spinner-icon" />
                <p>Loading applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h3>Error Loading Applications</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    const safeApplications = Array.isArray(applications) ? applications : [];

    if (safeApplications.length === 0) {
        return (
            <div className="no-applications">
                <h3>No Rental Applications Found</h3>
                <p>There are currently no rental applications for your properties.</p>
            </div>
        );
    }

    return (
        <div className="applications-container">
            <h2>Rental Applications</h2>

            <div className="applications-list">
                {safeApplications.map(app => (
                    <div key={app.rentalApplicationId} className="application-card">
                        <div className="application-header">
                            <h3>Tenant ID: {app.tenantID}</h3>
                            <span className={getStatusClassName(app.status)}>
                                {app.status?.toUpperCase()}
                            </span>
                        </div>

                        <div className="application-details">
                            <p><FaHome /> Property ID: {app.propertyID}</p>
                            <p>Applied: {app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : 'Unknown Date'}</p>
                            <p>No. of People: {app.noOfPeople}</p>
                            <p>Stay Period: {app.stayPeriod}</p>
                            <p>Start Date: {app.tentativeStartDate ? new Date(app.tentativeStartDate).toLocaleDateString() : 'Unknown Date'}</p>
                            <p>Permanent Address: {app.permanentAddress}</p>
                            <p>State: {app.state}</p>
                            <p>Country: {app.country}</p>
                            {app.specificRequirements && <p>Requirements: {app.specificRequirements}</p>}
                            {/* You might want to fetch and display tenant contact details here */}
                        </div>

                        <div className="decision-dropdown">
                            <label htmlFor={`decision-${app.rentalApplicationId}`}>Action:</label>
                            <select
                                id={`decision-${app.rentalApplicationId}`}
                                value={app.status}
                                onChange={(e) => handleDecision(app.rentalApplicationId, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approve</option>
                                <option value="rejected">Reject</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RentalApplications;