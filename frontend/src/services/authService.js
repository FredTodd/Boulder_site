import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
