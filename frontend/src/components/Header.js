import React, { useState } from 'react';
import Navbar from './Navbar';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo"><Link to="/">FootHold</Link></div>
        </div>
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="header-right">
          <form onSubmit={handleSearchSubmit} className="search-bar">
            <input
              type="text"
              placeholder="SEARCH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
