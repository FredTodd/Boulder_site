import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const SuccessfullyRegistered = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password); // Attempt to login with provided email and password
      localStorage.setItem('token', response.token); // Save the JWT token to local storage
      setError('');
      navigate('/profile'); // Take them to profile page upon successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Registration Successful</h1>
      <p>Please log in to continue.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SuccessfullyRegistered;
