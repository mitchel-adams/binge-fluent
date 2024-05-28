import React from 'react';
import './ProfilePage.css';
import avatar from '../assets/avatar.png';  // Adjust the path as necessary

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h2>Profile</h2>
      
      <div className="section profile-info">
        <h3>Profile Information</h3>
        <div className="profile-avatar">
          <img src={avatar} alt="User Avatar" />
          <button className="edit-avatar">Change Avatar</button>
        </div>
        <div className="info-group">
          <label>Username:</label>
          <input type="text" value="Mitch" readOnly />
        </div>
        <div className="info-group">
          <label>Bio:</label>
          <textarea placeholder="Tell us about yourself..."></textarea>
        </div>
      </div>
      
      <div className="section social-links">
        <h3>Social Links</h3>
        <div className="info-group">
          <label>Facebook:</label>
          <input type="url" placeholder="https://facebook.com/yourprofile" />
        </div>
        <div className="info-group">
          <label>Twitter:</label>
          <input type="url" placeholder="https://twitter.com/yourprofile" />
        </div>
        <div className="info-group">
          <label>LinkedIn:</label>
          <input type="url" placeholder="https://linkedin.com/in/yourprofile" />
        </div>
      </div>

      <div className="section languages">
        <h3>Languages</h3>
        <div className="info-group">
          <label>Preferred Language:</label>
          <select>
            <option value="english">English</option>
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

      <div className="section levels">
        <h3>Language Levels</h3>
        <div className="info-group">
          <label>Current Level:</label>
          <select>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        </div>
      </div>

      <div className="section recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          <li>Started a new course: Advanced Spanish Grammar</li>
          <li>Completed 3 listening exercises</li>
          <li>Joined a new study group: Spanish Learners</li>
          <li>Achieved a 7-day streak</li>
        </ul>
      </div>
      
      <div className="section save-changes">
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default ProfilePage;
