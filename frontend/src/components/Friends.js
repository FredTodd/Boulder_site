import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Friends.css';

const Friends = () => {
  const [friends, setFriends] = useState([]); // State to store friends list
  const [error, setError] = useState(''); // State to store error messages

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:5001/friends/list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Set auth header with token
        });

        // Check if response data is in expected format
        if (response.data && Array.isArray(response.data)) {
          setFriends(response.data); // Update state with fetched friends
        } else {
          setError('Unexpected response format'); // Set error if format is incorrect
        }
      } catch (error) {
        console.error('Error fetching friends list:', error); // Log error to console
        setError('Error fetching friends list'); // Set error state
      }
    };

    fetchFriends(); // Fetch friends on component mount
  }, []);

  // Display error if present
  if (error) {
    return <div>{error}</div>;
  }

  // Display message if no friends found
  if (friends.length === 0) {
    return <div>No friends found.</div>;
  }

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="friend-item"> {/* Render each friend as list item */}
            {friend.friendDetails ? (
              <Link to={`/user-profile/${friend.friendDetails.user_id}`} className="friend-link"> {/* Link to friend's profile */}
                {friend.friendDetails.profile_picture ? (
                  <img 
                    src={friend.friendDetails.profile_picture} 
                    alt={`${friend.friendDetails.username}'s profile`} 
                    className="friend-profile-picture" // Profile picture styling
                  />
                ) : (
                  <p>No profile picture available</p> // Fallback text if no profile picture
                )}
                <p>{friend.friendDetails.username}</p> {/* Display friend's username */}
              </Link>
            ) : (
              <p>Friend details not available</p> // Message if friend details are missing
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
