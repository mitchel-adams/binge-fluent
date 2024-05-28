import React from 'react';
import './LeftSidebar.css';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-container">
        <h3>General Level</h3>
        <p>Level: B2</p>
      </div>
      <div className="sidebar-container">
        <h3>Category Levels</h3>
        <p>Speaking: B1</p>
        <p>Listening: B2</p>
        <p>Reading: B2</p>
        <p>Writing: B1</p>
      </div>
      <div className="sidebar-container">
        <h3>Streak</h3>
        <p>Current Streak: 15 days</p>
      </div>
      <div className="sidebar-container">
        <h3>Hours of Study</h3>
        <p>Total Hours: 120</p>
      </div>
      <div className="sidebar-container">
        <h3>Words Mastered</h3>
        <p>Words: 500</p>
      </div>
      <div className="sidebar-container">
        <h3>Speaking</h3>
        <p>Fluency: 75%</p>
        <p>Accuracy: 80%</p>
        <p>Vocabulary: 70%</p>
      </div>
      <div className="sidebar-container">
        <h3>Listening</h3>
        <p>Comprehension: 85%</p>
        <p>Speed: 80%</p>
        <p>Vocabulary: 75%</p>
      </div>
      <div className="sidebar-container">
        <h3>Reading</h3>
        <p>Comprehension: 90%</p>
        <p>Speed: 85%</p>
        <p>Vocabulary: 80%</p>
      </div>
      <div className="sidebar-container">
        <h3>Writing</h3>
        <p>Grammar: 70%</p>
        <p>Vocabulary: 75%</p>
        <p>Coherence: 80%</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
