import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
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
    <div>
      <Navbar />
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Bio:</label>
          <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div>
          <label>Profile Picture URL:</label>
          <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
