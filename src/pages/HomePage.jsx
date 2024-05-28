import React from 'react';
import './HomePage.css';
import avatar from '../assets/avatar.png'; // Adjust the path as necessary
import spanish from '../assets/spanish.png'; // Adjust the path as necessary

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <img src={spanish} alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome, Mitch!</h1>
            <p>Level: B2</p>
            <p>Achievements: 5</p>
            <p>Streak: 15 days</p>
          </div>
          <img src={avatar} alt="User Avatar" className="user-avatar" />
        </div>
      </div>

      <div className="to-do-section">
        <h2>To-Do</h2>
        <div className="to-do-items">
          <div className="to-do-item">
            <h3>Speaking</h3>
            <p>Recommended: Conversation Practice</p>
          </div>
          <div className="to-do-item">
            <h3>Writing</h3>
            <p>Recommended: Essay on Your Favorite Book</p>
          </div>
          <div className="to-do-item">
            <h3>Reading</h3>
            <p>Recommended: News Article</p>
          </div>
          <div className="to-do-item">
            <h3>Listening</h3>
            <p>Recommended: Podcast Episode</p>
          </div>
          <div className="to-do-item">
            <h3>Watching</h3>
            <p>Recommended: Spanish Movie</p>
          </div>
        </div>
      </div>

      <div className="recent-activity-section">
        <h2>My Recent Activity</h2>
        <ul>
          <li>Completed Lesson: Vocabulary Basics</li>
          <li>Practiced Speaking: Conversation Practice</li>
          <li>Took a Test: Grammar Skills</li>
        </ul>
      </div>

      <div className="community-activity-section">
        <h2>Community Activity</h2>
        <ul>
          <li>John: "Just completed my 30-day streak!"</li>
          <li>Mary: "Looking for study partners!"</li>
          <li>Alex: "Finished reading a Spanish novel!"</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
