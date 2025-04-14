// TenantLayout.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaFileAlt, FaMoneyBillAlt, FaUser } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import './TenantDashboard.css';
import FloatingHomeButton from '../FloatingHomeButton/FloatingHomeButton';

function TenantLayout() {
    const navigate = useNavigate();
    const [tenantId, setTenantId] = useState(null);
    const [tenantName, setTenantName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('tenantToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setTenantId(decodedToken.TenantID || decodedToken.sub || decodedToken.userId || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
                setTenantName(decodedToken.name); // Access the 'name' claim (lowercase)
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('tenantToken');
                navigate('/rent-login');
            }
        } else {
            navigate('/rent-login');
        }
    }, [navigate]);

    return (
        <div className="tenant-dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="profile-summary">
                    <img src="https://via.placeholder.com/80" alt="Tenant" />
                    {tenantName && <h3>{tenantName}</h3>}
                    {tenantId && <p className="tenant-id">ID: {tenantId}</p>}
                </div>

                <nav>
                    <Link to="/tenant" className="nav-link">
                        <FaHome className="icon" /> Dashboard
                    </Link>
                    <Link to="/tenant/search" className="nav-link">
                        <FaSearch className="icon" /> Find Properties
                    </Link>
                    <Link to="/tenant/applications" className="nav-link">
                        <FaFileAlt className="icon" /> My Applications
                    </Link>
                    <Link to="/tenant/leases" className="nav-link">
                        <FaFileAlt className="icon" /> My Leases
                    </Link>
                    <Link to="/tenant/payments" className="nav-link">
                        <FaMoneyBillAlt className="icon" /> Payments
                    </Link>
                    <Link to="/tenant/profile" className="nav-link">
                        <FaUser className="icon" /> Profile
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default TenantLayout;