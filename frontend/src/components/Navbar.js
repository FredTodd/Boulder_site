import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/log-climb">Log Climb</Link>
      <Link to="/friends">Friends</Link>
      <Link to="/">Explore</Link>
    </nav>
  );
};

export default Navbar;
