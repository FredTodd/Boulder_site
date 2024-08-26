import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import LogbookFeature from './LogbookFeature';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const [totalClimbs, setTotalClimbs] = useState(0);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const oldToken = localStorage.getItem('token'); // Get the current token from localStorage
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, {
        headers: { Authorization: `Bearer ${oldToken}` }
      });
      const { token } = response.data; // Extract the new token from the response
      localStorage.setItem('token', token); // Save the new token in localStorage
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error); // Log any errors during token refresh
      return null;
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      let token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setError('No token found. Please log in.'); // Set error if no token is found
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { username, bio, profile_picture } = response.data; // Extract user data from the response
      setUsername(username);
      setBio(bio);
      setProfilePicture(profile_picture);
    } catch (error) {
      if (error.response && error.response.status === 401) { // Handle token expiration
        const newToken = await refreshToken();
        if (newToken) {
          fetchProfile(); // Retry fetching profile with the new token
        } else {
          setError('Session expired. Please log in again.');
        }
      } else {
        console.error('Error fetching profile:', error); // Log any other errors
        setError('Error fetching profile data');
      }
    }
  }, []);

  const fetchTotalClimbs = useCallback(async () => {
    try {
      let token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/climbs`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTotalClimbs(response.data.length); // Set the total climbs count
    } catch (error) {
      console.error('Error fetching total climbs:', error); // Log any errors while fetching climbs
      setError('Error fetching total climbs');
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchTotalClimbs();
  }, [fetchProfile, fetchTotalClimbs]);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={profilePicture} alt="Profile" /> {/* Display user's profile picture */}
        <div className="profile-details">
          <h2 className="username">{username}</h2> {/* Display username */}
          <p className="bio">{bio}</p> {/* Display bio */}
        </div>
        <div className="climb-counter">
          <div className="climb-number">{totalClimbs}</div> {/* Display total number of climbs */}
          <div className="climb-text">Boulders</div>
        </div>
        <button className="edit-profile-button" onClick={() => navigate('/update-profile')}>
          Edit Profile
        </button>
      </div>
      <div className="profile-logbook">
        <h3>Logbook</h3>
        <LogbookFeature fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/auth/climbs`} /> {/* Display logbook feature */}
      </div>
      {error && <p className="error-message">{error}</p>} {/* Display any error messages */}
    </div>
  );
};

export default Profile;
