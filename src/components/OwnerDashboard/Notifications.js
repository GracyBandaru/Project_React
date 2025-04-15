import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or your preferred HTTP client

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/Payments/notifications/owner'); // Your API endpoint
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error loading notifications: {error}</div>;
  }

  if (notifications.length === 0) {
    return <div>No new notifications.</div>;
  }

  return (
    <div>
      <h2>Late Payment Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.notificationID}>
            <strong>Tenant:</strong> {notification.tenantName}<br />
            <strong>Property:</strong> {notification.propertyAddress}<br />
            <strong>Message:</strong> {notification.message}<br />
            <strong>Created At:</strong> {new Date(notification.createdAt).toLocaleDateString()} ({notification.daysLate} days ago)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;