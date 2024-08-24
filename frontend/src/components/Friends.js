import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Friends.css';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/friends/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFriends(response.data);
      } catch (err) {
        console.error('Error fetching friends list:', err);
        setError('Error fetching friends list');
      }
    };

    fetchFriends();
  }, []);

  // Function to handle profile view navigation
  const viewProfile = (friendId) => {
    navigate(`/user-profile/${friendId}`); // Use friendId to navigate to the friend's profile
  };

  if (error) return <p>{error}</p>;
  if (friends.length === 0) return <p>No friends yet.</p>;

  return (
    <div className="friends-list">
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.friend_id} onClick={() => viewProfile(friend.friend_id)} className="friend-item">
            <img src={friend.User.profile_picture} alt={`${friend.User.username}'s profile`} className="friend-profile-picture" />
            <span className="friend-username">{friend.User.username}</span> {/* Add a class here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
