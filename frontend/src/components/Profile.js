import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
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
        console.log('API URL:', apiUrl); // Log the API URL
        console.log('Token:', token); // Log the token

        const response = await axios.get(`${apiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { username, bio, profile_picture } = response.data;
        setUsername(username);
        setBio(bio);
        setProfilePicture(profile_picture);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Profile</h1>
      <div>
        <img src={profilePicture} alt="Profile" />
        <p>Username: {username}</p>
        <p>Bio: {bio}</p>
      </div>
      {error && <p>{error}</p>}
      <button onClick={() => navigate('/update-profile')}>Update Profile</button>
    </div>
  );
};

export default Profile;
