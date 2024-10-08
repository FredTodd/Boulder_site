import React, { useState } from 'react'; // Removed useContext since it's not needed now
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  // State variables for email, username, password, and error messages
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        username,
        password,
      });
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      setError('Error registering user'); // Set error message on registration failure
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="logo">FootHold</div> {/* Display application logo */}
        <h2>Register</h2> {/* Registration form header */}
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label> {/* Input for email */}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Username</label> {/* Input for username */}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label> {/* Input for password */}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="register-button">REGISTER</button> {/* Submit button for registration */}
        </form>
        <hr />
        <Link to="/login" className="login-link">Already have an Account? Login</Link> {/* Link to login page */}
      </div>
    </div>
  );
};

export default Register;
