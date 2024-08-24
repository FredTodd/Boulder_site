// src/components/Header.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/search`, {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for users:', error.message);
    }
  };

  const handleResultClick = (userId) => {
    navigate(`/user-profile/${userId}`); // Ensure this route is correct
    setSearchResults([]);
    setSearchQuery('');
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
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((user) => (
                <div key={user.user_id} className="search-result" onClick={() => handleResultClick(user.user_id)}>
                  <img src={user.profile_picture} alt={user.username} />
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
