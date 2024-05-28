import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHome, faSearch, faThLarge, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import avatar from '../assets/avatar.png';  // Adjust the path as necessary

const Navbar = ({ userLevel }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-item">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" className="nav-icon" />
        </div>
        <div className="navbar-item">
          <FontAwesomeIcon icon={faChevronRight} size="lg" className="nav-icon" />
        </div>
        <div className="navbar-item home-button">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} size="lg" className="home-icon" />
          </Link>
        </div>
      </div>
      <div className="navbar-center">
        <div className="navbar-search" onClick={() => navigate('/browse')}>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search content..." />
          <Link to="/browse" className="browse-icon">
            <FontAwesomeIcon icon={faThLarge} size="lg" />
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-item">
          <Link to="/notifications">
            <FontAwesomeIcon icon={faBell} size="lg" />
          </Link>
        </div>
        <div className="navbar-item avatar-container" onClick={toggleDropdown}>
          <img src={avatar} alt="User Avatar" className="navbar-avatar" />
          {dropdownOpen && (
            <div className="avatar-dropdown">
              <Link to="/account" onClick={closeDropdown}>Account</Link>
              <Link to="/profile" onClick={closeDropdown}>Profile</Link>
              <Link to="/settings" onClick={closeDropdown}>Settings</Link>
              <Link to="/logout" onClick={closeDropdown}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
