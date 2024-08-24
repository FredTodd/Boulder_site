import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Friends.css';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:5001/friends/list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Ensure that response data is what we expect
        if (response.data && Array.isArray(response.data)) {
          setFriends(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching friends list:', error);
        setError('Error fetching friends list');
      }
    };

    fetchFriends();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (friends.length === 0) {
    return <div>No friends found.</div>;
  }

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="friend-item">
            {friend.friendDetails ? (
              <Link to={`/user-profile/${friend.friendDetails.user_id}`} className="friend-link">
                {friend.friendDetails.profile_picture ? (
                  <img 
                    src={friend.friendDetails.profile_picture} 
                    alt={`${friend.friendDetails.username}'s profile`} 
                    className="friend-profile-picture"
                  />
                ) : (
                  <p>No profile picture available</p>
                )}
                <p>{friend.friendDetails.username}</p> {/* Removed className for styling */}
              </Link>
            ) : (
              <p>Friend details not available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
