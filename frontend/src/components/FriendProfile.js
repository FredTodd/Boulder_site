import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';
import LogbookFeature from './LogbookFeature'; // Assuming you have a component for logs

const FriendProfile = () => {
  const { userId } = useParams();  // Fetch userId from URL parameters
  const [profileData, setProfileData] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch the user's profile
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfileData(response.data);

        // Check if the current user is friends with this profile user
        const friendStatusResponse = await axios.get(`${process.env.REACT_APP_API_URL}/friends/status/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIsFriend(friendStatusResponse.data.isFriend);
      } catch (err) {
        console.error('Error fetching user profile or friend status:', err);
        setError('Error fetching user profile or friend status');
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Function to handle adding a friend
  const handleAddFriend = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/friends/add`, { friend_id: userId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsFriend(true);
    } catch (err) {
      console.error('Error adding friend:', err);
      setError('Error adding friend');
    }
  };

  if (error) return <p>{error}</p>;
  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={profileData.profile_picture} alt={profileData.username} />
        <div className="profile-details">
          <h2 className="username">{profileData.username}</h2>
          <p className="bio">{profileData.bio}</p>
        </div>
        {!isFriend && (
          <button onClick={handleAddFriend}>Add Friend</button>
        )}
      </div>
      <div className="profile-logbook">
        <h3>Logbook</h3>
        <LogbookFeature fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/auth/climbs/${userId}`} />
      </div>
    </div>
  );
};

export default FriendProfile;
