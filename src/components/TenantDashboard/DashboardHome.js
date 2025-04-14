import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { FaClipboardCheck, FaFileContract, FaMoneyBillAlt } from 'react-icons/fa';
import './TenantDashboard.css'; // Assuming your main dashboard CSS

function DashboardHome() {
    const navigate = useNavigate();
    const [tenantId, setTenantId] = useState(null);
    const [tenantName, setTenantName] = useState(null);
    const [stats, setStats] = useState([]); // To hold dynamic stats from backend

    useEffect(() => {
        const token = localStorage.getItem('tenantToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setTenantId(decodedToken.tenantId || decodedToken.sub || decodedToken.userId || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
                // Assuming your Tenant Name is stored in a claim named 'tenantName' or a standard name claim
                setTenantName(decodedToken.tenantName || decodedToken.name);
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('tenantToken');
                navigate('/rent-login');
            }

            // Fetch dynamic stats based on tenant ID (example)
            const fetchTenantStats = async () => {
                try {
                    const response = await fetch(`http://localhost:5162/api/tenant/${tenantId}/dashboard-stats`, { // Use tenantId here
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStats([
                            { title: 'Active Applications', value: data.activeApplications || 0, icon: <FaClipboardCheck /> },
                            { title: 'Current Lease', value: data.currentLease || 0, icon: <FaFileContract /> },
                            { title: 'Upcoming Payment', value: data.upcomingPayment || '$0', icon: <FaMoneyBillAlt /> },
                            // Add more dynamic stats here based on your backend response
                        ]);
                    } else {
                        console.error('Failed to fetch tenant stats:', response.status);
                        setStats([
                            { title: 'Active Applications', value: 'N/A', icon: <FaClipboardCheck /> },
                            { title: 'Current Lease', value: 'N/A', icon: <FaFileContract /> },
                            { title: 'Upcoming Payment', value: 'N/A', icon: <FaMoneyBillAlt /> },
                        ]);
                    }
                } catch (error) {
                    console.error('Error fetching tenant stats:', error);
                    setStats([
                        { title: 'Active Applications', value: 'Error', icon: <FaClipboardCheck /> },
                        { title: 'Current Lease', value: 'Error', icon: <FaFileContract /> },
                        { title: 'Upcoming Payment', value: 'Error', icon: <FaMoneyBillAlt /> },
                    ]);
                }
            };

            // Only fetch stats if tenantId is available
            if (tenantId) {
                fetchTenantStats();
            }

        } else {
            navigate('/rent-login');
        }
    }, [navigate, tenantId]); // Added tenantId to the dependency array

    const handleApplyNewProperty = () => {
        navigate('/tenant/properties');
    };

    const handleMakePayment = () => {
        console.log('Make Payment clicked');
    };

    const handleReportMaintenance = () => {
        console.log('Report Maintenance clicked');
    };

    return (
        <div className="dashboard-home">
            <div className="top-left-info">
                {tenantId && <p>Tenant ID: {tenantId}</p>}
                {tenantName && <p>Welcome, {tenantName}</p>}
            </div>
            <h2>Tenant Dashboard</h2>

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

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button onClick={handleApplyNewProperty}>Apply for New Property</button>
                <button onClick={handleMakePayment}>Make Payment</button>
                <button onClick={handleReportMaintenance}>Report Maintenance</button>
            </div>
        </div>
    );
}

export default DashboardHome;