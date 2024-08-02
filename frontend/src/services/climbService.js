import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const logIndoorClimb = async (climbData) => {
  try {
    const token = localStorage.getItem('token'); // Assuming you use token-based authentication
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post(`${API_URL}/climbs/indoor`, climbData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error logging indoor climb:', error);
    throw error;
  }
};

export const logOutdoorClimb = async (climbData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post(`${API_URL}/climbs/outdoor`, climbData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error logging outdoor climb:', error);
    throw error;
  }
};
