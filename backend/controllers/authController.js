const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Regex to check for special characters in the username
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    return res.status(400).json({ message: 'Username cannot contain special characters.' });
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose another one.' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};

// Check username availability
exports.checkUsername = async (req, res) => {
  const { username } = req.query;

  // Regex to check for special characters in the username
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    return res.status(400).json({ message: 'Username cannot contain special characters.' });
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.json({ isUnique: false });
    }

    res.json({ isUnique: true });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Generate both access token and refresh token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, refreshToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: newToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, bio, profile_picture } = req.body;

    console.log(`Update request: userId=${userId}, username=${username}, bio=${bio}, profile_picture=${profile_picture}`);

    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`Current username in DB: ${user.username}`);

    // Check if the username is being changed
    if (username && username !== user.username) {
      console.log(`Attempting to change username to: ${username}`);
      const regex = /^[a-zA-Z0-9_]+$/; // Regex to check for special characters
      if (!regex.test(username)) {
        console.log('Username contains special characters');
        return res.status(400).json({ message: 'Username cannot contain special characters.' });
      }

      const usernameExists = await User.findOne({ where: { username } });
      if (usernameExists && usernameExists.user_id !== userId) {
        console.log('Username is already taken by another user');
        return res.status(400).json({ message: 'Username is already taken' });
      }
      user.username = username; // Update the username if it's not taken
    }

    // Update other fields
    user.bio = bio || user.bio;
    user.profile_picture = profile_picture || user.profile_picture;

    await user.save();

    console.log('Profile updated successfully');
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};
