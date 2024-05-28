import React from 'react';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const notifications = [
    { id: 1, message: 'You have a new friend request', time: '2 hours ago' },
    { id: 2, message: 'New comment on your post', time: '4 hours ago' },
    { id: 3, message: 'Your language level has increased!', time: '1 day ago' },
    { id: 4, message: 'You have a new message', time: '2 days ago' },
  ];

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span>{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
