import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const hideAuthOptions = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="sidebar">
      <div className="auth-section">
        {isAuthenticated ? (
          <div className="user-options">
            <Link to="/profile">Profile</Link>
            <Link to="/log-indoor-climb">Add Ascent</Link>
            <Link to="/add-friends">Add Friends</Link>
            <Link to="/logbook">My Logbook</Link>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          !hideAuthOptions && (
            <div className="auth-options">
              <button className="auth-button" onClick={handleLoginClick}>Login</button>
              <button className="auth-button" onClick={handleRegisterClick}>Register</button>
            </div>
          )
        )}
      </div>
      <div className="feed-section">
        <p>Your Feed</p>
        <p>Global Leaderboard</p>
      </div>
    </div>
  );
};

export default Sidebar;
