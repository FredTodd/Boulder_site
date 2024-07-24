import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLoginClick = () => {
    setShowDropdown(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setShowDropdown(false);
    navigate('/register');
  };

  const hideAuthOptions = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        !hideAuthOptions && (
          <div>
            <button onClick={toggleDropdown}>Login/Register</button>
            {showDropdown && (
              <div className="dropdown">
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleRegisterClick}>Register</button>
              </div>
            )}
          </div>
        )
      )}
    </nav>
  );
};

export default Navbar;
