import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  {/* eslint-disable-next-line */}
  const [error, setError] = useState('');
  const [totalClimbs, setTotalClimbs] = useState(0);
  {/* eslint-disable-next-line */}
  const [username, setUsername] = useState('');
  {/* eslint-disable-next-line */}
  const [bio, setBio] = useState('');
  {/* eslint-disable-next-line */}
  const [profilePicture, setProfilePicture] = useState('');

  // Function to refresh JWT token
  const refreshToken = async () => {
    try {
      const oldToken = localStorage.getItem('token'); // Get the current token from local storage
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, {
        headers: { Authorization: `Bearer ${oldToken}` } // Set Authorization header with the old token
      });
      const { token } = response.data; // Extract new token from response
      localStorage.setItem('token', token); // Save new token to local storage
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Determines if authentication options should be hidden
  const hideAuthOptions = location.pathname === '/login' || location.pathname === '/register';

  const fetchProfile = useCallback(async () => {
    try {
      let token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variables
      const response = await axios.get(`${apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` } // Set Authorization header with the token
      });

      const { username, bio, profile_picture } = response.data; // Extract user data from response
      setUsername(username); // Update profile stuff
      setBio(bio);
      setProfilePicture(profile_picture);
    } catch (error) {
      if (error.response && error.response.status === 401) { // If token is expired
        const newToken = await refreshToken();
        if (newToken) {
          fetchProfile(); // Retry fetching profile with new token
        } else {
          setError('Session expired. Please log in again.');
        }
      } else {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      }
    }
  }, []); // Empty dependency array to prevent unnecessary re-renders (seems to have worked)

  const fetchTotalClimbs = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/climbs`; // API endpoint for fetching climbs
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` } // Set Authorization header with the token
      });

      setTotalClimbs(response.data.length); // Update totalClimbs state with the length of the climbs array
    } catch (error) {
      console.error('Error fetching total climbs:', error);
      setError('Error fetching total climbs');
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchTotalClimbs();
  }, [fetchProfile, fetchTotalClimbs]);


  return (
    <div className="sidebar">
      <div className="auth-section">
        {isAuthenticated ? (
          // Display user options if authenticated
          <div className="user-options">
            <Link to="/profile">Profile</Link>
            <Link to="/log-indoor-climb">Add Ascent</Link>
            <Link to="/add-friends">Add Friends</Link>
            <Link to="/logbook">My Logbook</Link>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          // Display login and register buttons if not authenticated and not on login/register page
          !hideAuthOptions && (
            <div className="auth-options">
              <button className="auth-button" onClick={handleLoginClick}>Login</button>
              <button className="auth-button" onClick={handleRegisterClick}>Register</button>
            </div>
          )
        )}
      </div>
      <div className="feed-section">
        {/* Display total number of climbs */}
        <div className="climb-number">{totalClimbs}</div>
        <div className="climb-text">Boulders</div>
        <p>Global Leaderboard</p>
      </div>
    </div>
  );
};

export default Sidebar;
