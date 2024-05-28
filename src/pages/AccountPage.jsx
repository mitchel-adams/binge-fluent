import React from 'react';
import './AccountPage.css';

const AccountPage = () => {
  return (
    <div className="account-page">
      <h2>Account Settings</h2>
      
      <div className="section user-info">
        <h3>User Information</h3>
        <div className="info-group">
          <label>Username:</label>
          <input type="text" value="Mitch" readOnly />
        </div>
        <div className="info-group">
          <label>Email:</label>
          <input type="email" value="mitch@example.com" readOnly />
        </div>
      </div>
      
      <div className="section account-settings">
        <h3>Account Settings</h3>
        <div className="info-group">
          <label>Change Password:</label>
          <input type="password" placeholder="Enter new password" />
        </div>
        <div className="info-group">
          <label>Notification Preferences:</label>
          <select>
            <option value="all">All Notifications</option>
            <option value="important">Important Notifications Only</option>
            <option value="none">No Notifications</option>
          </select>
        </div>
      </div>
      
      <div className="section payment-info">
        <h3>Payment Information</h3>
        <div className="info-group">
          <label>Credit Card:</label>
          <input type="text" placeholder="**** **** **** 1234" readOnly />
        </div>
        <div className="info-group">
          <label>Expiry Date:</label>
          <input type="text" placeholder="12/23" readOnly />
        </div>
        <div className="info-group">
          <label>Billing Address:</label>
          <input type="text" placeholder="1234 Main St, City, Country" readOnly />
        </div>
      </div>

      <div className="section plan-choice">
        <h3>Plan Choice</h3>
        <div className="info-group">
          <label>Current Plan:</label>
          <input type="text" value="Premium" readOnly />
        </div>
        <div className="info-group">
          <label>Change Plan:</label>
          <select>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="pro">Pro</option>
          </select>
        </div>
      </div>

      <div className="section save-changes">
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default AccountPage;
