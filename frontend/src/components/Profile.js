import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: { Authorization: token }
        });
        const { username, bio, profile_picture } = response.data;
        setUsername(username);
        setBio(bio);
        setProfilePicture(profile_picture);
      } catch (error) {
        setError('Error fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/profile`, { username, bio, profile_picture: profilePicture }, {
        headers: { Authorization: token }
      });
      setError('');
      // Optionally, show a success message
    } catch (error) {
      setError('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
  );
};

export default Profile;

