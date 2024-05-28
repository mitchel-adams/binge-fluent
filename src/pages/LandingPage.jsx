import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to BingeFluent</h1>
      <p>Your one-stop solution for immersive language learning.</p>
      <Link to="/about">About Us</Link>
      <Link to="/features">Features</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LandingPage;
