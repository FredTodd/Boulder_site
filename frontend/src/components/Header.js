import React, { useState } from 'react';
import Navbar from './Navbar';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to store search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handle form submission for search
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    if (searchQuery.trim() === '') return; // Do nothing if search query is empty

    try {
      // Fetch search results from API
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/search`, {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in request headers
        }
      });

      setSearchResults(response.data); // Update state with search results
    } catch (error) {
      console.error('Error searching for users:', error.message); // Log any errors
    }
  };

  // Navigate to user profile when search result is clicked
  const handleResultClick = (userId) => {
    navigate(`/user-profile/${userId}`); // Navigate to the selected user's profile
    setSearchResults([]); // Clear search results
    setSearchQuery(''); // Clear search input
  };
  
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo"><Link to="/">FootHold</Link></div> {/* Logo linking to home page */}
        </div>
        <div className="navbar-container">
          <Navbar /> {/* Render Navbar component */}
        </div>
        <div className="header-right">
          <form onSubmit={handleSearchSubmit} className="search-bar"> {/* Search form */}
            <input
              type="text"
              placeholder="SEARCH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
            <button type="submit">Search</button> {/* Search button */}
          </form>
          {searchResults.length > 0 && ( // Render search results if there are any
            <div className="search-results">
              {searchResults.map((user) => ( // Map over each search result
                <div key={user.user_id} className="search-result" onClick={() => handleResultClick(user.user_id)}> {/* Clickable search result */}
                  <img src={user.profile_picture} alt={user.username} /> {/* User profile picture */}
                  <p>{user.username}</p> {/* Username of the search result */}
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
