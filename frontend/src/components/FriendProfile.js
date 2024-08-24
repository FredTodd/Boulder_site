import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LogbookFeature from './LogbookFeature';
import './Profile.css';

const FriendProfile = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [totalClimbs, setTotalClimbs] = useState(0);
  const [error, setError] = useState('');

  const fetchUserProfile = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { username, bio, profile_picture } = response.data;
      setUsername(username);
      setBio(bio);
      setProfilePicture(profile_picture);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Error fetching user profile data');
    }
  }, [userId]);

  const fetchTotalClimbs = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const [indoorResponse, outdoorResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/climbs/indoor/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${process.env.REACT_APP_API_URL}/climbs/outdoor/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const totalClimbs = indoorResponse.data.length + outdoorResponse.data.length;
      setTotalClimbs(totalClimbs);
    } catch (error) {
      console.error('Error fetching total climbs:', error);
      setError('Error fetching total climbs');
    }
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
    fetchTotalClimbs();
  }, [fetchUserProfile, fetchTotalClimbs]);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={profilePicture} alt="Profile" />
        <div className="profile-details">
          <h2 className="username">{username}</h2>
          <p className="bio">{bio}</p>
        </div>
        <div className="climb-counter">
          <div className="climb-number">{totalClimbs}</div>
          <div className="climb-text">Boulders</div>
        </div>
      </div>
      <div className="profile-logbook">
        <h3>Logbook</h3>
        <LogbookFeature fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/climbs/user/${userId}`} />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FriendProfile;
