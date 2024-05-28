import React from 'react';
import './MiddleSection.css';

const MiddleSection = () => {
  return (
    <div className="middle-section">
      <div className="hero-section">
        <img
          src="https://via.placeholder.com/1200x300?text=Hero+Image" // Default hero image URL with text
          alt="Hero"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome, Mitch!</h1>
            <p>Your personalized dashboard to track your language learning journey.</p>
          </div>
          <img
            src="https://via.placeholder.com/150?text=Avatar" // Default avatar image URL with text
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </div>
      
      <div className="section-header">
        <h2>Top Movies</h2>
        <a href="#">See All</a>
      </div>
      <div className="card-grid">
        <div className="card">
          <img src="https://via.placeholder.com/300x450?text=Movie+Poster+1" alt="Movie Poster 1" />
          <h3>Movie Title 1</h3>
          <p>Description of the movie goes here.</p>
        </div>
        <div className="card">
          <img src="https://via.placeholder.com/300x450?text=Movie+Poster+2" alt="Movie Poster 2" />
          <h3>Movie Title 2</h3>
          <p>Description of the movie goes here.</p>
        </div>
        <div className="card">
          <img src="https://via.placeholder.com/300x450?text=Movie+Poster+3" alt="Movie Poster 3" />
          <h3>Movie Title 3</h3>
          <p>Description of the movie goes here.</p>
        </div>
        {/* Add more cards as needed */}
      </div>

      <div className="section-header">
        <h2>Recommended for You</h2>
        <a href="#">See All</a>
      </div>
      <div className="card-grid">
        <div className="card">
          <img src="https://via.placeholder.com/300x450?text=Movie+Poster+4" alt="Movie Poster 4" />
          <h3>Movie Title 4</h3>
          <p>Description of the movie goes here.</p>
        </div>
        <div className="card">
          <img src="https://via.placeholder.com/300x450?text=Movie+Poster+5" alt="Movie Poster 5" />
          <h3>Movie Title 5</h3>
          <p>Description of the movie goes here.</p>
        </div>
        <div className="card">
          <img src="https://via.placeholder.com/300x450?text=Movie+Poster+6" alt="Movie Poster 6" />
          <h3>Movie Title 6</h3>
          <p>Description of the movie goes here.</p>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default MiddleSection;
