import React from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="section general-settings">
        <h3>General Settings</h3>
        <div className="info-group">
          <label>Theme:</label>
          <select>
            <option value="light">Light</option>
            <option value="dark" selected>Dark</option>
          </select>
        </div>
        <div className="info-group">
          <label>Language:</label>
          <select>
            <option value="english" selected>English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="portuguese">Portuguese</option>
            <option value="russian">Russian</option>
            <option value="korean">Korean</option>
            <option value="arabic">Arabic</option>
            <option value="dutch">Dutch</option>
            <option value="hindi">Hindi</option>
            <option value="swedish">Swedish</option>
            <option value="turkish">Turkish</option>
          </select>
        </div>
      </div>

      <div className="section privacy-settings">
        <h3>Privacy Settings</h3>
        <div className="info-group">
          <label>Profile Visibility:</label>
          <select>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="info-group">
          <label>Search Visibility:</label>
          <select>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="info-group">
          <label>Data Sharing:</label>
          <input type="checkbox" checked /> Share my data with third parties
        </div>
      </div>

      <div className="section notification-settings">
        <h3>Notification Settings</h3>
        <div className="info-group">
          <label>Email Notifications:</label>
          <select>
            <option value="all">All Notifications</option>
            <option value="important">Important Notifications Only</option>
            <option value="none">No Notifications</option>
          </select>
        </div>
        <div className="info-group">
          <label>Push Notifications:</label>
          <select>
            <option value="all">All Notifications</option>
            <option value="important">Important Notifications Only</option>
            <option value="none">No Notifications</option>
          </select>
        </div>
      </div>

      <div className="section account-settings">
        <h3>Account Settings</h3>
        <div className="info-group">
          <label>Username:</label>
          <input type="text" value="Mitch" readOnly />
        </div>
        <div className="info-group">
          <label>Email:</label>
          <input type="email" value="mitch@example.com" readOnly />
        </div>
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

      <div className="section security-settings">
        <h3>Security Settings</h3>
        <div className="info-group">
          <label>Two-Factor Authentication:</label>
          <input type="checkbox" checked />
        </div>
        <div className="info-group">
          <label>Login Activity:</label>
          <button>View Recent Logins</button>
        </div>
      </div>

      <div className="section save-changes">
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;
