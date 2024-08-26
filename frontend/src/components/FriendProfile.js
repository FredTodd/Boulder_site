import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LogbookFeature from './LogbookFeature';
import './Profile.css';

const FriendProfile = () => {
  const { userId } = useParams();  // Get userId from URL params
  const [username, setUsername] = useState('');  // State for username
  const [bio, setBio] = useState('');  // State for bio
  const [profilePicture, setProfilePicture] = useState('');  // State for profile picture
  const [totalClimbs, setTotalClimbs] = useState(0);  // State for total climbs count
  const [error, setError] = useState('');  // State for error messages
  const [isFriend, setIsFriend] = useState(false);  // State to track if the profile user is a friend
  const [isOwnProfile, setIsOwnProfile] = useState(false);  // State to check if the profile is the user's own profile

  const fetchUserProfile = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');  // Get token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }  // Send token in headers
      });

      const { username, bio, profile_picture } = response.data;  // Destructure user data
      setUsername(username);
      setBio(bio);
      setProfilePicture(profile_picture);
    } catch (error) {
      console.error('Error fetching user profile:', error);  // Log error
      setError('Error fetching user profile data');
    }
  }, [userId]);

  const fetchTotalClimbs = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');  // Get token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      // Fetch indoor and outdoor climbs concurrently
      const [indoorResponse, outdoorResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/climbs/indoor/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${process.env.REACT_APP_API_URL}/climbs/outdoor/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const totalClimbs = indoorResponse.data.length + outdoorResponse.data.length;  // Calculate total climbs
      setTotalClimbs(totalClimbs);
    } catch (error) {
      console.error('Error fetching total climbs:', error);  // Log error
      setError('Error fetching total climbs');
    }
  }, [userId]);

  const checkFriendStatus = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');  // Get token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/friends/status/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }  // Send token in headers
      });

      setIsFriend(response.data.isFriend);  // Update friend status
    } catch (error) {
      console.error('Error checking friend status:', error);  // Log error
      setError('Error checking friend status');
    }
  }, [userId]);

  const handleAddFriend = async () => {
    try {
      let token = localStorage.getItem('token');  // Get token from local storage
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/friends/add`,
        { friend_id: userId },  // Data to send in request body
        { headers: { Authorization: `Bearer ${token}` } }  // Send token in headers
      );

      setIsFriend(true);  // Update friend status to true
    } catch (error) {
      console.error('Error adding friend:', error);  // Log error
      setError('Error adding friend');
    }
  };

  useEffect(() => {
    fetchUserProfile();  // Fetch user profile on component mount
    fetchTotalClimbs();  // Fetch total climbs on component mount
    checkFriendStatus();  // Check friend status on component mount

    // Check if the profile belongs to the logged-in user
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId && parseInt(loggedInUserId) === parseInt(userId)) {
      setIsOwnProfile(true);  // Set as own profile
    } else {
      setIsOwnProfile(false);  // Set as not own profile
    }
  }, [fetchUserProfile, fetchTotalClimbs, checkFriendStatus, userId]);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={profilePicture} alt="Profile" />  // Display profile picture
        <div className="profile-details">
          <h2 className="username">{username}</h2>  // Display username
          <p className="bio">{bio}</p>  // Display bio
        </div>
        <div className="climb-counter">
          <div className="climb-number">{totalClimbs}</div>  // Display total climbs
          <div className="climb-text">Boulders</div>  // Display text for climbs
        </div>
      </div>
      {/* Add Friend Button */}
      {!isOwnProfile && !isFriend && (  // Show button if not own profile and not friend
        <button onClick={handleAddFriend} className="add-friend-button">
          Add Friend
        </button>
      )}
      <div className="profile-logbook">
        <h3>Logbook</h3>
        <LogbookFeature fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/climbs/user/${userId}`} />  // Display logbook feature
      </div>
      {error && <p className="error-message">{error}</p>}  // Display error message if any
    </div>
  );
};

export default FriendProfile;
