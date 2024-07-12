import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogClimb = () => {
    navigate('/log-climb');
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Climbing Log Site</h1>
      <button onClick={handleLogClimb}>Log a Climb</button>
    </div>
  );
};

export default Home;
