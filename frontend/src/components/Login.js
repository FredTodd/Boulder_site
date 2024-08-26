import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages
  const { login } = useContext(AuthContext); // Get login function from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for getting current route location

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Send login request to the backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      login(response.data.token); // Update the authentication context with the received token
      const from = location.state?.from?.pathname || '/'; // Redirect user to intended route or homepage
      navigate(from);
    } catch (error) {
      setError('Invalid email or password'); // Set error message if login fails
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">FootHold</div>
        <h2>Sign in</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Sign in</button>
        </form>
        <hr />
        <Link to="/register" className="register-link">New User? Register</Link> {/* Link to the registration page */}
      </div>
    </div>
  );
};

export default Login;
