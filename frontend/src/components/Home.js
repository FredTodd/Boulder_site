import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleLogClimb = () => {
    navigate('/log-climb');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Climbing Log Site</h1>
      <button className="log-climb-button" onClick={handleLogClimb}>Log a Climb</button>
      <div className="feed">
        <div className="today-feed">
          <h2>Today's Feed</h2>
          {/* Content for today's feed goes here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
