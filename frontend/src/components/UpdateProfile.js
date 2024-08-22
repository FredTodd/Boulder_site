import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const [originalUsername, setOriginalUsername] = useState(''); // Track the original username
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { username, bio, profile_picture } = response.data;
        setUsername(username || '');
        setOriginalUsername(username || ''); // Set the original username
        setBio(bio || '');
        setProfilePicture(profile_picture || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL;

      // Only check username uniqueness if it has changed
      if (username !== originalUsername) {
        const checkResponse = await axios.get(`${apiUrl}/auth/check-username`, {
          params: { username },
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!checkResponse.data.isUnique) {
          setError('Username already exists. Please choose another one.');
          return;
        }
      }

      await axios.put(`${apiUrl}/auth/profile`, { username, bio, profile_picture: profilePicture }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setError('');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
    }
  };

  return (
    <div className="update-profile-container">
      <h1 className="update-profile-title">Update Profile</h1>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="update-profile-group">
          <label className="update-profile-label">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="update-profile-input" />
        </div>
        <div className="update-profile-group">
          <label className="update-profile-label">Bio:</label>
          <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={150} className="update-profile-input" />
          <p className="character-count">{bio.length}/150 characters</p>
        </div>
        <div className="update-profile-group">
          <label className="update-profile-label">Profile Picture URL:</label>
          <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} className="update-profile-input" />
        </div>
        {error && <p className="update-profile-error">{error}</p>}
        <button type="submit" className="update-profile-button">Update Profile</button>
      </form>
    </div>
  );
  
};

export default UpdateProfile;
