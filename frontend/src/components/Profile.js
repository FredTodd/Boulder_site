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
  const navigate = useNavigate();

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

  const fetchProfile = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/auth/profile`, { // Ensure the path is correct
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
          fetchProfile(); // Retry fetching profile with new token
        } else {
          setError('Session expired. Please log in again.');
        }
      } else {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      }
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={profilePicture} alt="Profile" />
        <div>
          <h2 className="username">{username}</h2> {/* Username with larger font */}
          <p className="bio">{bio}</p> {/* Bio underneath in smaller font */}
          <button onClick={() => navigate('/gallery')}>Gallery</button>
          <button onClick={() => navigate('/update-profile')}>Edit Profile</button>
        </div>
      </div>
      <div className="profile-logbook">
        <h3>Logbook</h3>
        <LogbookFeature fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/auth/climbs`} />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Profile;
