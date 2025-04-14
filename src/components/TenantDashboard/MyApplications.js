import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import './MyApplications.css';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('tenantToken');
                const response = await fetch('http://localhost:5162/api/RentalApplication/tenant', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setApplications(data.$values ? data.$values : data);
                } else {
                    const errorMessage = await response.text();
                    setError(`Failed to fetch applications: ${errorMessage}`);
                }
            } catch (err) {
                setError('Error fetching applications.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return <FaCheck className="status-icon approved" />;
            case 'rejected': return <FaTimes className="status-icon rejected" />;
            case 'pending':
            default: return <FaClock className="status-icon pending" />;
        }
    };

    if (loading) {
        return <div>Loading your applications...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (applications.length === 0) {
        return <div className="no-applications">No rental applications submitted yet.</div>;
    }

    return (
        <div className="applications-container">
            <h2>My Rental Applications</h2>
            <div className="applications-list">
                {applications.map(app => (
                    <div key={app.rentalApplicationId} className="application-card">
                        <div className="application-header">
                            <FaHome className="property-icon" />
                            <h3>Property ID: {app.propertyID}</h3> {/* Assuming 'propertyId' in API response */}
                            <div className="application-status">
                                {getStatusIcon(app.status)} {/* Assuming 'status' in API response */}
                                <span className={`status-${app.status?.toLowerCase()}`}>
                                    {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className="application-details">
                            <p><strong>Applied On:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p> {/* Assuming 'applicationDate' in API response */}
                            <p><strong>No. of People:</strong> {app.noOfPeople}</p>
                            <p><strong>Stay Period:</strong> {app.stayPeriod}</p>
                            <p><strong>Start Date:</strong> {new Date(app.tentativeStartDate).toLocaleDateString()}</p>
                            {/* You can add Lease ID display here if you implement it */}
                        </div>

                        {app.status?.toLowerCase() === 'approved' && (
                            <Link to={`/tenant/lease/${app.rentalApplicationId}`} className="btn-view-lease">
                                Fill Lease Agreement
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyApplications;