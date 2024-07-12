import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/auth';

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error registering user (response):', error.response.data);
      throw new Error(error.response.data.message || 'Error registering user');
    } else if (error.request) {
      console.error('Error registering user (request):', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error registering user (message):', error.message);
      throw new Error(error.message);
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error logging in (response):', error.response.data);
      throw new Error(error.response.data.message || 'Error logging in');
    } else if (error.request) {
      console.error('Error logging in (request):', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error logging in (message):', error.message);
      throw new Error(error.message);
    }
  }
};
