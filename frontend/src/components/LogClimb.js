import React from 'react';
import { Link } from 'react-router-dom';

const LogClimb = () => {
  return (
    <div>
      <h1>Log a Climb</h1>
      <p>Please choose the type of climb you want to log:</p>
      <Link to="/log-indoor-climb">Log Indoor Climb</Link>
      <br />
      <Link to="/log-outdoor-climb">Log Outdoor Climb</Link>
    </div>
  );
};

export default LogClimb;
