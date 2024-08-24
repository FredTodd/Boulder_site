import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [totalClimbs, setTotalClimbs] = useState(0);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const refreshToken = async () => {
    try {
      const oldToken = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, {
        headers: { Authorization: `Bearer ${oldToken}` }
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
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

  const hideAuthOptions = location.pathname === '/login' || location.pathname === '/register';

  const fetchProfile = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { username, bio, profile_picture } = response.data;
      setUsername(username);
      setBio(bio);
      setProfilePicture(profile_picture);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchProfile();
        } else {
          setError('Session expired. Please log in again.');
        }
      } else {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      }
    }
  }, []);

  const fetchTotalClimbs = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/climbs`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTotalClimbs(response.data.length);
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
          <div className="user-options">
            <Link to="/profile">Profile</Link>
            <Link to="/log-indoor-climb">Add Ascent</Link>
            <Link to="/add-friends">Add Friends</Link>
            <Link to="/logbook">My Logbook</Link>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          !hideAuthOptions && (
            <div className="auth-options">
              <button className="auth-button" onClick={handleLoginClick}>Login</button>
              <button className="auth-button" onClick={handleRegisterClick}>Register</button>
            </div>
          )
        )}
      </div>
      <div className="feed-section">
          <div className="climb-number">{totalClimbs}</div>
          <div className="climb-text">Boulders</div>
        <p>Global Leaderboard</p>
      </div>
    </div>
  );
};

export default Sidebar;