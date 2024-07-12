import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  const getToken = () => localStorage.getItem('token');

  if (getToken()) {
    return (
      <div>
        <h1>Welcome to Boulder Site</h1>
        <p>You are logged in.</p>
        <p>Feel free to explore the site and log your climbs.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to Boulder Site</h1>
      <p>Please choose an option:</p>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
